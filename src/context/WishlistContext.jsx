import React, { createContext, useContext, useEffect, useState } from 'react';
import { getStoredWishlist, saveStoredWishlist } from '../api/wishlistApi';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(getStoredWishlist);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    saveStoredWishlist(wishlist);
  }, [wishlist]);

  function isWishlisted(id) {
    return wishlist.some((i) => i.id === id);
  }

  function toggleWishlist(product) {
    setWishlist((prev) => {
      if (prev.some((i) => i.id === product.id)) {
        return prev.filter((i) => i.id !== product.id);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price }];
    });
  }

  function removeItem(id) {
    setWishlist((prev) => prev.filter((i) => i.id !== id));
  }

  const value = {
    wishlist,
    count: wishlist.length,
    isWishlisted,
    toggleWishlist,
    removeItem,
    isDrawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false)
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
