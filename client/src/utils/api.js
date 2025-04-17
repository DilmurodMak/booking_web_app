import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  withCredentials: true, // To handle cookies for authentication
});

export default api;