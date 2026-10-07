import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { toast } from '../utils/toast';
import pakizaRoyalGoldLogo from '../assets/pakiza-royal-gold-logo.png';
import FloatingChatAndScroll from '../components/FloatingChatAndScroll';
import { categoriesData } from '../data/pakizaData';
import './productDetail.css';

// Dimension size multiplier and options
const SIZE_OPTIONS = [
  { label: '3 x 5 ft', dims: '3x5 ft', multiplier: 1.0, fixedPrice: 9999, fixedMrp: 19999 },
  { label: '4 x 6 ft', dims: '4x6 ft', multiplier: 1.6, fixedPrice: 15999, fixedMrp: 29999 },
  { label: '5 x 8 ft', dims: '5x8 ft', multiplier: 2.5, fixedPrice: 24999, fixedMrp: 45999 },
  { label: '6 x 9 ft', dims: '6x9 ft', multiplier: 3.4, fixedPrice: 33999, fixedMrp: 59999 },
  { label: '8 x 10 ft', dims: '8x10 ft', multiplier: 5.0, fixedPrice: 49999, fixedMrp: 89999 },
  { label: '9 x 12 ft', dims: '9x12 ft', multiplier: 7.0, fixedPrice: 69999, fixedMrp: 119999 },
];

const COLOR_VARIANTS = [
  { name: 'Driftic Beige', hex: '#d9cbbe' },
  { name: 'Warm Oatmeal', hex: '#ece7de' },
  { name: 'Natural Sand', hex: '#b5a898' },
  { name: 'Charcoal Accent', hex: '#373a3c' },
];

const PEOPLE_ALSO_BOUGHT = [
  {
    id: 'pab-1',
    title: 'Curved Wave Sculpted Ivory Rug',
    price: 8999,
    mrp: 17999,
    discount: '-50%',
    badgeType: 'discount',
    image: '/rugs/bought-1.jpg',
    slug: 'irregular-shaped-rug-driftic-beige-hand-tufted-carpet'
  },
  {
    id: 'pab-2',
    title: 'Moss & Olive Organic Contour Rug',
    price: 9499,
    mrp: 20999,
    discount: '-54%',
    badgeType: 'discount',
    image: '/rugs/bought-2.jpg',
    slug: 'arrow-divide-black-grey-hand-tufted-wool-silk-carpet'
  },
  {
    id: 'pab-3',
    title: 'Gold Sand Linear Abstract Rug',
    price: 11999,
    mrp: 25999,
    discount: '-54%',
    badgeType: 'discount',
    image: '/rugs/bought-3.jpg',
    slug: 'irregular-shaped-rug-driftic-beige-hand-tufted-carpet'
  },
  {
    id: 'pab-4',
    title: 'Arrow Divide Minimalist Contour Rug',
    price: 12999,
    mrp: 24999,
    discount: '👑 Exclusive',
    badgeType: 'exclusive',
    image: '/rugs/bought-4.jpg',
    slug: 'arrow-divide-black-grey-hand-tufted-wool-silk-carpet'
  }
];

const CUSTOMER_PHOTOS = [
  { id: 1, img: '/rugs/rug-1.jpeg', label: 'Warm Living Room in Jaipur', user: 'Ritika M.' },
  { id: 2, img: '/rugs/rug-2.jpeg', label: 'Spacious Lounge in New Delhi', user: 'Sameer K.' },
  { id: 3, img: '/rugs/rug-3.jpeg', label: 'Modern Dining Area in Mumbai', user: 'Ananya S.' },
  { id: 4, img: '/rugs/rug-4.jpeg', label: 'Boho Reading Corner in Bangalore', user: 'Kavita D.' },
  { id: 5, img: '/rugs/rug-5.jpeg', label: 'Contemporary Sectional in Hyderabad', user: 'Aditya P.' },
  { id: 6, img: '/rugs/rug-6.jpeg', label: 'Plush Velvet Living Room in Chandigarh', user: 'Gurpreet S.' },
  { id: 7, img: '/rugs/rug-7.jpeg', label: 'Geometric Accent Rug in Pune', user: 'Meera K.' },
  { id: 8, img: '/rugs/rug-8.jpeg', label: 'Classic Lounge in Kolkata', user: 'Vikram S.' },
  { id: 9, img: '/rugs/rug-9.jpeg', label: 'Ambient Evening Nook in Gurgaon', user: 'Nandini V.' },
  { id: 10, img: '/rugs/rug-10.jpeg', label: 'Macro Texture Detail in Noida', user: 'Garima S.' },
];

const CUSTOMER_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Garima sharma',
    verified: true,
    rating: 3,
    date: '06/21/2026',
    text: 'The material and workmanship are fine . The issue is with the price range and the delivery time . I was promised a discount by the owner/head of the company and a time frame of X days and the carpet arrived way after that . I could have bought something else in the mean time and cancelled the order. They have to be mindful of commitments made at their end. Overall it was a disappointing experience with the product and the way I as a customer was handled'
  },
  {
    id: 'rev-2',
    author: 'Nandini Verma',
    verified: false,
    rating: 5,
    date: '01/25/2026',
    text: 'Placed this irregular rug from Rugroom in my reading corner and it looks perfect. Adds warmth, style, and the rug feels really soft and plush.'
  },
  {
    id: 'rev-3',
    author: 'Arjun Singhania',
    verified: true,
    rating: 5,
    date: '01/14/2026',
    text: 'Ordered the 6x9 size for our master bedroom in South Delhi. The freeform contour breaks the boring boxy lines of the room and the 100% wool density is super thick and comfortable underfoot.'
  },
  {
    id: 'rev-4',
    author: 'Meera Kulkarni',
    verified: true,
    rating: 5,
    date: '12/28/2025',
    text: 'Looks even better in person than the pictures. The subtle oatmeal beige texture hides dust well and feels premium under bare feet. Delivered securely packed within 3 days to Pune. Excellent craftsmanship from Bhadohi.'
  },
  {
    id: 'rev-5',
    author: 'Vikram & Ananya Sen',
    verified: true,
    rating: 5,
    date: '12/04/2025',
    text: 'Custom size 8x10 turned out flawless! We requested custom dimensions for our curved living room nook via WhatsApp. Saif and the artisan team in Bhadohi shared progress photos from the loom. Exceptional customer service and quality.'
  }
];

