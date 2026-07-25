import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { money } from '../utils/productHelpers';

export default function CartDrawer() {
  const { cart, subtotal, shipping, total, updateQty, removeItem, isDrawerOpen, closeDrawer } = useCart();

  return (
    <>
      <div className={`cart-overlay${isDrawerOpen ? ' open' : ''}`} onClick={closeDrawer}></div>
      <div className={`cart-drawer${isDrawerOpen ? ' open' : ''}`}>
        <div className="cart-drawer-header">
          <h3>Your Cart</h3>
          <button className="cart-close" aria-label="Close" onClick={closeDrawer}>×</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-drawer-body">
            <div className="cart-empty">
              <span>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.68 12.39a2 2 0 0 0 2 1.61h8.64a2 2 0 0 0 2-1.61L22 6.5H6"/></svg>
              </span>
              Your cart is empty.<br />Browse the shop to add a laptop!
            </div>
          </div>
        ) : (
          <>
            <div className="cart-drawer-body">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <span>{money(item.price)} each</span>
                  </div>
                  <div className="qty-control">
                    <button className="qty-btn" aria-label="Decrease" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span className="qty-value">{item.qty}</span>
                    <button className="qty-btn" aria-label="Increase" onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                  <button className="remove-link" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="cart-summary-row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
              <div className="cart-summary-row"><span>Shipping</span><span>{money(shipping)}</span></div>
              <div className="cart-summary-row total"><span>Total</span><span>{money(total)}</span></div>
            </div>
            <div className="cart-drawer-footer">
              <Link to="/checkout" className="btn btn-primary btn-block" onClick={closeDrawer}>Proceed to Checkout</Link>
              <Link to="/cart" className="btn btn-outline btn-block" onClick={closeDrawer}>View Full Cart</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
