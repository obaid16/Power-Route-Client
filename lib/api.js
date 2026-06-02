import axios from 'axios';

const getBaseUrl = () => {
  // 1. Prioritize environment variable (crucial for Vercel deployments)
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // 2. Local network testing fallback
  if (typeof window !== 'undefined') {
    if (window.location.hostname !== 'localhost' && !window.location.hostname.includes('vercel.app')) {
      return `${window.location.protocol}//${window.location.hostname}:5000/api`;
    }
  }
  
  // 3. Default local development
  return 'http://localhost:5000/api';
};

// Create Axios instance
const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    // Only run this on the client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle global errors (e.g., 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Optionally redirect to login, but handle delicately to avoid loops
        // window.location.href = '/login'; 
      }
    }
    return Promise.reject(error);
  }
);

export default api;
