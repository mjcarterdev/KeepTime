import axios from 'axios';

const REFRESH_TOKEN_URL = '/auth/refreshToken';
const baseURLDev = `${window.location.protocol}//${window.location.hostname}:3001/api`;
const baseURLProd = `${window.location.protocol}//${window.location.hostname}/api`;
let failedQueue = [];
let isRefreshing = false;

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

const createAxiosClient = () => {
  const client = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? baseURLProd : baseURLDev,
    timeout: 300000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      originalRequest.headers = JSON.parse(JSON.stringify(originalRequest.headers || {}));
      // If error, process all the requests in the queue and logout the user.
      const handleError = (error) => {
        processQueue(error);
        return Promise.reject(error);
      };

      // Refresh token conditions
      if (
        error.response.data.error.name === 'TokenExpiredError' &&
        originalRequest?.url !== REFRESH_TOKEN_URL &&
        originalRequest?._retry !== true
      ) {
        console.log('token refresh');
        if (isRefreshing) {
          try {
            await new Promise(function (resolve, reject) {
              failedQueue.push({ resolve, reject });
            });
            return await client(originalRequest);
          } catch (err) {
            return await Promise.reject(err);
          }
        }
        isRefreshing = true;
        originalRequest._retry = true;
        const res = await client
          .get(REFRESH_TOKEN_URL)
          .then(() => {
            processQueue(null);
            return client(originalRequest);
          }, handleError)
          .finally(() => {
            isRefreshing = false;
          });
        return res;
      }

      // Refresh token missing or expired => logout user...
      if (error.response?.status === 401 && error.response?.data?.message === 'TokenExpiredError') {
        return handleError(error);
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );
  return client;
};

export const axiosClient = createAxiosClient();
