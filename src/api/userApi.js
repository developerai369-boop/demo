import axiosClient from './axiosClient';

export function fetchProfile() {
  return axiosClient.get('/user').then((res) => res.data);
}

// ---- Admin only ----

export function fetchUsers() {
  return axiosClient.get('/admin/users').then((res) => res.data);
}

export function updateUserRole(id, role) {
  return axiosClient.put(`/admin/users/${id}/role`, { role }).then((res) => res.data);
}
