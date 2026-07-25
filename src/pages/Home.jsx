import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import OfflineNotice from '../components/OfflineNotice';
import { fetchProducts } from '../api/productApi';
import { fetchLatestReviews, createReview } from '../api/reviewApi';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import { getFallbackProducts } from '../data/fallbackProducts';

const FEATURED_IDS = [8, 13, 26, 18, 4, 16];
const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'MacOS', value: 'macos' },
  { label: 'Windows', value: 'windows' },
  { label: 'Student', value: 'student' },
  { label: 'Gaming', value: 'gaming' },
  { label: 'Ultrabook', value: 'ultrabook' },
  { label: 'Business', value: 'business' }
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        const all = data.data || data;
        const featured = FEATURED_IDS
          .map((id) => all.find((p) => p.id === id))
          .filter(Boolean);
        setProducts(featured.length ? featured : all.slice(0, 6));
      })
      .catch(() => {
        const all = getFallbackProducts();
        const featured = FEATURED_IDS.map((id) => all.find((p) => p.id === id)).filter(Boolean);
        setProducts(featured);
        setUsingFallback(true);
      });
  }, []);

  // Typewriter effect for the hero heading
  useEffect(() => {
    const plain = 'Find Your Perfect ';
    const emphasis = 'Laptop';
    const full = plain + emphasis;
    let index = 0;
    let deleting = false;
    let timeoutId;

    function tick() {
      if (!deleting) {
        index++;
        setTypedText(full.slice(0, index));
        if (index >= full.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1800);
          return;
        }
        timeoutId = setTimeout(tick, 55);
      } else {
        index--;
        setTypedText(full.slice(0, Math.max(index, plain.length - 1)));
        if (index <= plain.length - 1) {
          deleting = false;
          timeoutId = setTimeout(tick, 500);
          return;
        }
        timeoutId = setTimeout(tick, 30);
      }
    }
    timeoutId = setTimeout(tick, 400);
    return () => clearTimeout(timeoutId);
  }, []);

  const visibleProducts = activeFilter === 'all'
    ? products
    : products.filter((p) => (p.categories || []).includes(activeFilter));

  const plainPart = 'Find Your Perfect ';
  const emphasisShown = typedText.slice(plainPart.length);

  return (
    <Layout showFooter>
      {usingFallback && <OfflineNotice />}
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="hero-eyebrow">Premium MacBooks &amp; Laptops</span>
            <h1 className="hero-typewriter">
              <span className="typewriter-text">
                {typedText.slice(0, plainPart.length)}
                {emphasisShown && <em>{emphasisShown}</em>}
              </span>
              <span className="typewriter-cursor">|</span>
            </h1>
            <p>Your trusted store for Original MacBooks and Premium Windows laptops. Find the perfect machine for work, study, or gaming.</p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary">Shop Now</Link>
              <Link to="/about" className="btn btn-outline">Learn More</Link>
            </div>
            <div className="hero-stats">
              <div><strong>500+</strong><span>Happy Customers</span></div>
              <div><strong>4.9 <svg className="stat-star" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.95 6.51L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14l-5-4.87 7.05-.76z"/></svg></strong><span>Average Rating</span></div>
              <div><strong>12+</strong><span>Models In Stock</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-frame">
              <div className="product-visual product-visual--macbook">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="14" width="44" height="28" rx="2.5" fill="#fff" fillOpacity="0.92"/>
                  <rect x="13" y="17" width="38" height="22" rx="1" fill="#0F172A" fillOpacity="0.85"/>
                  <path d="M6 46h52l3 6a2 2 0 0 1-2 3H5a2 2 0 0 1-2-3l3-6z" fill="#fff" fillOpacity="0.92"/>
                  <rect x="27" y="49" width="10" height="1.6" rx="0.8" fill="#0F172A" fillOpacity="0.3"/>
                </svg>
              </div>
              <div className="hero-ring"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Browse</span>
            <h2>Shop by Category</h2>
            <p>From ultra-portable ultrabooks to powerhouse gaming rigs, find exactly what you need.</p>
          </div>
          <div className="cat-grid">
            <Link to="/shop?category=macos" className="cat-card">
              <div className="cat-icon">
                <svg width="28" height="28" viewBox="0 0 384 512" fill="#2563EB"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 37 59 127.6 107.2 126.1 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-83.1 102.6-120.2-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              </div>
              <span>MacOS</span>
            </Link>
            <Link to="/shop?category=windows" className="cat-card">
              <div className="cat-icon">
                <svg width="32" height="32" viewBox="0 0 24 24">
                  <path fill="#2563EB" d="M2 3.5 10.5 2.3v8.1H2z"/>
                  <path fill="#2563EB" d="M11.5 2.15 22 0.7v9.6H11.5z"/>
                  <path fill="#2563EB" d="M2 11.4h8.5v8.1L2 20.5z"/>
                  <path fill="#2563EB" d="M11.5 11.4H22v9.6L11.5 23.3z"/>
                </svg>
              </div>
              <span>Windows</span>
            </Link>
            <Link to="/shop?category=student" className="cat-card">
              <div className="cat-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9.5 12 5l10 4.5-10 4.5-10-4.5z"/><path d="M6 11.7v4.3c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.3"/><path d="M21 9.5v6"/></svg>
              </div>
              <span>Student</span>
            </Link>
            <Link to="/shop?category=gaming" className="cat-card">
              <div className="cat-icon">
                <svg width="34" height="34" viewBox="0 0 24 24">
                  <path fill="#2563EB" d="M7 7h10a5 5 0 0 1 5 5v3a3 3 0 0 1-3 3c-1 0-1.5-.5-2.2-1.3L15.8 15H8.2l-1 1.7C6.5 17.5 6 18 5 18a3 3 0 0 1-3-3v-3a5 5 0 0 1 5-5z"/>
                  <circle cx="16.6" cy="10.3" r="1.1" fill="#fff"/>
                  <circle cx="18.7" cy="12.4" r="1.1" fill="#fff"/>
                  <rect x="6.4" y="9.8" width="1.5" height="4.4" rx="0.6" fill="#fff"/>
                  <rect x="4.8" y="11.3" width="4.4" height="1.5" rx="0.6" fill="#fff"/>
                </svg>
              </div>
              <span>Gaming</span>
            </Link>
            <Link to="/shop?category=ultrabook" className="cat-card">
              <div className="cat-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="12" rx="1.5"/><path d="M2 19.5h20"/></svg>
              </div>
              <span>Ultrabook</span>
            </Link>
            <Link to="/shop?category=business" className="cat-card">
              <div className="cat-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="2" y1="13" x2="22" y2="13"/></svg>
              </div>
              <span>Business</span>
            </Link>
          </div>
        </div>
      </section>

      {/* POPULAR PRODUCTS */}
      <section className="popular-menu">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Collection</span>
            <h2>Popular Products</h2>
            <p>Hand-picked bestsellers, loved by professionals, students, and gamers alike.</p>
          </div>
          <div className="filter-bar">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                className={`filter-btn${activeFilter === f.value ? ' active' : ''}`}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="menu-grid">
            {visibleProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why LaptopHub</span>
            <h2>Shop With Confidence</h2>
          </div>
          <div className="why-grid">
            <div className="why-card"><div className="why-icon">🚚</div><h4>Fast Delivery</h4><p>Nationwide shipping with tracking on every order.</p></div>
            <div className="why-card">
              <div className="why-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3z"/><path d="M9 12l2 2 4-4"/></svg>
              </div>
              <h4>Official Warranty</h4><p>Every laptop is 100% genuine with manufacturer warranty.</p>
            </div>
            <div className="why-card"><div className="why-icon">💳</div><h4>Secure Checkout</h4><p>Pay safely with cards, e-wallets, or cash on delivery.</p></div>
            <div className="why-card">
              <div className="why-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h11a5 5 0 0 1 5 5v1"/><polyline points="8 5 3 10 8 15"/></svg>
              </div>
              <h4>Easy Returns</h4><p>7-day hassle-free returns if it's not the right fit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <ReviewsSlider />
    </Layout>
  );
}

