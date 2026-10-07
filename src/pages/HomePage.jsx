import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import {
  categoriesData,
  productsData,
  colorsData,
  roomsData,
  reviewsData,
  instagramData
} from '../data/pakizaData';
import logoImg from '../assets/logo.png';
import wordmark3DImg from '../assets/pakiza-3d-wordmark.png';
import pakizaLuxuryLogo from '../assets/pakiza-luxury-logo.jpg';
import pakizaRoyalGoldLogo from '../assets/pakiza-royal-gold-logo.png';
import founderImg from '../assets/founder-saif-ali.jpg';
import FloatingChatAndScroll from '../components/FloatingChatAndScroll';

const heroSlides = [
  {
    type: 'video',
    tag: 'BHADOHI ATELIER',
    title: 'THE ART OF WEAVING',
    subtitle: 'PURE HANDMADE ARTISTRY IN MOTION',
    video: '/hero-artisan.mp4',
    poster: '/hero-artisan-poster.jpg',
    href: '#founder-story',
    btnText: 'EXPLORE OUR CRAFT'
  },
  {
    type: 'image',
    tag: 'NEW COLLECTION',
    title: 'HAND KNOTTED',
    subtitle: 'DISCOVER PREMIUM CARPETS',
    image: '/hero-hand-knotted.jpg',
    href: '#cats',
    btnText: 'SHOP NOW'
  },
  {
    type: 'image',
    tag: 'TRENDING NOW',
    title: 'IRREGULAR',
    subtitle: 'COMFORT MEETS STYLE',
    image: '/hero-irregular.jpg',
    href: '#new',
    btnText: 'EXPLORE'
  },
  {
    type: 'image',
    tag: 'HERITAGE WEAVES',
    title: 'ROYAL KASHMIRI',
    subtitle: 'TIMELESS HANDCRAFTED LUXURY',
    image: '/hero-monument.jpg',
    href: '#cats',
    btnText: 'SHOP NOW'
  }
];

