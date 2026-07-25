import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">404</span>
          <h1>Page Not Found</h1>
          <p>The page you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '24px' }}>Back to Home</Link>
        </div>
      </section>
    </Layout>
  );
}
