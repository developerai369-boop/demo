import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import Loader from '../../components/Loader';
import axiosClient from '../../api/axiosClient';
import { money } from '../../utils/formatCurrency';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axiosClient.get('/admin/dashboard').then((res) => setStats(res.data));
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {!stats ? (
        <Loader label="Loading dashboard…" />
      ) : (
        <>
          <div className="admin-stats-grid">
            <div className="admin-stat-card"><strong>{stats.products_count}</strong><span>Total Products</span></div>
            <div className="admin-stat-card"><strong>{stats.orders_count}</strong><span>Total Orders</span></div>
            <div className="admin-stat-card"><strong>{stats.users_count}</strong><span>Registered Users</span></div>
            <div className="admin-stat-card"><strong>{money(stats.revenue_total)}</strong><span>Total Revenue</span></div>
          </div>

          <h3 style={{ marginBottom: '16px' }}>Recent Orders</h3>
          <DataTable
            columns={[
              { key: 'order_number', label: 'Order #' },
              { key: 'name', label: 'Customer' },
              { key: 'total', label: 'Total', render: (row) => money(row.total) },
              { key: 'status', label: 'Status', render: (row) => <span className={`badge badge-${row.status}`}>{row.status}</span> },
            ]}
            rows={stats.recent_orders}
            emptyMessage="No orders yet."
          />
        </>
      )}
    </AdminLayout>
  );
}
