import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { money, getVisualClass, getProductImageUrl, LAPTOP_ICON_SVG } from '../utils/productHelpers';
import noImage from '../assets/no-image.png';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [justAdded, setJustAdded] = React.useState(false);

  function handleAddToCart() {
    addToCart(product, 1);
    showToast(`${product.name} added to your cart!`);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1000);
  }

  return (
    <div className="menu-card" data-category={(product.categories || []).join(' ')} data-brand={product.brand}>
      <div className="menu-img">
        {product.stock <= 0 ? (
          <span className="menu-tag menu-tag--out">Out of Stock</span>
        ) : product.tag && (
          <span className={`menu-tag${product.tag === 'New' ? ' tag-new' : ''}`}>{product.tag}</span>
        )}
        <button
          type="button"
          className={`wishlist-btn${isWishlisted(product.id) ? ' active' : ''}`}
          aria-label="Save to wishlist"
          onClick={() => toggleWishlist(product)}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
        </button>
        {getProductImageUrl(product.image) ? (
          <img
            className="product-photo"
            src={getProductImageUrl(product.image)}
            alt={product.name}
            loading="lazy"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = noImage; }}
          />
        ) : (
          <div
            className={`product-visual ${getVisualClass(product.categories)}`}
            dangerouslySetInnerHTML={{ __html: LAPTOP_ICON_SVG }}
          />
        )}
      </div>
      <div className="menu-body">
        <div className="menu-brand">{product.brand}</div>
        <div className="menu-body-top">
          <h4><Link to={`/product/${product.id}`}>{product.name}</Link></h4>
          <span className="menu-price">{money(product.price)}</span>
        </div>
        <div className="menu-specs">{product.specs.cpu} &middot; {product.specs.ram}</div>
        <div className="menu-stock">
          {product.stock > 0 ? (
            <span className="stock-pill stock-pill--in">✓ In Stock</span>
          ) : (
            <span className="stock-pill stock-pill--out">Out of Stock</span>
          )}
        </div>
        <div className="menu-card-actions">
          <button type="button" className="btn btn-primary" onClick={handleAddToCart} disabled={justAdded || product.stock <= 0}>
            {product.stock <= 0 ? 'Out of Stock' : justAdded ? 'Added ✓' : 'Add to Cart'}
          </button>
          <Link to={`/product/${product.id}`} className="btn btn-outline">Details</Link>
        </div>
      </div>
    </div>
  );
}
