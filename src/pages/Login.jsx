import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(form);
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
          <h1>Welcome Back</h1>
          <p>Log in to track your orders and wishlist.</p>
        </div>
      </section>

      <section className="auth-section">
        <div className="container auth-container">
          <div className="form-card auth-card">
            <div className="auth-tabs">
              <button type="button" className="auth-tab active">Log In</button>
              <Link to="/register" className="auth-tab" style={{ textDecoration: 'none', textAlign: 'center' }}>Sign Up</Link>
            </div>

            {error && <div className="form-error" style={{ marginBottom: '12px', textAlign: 'center' }}>{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="login-email">Email Address</label>
                <input
                  type="email" id="login-email" placeholder="you@example.com" required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  type="password" id="login-password" placeholder="••••••••" required
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Logging in…' : 'Log In'}
              </button>
              <p className="auth-switch">Don't have an account? <Link to="/register" className="auth-switch-link">Sign up</Link></p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
