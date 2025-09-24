import axios from 'axios';
import Storage from './storage';

export const API_BASE_URL = process.env.API_URL || 'http://localhost:4000';

export const api = axios.create({ baseURL: `${API_BASE_URL}/api` });

api.interceptors.request.use(async (config) => {
  const token = await Storage.getItem('token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

