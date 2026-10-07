import { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { categoriesData } from '../data/pakizaData';
import pakizaRoyalGoldLogo from '../assets/pakiza-royal-gold-logo.png';
import FloatingChatAndScroll from '../components/FloatingChatAndScroll';
import { toast } from '../utils/toast';
import './collection.css';

const SWATCH_COLORS = [
  { name: 'Beige', hex: '#d9cbbe' },
  { name: 'Ivory', hex: '#fffff0' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'Grey', hex: '#9e9e9e' },
  { name: 'Blue', hex: '#1d4ed8' },
  { name: 'Navy', hex: '#0f172a' },
  { name: 'Green', hex: '#15803d' },
  { name: 'Red', hex: '#dc2626' },
  { name: 'Pink', hex: '#f472b6' },
  { name: 'Orange', hex: '#ea580c' },
  { name: 'Yellow', hex: '#eab308' },
  { name: 'Brown', hex: '#78350f' },
  { name: 'Teal', hex: '#0d9488' },
  { name: 'Gold', hex: '#d97706' },
];

export default function CollectionPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products, categories, getCategoryProductCount } = useProducts();
  const { user, logout } = useAuth();

  // ── States ────────────────────────────────────────────────────────────────
  const [selectedCatSlug, setSelectedCatSlug] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(true);
  const [outOfStockOnly, setOutOfStockOnly] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(149999);
  const [priceSlider, setPriceSlider] = useState(149999);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedShapes, setSelectedShapes] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState({});
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [openFooterAccordions, setOpenFooterAccordions] = useState({
    quickLinks: false,
    policies: false,
    newsletter: false
  });

  const toggleFooterAccordion = (key) => {
    setOpenFooterAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Accordion open/close states for Sidebar
  const [accordions, setAccordions] = useState({
    categories: true,
    availability: true,
    price: true,
    color: true,
    material: true,
    shape: true,
  });

  const toggleAccordion = (key) => {
    setAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Sync category slug from URL
  useEffect(() => {
    if (!slug || slug === 'all') {
      setSelectedCatSlug('all');
    } else {
      const matched = categories.find(c =>
        c.slug === slug ||
        slug.startsWith(c.slug) ||
        c.slug.startsWith(slug) ||
        c.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
      );
      if (matched) {
        setSelectedCatSlug(matched.slug);
      } else {
        setSelectedCatSlug(slug);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug, categories]);

  // Current category details
  const currentCategory = useMemo(() => {
    if (selectedCatSlug === 'all') return null;
    return categories.find(c =>
      c.slug === selectedCatSlug ||
      selectedCatSlug.startsWith(c.slug) ||
      c.name.toLowerCase().replace(/\s+/g, '-') === selectedCatSlug.toLowerCase()
    );
  }, [selectedCatSlug, categories]);

  // Handle Category selection change
  const handleSelectCategory = (catSlug) => {
    setSelectedCatSlug(catSlug);
    navigate(`/collections/${catSlug}`);
  };

  // Toggle color filter
  const toggleColor = (colorName) => {
    setSelectedColors(prev =>
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

  // Toggle material filter
  const toggleMaterial = (mat) => {
    setSelectedMaterials(prev =>
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
  };

  // Toggle shape filter
  const toggleShape = (sh) => {
    setSelectedShapes(prev =>
      prev.includes(sh) ? prev.filter(s => s !== sh) : [...prev, sh]
    );
  };

  // Clear all active filters
  const handleClearAll = () => {
    setSelectedColors([]);
    setSelectedMaterials([]);
    setSelectedShapes([]);
    setMinPrice(0);
    setMaxPrice(149999);
    setPriceSlider(149999);
    setInStockOnly(false);
    setOutOfStockOnly(false);
  };

  const hasActiveFilters = selectedColors.length > 0 || selectedMaterials.length > 0 || selectedShapes.length > 0 || minPrice > 0 || maxPrice < 149999 || outOfStockOnly;

  // ── Filtered & Sorted Products ────────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let list = products.filter(p => p.status !== 'draft');

    // 0. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        (p.title || p.name || '').toLowerCase().includes(q) ||
        (p.sku || '').toLowerCase().includes(q) ||
        (p.tags || []).join(' ').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
      );
    }

    // 1. Category Filter
    if (selectedCatSlug !== 'all') {
      list = list.filter(p => {
        if (currentCategory) {
          return p.categoryId === currentCategory.id || (p.category && p.category.toLowerCase() === currentCategory.name.toLowerCase());
        }
        return p.categoryId === selectedCatSlug || (p.category && p.category.toLowerCase().includes(selectedCatSlug.toLowerCase()));
      });
    }

    // 2. Availability Filter
    if (inStockOnly && !outOfStockOnly) {
      list = list.filter(p => p.inStock !== false && (p.stockQty === undefined || p.stockQty > 0));
    } else if (outOfStockOnly && !inStockOnly) {
      list = list.filter(p => p.inStock === false || p.stockQty === 0);
    }

    // 3. Price Filter
    list = list.filter(p => {
      const pr = p.price || 0;
      return pr >= minPrice && pr <= Math.min(maxPrice, priceSlider);
    });

    // 4. Color Filter
    if (selectedColors.length > 0) {
      list = list.filter(p => {
        const prodColors = p.colors || [];
        return selectedColors.some(sc =>
          prodColors.some(c => c.toLowerCase().includes(sc.toLowerCase())) ||
          (p.title || '').toLowerCase().includes(sc.toLowerCase())
        );
      });
    }

    // 5. Material Filter
    if (selectedMaterials.length > 0) {
      list = list.filter(p => selectedMaterials.includes(p.material || 'Wool'));
    }

    // 6. Shape Filter
    if (selectedShapes.length > 0) {
      list = list.filter(p => selectedShapes.includes(p.shape || 'Rectangle'));
    }

    // 7. Sort
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-desc':
        list.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'rating':
      case 'best-seller':
        list.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default: // Featured
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  }, [products, searchQuery, selectedCatSlug, currentCategory, inStockOnly, outOfStockOnly, minPrice, maxPrice, priceSlider, selectedColors, selectedMaterials, selectedShapes, sortBy]);

  // ── Wishlist Toggle ───────────────────────────────────────────────────────
  const toggleWishlist = (id, e) => {
    e?.stopPropagation();
    setWishlist(prev => {
      const next = { ...prev, [id]: !prev[id] };
      toast(next[id] ? '✦ Added to your wishlist' : 'Removed from wishlist', 'success');
      return next;
    });
  };

  // ── Add to Cart ───────────────────────────────────────────────────────────
  const handleAddToCart = (product, e) => {
    e?.stopPropagation();
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    toast(`✦ Added "${product.title || product.name}" to cart!`, 'success');
    setIsDrawerOpen(true);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const cartTotal = cart.reduce((acc, item) => acc + ((item.price || 0) * (item.qty || 1)), 0);
  const cartItemCount = cart.reduce((acc, item) => acc + (item.qty || 1), 0);

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    const lines = cart.map(i => `- ${i.title || i.name} (Qty: ${i.qty || 1}) - Rs. ${(i.price || 0).toLocaleString('en-IN')}`);
    const msg = `Hello Pakiza Rugs,\n\nI would like to order the following bespoke rugs:\n\n${lines.join('\n')}\n\n*Total Amount: Rs. ${cartTotal.toLocaleString('en-IN')}.00*\n\nPlease confirm order and delivery timeline.`;
    window.open(`https://wa.me/917007626680?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <>
      {/* ── Top Announcement Bar ────────────────────────────── */}
      <div className="top">
        Monsoon sale: up to 50% off <Link to="/collections/all">Shop now</Link> &nbsp;|&nbsp; Extra 10% off on prepaid orders
      </div>

      {/* ── Main Website Header ─────────────────────────────── */}
      <header className="main-header">
        <div className="wrap hrow">
          {/* Mobile Left: Hamburger Menu Icon */}
          <button
            className="mobile-hamburger-btn"
            id="mobileMenuBtn"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d2420" strokeWidth="2.2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Master Emblem Logo */}
          <Link to="/" className="logo" aria-label="Pakiza Rugs & Co - Home">
            <img
              src={pakizaRoyalGoldLogo}
              alt="PAKIZA RUGS & CO."
              className="pakiza-master-emblem-logo"
            />
          </Link>

          {/* Desktop Search Bar */}
          <div className="search">
            <input
              type="search"
              id="q"
              placeholder="Search carpets, rugs, jute..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
          </div>

          {/* Right Action Icons */}
          <div className="icons">
            {/* Desktop User Auth Links */}
            <div className="desktop-auth">
              {user ? (
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  {user.role === 'admin' && (
                    <Link to="/admin" style={{ color: '#c5a059', fontWeight: 600 }}>
                      Admin Panel
                    </Link>
                  )}
                  <Link to="/account" style={{ color: 'var(--ink)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }} id="home-account-btn">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>My Account</span>
                  </Link>
                  <button onClick={logout} style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px' }} title="Logout">
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" aria-label="Account" id="home-login-btn">
                  Login
                </Link>
              )}
            </div>

            {/* Desktop Cart Button */}
            <button id="cartBtn" className="desktop-cart-btn" onClick={() => setIsDrawerOpen(true)} aria-label="Open cart">
              Cart<span id="count">{cartItemCount}</span>
            </button>

            {/* Mobile Right: Search Icon + Account/Profile Icon + Cart Bag Icon */}
            <div className="mobile-header-actions">
              <button
                className="mobile-header-btn mobile-search-trigger"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                aria-label="Search"
                id="mobileSearchBtn"
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#1d2420" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              {/* Mobile Account / Profile Icon */}
              {user ? (
                <Link
                  to={user.role === 'admin' ? '/admin' : '/account'}
                  className="mobile-header-btn mobile-user-profile-btn"
                  aria-label="My Account"
                  id="mobileAccountBtn"
                >
                  <div className="mobile-user-avatar">
                    <span className="mobile-user-initials">
                      {(user.name ? user.name.charAt(0) : 'U').toUpperCase()}
                    </span>
                    <span className="mobile-user-online-dot" />
                  </div>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="mobile-header-btn mobile-user-btn"
                  aria-label="Login / Sign in"
                  id="mobileLoginBtn"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1d2420" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </Link>
              )}

              <button
                className="mobile-header-btn mobile-cart-trigger"
                onClick={() => setIsDrawerOpen(true)}
                aria-label="Open Cart"
                id="mobileCartBtn"
              >
                <div className="mobile-bag-wrap">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1d2420" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <span className="mobile-bag-count">{cartItemCount}</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Dropdown Bar */}
        {isMobileSearchOpen && (
          <div className="mobile-search-dropdown-bar">
            <input
              type="search"
              placeholder="Search carpets, rugs, jute..."
              autoFocus
              className="mobile-search-dropdown-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="mobile-search-dropdown-close" onClick={() => setIsMobileSearchOpen(false)}>✕</button>
          </div>
        )}

        {/* ── Desktop Navigation ───────────────────────────── */}
        <nav className="desktop-nav">
          <div className="wrap">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li>
                <Link to="/collections/all" className="nav-shop-link" style={{ color: '#c5a059', fontWeight: 700 }}>
                  Shop Collections <span className="nav-caret">▾</span>
                </Link>
                <div className="drop" id="drop">
                  {categoriesData.map((cat) => {
                    const catSlug = cat.slug || (cat.name ? cat.name.toLowerCase().replace(/\s+/g, '-') : cat.id);
                    return (
                      <Link key={cat.id} to={`/collections/${catSlug}`}>
                        {cat.name} Carpets
                      </Link>
                    );
                  })}
                  <Link to="/collections/all" style={{ borderTop: '1px solid #ede7df', fontWeight: '700', color: '#9d6e3f' }}>
                    ✦ View All Collections →
                  </Link>
                </div>
              </li>
              <li><Link to="/#custom">Customization</Link></li>
              <li><Link to="/#founder-story">About Us</Link></li>
              <li><Link to="/#rev">Customer Reviews</Link></li>
              <li><Link to="/collections/all">Explore All Rugs</Link></li>
              <li><Link to="/#contact">Contact Us</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* ── Mobile Side Navigation Drawer ── */}
      <div
        className={`mobile-side-menu-backdrop ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <aside className={`mobile-side-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`} aria-label="Mobile Navigation Menu">
        <div className="mobile-side-menu-header">
          <img src={pakizaRoyalGoldLogo} alt="PAKIZA RUGS & CO." className="mobile-drawer-brand-img" />
          <button className="mobile-side-menu-close" onClick={() => setIsMobileMenuOpen(false)}>✕</button>
        </div>
        <ul className="mobile-side-menu-list">
          <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}><span>Home</span><span className="arrow">→</span></Link></li>
          <li><Link to="/collections/all" onClick={() => setIsMobileMenuOpen(false)}><span>Shop Collections</span><span className="arrow">→</span></Link></li>
          {categoriesData.map(cat => (
            <li key={cat.id}>
              <Link to={`/collections/${cat.slug || cat.id}`} onClick={() => setIsMobileMenuOpen(false)}>
                <span>{cat.name}</span><span className="arrow">→</span>
              </Link>
            </li>
          ))}
          <li><Link to="/#custom" onClick={() => setIsMobileMenuOpen(false)}><span>Bespoke Custom Rugs</span><span className="arrow">→</span></Link></li>
          <li><Link to="/#founder-story" onClick={() => setIsMobileMenuOpen(false)}><span>Heritage &amp; Founder Story</span><span className="arrow">→</span></Link></li>
        </ul>
        <div className="mobile-side-menu-footer">
          {user ? (
            <>
              {user.role === 'admin' ? (
                <Link to="/admin" className="mobile-drawer-btn gold" onClick={() => setIsMobileMenuOpen(false)}>
                  Admin Dashboard
                </Link>
              ) : (
                <Link to="/account" className="mobile-drawer-btn gold" onClick={() => setIsMobileMenuOpen(false)}>
                  My Account Dashboard
                </Link>
              )}
              <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="mobile-drawer-btn outline">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="mobile-drawer-btn gold" onClick={() => setIsMobileMenuOpen(false)}>
              Sign In / Register
            </Link>
          )}
        </div>
      </aside>

      {/* ── Main Collection Banner & Breadcrumbs ────────────────────── */}
      <div className="col-header-banner">
        <div className="col-wrap">
          <div className="col-breadcrumbs">
            <Link to="/">Home</Link>
            <span className="sep">/</span>
            <Link to="/collections/all">Collections</Link>
            <span className="sep">/</span>
            <span className="current">
              {currentCategory ? currentCategory.name : (selectedCatSlug === 'all' ? 'All Collections' : selectedCatSlug)}
            </span>
          </div>

          <div className="col-title-row">
            <div>
              <h1 className="col-title">
                {currentCategory ? currentCategory.name : (selectedCatSlug === 'all' ? 'Handcrafted Luxury Carpets & Rugs' : selectedCatSlug)}
              </h1>
              <p className="col-subtitle">
                {currentCategory?.name === 'Hand Tufted'
                  ? 'Artisanal hand-tufted carpets sculpted with 100% pure New Zealand wool & lustrous bamboo silk.'
                  : currentCategory?.name === 'Shaggy Carpet'
                  ? 'Ultra-plush high pile carpets offering cloud-like comfort and tactile warmth.'
                  : currentCategory?.name === 'Jute Carpets'
                  ? 'Eco-friendly natural golden jute hand-braided into timeless organic floor coverings.'
                  : currentCategory?.name === 'Irregular Shaped'
                  ? 'Organic sculptural silhouettes that redefine modern floor art and contemporary spaces.'
                  : 'Explore bespoke artisanal rugs crafted by master weavers with generational Bhadohi craftsmanship.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Filter & Catalog Grid Area ────────────────────────── */}
      <div className="col-main-content">
        {/* Controls Bar (Result Count & Sort) */}
        <div className="col-controls-bar">
          <div className="col-count-text">
            Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'rug' : 'rugs'}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className="col-mobile-filter-btn"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              <span>Filter & Sort</span>
            </button>

            <div className="col-sort-wrap">
              <span className="col-sort-label">Sort by:</span>
              <select
                className="col-sort-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="best-seller">Best Selling</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="col-layout">
          {/* ── LEFT SIDEBAR FILTERS ──────────────────────────────────── */}
          <aside className={`col-sidebar ${mobileFilterOpen ? 'col-sidebar--mobile-open' : ''}`}>
            <div className="col-filter-header">
              <span className="col-filter-title">Filters</span>
              {hasActiveFilters && (
                <button className="col-filter-clear" onClick={handleClearAll}>
                  Clear All
                </button>
              )}
            </div>

            {/* 1. Products Category */}
            <div className="col-accordion">
              <button className="col-accordion__header" onClick={() => toggleAccordion('categories')}>
                <span className="col-accordion__title">Products Category</span>
                <span className="col-accordion__icon">{accordions.categories ? '−' : '+'}</span>
              </button>
              {accordions.categories && (
                <div className="col-accordion__body">
                  <div className="col-cat-list">
                    <div
                      className={`col-cat-item ${selectedCatSlug === 'all' ? 'col-cat-item--active' : ''}`}
                      onClick={() => handleSelectCategory('all')}
                    >
                      <span>All Collections</span>
                      <span className="col-cat-count">({products.length})</span>
                    </div>

                    {categories.map(cat => {
                      const isActive = selectedCatSlug === cat.slug;
                      const count = getCategoryProductCount(cat.id);
                      return (
                        <div
                          key={cat.id}
                          className={`col-cat-item ${isActive ? 'col-cat-item--active' : ''}`}
                          onClick={() => handleSelectCategory(cat.slug)}
                        >
                          <span>{cat.name}</span>
                          <span className="col-cat-count">({count})</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Availability */}
            <div className="col-accordion">
              <button className="col-accordion__header" onClick={() => toggleAccordion('availability')}>
                <span className="col-accordion__title">Availability</span>
                <span className="col-accordion__icon">{accordions.availability ? '−' : '+'}</span>
              </button>
              {accordions.availability && (
                <div className="col-accordion__body">
                  <label className="col-checkbox-label">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={e => setInStockOnly(e.target.checked)}
                    />
                    <span>In stock ({products.filter(p => p.inStock !== false).length})</span>
                  </label>
                  <label className="col-checkbox-label">
                    <input
                      type="checkbox"
                      checked={outOfStockOnly}
                      onChange={e => setOutOfStockOnly(e.target.checked)}
                    />
                    <span>Out of stock ({products.filter(p => p.inStock === false || p.stockQty === 0).length})</span>
                  </label>
                </div>
              )}
            </div>

            {/* 3. Price Filter */}
            <div className="col-accordion">
              <button className="col-accordion__header" onClick={() => toggleAccordion('price')}>
                <span className="col-accordion__title">Price</span>
                <span className="col-accordion__icon">{accordions.price ? '−' : '+'}</span>
              </button>
              {accordions.price && (
                <div className="col-accordion__body">
                  <div className="col-price-inputs">
                    <div className="col-price-box">
                      <span>₹</span>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={e => setMinPrice(Number(e.target.value))}
                        placeholder="0"
                      />
                    </div>
                    <span style={{ color: '#9c9186' }}>—</span>
                    <div className="col-price-box">
                      <span>₹</span>
                      <input
                        type="number"
                        value={priceSlider}
                        onChange={e => {
                          const val = Number(e.target.value);
                          setPriceSlider(val);
                          setMaxPrice(val);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-range-slider">
                    <input
                      type="range"
                      min={0}
                      max={149999}
                      step={1000}
                      value={priceSlider}
                      onChange={e => {
                        const val = Number(e.target.value);
                        setPriceSlider(val);
                        setMaxPrice(val);
                      }}
                    />
                  </div>

                  <div className="col-price-caption">
                    Price: Rs. {minPrice.toLocaleString('en-IN')}.00 - Rs. {priceSlider.toLocaleString('en-IN')}.00
                  </div>
                </div>
              )}
            </div>

            {/* 4. Color Swatches */}
            <div className="col-accordion">
              <button className="col-accordion__header" onClick={() => toggleAccordion('color')}>
                <span className="col-accordion__title">Color</span>
                <span className="col-accordion__icon">{accordions.color ? '−' : '+'}</span>
              </button>
              {accordions.color && (
                <div className="col-accordion__body">
                  <div className="col-swatches-grid">
                    {SWATCH_COLORS.map(c => {
                      const isSelected = selectedColors.includes(c.name);
                      return (
                        <button
                          key={c.name}
                          className={`col-swatch-btn ${isSelected ? 'col-swatch-btn--active' : ''}`}
                          style={{ backgroundColor: c.hex }}
                          onClick={() => toggleColor(c.name)}
                          title={c.name}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 5. Shop by Material / Technique */}
            <div className="col-accordion">
              <button className="col-accordion__header" onClick={() => toggleAccordion('material')}>
                <span className="col-accordion__title">Material & Weave</span>
                <span className="col-accordion__icon">{accordions.material ? '−' : '+'}</span>
              </button>
              {accordions.material && (
                <div className="col-accordion__body">
                  {['Wool', 'Bamboo Silk', 'Jute', 'Cotton', 'Viscose', 'Polyester'].map(m => (
                    <label key={m} className="col-checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(m)}
                        onChange={() => toggleMaterial(m)}
                      />
                      <span>{m}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* 6. Shape Filter */}
            <div className="col-accordion">
              <button className="col-accordion__header" onClick={() => toggleAccordion('shape')}>
                <span className="col-accordion__title">Shape</span>
                <span className="col-accordion__icon">{accordions.shape ? '−' : '+'}</span>
              </button>
              {accordions.shape && (
                <div className="col-accordion__body">
                  {['Rectangle', 'Round', 'Runner', 'Irregular'].map(sh => (
                    <label key={sh} className="col-checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedShapes.includes(sh)}
                        onChange={() => toggleShape(sh)}
                      />
                      <span>{sh}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* ── RIGHT PRODUCT GRID ───────────────────────────────────── */}
          <main className="col-product-grid">
            {filteredProducts.length === 0 ? (
              <div className="col-empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9d6e3f" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <h3>No Rugs Found</h3>
                <p>Try adjusting your price range, color swatches or clear filters.</p>
                <button className="adm-btn-gold" onClick={handleClearAll}>
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredProducts.map((p) => {
                const coverImg = p.image || p.images?.[0] || '/rugs/rug-8.jpeg';
                const hoverImg = p.hoverImage || p.images?.[1] || coverImg;
                const isFav = !!wishlist[p.id];
                const priceFormatted = Number(p.price || 0).toLocaleString('en-IN');
                const mrpFormatted = p.discountPrice ? Number(p.discountPrice).toLocaleString('en-IN') : null;

                const pSlug = p.slug || (p.title || p.name ? (p.title || p.name).toLowerCase().replace(/[^a-z0-9]+/g, '-') : p.id);

                return (
                  <div key={p.id} className="col-prod-card" id={`card-${p.id}`}>
                    {/* Top Info (Title, Rating, Price, Swatches) */}
                    <div className="col-prod-info-top">
                      <Link to={`/products/${pSlug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <h3 className="col-prod-title" title={p.title || p.name}>
                          {p.title || p.name}
                        </h3>
                      </Link>

                      <div className="col-prod-rating">
                        ★★★★★
                      </div>

                      <div className="col-prod-price-row">
                        <span className="col-prod-price">Rs. {priceFormatted}.00</span>
                        {mrpFormatted && (
                          <span className="col-prod-mrp">Rs. {mrpFormatted}.00</span>
                        )}
                      </div>

                      {/* Color dots preview */}
                      <div className="col-prod-swatches">
                        {(p.colors && p.colors.length > 0 ? p.colors.slice(0, 3) : ['Beige', 'Green']).map((colName, cidx) => {
                          const matchedSwatch = SWATCH_COLORS.find(s => s.name.toLowerCase() === colName.toLowerCase());
                          return (
                            <span
                              key={cidx}
                              className="col-micro-swatch"
                              style={{ backgroundColor: matchedSwatch?.hex || '#d9cbbe' }}
                              title={colName}
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Image Container with Hover Room Scene */}
                    <Link
                      to={`/products/${pSlug}`}
                      className="col-prod-img-wrap"
                      style={{ display: 'block', textDecoration: 'none' }}
                    >
                      {p.badge && (
                        <span className={`col-prod-badge ${p.badge.includes('50%') ? 'col-prod-badge--discount' : 'col-prod-badge--gold'}`}>
                          {p.badge}
                        </span>
                      )}

                      <button
                        className={`col-prod-wishlist-btn ${isFav ? 'col-prod-wishlist-btn--active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(p.id, e);
                        }}
                        title="Add to Wishlist"
                      >
                        ♥
                      </button>

                      <img src={coverImg} alt={p.title} className="col-prod-img" />
                      <img src={hoverImg} alt={`${p.title} alternate`} className="col-prod-img col-prod-img--hover" />
                    </Link>

                    {/* Bottom Action Buttons */}
                    <div className="col-prod-actions">
                      <button
                        className="col-prod-action-btn"
                        onClick={() => setQuickViewProduct(p)}
                      >
                        Quick View
                      </button>
                      <button
                        className="col-prod-action-btn col-prod-action-btn--primary"
                        onClick={(e) => handleAddToCart(p, e)}
                      >
                        + Add To Cart
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </main>
        </div>
      </div>

      {/* ── Quick View Modal ───────────────────────────────────────────── */}
      {quickViewProduct && (
        <div className="qv-modal-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="qv-modal" onClick={e => e.stopPropagation()}>
            <button className="qv-modal__close" onClick={() => setQuickViewProduct(null)}>×</button>

            <div className="qv-modal__media">
              <img src={quickViewProduct.image || '/rugs/rug-8.jpeg'} alt={quickViewProduct.title} />
            </div>

            <div className="qv-modal__details">
              <div>
                <span className="qv-modal__category">{quickViewProduct.category || 'Handcrafted Rug'}</span>
                <h2 className="qv-modal__title">{quickViewProduct.title || quickViewProduct.name}</h2>
                <div className="qv-modal__price">
                  <span>Rs. {Number(quickViewProduct.price).toLocaleString('en-IN')}.00</span>
                  {quickViewProduct.discountPrice && (
                    <s>Rs. {Number(quickViewProduct.discountPrice).toLocaleString('en-IN')}.00</s>
                  )}
                </div>

                <p className="qv-modal__desc">
                  {quickViewProduct.shortDesc || quickViewProduct.fullDesc || 'Handcrafted with generational weaving heritage in Bhadohi, India.'}
                </p>

                <div className="qv-modal__specs">
                  <div><strong>Material:</strong> {quickViewProduct.material || '100% Fine Wool'}</div>
                  <div><strong>Shape:</strong> {quickViewProduct.shape || 'Rectangle'}</div>
                  <div><strong>Pile Height:</strong> {quickViewProduct.pileHeight || '12mm Plush'}</div>
                  <div><strong>SKU:</strong> {quickViewProduct.sku || 'PAK-001'}</div>
                </div>
              </div>

              <button
                className="qv-modal__add-btn"
                onClick={(e) => {
                  handleAddToCart(quickViewProduct, e);
                  setQuickViewProduct(null);
                }}
              >
                ✦ Add to Atelier Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Cart Drawer & Backdrop ──────────────────────────── */}
      <div
        className={`drawer-backdrop ${isDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsDrawerOpen(false)}
      />
      <aside className={`drawer ${isDrawerOpen ? 'open' : ''}`} id="drawer" aria-label="Shopping cart">
        <div className="dh">
          <span>Shopping cart ({cartItemCount})</span>
          <button id="closeCart" onClick={() => setIsDrawerOpen(false)} aria-label="Close cart">
            ×
          </button>
        </div>

        <div className="db" id="cartBody">
          {cart.length > 0 ? (
            cart.map((item, i) => (
              <div className="ci" key={`${item.id}-${i}`}>
                <div className="ci-info">
                  <img src={item.image || '/rugs/rug-8.jpeg'} alt={item.title || item.name} className="ci-img" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '13px' }}>{item.title || item.name}</strong>
                    <span style={{ color: 'var(--green, #16a34a)', fontWeight: 600 }}>
                      Rs. {Number(item.price).toLocaleString('en-IN')}
                    </span>
                    <div style={{ fontSize: '12px', color: '#786e64', marginTop: '2px' }}>Qty: {item.qty || 1}</div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(i)}
                  aria-label="Remove"
                  style={{
                    border: 0,
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: '18px',
                    color: '#dc2626'
                  }}
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <p className="empty">
              Your cart is empty.
              <br />
              Add a carpet to get started.
            </p>
          )}
        </div>

        <div className="df">
          <p>
            <span>Total</span>
            <span id="total">Rs. {cartTotal.toLocaleString('en-IN')}.00</span>
          </p>
          <button
            className="btn"
            disabled={cart.length === 0}
            onClick={handleCheckoutWhatsApp}
            style={{ opacity: cart.length === 0 ? 0.6 : 1 }}
          >
            Checkout via WhatsApp
          </button>
        </div>
      </aside>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer>
        {/* Decorative background mandalas */}
        <svg className="footer-mandala-left" viewBox="0 0 200 200" fill="none" stroke="#ffffff" strokeWidth="0.8">
          <circle cx="100" cy="100" r="90" />
          <circle cx="100" cy="100" r="70" strokeDasharray="3 2" />
          <circle cx="100" cy="100" r="50" />
          <circle cx="100" cy="100" r="30" strokeDasharray="2 2" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <path
              key={deg}
              d="M100 100 Q120 70 100 20 Q80 70 100 100"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}
        </svg>

        <svg className="footer-mandala-right" viewBox="0 0 200 200" fill="none" stroke="#ffffff" strokeWidth="0.8">
          <circle cx="100" cy="100" r="90" />
          <circle cx="100" cy="100" r="70" strokeDasharray="3 2" />
          <circle cx="100" cy="100" r="50" />
          <circle cx="100" cy="100" r="30" strokeDasharray="2 2" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <path
              key={deg}
              d="M100 100 Q120 70 100 20 Q80 70 100 100"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}
        </svg>

        <div className="wrap">
          <div className="fg">
            {/* Column 1: Brand & Contact Info */}
            <div className="footer-col-1">
              <div className="footer-brand">
                <span className="footer-brand-title">PAKIZA RUGS CO</span>
              </div>
              <p className="footer-contact-item">Madhosingh, post Aurai, Bhadohi, UP 221301</p>
              <p className="footer-contact-item">
                <a href="tel:+917007626680">+91 7007626680</a>
              </p>
              <p className="footer-contact-item">
                <a href="mailto:support@pakizarugsco.com">support@pakizarugsco.com</a>
              </p>

              {/* 5 Circular Social Icons */}
              <div className="footer-socials">
                {/* Facebook */}
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Facebook">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/pakiza_rugs_co?stkn=MTYzMzZoMjZiOWdwdA==" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                {/* TikTok / Threads */}
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="TikTok">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.8V16a7 7 0 1 1-7-7c.7 0 1.4.1 2 .3V12z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="YouTube">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#2e443c" />
                  </svg>
                </a>
                {/* Pinterest */}
                <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Pinterest">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.1-2 .1-2.9l1.4-6s-.4-.7-.4-1.8c0-1.7 1-3 2.2-3 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4-.3 1.2.6 2.2 1.8 2.2 2.2 0 3.8-2.3 3.8-5.6 0-2.9-2.1-5-5.1-5-3.5 0-5.6 2.6-5.6 5.3 0 1 .4 2.2.9 2.8a.4.4 0 0 1 .1.4l-.3 1.3c0 .2-.2.3-.4.2-1.7-.8-2.8-3.2-2.8-5.1 0-4.2 3-8 8.9-8 4.7 0 8.3 3.3 8.3 7.8 0 4.6-2.9 8.4-7 8.4-1.4 0-2.7-.7-3.1-1.6L7 22.8c-.4 1.5-1.5 3.3-2.2 4.4A10 10 0 0 0 12 22a10 10 0 0 0 0-20z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className={`footer-accordion-item ${openFooterAccordions.quickLinks ? 'open' : ''}`}>
              <button
                type="button"
                className="footer-accordion-header"
                onClick={() => toggleFooterAccordion('quickLinks')}
                aria-expanded={openFooterAccordions.quickLinks}
              >
                <span>Quick Links</span>
                <span className="footer-accordion-icon">{openFooterAccordions.quickLinks ? '−' : '+'}</span>
              </button>
              <div className="footer-accordion-body">
                <ul>
                  <li><Link to="/#reviews">Customer Reviews</Link></li>
                  <li><Link to="/collections/all">Explore All Rugs</Link></li>
                  <li><a href="https://wa.me/917007626680" target="_blank" rel="noreferrer">Contact</a></li>
                  <li><Link to="/collections/all">Your Wishlist – Saved Rugs &amp; Carpets | Pakiza Rugs Co</Link></li>
                </ul>
              </div>
            </div>

            {/* Column 3: Policies */}
            <div className={`footer-accordion-item ${openFooterAccordions.policies ? 'open' : ''}`}>
              <button
                type="button"
                className="footer-accordion-header"
                onClick={() => toggleFooterAccordion('policies')}
                aria-expanded={openFooterAccordions.policies}
              >
                <span>Policies</span>
                <span className="footer-accordion-icon">{openFooterAccordions.policies ? '−' : '+'}</span>
              </button>
              <div className="footer-accordion-body">
                <ul>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Shipping Policy</a></li>
                  <li><a href="#">Return &amp; Refund Policy</a></li>
                  <li><a href="#">Terms &amp; Conditions</a></li>
                </ul>
              </div>
            </div>

            {/* Column 4: Sign Up to Newsletter */}
            <div className={`footer-accordion-item ${openFooterAccordions.newsletter ? 'open' : ''}`}>
              <button
                type="button"
                className="footer-accordion-header"
                onClick={() => toggleFooterAccordion('newsletter')}
                aria-expanded={openFooterAccordions.newsletter}
              >
                <span>Sign Up to Newsletter</span>
                <span className="footer-accordion-icon">{openFooterAccordions.newsletter ? '−' : '+'}</span>
              </button>
              <div className="footer-accordion-body">
                <p className="footer-newsletter-desc">
                  Sign up for exclusive updates, new arrivals &amp; insider only discounts
                </p>
                <form
                  className="footer-newsletter-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setNewsletterSubscribed(true);
                    toast('✦ Thank you for subscribing to Pakiza Atelier!', 'success');
                  }}
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email..."
                    className="footer-newsletter-input"
                    aria-label="Email address"
                    disabled={newsletterSubscribed}
                  />
                  <button type="submit" className="footer-newsletter-btn">
                    {newsletterSubscribed ? 'Subscribed ✓' : 'Sign Up'}
                  </button>
                </form>
                <p className="footer-disclaimer">
                  ***By entering the e-mail you accept the <strong>terms and conditions</strong> and the <strong>privacy policy</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="copy-row">
            © 2026 Pakiza Rugs Co.
          </div>
        </div>
      </footer>

      {/* Floating Chat & Scroll To Top Widget */}
      <FloatingChatAndScroll />

      {/* ── Mobile Fixed Bar ───────────────────────────────── */}
      <nav className="bar" aria-label="Mobile Navigation">
        <Link to="/" className="bar-item">
          <svg className="bar-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10.2L12 3l9 7.2v9.3a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5V10.2z" />
            <path d="M9.5 21v-6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6" />
          </svg>
          <span className="bar-label">Home</span>
        </Link>

        <Link
          to={user ? (user.role === 'admin' ? '/admin' : '/account') : '/login'}
          className="bar-item"
        >
          <svg className="bar-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 20.5a6.5 6.5 0 0 1 13 0" />
          </svg>
          <span className="bar-label">Account</span>
        </Link>

        <Link to="/collections/all" className="bar-item">
          <svg className="bar-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7.5L4.5 3h15L21 7.5" />
            <path d="M3 7.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0V20a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20V7.5z" />
            <path d="M9.5 21.5v-6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6" />
          </svg>
          <span className="bar-label">Shop</span>
        </Link>

        <a
          href="https://wa.me/917007626680?text=Hello%20Pakiza%20Rugs,%20I%20have%20an%20inquiry."
          target="_blank"
          rel="noreferrer"
          className="bar-item bar-item-whatsapp"
        >
          <svg className="bar-icon bar-icon-whatsapp" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.77 14.16c-.24.68-1.2 1.25-1.68 1.3-.47.05-1.07.07-3.46-.92-2.88-1.19-4.73-4.14-4.87-4.33-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.66.5.24.58.82 2.01.9 2.16.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.7 2.11 1.17 1.04 2.15 1.36 2.46 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.84.87 2.16 1.03.32.16.53.24.61.37.08.13.08.77-.16 1.45z" />
          </svg>
          <span className="bar-label">WhatsApp</span>
        </a>
      </nav>
    </>
  );
}
