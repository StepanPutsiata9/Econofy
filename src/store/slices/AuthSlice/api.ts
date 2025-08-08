import axios from 'axios';
import {
  clearTokens,
  getTokens,
  storeAvatar,
  storeTokens,
} from './AuthStorage.ts';
import { store } from '../../store.ts';
import { logout } from './Auth.slice.ts';
const api = axios.create({
  baseURL: 'https://econofy-backend.onrender.com/',
});

api.interceptors.request.use(async config => {
  const tokens = await getTokens();
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const tokens = await getTokens();
    if (error.response?.status === 403) {
      store.dispatch(logout());
      return Promise.reject("403");
    }
    if (
      error.response?.status === 401 &&
      tokens?.refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        console.log('try to refresh');
        const response = await axios.post(
          'https://econofy-backend.onrender.com/auth/refresh',
          { refreshToken: tokens.refreshToken },
        );
        const { accessToken, refreshToken, uri } = response.data;
        await storeTokens({ accessToken, refreshToken });
        await storeAvatar(uri || 'empty');
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        await clearTokens();
        return Promise.reject(refreshError);
      }
    }
    if (error.response?.status === 404) {
      return { data: null };
    }
    return Promise.reject(error);
  },
);

export default api;
