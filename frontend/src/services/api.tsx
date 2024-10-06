import axios from 'axios';


// Base URL for Axios, using environment variables for flexibility
const API_BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL, // Use backend_service when running in Docker
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;

