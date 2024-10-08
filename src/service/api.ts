import axios from 'axios';

const api = axios.create({
  baseURL: process.env.AXIOS_BASE_URL || 'https://vpic.nhtsa.dot.gov/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
