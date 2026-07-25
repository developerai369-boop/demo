import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import Loader from '../../components/Loader';
import { fetchBrands } from '../../api/brandApi';

export default function Brands() {
  const [brands, setBrands] = useState(null);

  useEffect(() => {
    fetchBrands().then(setBrands);
  }, []);

  return (
    <AdminLayout title="Brands">
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
        Brands are derived automatically from your product catalog — add a
        product with a new brand name on the Products page and it will show
        up here.
      </p>
      {!brands ? (
        <Loader label="Loading brands…" />
      ) : (
        <DataTable
          columns={[
            { key: 'brand', label: 'Brand' },
            { key: 'products_count', label: 'Products' },
          ]}
          rows={brands.map((b, i) => ({ id: i, ...b }))}
          emptyMessage="No brands yet."
        />
      )}
    </AdminLayout>
  );
}
