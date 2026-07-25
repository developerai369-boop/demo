import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import OfflineNotice from '../components/OfflineNotice';
import { fetchProducts } from '../api/productApi';
import { getFallbackProducts } from '../data/fallbackProducts';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'MacOS', value: 'macos' },
  { label: 'Windows', value: 'windows' },
  { label: 'Student', value: 'student' },
  { label: 'Gaming', value: 'gaming' },
  { label: 'Ultrabook', value: 'ultrabook' },
  { label: 'Business', value: 'business' }
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  const initialCategory = searchParams.get('category') || 'all';
  const searchTerm = searchParams.get('search') || '';

  const [topFilter, setTopFilter] = useState(initialCategory);
  const [sidebarCategories, setSidebarCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => setAllProducts(data.data || data))
      .catch(() => {
        setAllProducts(getFallbackProducts());
        setUsingFallback(true);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setTopFilter(initialCategory);
  }, [initialCategory]);

  function toggleSidebarCategory(value) {
    setSidebarCategories((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  const filtered = useMemo(() => {
    let list = allProducts.filter((p) => {
      const categories = p.categories || [];
      const matchesTop = topFilter === 'all' || categories.includes(topFilter);
      const matchesSidebar = sidebarCategories.length === 0 || sidebarCategories.some((c) => categories.includes(c));
      const matchesPrice = p.price <= maxPrice;
      const matchesSearch = !searchTerm || (
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        categories.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      return matchesTop && matchesSidebar && matchesPrice && matchesSearch;
    });

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [allProducts, topFilter, sidebarCategories, maxPrice, sort, searchTerm]);

  return (
    <Layout>
      {usingFallback && <OfflineNotice />}
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Shop</span>
          <h1>All Laptops &amp; MacBooks</h1>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="filter-bar">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={`filter-btn${topFilter === f.value ? ' active' : ''}`}
                onClick={() => setTopFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="shop-layout">
            <aside className="shop-sidebar">
              <div className="sidebar-group">
                <h4>Category</h4>
                <label className="sidebar-option">
                  <input type="checkbox" checked={sidebarCategories.includes('macos')} onChange={() => toggleSidebarCategory('macos')} /> MacOS
                </label>
                <label className="sidebar-option">
                  <input type="checkbox" checked={sidebarCategories.includes('windows')} onChange={() => toggleSidebarCategory('windows')} /> Windows
                </label>
                <label className="sidebar-option">
                  <input type="checkbox" checked={sidebarCategories.includes('student')} onChange={() => toggleSidebarCategory('student')} /> Student
                </label>
                <label className="sidebar-option">
                  <input type="checkbox" checked={sidebarCategories.includes('gaming')} onChange={() => toggleSidebarCategory('gaming')} /> Gaming
                </label>
                <label className="sidebar-option">
                  <input type="checkbox" checked={sidebarCategories.includes('ultrabook')} onChange={() => toggleSidebarCategory('ultrabook')} /> Ultrabook
                </label>
                <label className="sidebar-option">
                  <input type="checkbox" checked={sidebarCategories.includes('business')} onChange={() => toggleSidebarCategory('business')} /> Business
                </label>
              </div>
              <div className="sidebar-group">
                <h4>Price Range</h4>
                <label className="sidebar-option">
                  <input type="radio" name="priceRange" checked={maxPrice === Infinity} onChange={() => setMaxPrice(Infinity)} /> Any Price
                </label>
                <label className="sidebar-option">
                  <input type="radio" name="priceRange" checked={maxPrice === 800} onChange={() => setMaxPrice(800)} /> Under $800
                </label>
                <label className="sidebar-option">
                  <input type="radio" name="priceRange" checked={maxPrice === 1500} onChange={() => setMaxPrice(1500)} /> Under $1,500
                </label>
                <label className="sidebar-option">
                  <input type="radio" name="priceRange" checked={maxPrice === 2500} onChange={() => setMaxPrice(2500)} /> Under $2,500
                </label>
              </div>
            </aside>

            <div>
              <div className="shop-toolbar">
                <span className="shop-count">{filtered.length} product{filtered.length === 1 ? '' : 's'} found</span>
                <div className="shop-sort">
                  <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              <div className="menu-grid">
                {loading ? (
                  <div className="shop-empty">Loading products…</div>
                ) : filtered.length ? (
                  filtered.map((p) => <ProductCard key={p.id} product={p} />)
                ) : (
                  <div className="shop-empty">No products match your filters. Try adjusting them.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
