// Cart is kept client-side (localStorage) so guests can shop without an account.
// This module is the single place that knows *how* the cart is persisted —
// CartContext just calls these functions. If you later add a `/api/cart`
// endpoint for logged-in users, this is the only file you need to change.

const CART_KEY = 'laptophub_cart_items';

export function getStoredCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveStoredCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
