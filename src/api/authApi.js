import axiosClient from './axiosClient';

export function register(data) {
  // data: { name, email, password, password_confirmation }
  return axiosClient.post('/register', data).then((res) => res.data);
}

export function login(data) {
  // data: { email, password }
  return axiosClient.post('/login', data).then((res) => res.data);
}

export function logout() {
  return axiosClient.post('/logout').then((res) => res.data);
}

export function getCurrentUser() {
  return axiosClient.get('/user').then((res) => res.data);
}
