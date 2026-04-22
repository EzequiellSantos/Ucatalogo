import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_PRODUCTS_API_URL?.replace(/\/+$/, '') || 'http://localhost:4000/api';

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const loginWithGoogle = async (credential) => {
  const response = await authApi.post('/auth/google', { credential });
  return response.data.user;
};
