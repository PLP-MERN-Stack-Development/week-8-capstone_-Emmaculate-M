// src/utils/api.js
import axios from 'axios';

const isProduction = import.meta.env.MODE === 'production';

const baseURL = isProduction
  ? import.meta.env.VITE_API_BASE_URL_PROD + '/api'
  : import.meta.env.VITE_API_BASE_URL_LOCAL + '/api';

const api = axios.create({
  baseURL,
  withCredentials: true, // Only needed if you use cookies (not localStorage tokens)
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
