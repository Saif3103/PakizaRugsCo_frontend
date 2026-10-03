import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  categoriesData,
  productsData,
  colorsData,
  roomsData,
  reviewsData,
  instagramData
} from '../data/pakizaData';
import logoImg from '../assets/logo.png';
import FloatingChatAndScroll from '../components/FloatingChatAndScroll';

const heroSlides = [
  {
    tag: 'CURATED FOR ELEGANT LIVING',
    title: 'Flat 50% off hand tufted rugs',
    image: '/rugs/rug-7.jpeg',
    href: '#cats'
  },
  {
    tag: 'INDULGE IN COMFORT',
    title: 'Plush shaggy carpets',
    image: '/rugs/rug-1.jpeg',
    href: '#grid-shag'
  },
  {
    tag: 'NATURAL SOPHISTICATION',
    title: 'Artisan jute carpets',
    image: '/rugs/rug-4.jpeg',
    href: '#grid-jute'
  }
];

export default function HomePage() {
  const { user, logout } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [wishlist, setWishlist] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Hero carousel auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const formatPrice = (num) => 'Rs. ' + num.toLocaleString('en-IN');

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

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    const itemsList = cart.map((c) => `- ${c.name} (${formatPrice(c.price)})`).join('\n');
    const msg = encodeURIComponent(
      `Hello Pakiza Rugs Co., I would like to order the following items:\n\n${itemsList}\n\n*Total Amount:* ${formatPrice(cartTotal)}\n\nPlease assist with the order confirmation & shipping.`
    );
    window.open(`https://wa.me/917007626680?text=${msg}`, '_blank');
  };

  // Product Card Component
  const renderProductCard = (product) => {
    const isVisible =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.tag && product.tag.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!isVisible) return null;

    const isLiked = !!wishlist[product.id];

    return (
      <article className="pc" key={product.id} id={product.id}>
        <div className="pimg">
          {product.mrp > 0 && <span className="badge">-50%</span>}
          {product.tag && product.mrp === 0 && <span className="badge ex">{product.tag}</span>}

          <button
            className={`wish ${isLiked ? 'on' : ''}`}
            onClick={() => toggleWishlist(product.id)}
            aria-label="Add to wishlist"
          >
            {isLiked ? '♥' : '♡'}
          </button>

          <img src={product.image} alt={product.name} />
          {product.hoverImage && (
            <img src={product.hoverImage} alt={`${product.name} alternate view`} className="hover-img" />
          )}
        </div>

        <div className="pinfo">
          <h3>{product.name}</h3>
          <div className="price">
            {product.mrp > 0 ? (
              <>
                <b>{formatPrice(product.price)}</b>
                <s>{formatPrice(product.mrp)}</s>
              </>
            ) : (
              <b>{formatPrice(product.price)}</b>
            )}
          </div>
          <button className="btn" onClick={() => addToCart(product)}>
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
      <header>
        <div className="wrap hrow">
          <Link to="/" className="logo">
            <img src={logoImg} alt="Pakiza Logo" className="logo-img" />
            Pakiza Rugs Co
          </Link>

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

          <div className="icons">
            {user ? (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {user.role === 'admin' && (
                  <Link to="/admin" style={{ color: 'var(--green)', fontWeight: 600 }}>
                    Admin Panel
                  </Link>
                )}
                <button onClick={logout} style={{ color: 'var(--muted)' }}>
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" aria-label="Account">
                Login
              </Link>
            )}

            <button id="cartBtn" onClick={() => setIsDrawerOpen(true)} aria-label="Open cart">
              Cart<span id="count">{cart.length}</span>
            </button>
          </div>
        </div>

        {/* ── Navigation ───────────────────────────────────── */}
        <nav>
          <div className="wrap">
            <ul>
              <li><a href="#">Home</a></li>
              <li>
                <a href="#cats">Shop</a>
                <div className="drop" id="drop">
                  {categoriesData.map((cat) => (
                    <a key={cat.id} href="#cats">
                      {cat.name} carpets
                    </a>
                  ))}
                </div>
              </li>
              <li><a href="#new">Blogs</a></li>
              <li><a href="#custom">About Us</a></li>
              <li><a href="#custom">Customization</a></li>
              <li><a href="#reviews">Customer Reviews</a></li>
              <li><a href="#new">Track Order</a></li>
              <li><a href="#new">Wishlist</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero Carousel ──────────────────────────────────── */}
        <div className="hero" id="hero" aria-label="Featured collections">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${currentSlide === index ? 'on' : ''}`}
            >
              <img src={slide.image} alt={slide.title} className="art-img" />
              <div className="txt">
                <small>{slide.tag}</small>
                <h2>{slide.title}</h2>
                <a className="btn light" href={slide.href}>
                  Shop now
                </a>
              </div>
            </div>
          ))}

          <div className="dots">
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

        {/* ── Trust Bar ──────────────────────────────────────── */}
        <div className="trust">
          <div className="wrap">
            <div className="trust-grid">
              {/* Card 1: 100% Handmade */}
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

              {/* Card 2: Made in India */}
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

              {/* Card 3: Cash on Delivery */}
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

              {/* Card 4: Quick Support */}
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
              {categoriesData.map((cat) => (
                <a className="cat-card" href={cat.href || '#new'} key={cat.id}>
                  <div className="cat-card__img-wrap">
                    {cat.badge && <span className="cat-card__badge">{cat.badge}</span>}
                    <img src={cat.image} alt={cat.name} className="cat-card__img" />
                  </div>
                  <div className="cat-card__footer">
                    <h3 className="cat-card__title">{cat.name}</h3>
                    <span className="cat-card__btn">
                      SHOP NOW →
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="more">
              <a className="btn" href="#new">
                View all collections
              </a>
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
              {productsData.new.map((product) => renderProductCard(product))}
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
              {productsData.lux.map((product) => renderProductCard(product))}
            </div>
            <div className="more">
              <a className="btn" href="#new">
                Load more
              </a>
            </div>
          </div>
        </section>

        {/* ── Shop by Room ───────────────────────────────────── */}
        <section>
          <div className="wrap">
            <div className="sh">
              <h2>
                Shop by <span className="gold-text">Room</span>
              </h2>
              <p>The right carpet for every room.</p>
            </div>
            <div className="rooms" id="rooms">
              {roomsData.map((room) => (
                <a className="room" href="#new" key={room.name}>
                  <img src={room.image} alt={room.name} />
                  {room.tag && <small>{room.tag}</small>}
                  <h3>{room.name}</h3>
                  <p>{room.count}</p>
                </a>
              ))}
            </div>

            <div className="perks">
              <div>
                <b>Free Customization</b>
                <span>Any size, any colour</span>
              </div>
              <div>
                <b>Pan India delivery</b>
                <span>Fast and tracked</span>
              </div>
              <div>
                <b>Expert help</b>
                <span>+91 70076 26680</span>
              </div>
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
              {productsData.jute.map((product) => renderProductCard(product))}
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
              {productsData.shag.map((product) => renderProductCard(product))}
            </div>
          </div>
        </section>

        {/* ── Customization Banner ───────────────────────────── */}
        <div className="custom" id="custom">
          <div>
            <h2>
              Custom by <span style={{ color: '#e5be7a' }}>Pakiza Rugs Co</span>
            </h2>
            <p>Tell us the size, colour and pattern. We weave it.</p>
            <a
              className="btn light"
              href="https://wa.me/917007626680?text=Hello%20Pakiza%20Rugs,%20I%20would%20like%20to%20customize%20a%20rug%20design."
              target="_blank"
              rel="noreferrer"
            >
              Customize
            </a>
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
              {productsData.excl.map((product) => renderProductCard(product))}
            </div>
            <div className="more">
              <a className="btn" href="#new">
                View All
              </a>
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
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  key={item.id}
                  aria-label="Instagram post"
                >
                  <img src={item.image} alt="Pakiza Instagram inspiration" />
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
                Pakiza Rugs Co
              </div>
              <p className="footer-contact-item">Madhosingh, post Aurai, Bhadohi, UP 221301</p>
              <p className="footer-contact-item">
                <a href="tel:+919129788793">+91 9129788793</a> / <a href="tel:+917007626680">+91 7007626680</a>
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
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
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
            <div>
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#reviews">Customer Reviews</a></li>
                <li><a href="#new">Track Order</a></li>
                <li><a href="https://wa.me/917007626680" target="_blank" rel="noreferrer">Contact</a></li>
                <li><a href="#new">Your Wishlist – Saved Rugs &amp; Carpets | Pakiza Rugs Co</a></li>
              </ul>
            </div>

            {/* Column 3: Policies */}
            <div>
              <h4>Policies</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Shipping Policy</a></li>
                <li><a href="#">Return &amp; Refund Policy</a></li>
                <li><a href="#">Terms &amp; Conditions</a></li>
              </ul>
            </div>

            {/* Column 4: Sign Up to Newsletter */}
            <div>
              <h4>Sign Up to Newsletter</h4>
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