const getProductCraftData = (product) => {
  const title = product?.title || product?.name || 'Handcrafted Luxury Carpet';
  const origin = product?.origin || 'Bhadohi, Uttar Pradesh';
  const material = product?.material || '100% Pure New Zealand Wool with Bamboo Silk accents';
  const pile = product?.pile || '14mm Sculpted High-Low Plush Pile';

  return {
    quote: `Hand-woven with generational mastery in ${origin.split(',')[0]}—the historic carpet capital of India.`,
    intro: `Every curve and knot of the ${title} reflects the quiet artistry of traditional vertical handlooms. Spun from premium high-density New Zealand wool and kissed with lustrous bamboo silk highlights, it strikes a seamless harmony between timeless craft and modern architectural living.`,
    tactileDescription: `A generous 14mm sculpted high-low pile provides a sink-in plush feel beneath bare feet. Naturally rich in organic lanolin, the virgin wool fibers inherently resist everyday dust and minor spills while maintaining their velvety depth and rich texture for decades.`,
    highlights: [
      {
        icon: '🏛️',
        title: 'Heritage Craftsmanship',
        desc: `100% Hand-tufted in ${origin} by master artisans with generational expertise.`
      },
      {
        icon: '🐑',
        title: 'Artisan Material Blend',
        desc: material.length > 5 ? material : '100% Pure Virgin Wool blended with Bamboo Silk luster.'
      },
      {
        icon: '☁️',
        title: 'Plush Pile Comfort',
        desc: `${pile} designed for superior bounce, warmth, and acoustic insulation.`
      },
      {
        icon: '🌿',
        title: 'Pure Organic Foundation',
        desc: 'Dual-layer unbleached natural cotton canvas with eco-safe odorless natural latex.'
      }
    ],
    roomStyling: 'Designed to anchor living room conversational seating, elevate master bedroom suites, or frame curved lounge spaces with organic warmth.'
  };
};

