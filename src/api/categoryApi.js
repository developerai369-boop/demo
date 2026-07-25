import axiosClient from './axiosClient';

export function fetchCategories() {
  return axiosClient.get('/categories').then((res) => res.data);
}

// ---- Admin only ----

export function createCategory(payload) {
  return axiosClient.post('/admin/categories', payload).then((res) => res.data);
}

export function updateCategory(id, payload) {
  return axiosClient.put(`/admin/categories/${id}`, payload).then((res) => res.data);
}

export function deleteCategory(id) {
  return axiosClient.delete(`/admin/categories/${id}`).then((res) => res.data);
}
