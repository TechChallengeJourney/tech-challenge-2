import axios from 'axios';

const client = axios.create({
  baseURL: process.env.PUBLIC_API_URL,
});

export default client;