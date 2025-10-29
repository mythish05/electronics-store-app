import axios from 'axios';

const AUTH_BASE_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL.replace('/api/items', '')}/api/auth` : "/api/auth";

export const registerUser = (userData) => axios.post(`${AUTH_BASE_URL}/register`, userData);
export const loginUser = (credentials) => axios.post(`${AUTH_BASE_URL}/login`, credentials);