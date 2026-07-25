import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { fetchMessages } from '../../api/contactApi';

const icon = {
  dashboard: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="20" x2="4" y2="12"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="20" y1="20" x2="20" y2="14"/></svg>,
  products: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="1.5"/><line x1="8" y1="20" x2="16" y2="20"/></svg>,
  categories: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  brands: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41 12 22l-9-9 8.59-8.59A2 2 0 0 1 13 4h6a2 2 0 0 1 2 2v6a2 2 0 0 1-.41 1.41z"/><circle cx="15.5" cy="8.5" r="1.5"/></svg>,
  orders: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 7.5 12 3 3.5 7.5 12 12l8.5-4.5z"/><path d="M3.5 7.5v9L12 21l8.5-4.5v-9"/><line x1="12" y1="12" x2="12" y2="21"/></svg>,
  users: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17.5" cy="9" r="2.5"/><path d="M15 20a4.5 4.5 0 0 1 6.5-4"/></svg>,
  messages: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><path d="m3.5 6.5 8.5 6 8.5-6"/></svg>,
  reviews: <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15 8.5 22 9.5 17 14.5 18.2 21.5 12 18 5.8 21.5 7 14.5 2 9.5 9 8.5 12 2"/></svg>,
};

export default function AdminSidebar() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchMessages()
      .then((messages) => setUnreadCount(messages.filter((m) => !m.is_read).length))
      .catch(() => {});
  }, []);

  return (
    <aside className="admin-sidebar">
      <Link to="/" className="logo">Laptop<span>Hub</span></Link>
      <nav className="admin-nav">
        <NavLink to="/admin" end>{icon.dashboard} Dashboard</NavLink>
        <NavLink to="/admin/products">{icon.products} Products</NavLink>
        <NavLink to="/admin/categories">{icon.categories} Categories</NavLink>
        <NavLink to="/admin/brands">{icon.brands} Brands</NavLink>
        <NavLink to="/admin/orders">{icon.orders} Orders</NavLink>
        <NavLink to="/admin/messages" style={{ justifyContent: 'space-between' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>{icon.messages} Messages</span>
          {unreadCount > 0 && <span className="badge badge-pending" style={{ marginLeft: '8px' }}>{unreadCount}</span>}
        </NavLink>
        <NavLink to="/admin/reviews">{icon.reviews} Reviews</NavLink>
        <NavLink to="/admin/users">{icon.users} Users</NavLink>
      </nav>
    </aside>
  );
}
