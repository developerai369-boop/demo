import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../hooks/useCart';
import { money } from '../utils/formatCurrency';

export default function Cart() {
  const { cart, subtotal, shipping, total, updateQty, removeItem } = useCart();

  return (
    <Layout>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Your Cart</span>
          <h1>Shopping Cart</h1>
          <p>Review the laptops you've added before heading to checkout.</p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          {cart.length === 0 ? (
            <div className="checkout-empty" style={{ padding: '60px 0', textAlign: 'center' }}>
              Your cart is empty. <Link to="/shop" style={{ color: 'var(--primary)', fontWeight: 600 }}>Browse the shop →</Link>
            </div>
          ) : (
            <div className="checkout-layout">
              <div className="form-card">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id} style={{ padding: '18px 0' }}>
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

              <div className="checkout-summary">
                <h3>Order Summary</h3>
                <div className="cart-summary-row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
                <div className="cart-summary-row"><span>Shipping</span><span>{money(shipping)}</span></div>
                <div className="cart-summary-row total"><span>Total</span><span>{money(total)}</span></div>
                <Link to="/checkout" className="btn btn-primary btn-block" style={{ marginTop: '20px' }}>Proceed to Checkout</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
