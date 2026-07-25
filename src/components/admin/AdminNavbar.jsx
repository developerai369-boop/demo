import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AdminNavbar({ title = 'Dashboard' }) {
  const { user, logout } = useAuth();

  return (
    <div className="admin-navbar">
      <h1>{title}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          {user?.name} <span className="badge badge-admin">admin</span>
        </span>
        <Link to="/" className="btn btn-outline btn-sm">View Store</Link>
        <button className="btn btn-outline btn-sm" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
