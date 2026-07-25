import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ minimal = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { count: cartCount, openDrawer: openCart } = useCart();
  const { count: wishlistCount, openDrawer: openWishlist } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
  }

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-top">
        <div className="navbar-inner">
          <Link to="/" className="logo">Laptop<span>Hub</span></Link>
          <div className="nav-actions">
            <button className="wishlist-btn-nav" aria-label="View wishlist" onClick={openWishlist}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
              <span className="cart-badge">{wishlistCount}</span>
            </button>
            <button className="cart-btn" aria-label="View cart" onClick={openCart}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.68 12.39a2 2 0 0 0 2 1.61h8.64a2 2 0 0 0 2-1.61L22 6.5H6"/></svg>
              <span className="cart-badge">{cartCount}</span>
            </button>
            {minimal ? (
              <Link to="/" className="btn btn-primary">Back Home</Link>
            ) : isAuthenticated ? (
              <div className="nav-dropdown" style={{ position: 'relative' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setAccountOpen((v) => !v)}
                  onBlur={() => setTimeout(() => setAccountOpen(false), 150)}
                >
                  {user?.name?.split(' ')[0] || 'Account'}
                </button>
                {accountOpen && (
                  <div className="nav-dropdown-menu" style={{ opacity: 1, visibility: 'visible', transform: 'none', right: 0, left: 'auto' }}>
                    <Link to="/orders">My Orders</Link>
                    {user?.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
                    <button type="button" onClick={logout} style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '10px 12px', borderRadius: '8px', font: 'inherit', cursor: 'pointer' }}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">Log In</Link>
            )}
            <button className="hamburger" aria-label="Menu" onClick={() => setMobileOpen((v) => !v)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </div>

      {!minimal && (
        <div className="navbar-links-row">
          <nav className={`nav-links${mobileOpen ? ' mobile-open' : ''}`}>
            <div className="nav-links-group">
              <div className={`nav-dropdown${categoriesOpen ? ' open' : ''}`}>
                <button
                  type="button"
                  className="nav-dropdown-toggle"
                  onClick={() => setCategoriesOpen((v) => !v)}
                  onBlur={() => setTimeout(() => setCategoriesOpen(false), 150)}
                >
                  Categories
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                <div className="nav-dropdown-menu">
                  <Link to="/shop?category=macos" onClick={() => setCategoriesOpen(false)}>MacOS</Link>
                  <Link to="/shop?category=windows" onClick={() => setCategoriesOpen(false)}>Windows</Link>
                  <Link to="/shop?category=student" onClick={() => setCategoriesOpen(false)}>Student</Link>
                  <Link to="/shop?category=gaming" onClick={() => setCategoriesOpen(false)}>Gaming</Link>
                  <Link to="/shop?category=ultrabook" onClick={() => setCategoriesOpen(false)}>Ultrabook</Link>
                  <Link to="/shop?category=business" onClick={() => setCategoriesOpen(false)}>Business</Link>
                </div>
              </div>
              <NavLink to="/" end onClick={() => setMobileOpen(false)}>Home</NavLink>
              <NavLink to="/shop" onClick={() => setMobileOpen(false)}>Shop</NavLink>
              <NavLink to="/about" onClick={() => setMobileOpen(false)}>About</NavLink>
              <NavLink to="/contact" onClick={() => setMobileOpen(false)}>Contact</NavLink>
            </div>
            <form className="nav-search" onSubmit={handleSearch} role="search">
              <input
                type="search"
                className="nav-search-input"
                placeholder="Search laptops, brands, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="nav-search-btn" aria-label="Search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
            </form>
          </nav>
        </div>
      )}
    </header>
  );
}
