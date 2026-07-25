import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { createOrder } from '../api/orderApi';
import { money } from '../utils/productHelpers';

const initialForm = { name: '', phone: '', email: '', address: '', city: '', notes: '', payment: 'cod' };

export default function Checkout() {
  const { cart, subtotal, shipping, total, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const [submitError, setSubmitError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: '' }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'This field is required.';
    if (!form.phone.trim()) next.phone = 'This field is required.';
    else if (!/^[0-9+\-\s()]{8,15}$/.test(form.phone)) next.phone = 'Please enter a valid phone number.';
    if (!form.email.trim()) next.email = 'This field is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please enter a valid email address.';
    if (!form.address.trim()) next.address = 'This field is required.';
    if (!form.city.trim()) next.city = 'This field is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cart.length || !validate()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const payload = {
        items: cart.map((i) => ({ product_id: i.id, quantity: i.qty })),
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
        city: form.city,
        notes: form.notes,
        payment_method: form.payment
      };
      const res = await createOrder(payload);
      setOrderNumber(res.data?.order_number || res.order_number || `LH-${Math.floor(100000 + Math.random() * 900000)}`);
      clearCart();
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Could not place your order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (orderNumber) {
    return (
      <Layout>
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">Almost There</span>
            <h1>Checkout</h1>
          </div>
        </section>
        <section style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="order-confirm">
              <div className="confirm-icon">✓</div>
              <h3>Order Placed!</h3>
              <p>Thank you for your purchase. Your order <strong>#{orderNumber}</strong> has been received and will be processed shortly. A confirmation email is on its way.</p>
              <Link to="/" className="btn btn-primary" style={{ marginTop: '24px' }}>Back to Home</Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Almost There</span>
          <h1>Checkout</h1>
          <p>Review your order and enter your shipping details to complete your purchase.</p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="checkout-layout">
            <div>
              <div className="form-card">
                {submitError && <div className="form-success show" style={{ background: '#fee2e2', color: '#b91c1c' }}>{submitError}</div>}
                <form onSubmit={handleSubmit} noValidate>
                  <h3 style={{ marginBottom: '20px' }}>Shipping Information</h3>
                  <div className="form-row">
                    <div className={`form-group${errors.name ? ' invalid' : ''}`}>
                      <label htmlFor="ch-name">Full Name</label>
                      <input type="text" id="ch-name" name="name" placeholder="e.g. Sokha Chan" value={form.name} onChange={handleChange} />
                      <span className="form-error">{errors.name}</span>
                    </div>
                    <div className={`form-group${errors.phone ? ' invalid' : ''}`}>
                      <label htmlFor="ch-phone">Phone Number</label>
                      <input type="tel" id="ch-phone" name="phone" placeholder="e.g. 012 345 678" value={form.phone} onChange={handleChange} />
                      <span className="form-error">{errors.phone}</span>
                    </div>
                  </div>
                  <div className={`form-group${errors.email ? ' invalid' : ''}`}>
                    <label htmlFor="ch-email">Email Address</label>
                    <input type="email" id="ch-email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
                    <span className="form-error">{errors.email}</span>
                  </div>
                  <div className={`form-group${errors.address ? ' invalid' : ''}`}>
                    <label htmlFor="ch-address">Delivery Address</label>
                    <input type="text" id="ch-address" name="address" placeholder="Street, house number" value={form.address} onChange={handleChange} />
                    <span className="form-error">{errors.address}</span>
                  </div>
                  <div className="form-row">
                    <div className={`form-group${errors.city ? ' invalid' : ''}`}>
                      <label htmlFor="ch-city">City / Province</label>
                      <input type="text" id="ch-city" name="city" placeholder="e.g. Phnom Penh" value={form.city} onChange={handleChange} />
                      <span className="form-error">{errors.city}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="ch-notes">Delivery Notes (optional)</label>
                      <input type="text" id="ch-notes" name="notes" placeholder="Landmark, preferred time..." value={form.notes} onChange={handleChange} />
                      <span className="form-error"></span>
                    </div>
                  </div>

                  <h3 style={{ margin: '26px 0 16px' }}>Payment Method</h3>
                  <div className="payment-options">
                    <label className="payment-option"><input type="radio" name="payment" value="cod" checked={form.payment === 'cod'} onChange={handleChange} /> Cash on Delivery (COD)</label>
                    <label className="payment-option"><input type="radio" name="payment" value="card" checked={form.payment === 'card'} onChange={handleChange} /> Credit / Debit Card</label>
                    <label className="payment-option"><input type="radio" name="payment" value="aba" checked={form.payment === 'aba'} onChange={handleChange} /> ABA PayWay</label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block" disabled={submitting || !cart.length}>
                    {submitting ? 'Placing Order…' : 'Place Order'}
                  </button>
                </form>
              </div>
            </div>

            <div className="checkout-summary">
              <h3>Order Summary</h3>
              {cart.length === 0 ? (
                <div className="checkout-empty">
                  Your cart is empty. <Link to="/shop" style={{ color: 'var(--primary)', fontWeight: 600 }}>Browse the shop →</Link>
                </div>
              ) : (
                <>
                  {cart.map((item) => (
                    <div className="checkout-item" key={item.id}>
                      <span>{item.qty} × {item.name}</span>
                      <span>{money(item.price * item.qty)}</span>
                    </div>
                  ))}
                  <div className="cart-summary-row" style={{ marginTop: '14px' }}><span>Subtotal</span><span>{money(subtotal)}</span></div>
                  <div className="cart-summary-row"><span>Shipping</span><span>{money(shipping)}</span></div>
                  <div className="cart-summary-row total"><span>Total</span><span>{money(total)}</span></div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
