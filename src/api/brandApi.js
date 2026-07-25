import axiosClient from './axiosClient';

export function fetchBrands() {
  return axiosClient.get('/brands').then((res) => res.data);
}