export default function HomePage() {
  const { user, logout } = useAuth();
  const productContext = useProducts();
  const contextProducts = productContext?.products || [];
  const contextCategories = productContext?.categories || [];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [wishlist, setWishlist] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [openFooterAccordions, setOpenFooterAccordions] = useState({
    quickLinks: false,
    policies: false,
    newsletter: false
  });
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const roomsRef = useRef(null);

  const toggleFooterAccordion = (key) => {
    setOpenFooterAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRoomScroll = () => {
    if (!roomsRef.current) return;
    const el = roomsRef.current;
    const scrollLeft = el.scrollLeft;
    const card = el.querySelector('.room-card');
    const cardWidth = card ? card.offsetWidth + 14 : el.offsetWidth * 0.8;
    const index = Math.min(roomsData.length - 1, Math.max(0, Math.round(scrollLeft / cardWidth)));
    setActiveRoomIndex(index);
  };

  const scrollToRoom = (index) => {
    if (!roomsRef.current) return;
    const el = roomsRef.current;
    const card = el.querySelector('.room-card');
    const cardWidth = card ? card.offsetWidth + 14 : el.offsetWidth * 0.8;
    el.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    setActiveRoomIndex(index);
  };

  // Hero carousel auto-play: 10s for video slide, 5s for image slides
  useEffect(() => {
    const isCurrentVideo = heroSlides[currentSlide]?.type === 'video' || !!heroSlides[currentSlide]?.video;
    const duration = isCurrentVideo ? 10000 : 5000;

    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  const formatPrice = (num) => 'Rs. ' + Number(num || 0).toLocaleString('en-IN');

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setIsDrawerOpen(true);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    const itemsList = cart.map((c) => `- ${c.name || c.title} (${formatPrice(c.price)})`).join('\n');
    const msg = encodeURIComponent(
      `Hello Pakiza Rugs Co., I would like to order the following items:\n\n${itemsList}\n\n*Total Amount:* ${formatPrice(cartTotal)}\n\nPlease assist with the order confirmation & shipping.`
    );
    window.open(`https://wa.me/917007626680?text=${msg}`, '_blank');
  };

  // Published live products from ProductContext (sorted newest first)
  const publishedProducts = (contextProducts || [])
    .filter(p => (p.status || 'published') === 'published')
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  // Filtered live lists for different homepage sections
  // 1. New Arrivals: All newest published products first, fallback to productsData.new
  const liveNewProducts = publishedProducts.length > 0
    ? publishedProducts.slice(0, 12)
    : productsData.new;

  // 2. Luxury Viscose / Silk / Premium:
  const luxMatches = publishedProducts.filter(p =>
    p.categoryId === 'cat-8' || p.categoryId === 'cat-5' || p.categoryId === 'cat-6' ||
    (p.material && (p.material.toLowerCase().includes('silk') || p.material.toLowerCase().includes('viscose'))) ||
    (p.title && (p.title.toLowerCase().includes('silk') || p.title.toLowerCase().includes('viscose') || p.title.toLowerCase().includes('luxury'))) ||
    Number(p.price) >= 10000
  );
  const liveLuxProducts = luxMatches.length > 0 ? luxMatches.slice(0, 8) : productsData.lux;

  // 3. Jute Carpets:
  const juteMatches = publishedProducts.filter(p =>
    p.categoryId === 'cat-3' ||
    (p.material && p.material.toLowerCase() === 'jute') ||
    (p.title && p.title.toLowerCase().includes('jute'))
  );
  const liveJuteProducts = juteMatches.length > 0 ? juteMatches.slice(0, 8) : productsData.jute;

  // 4. Shaggy Carpets:
  const shagMatches = publishedProducts.filter(p =>
    p.categoryId === 'cat-2' ||
    (p.title && p.title.toLowerCase().includes('shag'))
  );
  const liveShagProducts = shagMatches.length > 0 ? shagMatches.slice(0, 8) : productsData.shag;

  // 5. Exclusive Carpets:
  const exclMatches = publishedProducts.filter(p =>
    p.categoryId === 'cat-4' || p.categoryId === 'cat-6' ||
    (p.badge && p.badge.toLowerCase().includes('excl'))
  );
  const liveExclProducts = exclMatches.length > 0 ? exclMatches.slice(0, 8) : productsData.excl;

  // Product Card Component (supports both formats)
  const renderProductCard = (product) => {
    const prodName = product.title || product.name || 'Handcrafted Rug';
    const prodPrice = Number(product.price || 0);
    const prodMrp = Number(product.discountPrice || product.mrp || 0);
    const prodImg = product.image || (Array.isArray(product.images) && product.images[0]) || '/rugs/rug-8.jpeg';
    const prodHoverImg = product.hoverImage || (Array.isArray(product.images) && product.images[1]) || prodImg;
    const prodTag = product.badge || product.tag || '';
    const prodId = product.id || String(Math.random());
    const prodSlug = product.slug || (prodName ? prodName.toLowerCase().replace(/[^a-z0-9]+/g, '-') : prodId);

    const isVisible =
      !searchQuery ||
      prodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prodTag && prodTag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!isVisible) return null;

    const isLiked = !!wishlist[prodId];

    return (
      <article className="pc" key={prodId} id={prodId}>
        <div className="pimg">
          {prodMrp > prodPrice && <span className="badge">-{Math.round((1 - prodPrice / prodMrp) * 100)}%</span>}
          {prodTag && prodMrp <= prodPrice && <span className="badge ex">{prodTag}</span>}

          <button
            className={`wish ${isLiked ? 'on' : ''}`}
            onClick={() => toggleWishlist(prodId)}
            aria-label="Add to wishlist"
          >
            {isLiked ? '♥' : '♡'}
          </button>

          <Link to={`/products/${prodSlug}`} style={{ display: 'block', width: '100%', height: '100%' }}>
            <img src={prodImg} alt={prodName} />
            {prodHoverImg && (
              <img src={prodHoverImg} alt={`${prodName} alternate view`} className="hover-img" />
            )}
          </Link>
        </div>

        <div className="pinfo">
          <Link to={`/products/${prodSlug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3>{prodName}</h3>
          </Link>
          <div className="price">
            {prodMrp > prodPrice ? (
              <>
                <b>{formatPrice(prodPrice)}</b>
                <s>{formatPrice(prodMrp)}</s>
              </>
            ) : (
              <b>{formatPrice(prodPrice)}</b>
            )}
          </div>
          <button className="btn" onClick={() => addToCart({ id: prodId, name: prodName, price: prodPrice, image: prodImg })}>
            Add to cart
          </button>
        </div>
      </article>
    );
  };

  return (
    <>
      {/* ── Top Bar ────────────────────────────────────────── */}
      <div className="top">
        Monsoon sale: up to 50% off <a href="#new">Shop now</a> &nbsp;|&nbsp; Extra 10% off on prepaid orders
      </div>

      {/* ── Header ─────────────────────────────────────────── */}
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

          {/* Master Emblem Logo (Circular R Monogram + PAKIZA RUGS & CO.) */}
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
              Cart<span id="count">{cart.length}</span>
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
                  title={user.name ? `Account (${user.name})` : 'My Account'}
                  id="mobileAccountBtn"
                >
                  <div className="mobile-user-avatar">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name || 'User'} className="mobile-user-avatar-img" />
                    ) : (
                      <span className="mobile-user-initials">
                        {(user.name ? user.name.charAt(0) : user.email ? user.email.charAt(0) : 'U').toUpperCase()}
                      </span>
                    )}
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
                  <span className="mobile-bag-count">{cart.length}</span>
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const el = document.getElementById('cats') || document.getElementById('new');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileSearchOpen(false);
                }
              }}
            />
            <button className="mobile-search-dropdown-close" onClick={() => setIsMobileSearchOpen(false)}>✕</button>
          </div>
        )}

        {/* ── Desktop Navigation ───────────────────────────── */}
        <nav className="desktop-nav">
          <div className="wrap">
            <ul>
              <li><a href="#">Home</a></li>
              <li>
                <Link to="/collections/all" className="nav-shop-link">
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
              <li><a href="#custom">Customization</a></li>
              <li><a href="#founder-story">About Us</a></li>
              <li><a href="#rev">Customer Reviews</a></li>
              <li><a href="#new">Blogs</a></li>
              <li><a href="#new">Track Order</a></li>
              <li><a href="#new">Wishlist</a></li>
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
          <li><a href="#" onClick={() => setIsMobileMenuOpen(false)}><span>Home</span><span className="arrow">→</span></a></li>
          <li><a href="#cats" onClick={() => setIsMobileMenuOpen(false)}><span>Shop Collections</span><span className="arrow">→</span></a></li>
          <li><a href="#cats" onClick={() => setIsMobileMenuOpen(false)}><span>Shop by Category</span><span className="arrow">→</span></a></li>
          <li><a href="#new" onClick={() => setIsMobileMenuOpen(false)}><span>New Arrivals</span><span className="arrow">→</span></a></li>
          <li><a href="#custom" onClick={() => setIsMobileMenuOpen(false)}><span>Bespoke Custom Rugs</span><span className="arrow">→</span></a></li>
          <li><a href="#shop-by-room" onClick={() => setIsMobileMenuOpen(false)}><span>Shop by Room</span><span className="arrow">→</span></a></li>
          <li><a href="#colors-sec" onClick={() => setIsMobileMenuOpen(false)}><span>Shop by Color</span><span className="arrow">→</span></a></li>
          <li><a href="#founder-story" onClick={() => setIsMobileMenuOpen(false)}><span>Heritage &amp; Founder Story</span><span className="arrow">→</span></a></li>
          <li><a href="#reviews" onClick={() => setIsMobileMenuOpen(false)}><span>Customer Reviews</span><span className="arrow">→</span></a></li>
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
            <>
              <Link to="/login" className="mobile-drawer-btn gold" onClick={() => setIsMobileMenuOpen(false)}>
                SIGN IN
              </Link>
              <Link to="/signup" className="mobile-drawer-btn outline" onClick={() => setIsMobileMenuOpen(false)}>
                CREATE ACCOUNT
              </Link>
            </>
          )}
        </div>
      </aside>

      <main>
        {/* ── Framed Hero Carousel ──────────────────────────── */}
        <div className="hero-section">
          <div className="wrap hero-wrap">
            <div className="hero-frame" id="hero" aria-label="Featured collections">
              {/* Top-Right Slide Counter (01 / 03) */}
              <div className="hero-counter" aria-live="polite">
                <span className="hero-counter__current">
                  {String(currentSlide + 1).padStart(2, '0')}
                </span>
                <span className="hero-counter__divider">/</span>
                <span className="hero-counter__total">
                  {String(heroSlides.length).padStart(2, '0')}
                </span>
              </div>

              {/* Left-Side Vertical Slide Indicators (01 | 02 | 03) */}
              <div className="hero-nav-vertical" aria-label="Slide navigation">
                {heroSlides.map((_, index) => {
                  const isActive = currentSlide === index;
                  const slideNum = String(index + 1).padStart(2, '0');
                  return (
                    <button
                      key={index}
                      className={`hero-nav-btn ${isActive ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      <span className="hero-nav-num">{slideNum}</span>
                      <span className="hero-nav-bar" />
                    </button>
                  );
                })}
              </div>

              {/* Slides (3 Images + 1 Master Video) */}
              {heroSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`slide ${currentSlide === index ? 'on' : ''}`}
                >
                  {slide.type === 'video' || slide.video ? (
                    <video
                      className="art-img hero-video"
                      src={slide.video}
                      poster={slide.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img src={slide.image} alt={slide.title} className="art-img" />
                  )}
                  <div className="hero-center-box">
                    <span className="hero-tag">{slide.tag}</span>
                    <h2 className="hero-bold-title">{slide.title}</h2>
                    {slide.subtitle && (
                      <span className="hero-subtitle">{slide.subtitle}</span>
                    )}
                    <a className="hero-frame-btn" href={slide.href}>
                      {slide.btnText || 'SHOP NOW'}
                    </a>
                  </div>
                </div>
              ))}

              {/* Bottom Mobile Dots */}
              <div className="hero-dots-mobile">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    className={currentSlide === index ? 'on' : ''}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Trust Bar (Static on Laptop, Continuous Infinite Auto-Slide on Mobile) ── */}
        <div className="trust">
          <div className="wrap trust-wrap">
            <div className="trust-marquee">
              {/* Primary Group */}
              <div className="trust-track-group">
                <div className="trust-card">
                  <div className="trust-card__icon">
                    <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="24" cy="24" r="21" strokeDasharray="3 2" />
                      <circle cx="24" cy="24" r="16.5" />
                      <path d="M16 28c1.5-3 4-5 8-5s6.5 2 8 5" />
                      <path d="M24 16c-1.8-2-4.5-1.5-4.5 1 0 2.5 4.5 5 4.5 5s4.5-2.5 4.5-5c0-2.5-2.7-3-4.5-1z" />
                      <text x="24" y="37" textAnchor="middle" fontSize="4.2" fontWeight="700" fill="currentColor" letterSpacing="0.8">PRODUCT</text>
                    </svg>
                  </div>
                  <div className="trust-card__body">
                    <span className="trust-card__title">100% Handmade</span>
                    <span className="trust-card__desc">Every curve and edge shaped with heartfelt attention</span>
                  </div>
                </div>

                <div className="trust-card">
                  <div className="trust-card__icon">
                    <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13h28v22H10z" rx="3" />
                      <path d="M17 9h14M24 9v4" />
                      <text x="24" y="21" textAnchor="middle" fontSize="6" fontWeight="800" fill="currentColor" letterSpacing="0.5">MADE</text>
                      <text x="24" y="27" textAnchor="middle" fontSize="4.8" fontWeight="700" fill="currentColor">IN</text>
                      <text x="24" y="32.5" textAnchor="middle" fontSize="5.2" fontWeight="800" fill="currentColor" letterSpacing="0.5">INDIA</text>
                    </svg>
                  </div>
                  <div className="trust-card__body">
                    <span className="trust-card__title">Made in India</span>
                    <span className="trust-card__desc">Proudly handmade in India, where tradition meets.</span>
                  </div>
                </div>

                <div className="trust-card">
                  <div className="trust-card__icon">
                    <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="7" y="10" width="22" height="13" rx="2" transform="rotate(-12 7 10)" />
                      <circle cx="16.5" cy="15.5" r="2.2" />
                      <path d="M17 26h23v15H17z" rx="2" />
                      <path d="M17 31h23M28.5 26v15" />
                      <path d="M7 36c3.5-1 7-1.8 10-1.8" />
                      <path d="M7 36l3.5 3.5" />
                    </svg>
                  </div>
                  <div className="trust-card__body">
                    <span className="trust-card__title">Cash on Delivery</span>
                    <span className="trust-card__desc">No upfront payments—get it first, pay with Cash on Delivery</span>
                  </div>
                </div>

                <div className="trust-card">
                  <div className="trust-card__icon">
                    <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 23v-3a13 13 0 0 1 26 0v3" />
                      <rect x="7" y="23" width="7" height="11" rx="3.5" />
                      <rect x="34" y="23" width="7" height="11" rx="3.5" />
                      <path d="M37 34v2a3.5 3.5 0 0 1-3.5 3.5H26" />
                      <circle cx="24.5" cy="39.5" r="1.5" />
                      <rect x="18" y="17" width="12" height="8.5" rx="2" />
                      <circle cx="21.5" cy="21.2" r="0.75" fill="currentColor" />
                      <circle cx="24" cy="21.2" r="0.75" fill="currentColor" />
                      <circle cx="26.5" cy="21.2" r="0.75" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="trust-card__body">
                    <span className="trust-card__title">Quick Support</span>
                    <span className="trust-card__desc">Our team is just a message away. Get instant support</span>
                  </div>
                </div>
              </div>

              {/* Duplicate Group (Active only on Mobile for Infinite Continuous Loop) */}
              <div className="trust-track-group trust-track-group--dup" aria-hidden="true">
                <div className="trust-card">
                  <div className="trust-card__icon">
                    <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="24" cy="24" r="21" strokeDasharray="3 2" />
                      <circle cx="24" cy="24" r="16.5" />
                      <path d="M16 28c1.5-3 4-5 8-5s6.5 2 8 5" />
                      <path d="M24 16c-1.8-2-4.5-1.5-4.5 1 0 2.5 4.5 5 4.5 5s4.5-2.5 4.5-5c0-2.5-2.7-3-4.5-1z" />
                      <text x="24" y="37" textAnchor="middle" fontSize="4.2" fontWeight="700" fill="currentColor" letterSpacing="0.8">PRODUCT</text>
                    </svg>
                  </div>
                  <div className="trust-card__body">
                    <span className="trust-card__title">100% Handmade</span>
                    <span className="trust-card__desc">Every curve and edge shaped with heartfelt attention</span>
                  </div>
                </div>

                <div className="trust-card">
                  <div className="trust-card__icon">
                    <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13h28v22H10z" rx="3" />
                      <path d="M17 9h14M24 9v4" />
                      <text x="24" y="21" textAnchor="middle" fontSize="6" fontWeight="800" fill="currentColor" letterSpacing="0.5">MADE</text>
                      <text x="24" y="27" textAnchor="middle" fontSize="4.8" fontWeight="700" fill="currentColor">IN</text>
                      <text x="24" y="32.5" textAnchor="middle" fontSize="5.2" fontWeight="800" fill="currentColor" letterSpacing="0.5">INDIA</text>
                    </svg>
                  </div>
                  <div className="trust-card__body">
                    <span className="trust-card__title">Made in India</span>
                    <span className="trust-card__desc">Proudly handmade in India, where tradition meets.</span>
                  </div>
                </div>

                <div className="trust-card">
                  <div className="trust-card__icon">
                    <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="7" y="10" width="22" height="13" rx="2" transform="rotate(-12 7 10)" />
                      <circle cx="16.5" cy="15.5" r="2.2" />
                      <path d="M17 26h23v15H17z" rx="2" />
                      <path d="M17 31h23M28.5 26v15" />
                      <path d="M7 36c3.5-1 7-1.8 10-1.8" />
                      <path d="M7 36l3.5 3.5" />
                    </svg>
                  </div>
                  <div className="trust-card__body">
                    <span className="trust-card__title">Cash on Delivery</span>
                    <span className="trust-card__desc">No upfront payments—get it first, pay with Cash on Delivery</span>
                  </div>
                </div>

                <div className="trust-card">
                  <div className="trust-card__icon">
                    <svg width="42" height="42" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 23v-3a13 13 0 0 1 26 0v3" />
                      <rect x="7" y="23" width="7" height="11" rx="3.5" />
                      <rect x="34" y="23" width="7" height="11" rx="3.5" />
                      <path d="M37 34v2a3.5 3.5 0 0 1-3.5 3.5H26" />
                      <circle cx="24.5" cy="39.5" r="1.5" />
                      <rect x="18" y="17" width="12" height="8.5" rx="2" />
                      <circle cx="21.5" cy="21.2" r="0.75" fill="currentColor" />
                      <circle cx="24" cy="21.2" r="0.75" fill="currentColor" />
                      <circle cx="26.5" cy="21.2" r="0.75" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="trust-card__body">
                    <span className="trust-card__title">Quick Support</span>
                    <span className="trust-card__desc">Our team is just a message away. Get instant support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Shop by Categories ─────────────────────────────── */}
        <section id="cats">
          <div className="wrap">
            <div className="sh">
              <h2>
                Shop by <span className="gold-text">Categories</span>
              </h2>
              <p>Explore our curated collections and find exactly what you're looking for.</p>
            </div>

            <div className="cats" id="catGrid">
              {categoriesData.map((cat) => {
                const catSlug = cat.slug || (cat.name ? cat.name.toLowerCase().replace(/\s+/g, '-') : cat.id);
                return (
                  <Link className="cat-card" to={`/collections/${catSlug}`} key={cat.id}>
                    <div className="cat-card__img-wrap">
                      {cat.badge && <span className="cat-card__badge">{cat.badge}</span>}
                      <img src={cat.image} alt={cat.name} className="cat-card__img" />
                    </div>
                    <div className="cat-card__footer">
                      <span className="cat-card__title">{cat.name}</span>
                      <span className="cat-card__arrow">&rarr;</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="more">
              <Link className="btn" to="/collections/all">
                View all collections
              </Link>
            </div>
          </div>
        </section>

        {/* ── New Arrivals ───────────────────────────────────── */}
        <section id="new" style={{ background: '#fff' }}>
          <div className="wrap">
            <div className="sh">
              <h2>
                New <span className="gold-text">Arrivals</span>
              </h2>
              <p>Freshly woven designs, just in.</p>
            </div>
            <div className="grid" id="grid-new">
              {liveNewProducts.map((product) => renderProductCard(product))}
            </div>
          </div>
        </section>

        {/* ── Shop By Color ──────────────────────────────────── */}
        <section className="colors-section" id="colors-sec">
          <div className="wrap">
            <div className="colors-header">
              <h2>Shop By Color</h2>
              <p>Find your shade, define your space.</p>
            </div>

            <div className="colors-row" id="colors">
              {colorsData.map((color) => (
                <a
                  className="color-circle-card"
                  href="#new"
                  key={color.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchQuery(color.name);
                    const el = document.getElementById('new');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="color-circle-card__outer">
                    <div
                      className="color-circle-card__inner"
                      style={{ background: color.bg || color.hex }}
                    />
                  </div>
                  <span className="color-circle-card__label">{color.name}</span>
                </a>
              ))}
            </div>

            {/* Pagination Dots at Bottom */}
            <div className="colors-pagination" aria-hidden="true">
              <span className="colors-dot-ring">
                <span className="inner-dot" />
              </span>
              <span className="colors-dot-small" />
              <span className="colors-dot-small" />
            </div>
          </div>
        </section>

        {/* ── Luxury Viscose Carpets ─────────────────────────── */}
        <section style={{ background: '#fff' }} id="grid-lux-sec">
          <div className="wrap">
            <div className="sh">
              <h2>
                Luxury <span className="gold-text">Viscose Carpets</span>
              </h2>
              <p>Silk-like shine, modern design.</p>
            </div>
            <div className="grid" id="grid-lux">
              {liveLuxProducts.map((product) => renderProductCard(product))}
            </div>
            <div className="more">
              <a className="btn" href="#new">
                Load more
              </a>
            </div>
          </div>
        </section>

        {/* ── Shop by Room ───────────────────────────────────── */}
        <section id="shop-by-room">
          <div className="wrap">
            <div className="sh">
              <h2>
                Shop by <span className="gold-text">Room</span>
              </h2>
              <p>Find the perfect carpet for every room</p>
            </div>
            <div className="rooms-carousel-wrapper">
              <div
                className="rooms"
                id="rooms"
                ref={roomsRef}
                onScroll={handleRoomScroll}
              >
                {roomsData.map((room) => (
                  <a
                    className="room-card"
                    href="#new"
                    key={room.name}
                    onClick={(e) => {
                      e.preventDefault();
                      setSearchQuery(room.name);
                      const el = document.getElementById('new');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <img className="room-card__img" src={room.image} alt={room.name} loading="lazy" />
                    <div className="room-card__gradient" />

                    {/* Top Right Styles Badge */}
                    <div className="room-card__badge">{room.count}</div>

                    {/* Bottom Text & Button */}
                    <div className="room-card__content">
                      {room.tag && <span className="room-card__tag">{room.tag}</span>}
                      <h3 className="room-card__title">{room.name}</h3>
                      <span className="room-card__btn">
                        SHOP NOW ↗
                      </span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Mobile Carousel Dots Indicator */}
              <div className="rooms-dots">
                {roomsData.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`rooms-dot ${activeRoomIndex === i ? 'active' : ''}`}
                    onClick={() => scrollToRoom(i)}
                    aria-label={`Go to room slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* ── Brand Perks Strip (Single Line on Desktop & Mobile) ── */}
            <div className="perks-strip">
              <div className="perks-strip__items">
                {/* Perk 1: Free Customisation */}
                <div className="perk-item">
                  <div className="perk-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#d1a868" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M8.5 12.5l2.5 2.5 5-5" />
                    </svg>
                  </div>
                  <div className="perk-text">
                    <strong className="perk-title">Free Customisation</strong>
                    <span className="perk-desc">Any size · Any colour</span>
                  </div>
                </div>

                {/* Perk 2: Pan India Delivery */}
                <div className="perk-item">
                  <div className="perk-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#d1a868" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="5" width="13" height="12" rx="1.5" />
                      <path d="M14 8h5l3 3.5v5.5h-8V8z" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="17.5" cy="18.5" r="2.5" />
                    </svg>
                  </div>
                  <div className="perk-text">
                    <strong className="perk-title">Pan India Delivery</strong>
                    <span className="perk-desc">Fast &amp; tracked</span>
                  </div>
                </div>

                {/* Perk 3: Expert Help */}
                <a className="perk-item perk-item--link" href="tel:+919129788793">
                  <div className="perk-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#d1a868" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="perk-text">
                    <strong className="perk-title">Expert Help</strong>
                    <span className="perk-desc">+91 9129788793</span>
                  </div>
                </a>
              </div>

              {/* Right CTA Button */}
              <a
                className="perks-cta-btn"
                href="https://wa.me/919129788793?text=Hello%20Pakiza%20Rugs,%20I%20need%20help%20choosing%20a%20carpet."
                target="_blank"
                rel="noreferrer"
              >
                Need help choosing? →
              </a>
            </div>
          </div>
        </section>

        {/* ── Jute Carpets ───────────────────────────────────── */}
        <section style={{ background: '#fff' }} id="grid-jute">
          <div className="wrap">
            <div className="sh">
              <h2>
                Jute <span className="gold-text">Carpets</span>
              </h2>
              <p>Natural fibre, timeless look.</p>
            </div>
            <div className="grid">
              {liveJuteProducts.map((product) => renderProductCard(product))}
            </div>
          </div>
        </section>

        {/* ── Reviews ────────────────────────────────────────── */}
        <section id="reviews">
          <div className="wrap">
            <div className="sh">
              <h2>
                Our Happy <span className="gold-text">Space</span>
              </h2>
              <p>Real homes, real customers.</p>
            </div>
            <div className="rev" id="rev">
              {reviewsData.map((r, i) => (
                <div className="rc" key={i}>
                  <img src={r.image} alt={r.name} />
                  <div>
                    <span className="stars">★★★★★</span>
                    <p>{r.review}</p>
                    <b>{r.name}</b>
                    <br />
                    <small>{r.location}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Shaggy Carpets ─────────────────────────────────── */}
        <section style={{ background: '#fff' }} id="grid-shag">
          <div className="wrap">
            <div className="sh">
              <h2>
                Shaggy <span className="gold-text">Carpets</span>
              </h2>
              <p>Soft underfoot, easy to love.</p>
            </div>
            <div className="grid">
              {liveShagProducts.map((product) => renderProductCard(product))}
            </div>
          </div>
        </section>

        {/* ── Customization Banner (Authentic Atelier Layout) ── */}
        <div className="custom" id="custom">
          <div className="wrap custom-wrap">
            <div className="custom-editorial">
              <span className="custom-eyebrow">BESPOKE HAND-KNOTTED ATELIER</span>
              <h2 className="custom-heading">
                Custom Rugs by <em>Pakiza Rugs Co.</em>
              </h2>
              <p className="custom-desc">
                Have a specific floor plan, colour palette, or family heirloom motif? Our master weavers in Bhadohi handcraft custom carpets to your exact millimeter dimensions.
              </p>

              <div className="custom-features">
                <div className="custom-feat">
                  <span className="custom-feat-num">01</span>
                  <div>
                    <strong>Any Size &amp; Shape</strong>
                    <p>Runners, circular, oversized or irregular layouts</p>
                  </div>
                </div>
                <div className="custom-feat">
                  <span className="custom-feat-num">02</span>
                  <div>
                    <strong>100% Pure Fibres</strong>
                    <p>Hand-spun New Zealand wool, bamboo silk &amp; jute</p>
                  </div>
                </div>
                <div className="custom-feat">
                  <span className="custom-feat-num">03</span>
                  <div>
                    <strong>Direct From Loom</strong>
                    <p>Transparent pricing with zero middleman markups</p>
                  </div>
                </div>
              </div>

              <div className="custom-cta">
                <a
                  className="btn custom-btn"
                  href="https://wa.me/917007626680?text=Hello%20Pakiza%20Rugs,%20I%20would%20like%20to%20customize%20a%20rug%20design."
                  target="_blank"
                  rel="noreferrer"
                >
                  Start Custom Order on WhatsApp →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Exclusive Carpets ──────────────────────────────── */}
        <section style={{ background: '#fff' }} id="grid-excl">
          <div className="wrap">
            <div className="sh">
              <h2>
                Exclusive <span className="gold-text">Carpets</span>
              </h2>
              <p>Limited designs for special rooms.</p>
            </div>
            <div className="grid">
              {liveExclProducts.map((product) => renderProductCard(product))}
            </div>
            <div className="more">
              <a className="btn" href="#new">
                View All
              </a>
            </div>
          </div>
        </section>

        {/* ── The Story Behind Pakiza Rugs Co. / Founder & CEO (Compact & Classy) ── */}
        <section className="founder-story-section" id="founder-story">
          <div className="wrap">
            <div className="founder-story-grid">
              {/* Left: Founder Compact Portrait Card */}
              <div className="founder-card-wrap">
                <div className="founder-card">
                  <img
                    src={founderImg}
                    alt="Saif Ali — Founder & CEO, Pakiza Rugs Co."
                    className="founder-photo"
                  />
                  {/* Bottom badge overlay */}
                  <div className="founder-badge-overlay">
                    <h3 className="founder-badge-name">SAIF ALI</h3>
                    <p className="founder-badge-title">FOUNDER &amp; CEO</p>
                  </div>
                </div>
              </div>

              {/* Right: Story Content */}
              <div className="founder-content">
                <span className="founder-eyebrow">THE STORY BEHIND PAKIZA RUGS CO.</span>
                <h2 className="founder-title">Saif Ali</h2>
                <div className="founder-accent-line" aria-hidden="true" />

                <blockquote className="founder-quote">
                  &ldquo;Pakiza Rugs Co. is our tribute to authentic Indian carpet artistry &mdash; bringing handcrafted luxury directly from the looms of Bhadohi to contemporary homes.&rdquo;
                </blockquote>

                <div className="founder-paragraphs">
                  <p>
                    Growing up in Bhadohi, I watched master weavers pour weeks of devotion into every single knot. I started <strong>Pakiza Rugs Co.</strong> to eliminate middleman markups and bring genuine, heirloom-grade handcrafted rugs directly from our looms to your living room.
                  </p>
                </div>

                {/* Stats row */}
                <div className="founder-stats">
                  <div className="founder-stat-item">
                    <span className="founder-stat-num">100%</span>
                    <span className="founder-stat-label">Handcrafted Wool</span>
                  </div>
                  <div className="founder-stat-item">
                    <span className="founder-stat-num">500+</span>
                    <span className="founder-stat-label">Artisan Weavers</span>
                  </div>
                  <div className="founder-stat-item">
                    <span className="founder-stat-num">10k+</span>
                    <span className="founder-stat-label">Living Rooms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Instagram Feed ─────────────────────────────────── */}
        <section>
          <div className="wrap">
            <div className="sh">
              <h2>
                Follow Pakiza Rugs Co on <span className="gold-text">Instagram</span>
              </h2>
              <p>Get inspired by handmade decor.</p>
            </div>
            <div className="insta" id="insta">
              {instagramData.map((item) => (
                <a
                  href={item.url || "https://www.instagram.com/pakiza_rugs_co/reel/Dc3FARURs06/"}
                  target="_blank"
                  rel="noreferrer"
                  key={item.id}
                  aria-label={item.caption || "Pakiza Instagram inspiration"}
                >
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img src={item.image || item.src} alt={item.caption || "Pakiza Instagram inspiration"} />
                  )}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

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
                  <li><a href="#reviews">Customer Reviews</a></li>
                  <li><a href="#new">Track Order</a></li>
                  <li><a href="https://wa.me/917007626680" target="_blank" rel="noreferrer">Contact</a></li>
                  <li><a href="#new">Your Wishlist – Saved Rugs &amp; Carpets | Pakiza Rugs Co</a></li>
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

      {/* Floating Widgets: Chat + Scroll to Top with dynamic progress fill */}
      <FloatingChatAndScroll />

      {/* ── Mobile Fixed Bar ───────────────────────────────── */}
      <nav className="bar" aria-label="Mobile Navigation">
        <a
          href="#"
          className="bar-item"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <svg className="bar-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10.2L12 3l9 7.2v9.3a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5V10.2z" />
            <path d="M9.5 21v-6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6" />
          </svg>
          <span className="bar-label">Home</span>
        </a>

        <Link
          to={user ? (user.role === 'admin' ? '/admin' : '/login') : '/login'}
          className="bar-item"
        >
          <svg className="bar-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 20.5a6.5 6.5 0 0 1 13 0" />
          </svg>
          <span className="bar-label">Account</span>
        </Link>

        <a
          href="#cats"
          className="bar-item"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('cats') || document.getElementById('new');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <svg className="bar-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7.5L4.5 3h15L21 7.5" />
            <path d="M3 7.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0V20a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20V7.5z" />
            <path d="M9.5 21.5v-6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6" />
          </svg>
          <span className="bar-label">Shop</span>
        </a>

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

      {/* ── Cart Drawer & Backdrop ──────────────────────────── */}
      <div
        className={`drawer-backdrop ${isDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsDrawerOpen(false)}
      />
      <aside className={`drawer ${isDrawerOpen ? 'open' : ''}`} id="drawer" aria-label="Shopping cart">
        <div className="dh">
          <span>Shopping cart ({cart.length})</span>
          <button id="closeCart" onClick={() => setIsDrawerOpen(false)} aria-label="Close cart">
            ×
          </button>
        </div>

        <div className="db" id="cartBody">
          {cart.length > 0 ? (
            cart.map((item, i) => (
              <div className="ci" key={`${item.id}-${i}`}>
                <div className="ci-info">
                  <img src={item.image} alt={item.name} className="ci-img" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '13px' }}>{item.name}</strong>
                    <span style={{ color: 'var(--green)', fontWeight: 600 }}>
                      {formatPrice(item.price)}
                    </span>
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
                    color: 'var(--sale)'
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
            <span id="total">{formatPrice(cartTotal)}</span>
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
    </>
  );
}
