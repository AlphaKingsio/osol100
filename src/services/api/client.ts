import axios from 'axios';
import rateLimit from 'axios-rate-limit';

// Create base axios instance
const baseClient = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 10000, // 10 second timeout
  headers: {
    'Accept': 'application/json',
  },
});

// Add rate limiting - 20 requests per minute
export const apiClient = rateLimit(baseClient, { 
  maxRequests: 20,
  perMilliseconds: 60000, // 1 minute
  maxRPS: 0.33 // max 1 request per 3 seconds
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 429) {
      console.error('Rate limit exceeded');
    }
    return Promise.reject(error);
  }
);