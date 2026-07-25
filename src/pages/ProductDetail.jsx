import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import OfflineNotice from '../components/OfflineNotice';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { fetchProduct } from '../api/productApi';
import { getFallbackProduct } from '../data/fallbackProducts';
import { money, getVisualClass, getProductImageUrl, LAPTOP_ICON_SVG } from '../utils/productHelpers';
import noImage from '../assets/no-image.png';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    setProduct(null);
    setNotFound(false);
    setQty(1);
    fetchProduct(id)
      .then((data) => setProduct(data.data || data))
      .catch(() => {
        const fallback = getFallbackProduct(id);
        if (fallback) {
          setProduct(fallback);
          setUsingFallback(true);
        } else {
          setNotFound(true);
        }
      });
  }, [id]);

  useEffect(() => {
    if (product) document.title = `${product.name} - LaptopHub`;
  }, [product]);

  if (notFound) {
    return (
      <Layout>
        <section style={{ paddingTop: '50px' }}>
          <div className="container">
            ⚠️ Couldn't load this product. Make sure the Laravel API is running and
            reachable at the URL set in <code>VITE_API_URL</code>.
          </div>
        </section>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <section style={{ paddingTop: '50px' }}>
          <div className="container">Loading product…</div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {usingFallback && <OfflineNotice />}
      <section style={{ paddingTop: '50px' }}>
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.name}
          </div>
          <div className="pd-layout">
            <div className="pd-image">
              {getProductImageUrl(product.image) ? (
                <img
                  className="product-photo"
                  src={getProductImageUrl(product.image)}
                  alt={product.name}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = noImage; }}
                />
              ) : (
                <div
                  className={`product-visual ${getVisualClass(product.categories)}`}
                  dangerouslySetInnerHTML={{ __html: LAPTOP_ICON_SVG }}
                />
              )}
            </div>
            <div className="pd-info">
              <div className="pd-brand">{product.brand}</div>
              <h1 className="pd-title">{product.name}</h1>
              <div className="pd-price">{money(product.price)}</div>
              <p className="pd-desc">{product.desc}</p>
              <div className="pd-specs">
                <div className="pd-spec-row"><span>Processor</span><span>{product.specs.cpu}</span></div>
                <div className="pd-spec-row"><span>Memory</span><span>{product.specs.ram}</span></div>
                <div className="pd-spec-row"><span>Storage</span><span>{product.specs.storage}</span></div>
                <div className="pd-spec-row"><span>Display</span><span>{product.specs.screen}</span></div>
              </div>
              <div className="pd-actions">
                <div className="pd-qty">
                  <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease" disabled={product.stock <= 0}>−</button>
                  <span>{qty}</span>
                  <button type="button" onClick={() => setQty((q) => Math.min(product.stock || 1, q + 1))} aria-label="Increase" disabled={product.stock <= 0}>+</button>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  disabled={product.stock <= 0}
                  onClick={() => {
                    addToCart(product, qty);
                    showToast(`${product.name} (${qty}) added to your cart!`);
                  }}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
              {product.stock > 0 ? (
                <div className="pd-stock">
                  ✓ In stock ({product.stock} available) — ships within 1–2 business days
                </div>
              ) : (
                <div className="pd-stock pd-stock--out">✕ Out of stock</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
