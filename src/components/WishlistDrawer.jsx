import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { money } from '../utils/productHelpers';

export default function WishlistDrawer() {
  const { wishlist, removeItem, isDrawerOpen, closeDrawer } = useWishlist();
  const { addToCart } = useCart();

  return (
    <>
      <div className={`cart-overlay${isDrawerOpen ? ' open' : ''}`} onClick={closeDrawer}></div>
      <div className={`cart-drawer${isDrawerOpen ? ' open' : ''}`}>
        <div className="cart-drawer-header">
          <h3>Your Wishlist</h3>
          <button className="cart-close" aria-label="Close" onClick={closeDrawer}>×</button>
        </div>

        {wishlist.length === 0 ? (
          <div className="cart-drawer-body">
            <div className="cart-empty">
              <span>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
              </span>
              Your wishlist is empty.<br />Tap the heart on a product to save it here!
            </div>
          </div>
        ) : (
          <div className="cart-drawer-body">
            {wishlist.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <span>{money(item.price)}</span>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => addToCart(item, 1)}>Add to Cart</button>
                <button className="remove-link" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
