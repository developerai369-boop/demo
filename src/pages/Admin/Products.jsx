import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import DataTable from '../../components/admin/DataTable';
import Loader from '../../components/Loader';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../api/productApi';
import { fetchCategories } from '../../api/categoryApi';
import { money } from '../../utils/formatCurrency';

const emptyForm = {
  category_ids: [], name: '', brand: '', price: '', cpu: '', ram: '',
  storage: '', screen: '', description: '', image: '', tag: '', rating: 5, reviews: 0, stock: 20,
};

export default function Products() {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function loadProducts() {
    fetchProducts().then((data) => setProducts(data.data || data));
  }

  useEffect(() => {
    loadProducts();
    fetchCategories().then(setCategories);
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function toggleCategory(id) {
    setForm((f) => ({
      ...f,
      category_ids: f.category_ids.includes(id)
        ? f.category_ids.filter((c) => c !== id)
        : [...f.category_ids, id],
    }));
  }

  function startEdit(product) {
    setEditingId(product.id);
    const ids = categories.filter((c) => product.categories.includes(c.slug)).map((c) => c.id);
    setForm({
      category_ids: ids,
      name: product.name,
      brand: product.brand,
      price: product.price,
      cpu: product.specs.cpu,
      ram: product.specs.ram,
      storage: product.specs.storage,
      screen: product.specs.screen,
      description: product.desc,
      image: product.image || '',
      tag: product.tag || '',
      rating: product.rating,
      reviews: product.reviews,
      stock: product.stock,
    });
    setShowForm(true);
  }

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editingId) {
        await updateProduct(editingId, form);
      } else {
        await createProduct(form);
      }
      setShowForm(false);
      loadProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save the product.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this product? This cannot be undone.')) return;
    await deleteProduct(id);
    loadProducts();
  }

  return (
    <AdminLayout title="Products">
      <div className="admin-toolbar">
        <span className="shop-count">{products ? `${products.length} products` : ''}</span>
        <button className="btn btn-primary" onClick={startCreate}>+ Add Product</button>
      </div>

      {showForm && (
        <div className="form-card" style={{ marginBottom: '24px' }}>
          {error && <div className="form-error" style={{ marginBottom: '12px' }}>{error}</div>}
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>Categories (a product can belong to more than one)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', paddingTop: '4px' }}>
                {categories.map((c) => (
                  <label key={c.id} className="sidebar-option" style={{ padding: 0 }}>
                    <input
                      type="checkbox"
                      checked={form.category_ids.includes(c.id)}
                      onChange={() => toggleCategory(c.id)}
                    /> {c.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Brand</label>
                <input name="brand" value={form.brand} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Product Name</label>
                <input name="name" value={form.name} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Price ($)</label>
                <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Stock (units available)</label>
                <input type="number" min="0" step="1" name="stock" value={form.stock} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Tag (optional)</label>
                <input name="tag" value={form.tag} onChange={handleChange} placeholder="Bestseller, New..." />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>CPU</label><input name="cpu" value={form.cpu} onChange={handleChange} required /></div>
              <div className="form-group"><label>RAM</label><input name="ram" value={form.ram} onChange={handleChange} required /></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label>Storage</label><input name="storage" value={form.storage} onChange={handleChange} required /></div>
              <div className="form-group"><label>Screen</label><input name="screen" value={form.screen} onChange={handleChange} required /></div>
            </div>
            <div className="form-group">
              <label>Image filename (in /public/images/products/)</label>
              <input name="image" value={form.image} onChange={handleChange} placeholder="my-laptop.jpg" />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" rows="3" value={form.description} onChange={handleChange} required></textarea>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" className="btn btn-primary" disabled={saving || form.category_ids.length === 0}>{saving ? 'Saving…' : 'Save Product'}</button>
              <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {!products ? (
        <Loader label="Loading products…" />
      ) : (
        <DataTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'brand', label: 'Brand' },
            { key: 'categories', label: 'Categories', render: (row) => row.categories.join(', ') },
            { key: 'price', label: 'Price', render: (row) => money(row.price) },
            {
              key: 'stock', label: 'Stock', render: (row) => (
                <span className={`badge ${row.stock > 0 ? 'badge-completed' : 'badge-cancelled'}`}>
                  {row.stock > 0 ? `${row.stock} in stock` : 'Out of stock'}
                </span>
              )
            },
            {
              key: 'actions', label: '', render: (row) => (
                <>
                  <button className="btn btn-outline btn-sm btn-edit" onClick={() => startEdit(row)}>Edit</button>
                  <button className="btn btn-outline btn-sm btn-delete" onClick={() => handleDelete(row.id)}>Delete</button>
                </>
              )
            },
          ]}
          rows={products}
          emptyMessage="No products yet."
        />
      )}
    </AdminLayout>
  );
}
