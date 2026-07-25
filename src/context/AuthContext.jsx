import React, { createContext, useContext, useEffect, useState } from 'react';
import * as authApi from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('laptophub_user')) || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) localStorage.setItem('laptophub_user', JSON.stringify(user));
    else localStorage.removeItem('laptophub_user');
  }, [user]);

  async function login(credentials) {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.login(credentials);
      localStorage.setItem('laptophub_token', data.token);
      setUser(data.user);
      return data.user;
    } catch (err) {
      const message = err.response?.data?.message || 'Invalid email or password.';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }

  async function register(payload) {
    setLoading(true);
    setError(null);
    try {
      const data = await authApi.register(payload);
      localStorage.setItem('laptophub_token', data.token);
      setUser(data.user);
      return data.user;
    } catch (err) {
      const message = err.response?.data?.message || 'Could not create your account.';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await authApi.logout();
    } catch {
      // ignore network errors on logout, clear local state regardless
    }
    localStorage.removeItem('laptophub_token');
    setUser(null);
  }

  const value = { user, loading, error, login, register, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
