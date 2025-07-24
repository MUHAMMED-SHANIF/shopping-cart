import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchProducts = () => axios.get(`${API_URL}/products`);
export const fetchCart = () => axios.get(`${API_URL}/cart`);
export const addToCart = (productId, quantity) => axios.post(`${API_URL}/cart/add`, { productId, quantity });
export const removeFromCart = (id) => axios.delete(`${API_URL}/cart/remove/${id}`);
export const updateLoyalty = (loyaltyLevel) => axios.post(`${API_URL}/cart/loyalty`, { loyaltyLevel });
export const checkout = () => axios.post(`${API_URL}/cart/checkout`);
export const updateQuantity = (productId, quantity) => axios.post(`${API_URL}/cart/add`, { productId, quantity }); 