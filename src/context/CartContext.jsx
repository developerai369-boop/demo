import React, { createContext, useContext, useEffect, useState } from 'react';
import { getStoredCart, saveStoredCart } from '../api/cartApi';

const CartContext = createContext(null);
const SHIPPING_FEE = 15;

export function CartProvider({ children }) {
  const [cart, setCart] = useState(getStoredCart);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    saveStoredCart(cart);
  }, [cart]);

  function addToCart(product, quantity = 1) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + quantity } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: quantity }];
    });
  }

  function updateQty(id, delta) {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = cart.length ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  const value = {
    cart,
    count,
    subtotal,
    shipping,
    total,
    addToCart,
    updateQty,
    removeItem,
    clearCart,
    isDrawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false)
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
