import axios from 'axios';
import { getAuthToken } from './auth';

// Create axios instance with base configuration
const api = axios.create({
   baseURL: 'http://localhost:5000/api',
   timeout: 10000,
   headers: {
      'Content-Type': 'application/json',
   },
});

// Request interceptor - Add auth token to all requests
api.interceptors.request.use(
   (config) => {
      const token = getAuthToken();
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

// Response interceptor - Handle common errors
api.interceptors.response.use(
   (response) => {
      return response;
   },
   (error) => {
      // Handle 401 Unauthorized
      if (error.response?.status === 401) {
         // Clear auth data
         if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Redirect to login if not already there
            if (window.location.pathname !== '/login') {
               window.location.href = '/login';
            }
         }
      }

      // Handle 403 Forbidden
      if (error.response?.status === 403) {
         console.error('Access forbidden:', error.response.data);
      }

      // Handle 404 Not Found
      if (error.response?.status === 404) {
         console.error('Resource not found:', error.response.data);
      }

      // Handle 500 Server Error
      if (error.response?.status === 500) {
         console.error('Server error:', error.response.data);
      }

      return Promise.reject(error);
   }
);

export default api;
