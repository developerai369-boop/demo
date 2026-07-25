import axiosClient from './axiosClient';

// payload: { items: [{ product_id, quantity }], name, email, phone, address, city, notes, payment_method }
export function createOrder(payload) {
  return axiosClient.post('/orders', payload).then((res) => res.data);
}

export function fetchMyOrders() {
  return axiosClient.get('/orders').then((res) => res.data);
}

// ---- Admin only ----

export function fetchAllOrders() {
  return axiosClient.get('/admin/orders').then((res) => res.data);
}

export function updateOrderStatus(id, status) {
  return axiosClient.put(`/admin/orders/${id}/status`, { status }).then((res) => res.data);
}
