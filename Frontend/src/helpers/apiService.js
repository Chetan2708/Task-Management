

import axios from 'axios';

// Axios instance with credentials
const axiosWithCredentials = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});



export { axiosWithCredentials };