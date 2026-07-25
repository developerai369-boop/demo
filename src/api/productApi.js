import axiosClient from './axiosClient';

// ---- Public ----

// params: { category, brand, search, sort, max_price }
export function fetchProducts(params = {}) {
  return axiosClient.get('/products', { params }).then((res) => res.data);
}

export function fetchProduct(id) {
  return axiosClient.get(`/products/${id}`).then((res) => res.data);
}

export function fetchRelatedProducts(id) {
  return axiosClient.get(`/products/${id}/related`).then((res) => res.data);
}

// ---- Admin only (requires an admin Bearer token) ----

export function createProduct(payload) {
  return axiosClient.post('/admin/products', payload).then((res) => res.data);
}

export function updateProduct(id, payload) {
  return axiosClient.put(`/admin/products/${id}`, payload).then((res) => res.data);
}

export function deleteProduct(id) {
  return axiosClient.delete(`/admin/products/${id}`).then((res) => res.data);
}
