import axios from 'axios';

// Determine the base URL based on the environment
let baseURL = '';

// In production (on Render), use relative URLs which will hit the same domain
if (import.meta.env.PROD) {
  baseURL = ''; // Empty string means relative to current domain
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