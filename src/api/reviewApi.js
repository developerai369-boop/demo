import axiosClient from './axiosClient';

// Store reviews are general feedback about shopping with LaptopHub as a
// whole (shown as homepage testimonials) — they are not tied to any one
// product. Per-product star ratings were removed in favor of a simple
// in-stock / out-of-stock indicator on each product.

// ---- Public ----

// Most recent store reviews — powers the homepage testimonials.
export function fetchLatestReviews() {
  return axiosClient.get('/reviews/latest').then((res) => res.data.data || res.data);
}

// payload: { author_name?, rating, comment }
// author_name is only required for guests — logged-in users' names are used automatically.
export function createReview(payload) {
  return axiosClient.post('/reviews', payload).then((res) => res.data.data || res.data);
}

// ---- Admin only (requires an admin Bearer token) ----

export function fetchAllReviews() {
  return axiosClient.get('/admin/reviews').then((res) => res.data.data || res.data);
}

export function deleteReview(id) {
  return axiosClient.delete(`/admin/reviews/${id}`).then((res) => res.data);
}
