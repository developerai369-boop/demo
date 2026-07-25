import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from './Loader';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <Loader label="Checking your session…" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return (
      <div className="access-denied">
        <span className="eyebrow">403</span>
        <h1>Admin Access Only</h1>
        <p>You don't have permission to view this page.</p>
      </div>
    );
  }

  return children;
}
