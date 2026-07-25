import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import { fetchMyOrders } from '../api/orderApi';
import { money } from '../utils/formatCurrency';

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyOrders()
      .then((data) => setOrders(data.data || data))
      .catch(() => setError('Could not load your orders. Please try again later.'));
  }, []);

  return (
    <Layout>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Order History</span>
          <h1>My Orders</h1>
          <p>Track the status of your past purchases.</p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          {error && <div className="checkout-empty">{error}</div>}
          {!error && orders === null && <Loader label="Loading your orders…" />}
          {!error && orders && orders.length === 0 && (
            <div className="checkout-empty" style={{ padding: '40px 0', textAlign: 'center' }}>
              You haven't placed any orders yet.
            </div>
          )}
          {!error && orders && orders.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {orders.map((order) => (
                <div className="form-card" key={order.id}>
                  <div className="invoice-row head">
                    <span>Order #{order.order_number}</span>
                    <span className={`badge badge-${order.status}`}>{order.status}</span>
                  </div>
                  <div className="invoice-divider"></div>
                  {order.items.map((item, i) => (
                    <div className="invoice-row" key={i}>
                      <span>{item.quantity} × {item.product_name}</span>
                      <span>{money(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="invoice-divider"></div>
                  <div className="invoice-row head">
                    <span>Total</span>
                    <span>{money(order.total)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
