import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import type { APIError } from '../types';

const API_BASE = 'http://localhost/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.data) {
      const data = error.response.data as APIError;
      return Promise.reject(data);
    }
    return Promise.reject(error);
  }
);

export default api;