function ReviewsSlider() {
  const staticReviews = [
    { initial: 'J', name: 'John Carter', tag: 'Verified Buyer', stars: 5, text: 'Ordered a MacBook Pro and it arrived in perfect condition, two days early.' },
    { initial: 'A', name: 'Anna Lopez', tag: 'Verified Buyer', stars: 5, text: 'Great prices on gaming laptops, and the support team actually knows their specs.' },
    { initial: 'D', name: 'David Chen', tag: 'Verified Buyer', stars: 5, text: 'Smooth checkout, real warranty card included. Will buy again.' },
    { initial: 'E', name: 'Emma Wilson', tag: 'First-Time Buyer', stars: 5, text: 'My Dell XPS looks and feels brand new — exactly as described.' },
    { initial: 'S', name: 'Sokha Ly', tag: 'Verified Buyer', stars: 5, text: 'Best place to buy a MacBook in the country, hands down.' },
    { initial: 'M', name: 'Michael Tan', tag: 'Verified Buyer', stars: 4, text: 'Fast shipping and the ThinkPad keyboard is even better than I hoped.' }
  ];

  const [reviews, setReviews] = useState(staticReviews);
  const { user } = useAuth();
  const { showToast } = useToast();

  function loadReviews() {
    fetchLatestReviews()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data.map((r) => ({
            initial: r.author_name.charAt(0).toUpperCase(),
            name: r.author_name,
            tag: 'Verified Customer',
            stars: r.rating,
            text: r.comment,
          })));
        }
      })
      .catch(() => {
        // keep the static fallback reviews if the API isn't reachable
      });
  }

  useEffect(loadReviews, []);

  const doubled = [...reviews, ...reviews];

  return (
    <section className="reviews">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Testimonials</span>
          <h2>Trusted By Our Customers</h2>
        </div>
        <div className="review-track-outer">
          <div className="review-track">
            {doubled.map((r, i) => (
              <div className="review-card" key={i} aria-hidden={i >= reviews.length}>
                <div className="review-stars">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</div>
                {r.text && <p>"{r.text}"</p>}
                <div className="review-author">
                  <div className="review-avatar">{r.initial}</div>
                  <div><strong>{r.name}</strong><span>{r.tag}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="review-dots">
          {reviews.map((_, i) => <span key={i} className={i === 0 ? 'active' : ''}></span>)}
        </div>

        <StoreReviewForm currentUserName={user?.name} onSubmitted={() => { loadReviews(); showToast('Thanks for rating LaptopHub!'); }} />
      </div>
    </section>
  );
}

function StoreReviewForm({ currentUserName, onSubmitted }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (rating === 0) {
      setError('Please pick a star rating.');
      return;
    }
    if (!currentUserName && !authorName.trim()) {
      setError('Please enter your name.');
      return;
    }
    setSubmitting(true);
    try {
      await createReview({
        author_name: currentUserName ? undefined : authorName.trim(),
        rating,
        comment: comment.trim() || undefined,
      });
      setRating(0);
      setAuthorName('');
      setComment('');
      onSubmitted();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not submit your rating. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="store-review-form">
      <h3>How was your experience shopping with LaptopHub?</h3>
      <div className="store-review-stars">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={`star-btn${n <= (hoverRating || rating) ? ' active' : ''}`}
            onMouseEnter={() => setHoverRating(n)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(n)}
            aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
          >★</button>
        ))}
      </div>
      {error && <div className="form-error">{error}</div>}
      <div className="store-review-fields">
        {!currentUserName && (
          <input value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Your name" />
        )}
        <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Tell other shoppers about your experience (optional)" />
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit Rating'}
        </button>
      </div>
    </form>
  );
}
