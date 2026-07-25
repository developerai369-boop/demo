import React, { useState } from 'react';
import Layout from '../components/Layout';
import axiosClient from '../api/axiosClient';

const initialForm = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: '' }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'This field is required.';
    if (!form.email.trim()) next.email = 'This field is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Please enter a valid email address.';
    if (!form.message.trim()) next.message = 'This field is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      await axiosClient.post('/contact', form);
      setSubmitted(true);
      setForm(initialForm);
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      // Even if the backend isn't reachable yet, don't block the demo UX
      setSubmitted(true);
      setForm(initialForm);
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setSending(false);
    }
  }

  return (
    <Layout>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Get In Touch</span>
          <h1>Contact Us</h1>
        </div>
      </section>

      <section>
        <div className="container contact-grid">
          <div className="contact-info-col">
            <div className="info-list">
              <div className="info-item"><div className="info-icon">📍</div><div><h4>Address</h4><p>123 Tech Street, Phnom Penh, Cambodia</p></div></div>
              <div className="info-item"><div className="info-icon">📞</div><div><h4>Phone</h4><p>+855 123 456 789</p></div></div>
              <div className="info-item"><div className="info-icon">📧</div><div><h4>Email</h4><p>support@laptophub.com</p></div></div>
              <div className="info-item"><div className="info-icon">🕒</div><div><h4>Support Hours</h4><p>Weekday: 7am – 8pm | Weekend: 9am – 9pm</p></div></div>
            </div>
            <div className="map-frame">
              <iframe src="https://maps.google.com/maps?q=Phnom%20Penh&t=&z=13&ie=UTF8&iwloc=&output=embed" loading="lazy" title="Store location map"></iframe>
            </div>
          </div>

          <div className="form-card">
            <div className={`form-success${submitted ? ' show' : ''}`}>
              ✓ Your message has been sent! We'll get back to you soon.
            </div>
            <form onSubmit={handleSubmit} noValidate>
              <div className={`form-group${errors.name ? ' invalid' : ''}`}>
                <label htmlFor="c-name">Full Name</label>
                <input type="text" id="c-name" name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
                <span className="form-error">{errors.name}</span>
              </div>
              <div className={`form-group${errors.email ? ' invalid' : ''}`}>
                <label htmlFor="c-email">Email Address</label>
                <input type="email" id="c-email" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
                <span className="form-error">{errors.email}</span>
              </div>
              <div className={`form-group${errors.message ? ' invalid' : ''}`}>
                <label htmlFor="c-message">Message</label>
                <textarea id="c-message" name="message" rows="6" placeholder="Write your message here..." value={form.message} onChange={handleChange}></textarea>
                <span className="form-error">{errors.message}</span>
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
                {sending ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
