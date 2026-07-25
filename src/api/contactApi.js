import axiosClient from './axiosClient';

export function submitContactMessage(payload) {
  return axiosClient.post('/contact', payload).then((res) => res.data);
}

// ---- Admin only ----

export function fetchMessages() {
  return axiosClient.get('/admin/messages').then((res) => res.data);
}

export function markMessageAsRead(id) {
  return axiosClient.put(`/admin/messages/${id}/read`).then((res) => res.data);
}
