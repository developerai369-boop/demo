import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">Laptop<span>Hub</span></Link>
            <p>Your trusted store for genuine MacBooks and top-brand laptops, backed by real warranty and fast delivery.</p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.459h-1.261c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.91h-2.33V22c4.78-.756 8.438-4.92 8.438-9.94z"/></svg></a>
              <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/></svg></a>
              <a href="#" aria-label="X (Twitter)"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23 22h-6.7l-5.2-6.8L5 22H2l8.1-9.3L1.5 2h6.9l4.7 6.2L18.9 2zM17.6 20h1.8L7.9 4h-2l11.7 16z"/></svg></a>
            </div>
          </div>
          <div>
            <h5>Quick Links</h5>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <h5>Support Hours</h5>
            <div className="footer-links">
              <a href="#">Weekday: 7am – 8pm</a>
              <a href="#">Weekend: 9am – 9pm</a>
            </div>
          </div>
          <div>
            <h5>Contact</h5>
            <div className="footer-links">
              <a href="#">123 Tech Street, Phnom Penh</a>
              <a href="#">+855 123 456 789</a>
              <a href="#">support@laptophub.com</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 LaptopHub. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
