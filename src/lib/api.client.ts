import axios from 'axios';

export const nhtsa = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_NHTSA_API_URL,
});

export const hotline = axios.create({});
