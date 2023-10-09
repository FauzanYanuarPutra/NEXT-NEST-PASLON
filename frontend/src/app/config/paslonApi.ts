
import axios from 'axios';

const BASE_API_URL = 'http://localhost:5000'; 

const api = axios.create({
  baseURL: BASE_API_URL,
});

export const setAuthHeader = (token: any) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const get = (url: any) => {
  return api.get(url);
};

export const getOne = (url: any) => {
  return api.get(url);
};

export const post = (url: any, data: any) => {
  return api.post(url, data);
};

export const patch = (url: any, data: any) => {
  return api.patch(url, data);
};

export const destroy = (url: any, data: any) => {
  return api.delete(url, data);
};

export default api;
