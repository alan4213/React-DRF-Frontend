import axios from 'axios';

const API_BASE = 'https://drf-api-project-1fd7.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests (except for register and login)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const isAuthEndpoint = config.url === '/register/' || config.url === '/login/';
  
  if (token && !isAuthEndpoint) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/login/', credentials),
  register: (userData) => api.post('/register/', userData),
};

export const productAPI = {
  getProducts: (searchTerm = '') => {
    const url = searchTerm ? `/products/?search=${searchTerm}` : '/products/';
    return api.get(url);
  },
  getProduct: (id) => api.get(`/products/${id}/`),
};

export const cartAPI = {
  getCart: () => api.get('/cart/'),
  addToCart: (data) => api.post('/add-to-cart/', data),
  updateItem: (data) => api.post('/cart/update/', data),
  removeItem: (itemId) => api.delete(`/cart/item/${itemId}/`),
  checkout: () => api.post('/checkout/'),
};



export const orderAPI = {
  getHistory: () => api.get('/order-history/'),  // Changed this
  getOrder: (orderId) => api.get(`/orders/${orderId}/`),
};



export default api;
