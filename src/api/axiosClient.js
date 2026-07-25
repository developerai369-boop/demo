import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Attach the auth token (if any) to every request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('laptophub_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the token is rejected, clear it so the UI can react (log the user out)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('laptophub_token');
      localStorage.removeItem('laptophub_user');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
