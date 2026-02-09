// src/api/client.js
import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_CLIENT_URL,
});

// Automatically add the Bearer token to every request
client.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token'); // or your preferred auth storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;