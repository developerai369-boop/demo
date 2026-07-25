import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Loader from '../../components/Loader';
import { fetchMessages, markMessageAsRead } from '../../api/contactApi';

export default function Messages() {
  const [messages, setMessages] = useState(null);

  function load() {
    fetchMessages().then(setMessages);
  }

  useEffect(load, []);

  async function handleMarkRead(id) {
    await markMessageAsRead(id);
    load();
  }

  const unreadCount = messages ? messages.filter((m) => !m.is_read).length : 0;

  return (
    <AdminLayout title="Messages">
      {!messages ? (
        <Loader label="Loading messages…" />
      ) : messages.length === 0 ? (
        <div className="data-table-wrap">
          <div className="data-table-empty">No messages yet.</div>
        </div>
      ) : (
        <>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
            {unreadCount > 0 ? `${unreadCount} unread message${unreadCount === 1 ? '' : 's'}` : 'All caught up — no unread messages.'}
          </p>
          <div className="message-list">
            {messages.map((m) => (
              <div key={m.id} className={`message-card${m.is_read ? '' : ' message-card--unread'}`}>
                <div className="message-avatar">{m.name.charAt(0).toUpperCase()}</div>
                <div className="message-body">
                  <div className="message-head">
                    <div>
                      <strong>{m.name}</strong>
                      <div className="message-email">{m.email}</div>
                    </div>
                    <div className="message-meta">
                      {!m.is_read && <span className="badge badge-pending">New</span>}
                      <span className="message-date">{new Date(m.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="message-text">{m.message}</p>
                  {!m.is_read && (
                    <button className="btn btn-outline btn-sm" onClick={() => handleMarkRead(m.id)}>
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </AdminLayout>
  );
}
