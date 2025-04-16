// Determine the base URL based on the environment
const API_BASE_URL = import.meta.env.PROD 
  ? '' // Empty string will use relative URLs in production (same domain)
  : 'http://localhost:4000';

// Helper function to build URLs
export const apiUrl = (path) => `${API_BASE_URL}${path}`;

// Example usage:
// import { apiUrl } from '../utils/api';
// axios.get(apiUrl('/profile'));