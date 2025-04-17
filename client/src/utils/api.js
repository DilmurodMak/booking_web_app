import axios from 'axios';

// Determine the base URL based on the environment
let baseURL = '';

// In production (on Render), use the API URL with the correct port
if (import.meta.env.PROD) {
  // When deployed to Render as a single service, API is available at /api path
  baseURL = '/api';
} else {
  // In development, use the environment variable or fallback to localhost
  baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
}

// Create an Axios instance with default settings
const api = axios.create({
  baseURL,
  withCredentials: true, // To handle cookies for authentication
});

export default api;