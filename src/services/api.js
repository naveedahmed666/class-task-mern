import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:4000/api',
});

export const BACKEND_URL = 'http://localhost:4000';

// Category APIs
export const fetchCategories = () => API.get('/categories');
export const createCategory = (formData) => API.post('/categories', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateCategory = (id, formData) => API.put(`/categories/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteCategory = (id) => API.delete(`/categories/${id}`);

// Food APIs
export const fetchFoods = () => API.get('/foods');
export const createFood = (formData) => API.post('/foods', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateFood = (id, formData) => API.put(`/foods/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteFood = (id) => API.delete(`/foods/${id}`);

export default API;