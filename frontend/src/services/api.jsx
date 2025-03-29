// src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true // This allows cookies to be sent and received
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling global errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    
    // Handle specific errors here (like redirecting to login on 401)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // You could implement token refresh logic here if needed
      // For now, we'll just handle the 401 error
      console.error('Authentication error:', error.response.data.message);
    }
    
    return Promise.reject(error);
  }
);

export const fetchData = async () => {
  try {
    const response = await apiClient.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default apiClient;