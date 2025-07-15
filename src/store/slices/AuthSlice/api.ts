import axios from 'axios';
import { clearTokens, getTokens, storeTokens } from './AuthStorage.ts';

const api = axios.create({
  baseURL: 'https://econofy-backend.onrender.com/auth',
});

api.interceptors.request.use(async (config) => {
  const tokens = await getTokens();
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const tokens = await getTokens();

    if (
      error.response?.status === 401 &&
      tokens?.refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          'https://econofy-backend.onrender.com/auth/refresh',
          { refreshToken: tokens.refreshToken }
        );

        const { accessToken, refreshToken } = response.data;
        await storeTokens({accessToken, refreshToken});

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        await clearTokens();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;