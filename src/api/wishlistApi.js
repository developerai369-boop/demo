// Same idea as cartApi.js — wishlist persistence is isolated here so
// WishlistContext doesn't need to know it's currently backed by localStorage.

const WISHLIST_KEY = 'laptophub_wishlist_items';

export function getStoredWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveStoredWishlist(wishlist) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}