export default function ProductDetailPage() {
  const { slug, id } = useParams();
  const navigate = useNavigate();
  const { products, categories } = useProducts();
  const { user, logout } = useAuth();

  // Search, Cart & Mobile Drawer State
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pakiza_cart') || '[]');
    } catch {
      return [];
    }
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Selected Product Options
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[0]); // default 3x5 ft
  const [selectedColor, setSelectedColor] = useState(COLOR_VARIANTS[0]);
  const [selectedShape, setSelectedShape] = useState('Irregular');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeCustomerPhoto, setActiveCustomerPhoto] = useState(null);

  // Track scroll position to reveal bottom sticky Add-to-Cart bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 420) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState({
    desc: true,
    specs: true,
    care: false,
    shipping: false
  });

  // Footer Accordion state
  const [openFooterAccordions, setOpenFooterAccordions] = useState({
    quickLinks: false,
    policies: false,
    newsletter: false
  });

  const toggleFooterAccordion = (key) => {
    setOpenFooterAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAccordion = (key) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Resolve active product by slug or id
  const targetIdentifier = slug || id || 'irregular-shaped-rug-driftic-beige-hand-tufted-carpet';
  
  const product = useMemo(() => {
    if (!products || products.length === 0) return null;
    return products.find(p =>
      p.slug === targetIdentifier ||
      p.id === targetIdentifier ||
      (p.title && p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === targetIdentifier.toLowerCase()) ||
      (p.name && p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === targetIdentifier.toLowerCase())
    ) || products[0];
  }, [products, targetIdentifier]);

  // Gallery image array
  const galleryImages = useMemo(() => {
    if (!product) return ['/rugs/cat-irregular.jpg', '/rugs/rug-10.jpeg', '/rugs/rug-12.jpeg', '/rugs/rug-13.jpeg'];
    const imgs = [];
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      imgs.push(...product.images);
    } else {
      if (product.image) imgs.push(product.image);
      if (product.hoverImage) imgs.push(product.hoverImage);
    }
    if (imgs.length < 2) imgs.push('/rugs/rug-10.jpeg');
    if (imgs.length < 3) imgs.push('/rugs/rug-12.jpeg');
    if (imgs.length < 4) imgs.push('/rugs/rug-13.jpeg');
    return imgs;
  }, [product]);

  // Dynamic Price calculation based on chosen size
  const basePrice = Number(product?.price || 9999);
  const calculatedPrice = product?.id === 'prod-driftic-beige'
    ? selectedSize.fixedPrice
    : Math.round(basePrice * selectedSize.multiplier);
  const calculatedMrp = product?.id === 'prod-driftic-beige'
    ? selectedSize.fixedMrp
    : (product?.discountPrice ? Math.round(Number(product.discountPrice) * selectedSize.multiplier) : Math.round(calculatedPrice * 2));
  const savingsAmount = calculatedMrp - calculatedPrice;
  const discountPercent = Math.round((1 - (calculatedPrice / calculatedMrp)) * 100);

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedImageIdx(0);
  }, [targetIdentifier]);

  // Sync Cart to LocalStorage
  const saveCart = (newCart) => {
    setCart(newCart);
    try {
      localStorage.setItem('pakiza_cart', JSON.stringify(newCart));
    } catch (e) {
      console.warn('Could not save cart', e);
    }
  };

  const cartItemCount = useMemo(() => cart.reduce((acc, item) => acc + (item.qty || 1), 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + (Number(item.price || 0) * (item.qty || 1)), 0), [cart]);

  const handleAddToCart = () => {
    if (!product) return;
    const item = {
      id: `${product.id}-${selectedSize.dims}-${selectedColor.name}`,
      productId: product.id,
      title: product.title || product.name,
      name: `${product.title || product.name} (${selectedSize.label})`,
      price: calculatedPrice,
      image: galleryImages[0] || product.image || '/rugs/rug-14.jpeg',
      size: selectedSize.label,
      color: selectedColor.name,
      shape: selectedShape,
      qty: quantity
    };

    const existingIdx = cart.findIndex(c => c.id === item.id);
    let newCart;
    if (existingIdx > -1) {
      newCart = [...cart];
      newCart[existingIdx].qty = (newCart[existingIdx].qty || 1) + quantity;
    } else {
      newCart = [...cart, item];
    }
    saveCart(newCart);
    setIsDrawerOpen(true);
    toast(`✦ Added "${item.name}" to Atelier Cart!`, 'success');
  };

  const handleBuyNow = () => {
    if (!product) return;
    const item = {
      id: `${product.id}-${selectedSize.dims}-${selectedColor.name}`,
      productId: product.id,
      title: product.title || product.name,
      name: `${product.title || product.name} (${selectedSize.label})`,
      price: calculatedPrice,
      image: galleryImages[0] || product.image || '/rugs/rug-14.jpeg',
      size: selectedSize.label,
      color: selectedColor.name,
      shape: selectedShape,
      qty: quantity
    };
    navigate('/checkout', { state: { buyNowItem: item } });
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    saveCart(newCart);
  };

  const handleWhatsAppBuy = () => {
    const prodName = product?.title || product?.name || 'Handcrafted Luxury Carpet';
    const msg = `Hello Pakiza Rugs & Co! 🌟\n\nI would like to order the following bespoke rug:\n\n• *Product:* ${prodName}\n• *Size:* ${selectedSize.label}\n• *Color:* ${selectedColor.name}\n• *Shape:* ${selectedShape}\n• *Quantity:* ${quantity}\n• *Price:* Rs. ${(calculatedPrice * quantity).toLocaleString('en-IN')}.00\n\nPlease share payment and delivery details. Thank you!`;
    const url = `https://wa.me/917007626680?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    const itemsList = cart.map(i => `• ${i.name} (Qty: ${i.qty || 1}) - Rs. ${(Number(i.price) * (i.qty || 1)).toLocaleString('en-IN')}`).join('\n');
    const msg = `Hello Pakiza Rugs & Co! 🛍️\n\nI would like to checkout my atelier cart:\n\n${itemsList}\n\n*Total Amount:* Rs. ${cartTotal.toLocaleString('en-IN')}.00\n\nPlease confirm availability and payment link.`;
    window.open(`https://wa.me/917007626680?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Related products
  const relatedProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(p => p.id !== product?.id).slice(0, 4);
  }, [products, product]);

  if (!product) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>Loading Rug Collection...</h2>
        <p>Fetching master weavers' creations.</p>
      </div>
    );
  }

  return (
    <>
      {/* ── Top Bar ────────────────────────────────────────── */}
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  navigate(`/collections/all?search=${encodeURIComponent(searchQuery)}`);
                }
              }}
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
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim()) {
                  setIsMobileSearchOpen(false);
                  navigate(`/collections/all?search=${encodeURIComponent(searchQuery)}`);
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
              <li><Link to="/">Home</Link></li>
              <li>
                <Link to="/collections/all" className="nav-shop-link">
                  Shop Collections <span className="nav-caret">▾</span>
                </Link>
                <div className="drop" id="drop">
                  {categoriesData.map((cat) => (
                    <Link key={cat.id} to={`/collections/${cat.slug || cat.id}`}>
                      {cat.name} Carpets
                    </Link>
                  ))}
                  <Link to="/collections/all" style={{ borderTop: '1px solid #ede7df', fontWeight: '700', color: '#9d6e3f' }}>
                    ✦ View All Collections →
                  </Link>
                </div>
              </li>
              <li><Link to="/#custom">Bespoke Custom Rugs</Link></li>
              <li><Link to="/#founder-story">About Our Atelier</Link></li>
              <li><Link to="/#rev">Customer Reviews</Link></li>
              <li><Link to="/collections/all">Explore All Rugs</Link></li>
              <li><Link to="/#contact">Contact Concierge</Link></li>
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
        </ul>
      </aside>

      {/* ── Main Product Detail Content ─────────────────────────────── */}
      <main className="pdp-page">
        {/* Breadcrumb Navigation */}
        <div className="pdp-breadcrumbs">
          <div className="wrap">
            <Link to="/">Home</Link>
            <span className="pdp-sep">/</span>
            <Link to="/collections/all">Collections</Link>
            <span className="pdp-sep">/</span>
            <Link to={`/collections/${product.categoryId || 'hand-tufted'}`}>
              {product.category || 'Hand Tufted Carpets'}
            </Link>
            <span className="pdp-sep">/</span>
            <span className="pdp-current">{product.title || product.name}</span>
          </div>
        </div>

        <section className="pdp-main-section">
          <div className="wrap">
            <div className="pdp-grid">
              {/* ── LEFT COLUMN: Gallery with Vertical Thumbnails & Stacked Lifestyle Shots ── */}
              <div className="pdp-gallery-col">
                <div className="pdp-gallery-wrap">
                  {/* Thumbnails */}
                  <div className="pdp-thumbnails">
                    {galleryImages.map((imgSrc, idx) => (
                      <button
                        key={idx}
                        className={`pdp-thumb-btn ${selectedImageIdx === idx ? 'pdp-thumb-btn--active' : ''}`}
                        onClick={() => setSelectedImageIdx(idx)}
                        aria-label={`View Image ${idx + 1}`}
                      >
                        <img src={imgSrc} alt={`${product.title} view ${idx + 1}`} />
                      </button>
                    ))}
                  </div>

                  {/* Main Featured Image with Zoom */}
                  <div className="pdp-main-img-box">
                    {product.badge && (
                      <span className={`pdp-badge-pill ${product.badge.includes('50%') || product.badge.includes('30%') ? 'pdp-badge-pill--discount' : ''}`}>
                        {product.badge}
                      </span>
                    )}

                    <img
                      src={galleryImages[selectedImageIdx] || product.image || '/rugs/rug-14.jpeg'}
                      alt={product.title || product.name}
                    />

                    <div className="pdp-gallery-actions">
                      <button
                        className="pdp-gallery-btn"
                        onClick={() => toast('🔍 4K High Resolution Visualizer Activated', 'info')}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                          <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                        </svg>
                        Zoom
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional Lifestyle & Texture Visual Cards (Eliminating any empty space on left) */}
                <div className="pdp-gallery-lifestyle-stack">
                  <div className="pdp-lifestyle-card">
                    <img src={galleryImages[1] || '/rugs/rug-10.jpeg'} alt="Room setting styling" />
                    <div className="pdp-lifestyle-caption">
                      <span>🛋️ Living Room Context</span>
                      <small>Organic contouring creates a warm focal point</small>
                    </div>
                  </div>
                  <div className="pdp-lifestyle-card">
                    <img src={galleryImages[2] || '/rugs/rug-12.jpeg'} alt="Plush 14mm wool pile texture" />
                    <div className="pdp-lifestyle-caption">
                      <span>🧶 14mm Sculpted Wool Pile</span>
                      <small>High density plush feel beneath bare feet</small>
                    </div>
                  </div>
                </div>

                {/* Bhadohi Master Atelier Guarantee Box */}
                <div className="pdp-atelier-seal-card">
                  <div className="pdp-atelier-seal-header">
                    <span className="pdp-atelier-seal-icon">🏆</span>
                    <div>
                      <h4>Pakiza Atelier Certified Heritage</h4>
                      <p>Direct from the Master Looms of Bhadohi, Uttar Pradesh</p>
                    </div>
                  </div>
                  <ul className="pdp-atelier-seal-list">
                    <li>✓ 100% Pure New Zealand Wool &amp; Bamboo Silk Blend</li>
                    <li>✓ Hand-Knotted &amp; Sculpted by Master Weavers</li>
                    <li>✓ Hypoallergenic &amp; Naturally Stain-Resistant</li>
                    <li>✓ Insured Pan-India Doorstep Dispatch</li>
                  </ul>
                </div>
              </div>

              {/* ── RIGHT COLUMN: Product Information & Purchase Form ── */}
              <div className="pdp-info-col">
                <div className="pdp-vendor">Pakiza Rugs &amp; Co. Atelier</div>
                <h1 className="pdp-title">{product.title || product.name}</h1>

                {/* Rating & Live View urgency */}
                <div className="pdp-rating-row">
                  <span className="pdp-stars">★★★★★</span>
                  <span className="pdp-rating-count">5.0 (34 Customer Reviews)</span>
                  <span className="pdp-live-views">
                    🔥 4 people are viewing this rug now
                  </span>
                </div>

                {/* Price Display Card */}
                {/* Price Display Card */}
                <div className="pdp-price-box">
                  <div className="pdp-price-row">
                    <span className="pdp-price">Rs. {calculatedPrice.toLocaleString('en-IN')}.00</span>
                    {calculatedMrp > calculatedPrice && (
                      <>
                        <span className="pdp-mrp">Rs. {calculatedMrp.toLocaleString('en-IN')}.00</span>
                        <span className="pdp-save-badge">
                          Save Rs. {savingsAmount.toLocaleString('en-IN')} ({discountPercent}% OFF)
                        </span>
                      </>
                    )}
                  </div>
                  <div className="pdp-tax-note">
                    Inclusive of all taxes &amp; Free Insured Delivery across India.
                  </div>
                </div>

                {/* Live Stock Urgency */}
                <div className="pdp-stock-status">
                  <span className="pdp-pulse-dot" />
                  <span>In Stock — Handcrafted and ready to dispatch within 2-3 business days</span>
                </div>

                {/* Option 1: Sizes Pills */}
                <div className="pdp-option-group">
                  <div className="pdp-option-header">
                    <span className="pdp-option-label">Select Rug Dimensions:</span>
                    <button
                      type="button"
                      className="pdp-size-guide-btn"
                      onClick={() => setShowSizeGuide(true)}
                    >
                      📐 View Rug Size Guide
                    </button>
                  </div>
                  <div className="pdp-size-pills">
                    {SIZE_OPTIONS.map((opt) => {
                      const itemPrice = product?.id === 'prod-driftic-beige'
                        ? opt.fixedPrice
                        : Math.round(basePrice * opt.multiplier);
                      return (
                        <button
                          key={opt.dims}
                          type="button"
                          className={`pdp-size-pill ${selectedSize.dims === opt.dims ? 'pdp-size-pill--active' : ''}`}
                          onClick={() => setSelectedSize(opt)}
                        >
                          <span>{opt.label}</span>
                          <span className="pdp-size-subprice">
                            Rs. {itemPrice.toLocaleString('en-IN')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Option 2: Color Variant Swatches */}
                <div className="pdp-option-group">
                  <div className="pdp-option-header">
                    <span className="pdp-option-label">Colorway: <strong>{selectedColor.name}</strong></span>
                  </div>
                  <div className="pdp-color-swatches">
                    {COLOR_VARIANTS.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        className={`pdp-color-swatch-btn ${selectedColor.name === c.name ? 'pdp-color-swatch-btn--active' : ''}`}
                        onClick={() => setSelectedColor(c)}
                      >
                        <span className="pdp-swatch-circle" style={{ backgroundColor: c.hex }} />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Option 3: Shape Selector */}
                <div className="pdp-option-group">
                  <div className="pdp-option-header">
                    <span className="pdp-option-label">Rug Shape:</span>
                  </div>
                  <div className="pdp-size-pills">
                    {['Irregular', 'Rectangle', 'Round', 'Runner'].map((sh) => (
                      <button
                        key={sh}
                        type="button"
                        className={`pdp-size-pill ${selectedShape === sh ? 'pdp-size-pill--active' : ''}`}
                        onClick={() => setSelectedShape(sh)}
                        style={{ padding: '8px 22px' }}
                      >
                        <span>{sh}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Add to Cart + WhatsApp Buy */}
                <div className="pdp-action-area">
                  <div className="pdp-qty-and-cart">
                    <div className="pdp-qty-box">
                      <button
                        type="button"
                        className="pdp-qty-btn"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="pdp-qty-val">{quantity}</span>
                      <button
                        type="button"
                        className="pdp-qty-btn"
                        onClick={() => setQuantity(quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="pdp-btn-add-cart"
                      onClick={handleAddToCart}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                      </svg>
                      ✦ Add to Cart
                    </button>

                    <button
                      type="button"
                      className="pdp-btn-buy-now"
                      onClick={handleBuyNow}
                    >
                      ⚡ Buy It Now
                    </button>
                  </div>

                  {/* WhatsApp Instant Checkout */}
                  <button
                    type="button"
                    className="pdp-btn-whatsapp-buy"
                    onClick={handleWhatsAppBuy}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.77 14.16c-.24.68-1.2 1.25-1.68 1.3-.47.05-1.07.07-3.46-.92-2.88-1.19-4.73-4.14-4.87-4.33-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.66.5.24.58.82 2.01.9 2.16.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.7 2.11 1.17 1.04 2.15 1.36 2.46 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.84.87 2.16 1.03.32.16.53.24.61.37.08.13.08.77-.16 1.45z" />
                    </svg>
                    ⚡ Buy with WhatsApp / Instant Checkout
                  </button>

                  {/* Sub Actions: Wishlist & Share */}
                  <div className="pdp-sub-actions">
                    <button
                      type="button"
                      className="pdp-sub-btn"
                      onClick={() => {
                        setIsWishlisted(!isWishlisted);
                        toast(isWishlisted ? 'Removed from Wishlist' : '✦ Added to Your Luxury Wishlist', 'success');
                      }}
                    >
                      <span style={{ color: isWishlisted ? '#dc2626' : 'inherit' }}>
                        {isWishlisted ? '♥ Saved in Wishlist' : '♡ Add to Wishlist'}
                      </span>
                    </button>

                    <button
                      type="button"
                      className="pdp-sub-btn"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({ title: product.title, url: window.location.href });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          toast('Link copied to clipboard!', 'info');
                        }
                      }}
                    >
                      <span>🔗 Share This Rug</span>
                    </button>
                  </div>
                </div>

                {/* Trust Badges Grid */}
                <div className="pdp-trust-grid">
                  <div className="pdp-trust-item">
                    <div className="pdp-trust-icon">🚚</div>
                    <div className="pdp-trust-text">
                      <strong>Free Doorstep Delivery</strong>
                      <span>Insured shipping pan-India</span>
                    </div>
                  </div>

                  <div className="pdp-trust-item">
                    <div className="pdp-trust-icon">🧶</div>
                    <div className="pdp-trust-text">
                      <strong>Pure NZ Wool &amp; Silk</strong>
                      <span>High-density plush pile</span>
                    </div>
                  </div>

                  <div className="pdp-trust-item">
                    <div className="pdp-trust-icon">✋</div>
                    <div className="pdp-trust-text">
                      <strong>100% Handcrafted</strong>
                      <span>By master Bhadohi weavers</span>
                    </div>
                  </div>

                  <div className="pdp-trust-item">
                    <div className="pdp-trust-icon">🔄</div>
                    <div className="pdp-trust-text">
                      <strong>7-Day Easy Exchange</strong>
                      <span>Hassle-free guarantee</span>
                    </div>
                  </div>
                </div>

                {/* Accordion Tabs */}
                <div className="pdp-accordions">
                  {/* 1. Description & Craft Story */}
                  <div className="pdp-acc-item">
                    <button
                      className="pdp-acc-header"
                      onClick={() => toggleAccordion('desc')}
                    >
                      <span className="pdp-acc-title">Product Details &amp; Craft Story</span>
                      <span className="pdp-acc-icon">{openAccordions.desc ? '−' : '+'}</span>
                    </button>
                    {openAccordions.desc && (() => {
                      const storyData = getProductCraftData(product);
                      return (
                        <div className="pdp-acc-body pdp-craft-story">
                          <blockquote className="pdp-craft-quote">
                            “{storyData.quote}”
                          </blockquote>

                          <p className="pdp-craft-para">
                            {storyData.intro}
                          </p>

                          <p className="pdp-craft-para">
                            {storyData.tactileDescription}
                          </p>

                          <div className="pdp-craft-highlights-grid">
                            {storyData.highlights.map((item, idx) => (
                              <div key={idx} className="pdp-craft-highlight-card">
                                <div className="pdp-craft-card-header">
                                  <span className="pdp-craft-icon">{item.icon}</span>
                                  <h4 className="pdp-craft-item-title">{item.title}</h4>
                                </div>
                                <p className="pdp-craft-item-desc">{item.desc}</p>
                              </div>
                            ))}
                          </div>

                          <div className="pdp-craft-styling-banner">
                            <span className="pdp-craft-styling-tag">✦ Interior Styling Guidance</span>
                            <p className="pdp-craft-styling-text">{storyData.roomStyling}</p>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* 2. Specifications */}
                  <div className="pdp-acc-item">
                    <button
                      className="pdp-acc-header"
                      onClick={() => toggleAccordion('specs')}
                    >
                      <span className="pdp-acc-title">Specifications &amp; Craft Details</span>
                      <span className="pdp-acc-icon">{openAccordions.specs ? '−' : '+'}</span>
                    </button>
                    {openAccordions.specs && (
                      <div className="pdp-acc-body">
                        <table className="pdp-spec-table">
                          <tbody>
                            <tr>
                              <td>Craft / Weave</td>
                              <td>100% Hand-Tufted on Traditional Vertical Looms</td>
                            </tr>
                            <tr>
                              <td>Material Composition</td>
                              <td>
                                {product.material && product.material.length > 8 && !product.material.toLowerCase().startsWith('wool')
                                  ? product.material
                                  : '100% Pure New Zealand Wool with Bamboo Silk highlights'}
                              </td>
                            </tr>
                            <tr>
                              <td>Pile Height</td>
                              <td>14mm Sculpted High-Low Plush Pile</td>
                            </tr>
                            <tr>
                              <td>Backing</td>
                              <td>100% Natural Cotton Canvas Backing with Odorless Natural Latex</td>
                            </tr>
                            <tr>
                              <td>Origin</td>
                              <td>Bhadohi, Uttar Pradesh, India (Carpet Capital)</td>
                            </tr>
                            <tr>
                              <td>Quality Grade</td>
                              <td>Export-Grade Tier 1 Luxury Finish</td>
                            </tr>
                            <tr>
                              <td>SKU</td>
                              <td>{product.sku || 'PAK-LUX-01'}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* 3. Care Instructions */}
                  <div className="pdp-acc-item">
                    <button
                      className="pdp-acc-header"
                      onClick={() => toggleAccordion('care')}
                    >
                      <span className="pdp-acc-title">Care &amp; Maintenance</span>
                      <span className="pdp-acc-icon">{openAccordions.care ? '−' : '+'}</span>
                    </button>
                    {openAccordions.care && (
                      <div className="pdp-acc-body">
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                          <li style={{ marginBottom: '8px' }}>Vacuum regularly in the direction of the pile using a brushless suction attachment.</li>
                          <li style={{ marginBottom: '8px' }}>Blot spills immediately with a clean, un-dyed damp cloth. Avoid vigorous rubbing.</li>
                          <li style={{ marginBottom: '8px' }}>Professional rug cleaning is recommended every 12–18 months for best longevity.</li>
                          <li>Rotate your carpet every 6 months to ensure even wear and light exposure.</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* 4. Shipping & Returns */}
                  <div className="pdp-acc-item">
                    <button
                      className="pdp-acc-header"
                      onClick={() => toggleAccordion('shipping')}
                    >
                      <span className="pdp-acc-title">Shipping &amp; Returns Policy</span>
                      <span className="pdp-acc-icon">{openAccordions.shipping ? '−' : '+'}</span>
                    </button>
                    {openAccordions.shipping && (
                      <div className="pdp-acc-body">
                        <p style={{ margin: '0 0 10px', lineHeight: '1.7' }}>
                          We offer complimentary insured doorstep shipping for all rug orders across India. Ready stock dispatches within 2-3 business days. Custom bespoke orders take approximately 14-21 days to hand weave and finish.
                        </p>
                        <p style={{ margin: 0, lineHeight: '1.7', color: '#8c6738', fontWeight: 600 }}>
                          ✓ 7-Day Hassle-Free Exchange Guarantee on all standard sizes.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Bespoke Custom Rug Inquiry Banner ── */}
            <div className="pdp-custom-banner">
              <div>
                <h3>Need a Custom Dimension or Bespoke Palette?</h3>
                <p>
                  Our master weavers in Bhadohi can hand-tuft this exact organic silhouette in any custom room dimension, runner length, or custom shade.
                </p>
              </div>
              <a
                href={`https://wa.me/917007626680?text=${encodeURIComponent(`Hello Pakiza Rugs! I am interested in customizing "${product.title || product.name}" for my space.`)}`}
                target="_blank"
                rel="noreferrer"
              >
                ✦ Consult Our Master Weaver
              </a>
            </div>
          </div>
        </section>

        {/* ── Why Choose Our Carpets Section ── */}
        <section className="pdp-why-section">
          <div className="wrap">
            <div className="pdp-why-header">
              <h2 className="pdp-why-title">
                Why Choose <em>Our Carpets</em>?
              </h2>
            </div>

            <div className="pdp-why-grid">
              {/* Card 01 */}
              <div className="pdp-why-card">
                <div className="pdp-why-img-wrap">
                  <span className="pdp-why-num">01</span>
                  <img src="/rugs/why-wool.jpg" alt="Crafted From Premium Wool" className="pdp-why-img" />
                </div>
                <div className="pdp-why-content">
                  <h3 className="pdp-why-card-title">Crafted From Premium Wool</h3>
                  <p className="pdp-why-card-desc">
                    Made with 100% pure New Zealand wool, naturally stain-resistant and long-lasting comfort.
                  </p>
                </div>
              </div>

              {/* Card 02 */}
              <div className="pdp-why-card">
                <div className="pdp-why-img-wrap">
                  <span className="pdp-why-num">02</span>
                  <img src="/rugs/why-eco.jpg" alt="Eco-Friendly & Sustainable" className="pdp-why-img" />
                </div>
                <div className="pdp-why-content">
                  <h3 className="pdp-why-card-title">Eco-Friendly &amp; Sustainable</h3>
                  <p className="pdp-why-card-desc">
                    Biodegradable, non-toxic organic dyes, making it safe for children, pets, and your living sanctuary.
                  </p>
                </div>
              </div>

              {/* Card 03 */}
              <div className="pdp-why-card">
                <div className="pdp-why-img-wrap">
                  <span className="pdp-why-num">03</span>
                  <img src="/rugs/why-handmade.jpg" alt="Handmade Quality" className="pdp-why-img" />
                </div>
                <div className="pdp-why-content">
                  <h3 className="pdp-why-card-title">Handmade Quality</h3>
                  <p className="pdp-why-card-desc">
                    Masterfully hand-tufted &amp; carved by skilled third-generation Bhadohi carpet artisans.
                  </p>
                </div>
              </div>

              {/* Card 04 */}
              <div className="pdp-why-card">
                <div className="pdp-why-img-wrap">
                  <span className="pdp-why-num">04</span>
                  <img src="/rugs/why-clean.jpg" alt="Easy to Clean" className="pdp-why-img" />
                </div>
                <div className="pdp-why-content">
                  <h3 className="pdp-why-card-title pdp-why-card-title--gold">Easy to Clean</h3>
                  <p className="pdp-why-card-desc">
                    Naturally resilient wool fibers repel spills, allowing easy spot cleaning and effortless vacuuming.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── People Also Bought Section ── */}
        <section className="pdp-also-bought-section">
          <div className="wrap">
            <div className="pdp-also-bought-header">
              <h2 className="pdp-also-bought-title">People Also Bought</h2>
              <p className="pdp-also-bought-subtitle">
                Here’s some of our most similar products people are buying. Click to discover trending style.
              </p>
            </div>

            <div className="pdp-also-bought-grid">
              {PEOPLE_ALSO_BOUGHT.map((item) => (
                <Link
                  key={item.id}
                  to={`/products/${item.slug}`}
                  className="pdp-also-bought-card"
                >
                  <div className="pdp-also-bought-img-wrap">
                    {item.badgeType === 'discount' ? (
                      <span className="pdp-pab-badge pdp-pab-badge--discount">{item.discount}</span>
                    ) : (
                      <span className="pdp-pab-badge pdp-pab-badge--exclusive">{item.discount}</span>
                    )}
                    <img src={item.image} alt={item.title} className="pdp-also-bought-img" />
                  </div>
                  <div className="pdp-also-bought-info">
                    <h4 className="pdp-also-bought-prod-title">{item.title}</h4>
                    <div className="pdp-also-bought-price-row">
                      <span className="pdp-also-bought-price">
                        Rs. {item.price.toLocaleString('en-IN')}.00
                      </span>
                      {item.mrp && (
                        <span className="pdp-also-bought-mrp">
                          Rs. {item.mrp.toLocaleString('en-IN')}.00
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Customer Photos Section ── */}
        <section className="pdp-customer-photos-section">
          <div className="wrap">
            <div className="pdp-customer-photos-header">
              <h2 className="pdp-customer-photos-title">Customer Photos</h2>
            </div>

            <div className="pdp-customer-photos-grid">
              {CUSTOMER_PHOTOS.map((cp) => (
                <div
                  key={cp.id}
                  className="pdp-customer-photo-item"
                  onClick={() => setActiveCustomerPhoto(cp)}
                  title={`View photo by ${cp.user}`}
                >
                  <img src={cp.img} alt={cp.label} className="pdp-customer-photo-img" />
                  <span className="pdp-customer-photo-badge">{cp.id}</span>
                  <div className="pdp-customer-photo-overlay">
                    <span>🔍 Zoom</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Customer Reviews & Ratings Section ── */}
        <section className="pdp-reviews-section">
          <div className="wrap pdp-reviews-container">
            <div className="pdp-reviews-header">
              <h2>Customer Reviews</h2>
              <div className="pdp-reviews-summary-badge">
                <span style={{ color: '#eab308' }}>★★★★★</span>
                <span>4.8 based on 48 verified customer reviews</span>
              </div>
            </div>

            <div className="pdp-reviews-list">
              {CUSTOMER_REVIEWS.map((rev) => (
                <div key={rev.id} className="pdp-review-row-item">
                  {/* Top: Stars & Date */}
                  <div className="pdp-review-top-meta">
                    <div className="pdp-rev-star-row">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`pdp-rev-star ${star <= rev.rating ? 'pdp-rev-star--filled' : 'pdp-rev-star--empty'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="pdp-rev-date">{rev.date}</span>
                  </div>

                  {/* Middle: Author & Verified Tag */}
                  <div className="pdp-review-author-row">
                    <div className="pdp-rev-avatar-circle">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8c8275" strokeWidth="1.8">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <span className="pdp-rev-author-name">{rev.author}</span>
                    {rev.verified && (
                      <span className="pdp-rev-verified-pill">Verified</span>
                    )}
                  </div>

                  {/* Bottom: Review Content Text */}
                  <p className="pdp-review-body-text">{rev.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Customer Photo Zoom Modal ── */}
      {activeCustomerPhoto && (
        <div className="pdp-modal-backdrop" onClick={() => setActiveCustomerPhoto(null)}>
          <div className="pdp-photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="pdp-modal-close"
              onClick={() => setActiveCustomerPhoto(null)}
              aria-label="Close photo preview"
            >
              ×
            </button>
            <div className="pdp-photo-modal-inner">
              <img
                src={activeCustomerPhoto.img}
                alt={activeCustomerPhoto.label}
                className="pdp-photo-modal-img"
              />
              <div className="pdp-photo-modal-caption">
                <h4>Photo #{activeCustomerPhoto.id} — {activeCustomerPhoto.label}</h4>
                <p>Shared by verified owner {activeCustomerPhoto.user} with Pakiza Rugs Co.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Size Guide Modal ── */}
      {showSizeGuide && (
        <div className="pdp-modal-backdrop" onClick={() => setShowSizeGuide(false)}>
          <div className="pdp-modal-content" onClick={e => e.stopPropagation()}>
            <button className="pdp-modal-close" onClick={() => setShowSizeGuide(false)}>×</button>
            <h2 style={{ fontFamily: 'Jost, sans-serif', marginBottom: '12px' }}>Rug Dimension Guide</h2>
            <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
              Select the ideal proportion for your living room, dining area, or bedroom suite.
            </p>
            <table className="pdp-spec-table" style={{ marginTop: '14px' }}>
              <thead>
                <tr style={{ background: '#2e443c', color: '#fff' }}>
                  <th style={{ padding: '10px 12px', textAlign: 'left' }}>Size (Feet)</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left' }}>Metric (cm)</th>
                  <th style={{ padding: '10px 12px', textAlign: 'left' }}>Recommended Room Placement</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>3 x 5 ft</strong></td>
                  <td>90 x 150 cm</td>
                  <td>Entryways, reading nooks, vanity stations</td>
                </tr>
                <tr>
                  <td><strong>4 x 6 ft</strong></td>
                  <td>120 x 180 cm</td>
                  <td>Compact living rooms, beside queen beds, home study</td>
                </tr>
                <tr>
                  <td><strong>5 x 8 ft</strong></td>
                  <td>150 x 240 cm</td>
                  <td>Standard living rooms (front legs on rug), queen bedrooms</td>
                </tr>
                <tr>
                  <td><strong>6 x 9 ft</strong></td>
                  <td>180 x 270 cm</td>
                  <td>Medium-to-large seating areas, 6-seater dining tables</td>
                </tr>
                <tr>
                  <td><strong>8 x 10 ft</strong></td>
                  <td>240 x 300 cm</td>
                  <td>Spacious living rooms, king size bedrooms, 8-seater dining</td>
                </tr>
                <tr>
                  <td><strong>9 x 12 ft</strong></td>
                  <td>270 x 360 cm</td>
                  <td>Grand living halls, open-plan villas, luxury master suites</td>
                </tr>
              </tbody>
            </table>
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
                  <img src={item.image || '/rugs/rug-14.jpeg'} alt={item.title || item.name} className="ci-img" />
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
            <button
              className="btn"
              disabled={cart.length === 0}
              onClick={() => {
                setIsDrawerOpen(false);
                navigate('/checkout');
              }}
              style={{
                width: '100%',
                background: '#b58849',
                color: '#fff',
                fontWeight: 700,
                padding: '13px',
                borderRadius: '6px',
                border: 'none',
                cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                boxShadow: '0 4px 14px rgba(181, 136, 73, 0.3)',
                opacity: cart.length === 0 ? 0.6 : 1
              }}
            >
              🔒 Proceed to Checkout
            </button>
            <button
              className="btn"
              disabled={cart.length === 0}
              onClick={handleCheckoutWhatsApp}
              style={{
                width: '100%',
                background: '#25d366',
                color: '#fff',
                fontWeight: 700,
                padding: '11px',
                borderRadius: '6px',
                border: 'none',
                cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '13.5px',
                opacity: cart.length === 0 ? 0.6 : 1
              }}
            >
              💬 Checkout via WhatsApp
            </button>
          </div>
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
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Facebook">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="TikTok">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.8V16a7 7 0 1 1-7-7c.7 0 1.4.1 2 .3V12z" />
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="YouTube">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#2e443c" />
                  </svg>
                </a>
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
      {/* ── Sticky Bottom Floating Add-to-Cart Bar ─────────── */}
      <div className={`pdp-sticky-bar ${showStickyBar ? 'pdp-sticky-bar--visible' : ''}`}>
        <div className="pdp-sticky-bar-inner">
          {/* Left: Thumb & Details */}
          <div className="pdp-sticky-product-info">
            <div className="pdp-sticky-thumb-wrap">
              <img
                src={galleryImages[0] || '/rugs/cat-irregular.jpg'}
                alt={product?.title || product?.name}
                className="pdp-sticky-thumb"
              />
              <span className="pdp-sticky-pill-badge">Exclusive</span>
            </div>
            <div className="pdp-sticky-text">
              <div className="pdp-sticky-title">{product?.title || product?.name}</div>
              <div className="pdp-sticky-stars">★★★★★</div>
            </div>
          </div>

          {/* Right: Controls (Size Dropdown, Quantity, Button) */}
          <div className="pdp-sticky-controls">
            <div className="pdp-sticky-select-wrap">
              <select
                className="pdp-sticky-select"
                value={selectedSize.dims}
                onChange={(e) => {
                  const opt = SIZE_OPTIONS.find((s) => s.dims === e.target.value);
                  if (opt) setSelectedSize(opt);
                }}
              >
                {SIZE_OPTIONS.map((opt) => {
                  const optPrice = product?.id === 'prod-driftic-beige'
                    ? opt.fixedPrice
                    : Math.round(basePrice * opt.multiplier);
                  return (
                    <option key={opt.dims} value={opt.dims}>
                      {opt.dims.replace('ft', 'feet')} - Rs. {optPrice.toLocaleString('en-IN')}.00
                    </option>
                  );
                })}
              </select>
              <span className="pdp-sticky-select-arrow">▾</span>
            </div>

            <div className="pdp-sticky-qty-stepper">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="pdp-sticky-add-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="pdp-sticky-buy-btn"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

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
