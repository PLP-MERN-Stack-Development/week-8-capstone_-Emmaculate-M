// src/utils/api.js
import axios from 'axios';

const isProduction = import.meta.env.MODE === 'production';

const baseURL = isProduction
  ? 'https://week-8-capstone-emmaculate-m.onrender.com/api'
  : 'http://localhost:5000/api';

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
