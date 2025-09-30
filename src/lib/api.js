import axios from 'axios';
import { Platform } from 'react-native';
import Storage from './storage';

// Use Android emulator loopback when running on Android device/emulator
const defaultBaseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:4000' : 'http://localhost:4000';
export const API_BASE_URL = process.env.API_URL || defaultBaseUrl;

export const api = axios.create({ baseURL: `${API_BASE_URL}/api` });

api.interceptors.request.use(async (config) => {
  const token = await Storage.getItem('token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

