import axios from 'axios';
import { getLogout } from './services';

const REFRESH_TOKEN_URL = '/auth/refreshToken';
const localStorageKey = 'keeptime-session';
const baseURLDev = `${window.location.protocol}//${window.location.hostname}:3001/api`;
const baseURLProd = `${window.location.protocol}//${window.location.hostname}/api`;
let isRefreshing = false;

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
      originalRequest.headers = JSON.parse(
        JSON.stringify(originalRequest.headers || {}),
      );

      // Refresh token conditions
      if (
        error.response.data.error.name === 'TokenExpiredError' &&
        originalRequest?.url !== REFRESH_TOKEN_URL &&
        originalRequest?._retry !== true
      ) {
        if (isRefreshing) {
          try {
            return await client(originalRequest);
          } catch (err) {
            console.log('is refreshing Error');
            return await Promise.reject(err);
          }
        }
        isRefreshing = true;
        originalRequest._retry = true;
        const res = await client
          .get(REFRESH_TOKEN_URL)
          .then(() => {
            return client(originalRequest);
          })
          .finally(() => {
            isRefreshing = false;
          });
        return res;
      }

      // Refresh token missing or expired => logout user...
      if (
        error.response?.status === 401 &&
        error.response?.data?.message === 'REFRESH_TOKEN_EXPIRED'
      ) {
        console.log('Refresh token expired - hopefully will be logged out');
        const res = await client(getLogout());
        if (res.status == 200) {
          localStorage.setItem(localStorageKey, JSON.stringify({ user: {} }));
        }

        return Promise.resolve(error);
      }

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      return Promise.reject(error);
    },
  );
  return client;
};

export const axiosClient = createAxiosClient();
