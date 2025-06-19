import axios from 'axios';
//peticiones a la API
const token = localStorage.getItem('auth_token');

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
  },
});

//interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  console.log('Token:', token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;