import axios from 'axios';
import Auth from '../helpers/auth';

export const ApiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${Auth.token}` || '',
  },
});
