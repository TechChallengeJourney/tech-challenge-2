import axios from 'axios';

export const clientApi = axios.create({
  baseURL: process.env.PUBLIC_API_URL,
});
