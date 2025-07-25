import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchProducts = () => axios.get(`${API_URL}/products`);
export const fetchCart = () => {
  const userId = localStorage.getItem('userId');
  return axios.get(`${API_URL}/cart`, { params: { userId } });
};
export const addToCart = (productId, quantity) => {
  const userId = localStorage.getItem('userId');
  return axios.post(`${API_URL}/cart/add`, { userId, productId, quantity });
};
export const removeFromCart = (id) => {
  const userId = localStorage.getItem('userId');
  return axios.delete(`${API_URL}/cart/remove/${id}`, { params: { userId } });
};
export const updateLoyalty = (loyaltyLevel) => {
  const userId = localStorage.getItem('userId');
  return axios.post(`${API_URL}/cart/loyalty`, { userId, loyaltyLevel });
};
export const checkout = () => {
  const userId = localStorage.getItem('userId');
  return axios.post(`${API_URL}/cart/checkout`, { userId });
};
export const updateQuantity = (productId, quantity) => {
  const userId = localStorage.getItem('userId');
  return axios.post(`${API_URL}/cart/add`, { userId, productId, quantity });
};
export const setCartItemQuantity = (productId, quantity) => {
  const userId = localStorage.getItem('userId');
  return axios.post(`${API_URL}/cart/set-quantity`, { userId, productId, quantity });
}; 