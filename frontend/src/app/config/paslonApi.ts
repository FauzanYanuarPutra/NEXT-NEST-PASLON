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

export const get = async (url: string) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const post = async (url: string, data: any) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const patch = async (url: string, data: any) => {
  try {
    const response = await api.patch(url, data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const destroy = async (url: string, data: any) => {
  try {
    const response = await api.delete(url, data);
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export default api

