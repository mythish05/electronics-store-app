
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || "/api/items";

// Add token to requests
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const addItem = (item) => axios.post(`${BASE_URL}/additem`, item, { headers: getAuthHeaders() });
export const getAllItems = () => axios.get(`${BASE_URL}/allitems`, { headers: getAuthHeaders() });
export const getItemsByCategory = (category) => axios.get(`${BASE_URL}/byCategory?category=${category}`, { headers: getAuthHeaders() });
export const getItemsSortedByBrand = () => axios.get(`${BASE_URL}/sortedByBrand`, { headers: getAuthHeaders() });
export const deleteItem = (id) => axios.delete(`${BASE_URL}/${id}`, { headers: getAuthHeaders() });
