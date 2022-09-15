import axios from 'axios';

export const ApiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}` || '',
  },
});
