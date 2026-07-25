import React from 'react';

export default function OfflineNotice() {
  return (
    <div
      style={{
        background: '#fef3c7',
        color: '#92400e',
        fontSize: '13.5px',
        textAlign: 'center',
        padding: '10px 16px',
      }}
    >
      ⚠️ Showing local demo data — couldn't reach the Laravel API. Start your backend
      (<code>php artisan serve</code>) and check <code>VITE_API_URL</code> to see live data.
    </div>
  );
}
