import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import Loader from '../../components/Loader';
import { fetchAllOrders, updateOrderStatus } from '../../api/orderApi';
import { money } from '../../utils/formatCurrency';

const STATUSES = ['pending', 'processing', 'shipped', 'completed', 'cancelled'];

export default function Orders() {
  const [orders, setOrders] = useState(null);

  function load() {
    fetchAllOrders().then((data) => setOrders(data.data || data));
  }

  useEffect(load, []);

  async function handleStatusChange(id, status) {
    await updateOrderStatus(id, status);
    load();
  }

  return (
    <AdminLayout title="Orders">
      {!orders ? (
        <Loader label="Loading orders…" />
      ) : (
        <DataTable
          columns={[
            { key: 'order_number', label: 'Order #' },
            { key: 'name', label: 'Customer' },
            { key: 'email', label: 'Email' },
            { key: 'total', label: 'Total', render: (row) => money(row.total) },
            { key: 'payment_method', label: 'Payment' },
            {
              key: 'status', label: 'Status', render: (row) => (
                <select
                  value={row.status}
                  onChange={(e) => handleStatusChange(row.id, e.target.value)}
                  style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--line)' }}
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              )
            },
          ]}
          rows={orders}
          emptyMessage="No orders yet."
        />
      )}
    </AdminLayout>
  );
}
