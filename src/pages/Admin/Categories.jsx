import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import Loader from '../../components/Loader';
import { fetchCategories } from '../../api/categoryApi';

export default function Categories() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  return (
    <AdminLayout title="Categories">
      {!categories ? (
        <Loader label="Loading categories…" />
      ) : (
        <DataTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'slug', label: 'Slug' },
            { key: 'products_count', label: 'Products' },
          ]}
          rows={categories}
          emptyMessage="No categories yet."
        />
      )}
    </AdminLayout>
  );
}
