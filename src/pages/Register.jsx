import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register({ ...form, password_confirmation: form.password });
      navigate('/');
    } catch {
      // error already captured in context
    }
  }

  return (
    <Layout minimalNav>
      <section className="page-hero auth-hero">
        <div className="container">
          <span className="eyebrow">Account</span>
          <h1>Create Your Account</h1>
          <p>Sign up to track your orders and save your wishlist.</p>
        </div>
      </section>

      <section className="auth-section">
        <div className="container auth-container">
          <div className="form-card auth-card">
            <div className="auth-tabs">
              <Link to="/login" className="auth-tab" style={{ textAlign: 'center' }}>Log In</Link>
              <button type="button" className="auth-tab active">Sign Up</button>
            </div>

            {error && <div className="form-error" style={{ marginBottom: '12px', textAlign: 'center' }}>{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="reg-name">Full Name</label>
                <input
                  type="text" id="reg-name" placeholder="Your name" required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="reg-email">Email Address</label>
                <input
                  type="email" id="reg-email" placeholder="you@example.com" required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="reg-password">Password</label>
                <input
                  type="password" id="reg-password" placeholder="Create a password" required
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Creating account…' : 'Create Account'}
              </button>
              <p className="auth-switch">Already have an account? <Link to="/login" className="auth-switch-link">Log in</Link></p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
