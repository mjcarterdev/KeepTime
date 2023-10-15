import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

      const logout = () => {
        const navigate = useNavigate();
        client.get('/auth/logout');
        navigate('/login');
      };

      // If error, process all the requests in the queue and logout the user.
      const handleError = (error) => {
        processQueue(error);
        logout();
        return Promise.reject(error);
      };

      // Refresh token conditions
      if (
        error.response?.status === 401 &&
        error.response.data.message === 'TokenExpiredError' &&
        originalRequest?.url !== REFRESH_TOKEN_URL &&
        originalRequest?._retry !== true
      ) {
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
        return client
          .get(REFRESH_TOKEN_URL)
          .then(() => {
            processQueue(null);
            return client(originalRequest);
          }, handleError)
          .finally(() => {
            isRefreshing = false;
          });
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
