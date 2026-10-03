import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo.png';
import wordmark3DImg from '../assets/pakiza-3d-wordmark.png';
import './account.css';

// Default mock orders for luxury experience
const initialOrders = [
  {
    id: 'PKZ-89241',
    date: '02 Oct 2026',
    status: 'in-transit',
    statusLabel: 'In Transit • Out for Delivery',
    courier: 'BlueDart Air Express',
    trackingNumber: 'BD-918273645IN',
    estimatedDelivery: '05 Oct 2026',
    progressStep: 3, // 1: Ordered, 2: Loom Weaving, 3: Quality Passed & Shipped, 4: Delivered
    items: [
      {
        id: 'new-0',
        name: 'Geometric Abstract Hand-Tufted Wool Carpet',
        size: "8' x 10' Large Living Room",
        price: 22450,
        qty: 1,
        image: '/rugs/rug-8.jpeg'
      }
    ],
    total: 22450,
    shippingAddress: 'Villa 14, Palm Avenue, Golf Course Road, Gurugram, HR - 122002'
  },
  {
    id: 'PKZ-78104',
    date: '14 Sep 2026',
    status: 'delivered',
    statusLabel: 'Delivered • Signed by Customer',
    courier: 'Delhivery Surface',
    trackingNumber: 'DEL-88291029IN',
    estimatedDelivery: '18 Sep 2026',
    progressStep: 4,
    items: [
      {
        id: 'jute-3',
        name: 'Round Braided Jute Carpet, Emerald Green',
        size: "5' Diameter Circular",
        price: 3199,
        qty: 1,
        image: '/rugs/rug-6.jpeg'
      },
      {
        id: 'lux-3',
        name: 'Blossom Motif Silk Hand Tufted Carpet',
        size: "6' x 9' Master Bedroom",
        price: 12999,
        qty: 1,
        image: '/rugs/rug-18.jpeg'
      }
    ],
    total: 16198,
    shippingAddress: 'Flat 802, Regency Towers, Bandra West, Mumbai, MH - 400050'
  }
];

const initialAddresses = [
  {
    id: 'addr-1',
    isDefault: true,
    tag: 'Home / Primary Residence',
    name: 'Saif Ali',
    phone: '+91 70076 26680',
    street: 'Flat 802, Regency Towers, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050'
  },
  {
    id: 'addr-2',
    isDefault: false,
    tag: 'Design Studio / Office',
    name: 'Saif Ali (Atelier)',
    phone: '+91 91297 88793',
    street: 'Atelier Pakiza, Carpet City Road, Maryadpatti',
    city: 'Bhadohi',
    state: 'Uttar Pradesh',
    pincode: '221401'
  }
];

const initialWishlist = [
  {
    id: 'lux-0',
    name: 'Black and Grey Wool & Silk Carpet',
    price: 12999,
    mrp: 25999,
    image: '/rugs/rug-14.jpeg',
    inStock: true
  },
  {
    id: 'excl-2',
    name: 'Irregular Shaped Curve Hand-Tufted Carpet',
    price: 11999,
    mrp: 0,
    image: '/rugs/rug-7.jpeg',
    inStock: true
  },
  {
    id: 'new-3',
    name: 'Round Indigo Handwoven Jute Carpet',
    price: 4599,
    mrp: 9199,
    image: '/rugs/rug-4.jpeg',
    inStock: true
  }
];

export default function AccountPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders');
  const [profileName, setProfileName] = useState(user?.name || 'Saif Ali');
  const [profileEmail, setProfileEmail] = useState(user?.email || 'customer@pakizarugs.com');
  const [profilePhone, setProfilePhone] = useState('+91 70076 26680');
  const [profileCity, setProfileCity] = useState('Mumbai, Maharashtra');
  const [profileSuccess, setProfileSuccess] = useState('');

  const [orders, setOrders] = useState(initialOrders);
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [addresses, setAddresses] = useState(initialAddresses);
  
  // Address form modal / toggle
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddr, setNewAddr] = useState({
    tag: 'Home',
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const formatPrice = (num) => 'Rs. ' + num.toLocaleString('en-IN');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = { ...user, name: profileName, email: profileEmail };
    localStorage.setItem('pakiza_user', JSON.stringify(updated));
    setProfileSuccess('Profile details successfully updated!');
    setTimeout(() => setProfileSuccess(''), 3500);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.name || !newAddr.street || !newAddr.pincode) return;
    const item = {
      id: 'addr-' + Date.now(),
      isDefault: addresses.length === 0,
      ...newAddr
    };
    setAddresses([...addresses, item]);
    setShowAddAddress(false);
    setNewAddr({ tag: 'Home', name: '', phone: '', street: '', city: '', state: '', pincode: '' });
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
  };

  const handleRemoveWishlist = (id) => {
    setWishlist(wishlist.filter(w => w.id !== id));
  };

  return (
    <div className="account-page">
      {/* ── TOP NAV BAR ────────────────────────────────────────── */}
      <nav className="account-top-nav">
        <div className="account-top-nav__inner">
          <Link to="/" className="account-top-nav__logo" title="Back to Pakiza Rugs Boutique">
            <img src={logoImg} alt="Pakiza Monogram" className="account-top-nav__logo-img" />
            <img src={wordmark3DImg} alt="Pakiza Rugs Co." className="account-top-nav__wordmark" />
          </Link>

          <div className="account-top-nav__actions">
            <Link to="/" className="account-back-btn">
              ← Return to Boutique
            </Link>
            <button onClick={logout} className="account-logout-btn" title="Sign out of account">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO BANNER ────────────────────────────────────────── */}
      <section className="account-hero">
        <div className="account-hero__inner">
          <div className="account-hero__profile">
            <div className="account-avatar">
              {(profileName || 'U').slice(0, 2).toUpperCase()}
              <span className="account-avatar__privilege-badge" title="Pakiza Privé Collector">★</span>
            </div>
            <div className="account-hero__info">
              <h1>Namaste, {profileName || 'Patron'}</h1>
              <div className="account-hero__meta">
                <span>{profileEmail}</span>
                <span>•</span>
                <span>{profilePhone}</span>
                <span>•</span>
                <span className="account-tier-badge">Pakiza Privé Collector</span>
              </div>
            </div>
          </div>

          <div className="account-hero__stats">
            <div className="account-stat-box">
              <span className="account-stat-num">{orders.length}</span>
              <span className="account-stat-label">Orders</span>
            </div>
            <div className="account-stat-box">
              <span className="account-stat-num">{wishlist.length}</span>
              <span className="account-stat-label">Wishlist</span>
            </div>
            <div className="account-stat-box">
              <span className="account-stat-num">1</span>
              <span className="account-stat-label">Bespoke</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN DASHBOARD BODY ────────────────────────────────── */}
      <main className="account-body">
        {/* ── SIDEBAR NAVIGATION ── */}
        <aside className="account-sidebar">
          <ul className="account-nav-list">
            <li className={`account-nav-item ${activeTab === 'orders' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('orders')}>
                <span className="nav-left">
                  <span className="nav-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                  </span>
                  My Orders &amp; Tracking
                </span>
                <span className="account-badge-pill">{orders.length}</span>
              </button>
            </li>

            <li className={`account-nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('wishlist')}>
                <span className="nav-left">
                  <span className="nav-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                  </span>
                  Saved Wishlist
                </span>
                <span className="account-badge-pill">{wishlist.length}</span>
              </button>
            </li>

            <li className={`account-nav-item ${activeTab === 'custom' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('custom')}>
                <span className="nav-left">
                  <span className="nav-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  </span>
                  Bespoke Atelier Orders
                </span>
                <span className="account-badge-pill">1 Active</span>
              </button>
            </li>

            <li className={`account-nav-item ${activeTab === 'addresses' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('addresses')}>
                <span className="nav-left">
                  <span className="nav-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  Saved Addresses
                </span>
              </button>
            </li>

            <li className={`account-nav-item ${activeTab === 'profile' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('profile')}>
                <span className="nav-left">
                  <span className="nav-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  Personal Details &amp; Security
                </span>
              </button>
            </li>

            <li className={`account-nav-item ${activeTab === 'invoices' ? 'active' : ''}`}>
              <button onClick={() => setActiveTab('invoices')}>
                <span className="nav-left">
                  <span className="nav-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                  </span>
                  Tax Invoices &amp; Receipts
                </span>
              </button>
            </li>
          </ul>

          <div className="account-concierge-card">
            <h4>Bespoke Concierge</h4>
            <p>Need urgent help with an active order or room sizing consultation?</p>
            <a
              href="https://wa.me/917007626680?text=Hello%20Pakiza%20Rugs,%20I%20am%20logged%20in%20and%20need%20assistance%20with%20my%20order."
              target="_blank"
              rel="noreferrer"
              className="account-concierge-btn"
            >
              Chat on WhatsApp ↗
            </a>
          </div>
        </aside>

        {/* ── MAIN CONTENT AREA ── */}
        <section className="account-content">
          {/* ════ TAB 1: ORDERS & TRACKING ════ */}
          {activeTab === 'orders' && (
            <div>
              <div className="account-section-header">
                <div>
                  <h2>My Orders &amp; Live Tracking</h2>
                  <p>Track your handcrafted rugs from Bhadohi looms to your doorstep</p>
                </div>
              </div>

              {orders.map((order) => (
                <div className="order-card" key={order.id}>
                  <div className="order-card__header">
                    <div className="order-id-group">
                      <span className="order-id-text">Order #{order.id}</span>
                      <span className="order-date-text">Placed on {order.date}</span>
                    </div>
                    <span className={`order-status-badge ${order.status}`}>
                      ● {order.statusLabel}
                    </span>
                  </div>

                  {/* Real-time Order Stepper */}
                  <div className="order-tracking-stepper">
                    <div className="tracking-track">
                      <div
                        className="tracking-progress-fill"
                        style={{ width: `${((order.progressStep - 1) / 3) * 100}%` }}
                      />
                      <div className={`tracking-node ${order.progressStep >= 1 ? (order.progressStep === 1 ? 'active' : 'completed') : ''}`}>
                        <div className="tracking-dot">1</div>
                        <span className="tracking-label">Order Placed</span>
                      </div>
                      <div className={`tracking-node ${order.progressStep >= 2 ? (order.progressStep === 2 ? 'active' : 'completed') : ''}`}>
                        <div className="tracking-dot">2</div>
                        <span className="tracking-label">Loom Weaving</span>
                      </div>
                      <div className={`tracking-node ${order.progressStep >= 3 ? (order.progressStep === 3 ? 'active' : 'completed') : ''}`}>
                        <div className="tracking-dot">3</div>
                        <span className="tracking-label">Dispatched</span>
                      </div>
                      <div className={`tracking-node ${order.progressStep >= 4 ? 'completed' : ''}`}>
                        <div className="tracking-dot">4</div>
                        <span className="tracking-label">Delivered</span>
                      </div>
                    </div>

                    <div className="tracking-courier-pill">
                      <span><strong>Carrier:</strong> {order.courier} (AWB: {order.trackingNumber})</span>
                      <span><strong>Delivery:</strong> {order.estimatedDelivery}</span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="order-items-list">
                    {order.items.map((item, idx) => (
                      <div className="order-item-row" key={idx}>
                        <div className="order-item-left">
                          <img src={item.image} alt={item.name} className="order-item-img" />
                          <div className="order-item-info">
                            <h4>{item.name}</h4>
                            <div className="order-item-spec">Specification: {item.size} • Qty: {item.qty}</div>
                          </div>
                        </div>
                        <div className="order-item-price">
                          {formatPrice(item.price * item.qty)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-card__footer">
                    <div className="order-total-sum">
                      Grand Total: <strong>{formatPrice(order.total)}</strong> (All Taxes Incl.)
                    </div>
                    <div className="order-action-btns">
                      <button
                        className="btn-secondary-sm"
                        onClick={() => {
                          alert(`Tracking AWB #${order.trackingNumber} with ${order.courier}. Current location: Regional Logistics Hub.`);
                        }}
                      >
                        🚚 Live Tracking
                      </button>
                      <button
                        className="btn-secondary-sm"
                        onClick={() => {
                          setSelectedInvoice(order);
                          setActiveTab('invoices');
                        }}
                      >
                        📄 Download Invoice
                      </button>
                      <a
                        href={`https://wa.me/917007626680?text=Hello%20Pakiza%20Rugs,%20I%20have%20an%20inquiry%20regarding%20Order%20${order.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary-sm"
                      >
                        💬 Help
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ════ TAB 2: SAVED WISHLIST ════ */}
          {activeTab === 'wishlist' && (
            <div>
              <div className="account-section-header">
                <div>
                  <h2>My Saved Wishlist</h2>
                  <p>Handpicked luxury rugs you have saved for your home or studio</p>
                </div>
              </div>

              {wishlist.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 0', color: '#8c9c94' }}>
                  <p style={{ fontSize: '16px', margin: '0 0 16px' }}>Your wishlist is currently empty.</p>
                  <Link to="/#cats" className="btn-gold-save" style={{ textDecoration: 'none', display: 'inline-block' }}>
                    Explore Handcrafted Rugs →
                  </Link>
                </div>
              ) : (
                <div className="wishlist-grid">
                  {wishlist.map((item) => (
                    <div className="wishlist-card" key={item.id}>
                      <div className="wishlist-img-wrap">
                        <img src={item.image} alt={item.name} />
                        <button
                          className="wishlist-remove-btn"
                          onClick={() => handleRemoveWishlist(item.id)}
                          title="Remove from wishlist"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="wishlist-info">
                        <h4>{item.name}</h4>
                        <div className="wishlist-price">{formatPrice(item.price)}</div>
                        <button
                          className="wishlist-move-btn"
                          onClick={() => {
                            alert(`"${item.name}" added to shopping cart.`);
                          }}
                        >
                          Add to Cart →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ════ TAB 3: BESPOKE ATELIER ORDERS ════ */}
          {activeTab === 'custom' && (
            <div>
              <div className="account-section-header">
                <div>
                  <h2>Bespoke Custom Atelier Inquiries</h2>
                  <p>Custom dimensions, hand-spun wool blends, and loom progress updates</p>
                </div>
              </div>

              <div className="bespoke-banner-box">
                <div>
                  <h3>Direct Loom Atelier Craftsmanship</h3>
                  <p>Every custom rug is spun, knotted, and washed by 3rd generation master weavers in Bhadohi.</p>
                </div>
                <a
                  href="https://wa.me/917007626680?text=Hello%20Saif%20Ali,%20I%20would%20like%20to%20commission%20a%20new%20custom%20rug%20design."
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold-save"
                  style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}
                >
                  + Commission New Rug
                </a>
              </div>

              <div className="bespoke-card">
                <div className="bespoke-card-header">
                  <div>
                    <strong style={{ fontSize: '15px', color: '#1e3328' }}>Bespoke Living Sanctuary Rug (Commission #BES-402)</strong>
                    <div style={{ fontSize: '12.5px', color: '#66756d', marginTop: '2px' }}>
                      Dimension: 10' x 14' • Material: 80% NZ Wool + 20% Bamboo Silk • Colorway: Forest Emerald &amp; Antique Gold
                    </div>
                  </div>
                  <span className="bespoke-stage-pill">Stage 2: Yarn Dyeing &amp; Loom Setup</span>
                </div>
                <p style={{ fontSize: '13px', color: '#55665e', lineHeight: 1.5, background: '#fbf9f5', padding: '12px 14px', borderRadius: '8px' }}>
                  <strong>Master Weaver Note:</strong> &ldquo;Natural vegetable dye shades approved. Warp threads set on vertical loom at Bhadohi Atelier. Knotting commences on Monday.&rdquo;
                </p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                  <a
                    href="https://wa.me/917007626680?text=Hello%20Pakiza%20Rugs,%20please%20share%20loom%20video%20update%20for%20BES-402"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary-sm"
                  >
                    🎥 Request Loom Video on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ════ TAB 4: SAVED ADDRESSES ════ */}
          {activeTab === 'addresses' && (
            <div>
              <div className="account-section-header">
                <div>
                  <h2>Saved Shipping Addresses</h2>
                  <p>Manage your delivery locations for white-glove rug installation</p>
                </div>
                <button
                  className="btn-gold-save"
                  onClick={() => setShowAddAddress(!showAddAddress)}
                >
                  {showAddAddress ? '✕ Cancel' : '+ Add New Address'}
                </button>
              </div>

              {showAddAddress && (
                <form onSubmit={handleAddAddress} style={{ background: '#fbf9f5', padding: '24px', borderRadius: '12px', border: '1px solid #ede8df', marginBottom: '24px' }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '20px', margin: '0 0 16px', color: '#1e3328' }}>
                    Add New Delivery Address
                  </h3>
                  <div className="account-form-grid">
                    <div className="account-form-group">
                      <label className="account-form-label">Full Name</label>
                      <input
                        type="text"
                        className="account-form-input"
                        placeholder="Recipient full name"
                        value={newAddr.name}
                        onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="account-form-group">
                      <label className="account-form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="account-form-input"
                        placeholder="+91 98765 43210"
                        value={newAddr.phone}
                        onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="account-form-group account-form-full">
                      <label className="account-form-label">Street Address / Villa / Apartment</label>
                      <input
                        type="text"
                        className="account-form-input"
                        placeholder="House no., Building, Street address"
                        value={newAddr.street}
                        onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                        required
                      />
                    </div>
                    <div className="account-form-group">
                      <label className="account-form-label">City</label>
                      <input
                        type="text"
                        className="account-form-input"
                        placeholder="City"
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="account-form-group">
                      <label className="account-form-label">State</label>
                      <input
                        type="text"
                        className="account-form-input"
                        placeholder="State"
                        value={newAddr.state}
                        onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                        required
                      />
                    </div>
                    <div className="account-form-group">
                      <label className="account-form-label">PIN Code</label>
                      <input
                        type="text"
                        className="account-form-input"
                        placeholder="6-digit PIN"
                        value={newAddr.pincode}
                        onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-gold-save" style={{ marginTop: '16px' }}>
                    Save Address
                  </button>
                </form>
              )}

              <div className="addresses-grid">
                {addresses.map((addr) => (
                  <div className={`address-card ${addr.isDefault ? 'default' : ''}`} key={addr.id}>
                    <div>
                      <span className="address-tag">{addr.tag}</span>
                      {addr.isDefault && (
                        <span style={{ fontSize: '11px', color: '#c5a059', fontWeight: 600, marginLeft: '8px' }}>
                          ★ Default
                        </span>
                      )}
                      <h4 className="address-name">{addr.name}</h4>
                      <p className="address-text">
                        {addr.street}<br />
                        {addr.city}, {addr.state} - {addr.pincode}<br />
                        <strong>Phone:</strong> {addr.phone}
                      </p>
                    </div>

                    <div className="address-actions">
                      {!addr.isDefault && (
                        <button
                          className="address-action-btn"
                          onClick={() => handleSetDefaultAddress(addr.id)}
                        >
                          Set as Default
                        </button>
                      )}
                      <button
                        className="address-action-btn delete"
                        onClick={() => handleDeleteAddress(addr.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════ TAB 5: PERSONAL DETAILS & SECURITY ════ */}
          {activeTab === 'profile' && (
            <div>
              <div className="account-section-header">
                <div>
                  <h2>Personal Details &amp; Security</h2>
                  <p>Update your contact info, boutique preferences and password</p>
                </div>
              </div>

              {profileSuccess && (
                <div style={{ background: '#def7ec', color: '#03543f', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '13.5px' }}>
                  ✓ {profileSuccess}
                </div>
              )}

              <form onSubmit={handleSaveProfile}>
                <div className="account-form-grid">
                  <div className="account-form-group">
                    <label className="account-form-label">Full Name</label>
                    <input
                      type="text"
                      className="account-form-input"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="account-form-group">
                    <label className="account-form-label">Email Address</label>
                    <input
                      type="email"
                      className="account-form-input"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="account-form-group">
                    <label className="account-form-label">Phone Number (with country code)</label>
                    <input
                      type="tel"
                      className="account-form-input"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                    />
                  </div>
                  <div className="account-form-group">
                    <label className="account-form-label">Primary City / Region</label>
                    <input
                      type="text"
                      className="account-form-input"
                      value={profileCity}
                      onChange={(e) => setProfileCity(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #ede8df' }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '20px', margin: '0 0 16px', color: '#1e3328' }}>
                    Change Password
                  </h3>
                  <div className="account-form-grid">
                    <div className="account-form-group">
                      <label className="account-form-label">New Password</label>
                      <input
                        type="password"
                        className="account-form-input"
                        placeholder="Leave blank to keep unchanged"
                      />
                    </div>
                    <div className="account-form-group">
                      <label className="account-form-label">Confirm New Password</label>
                      <input
                        type="password"
                        className="account-form-input"
                        placeholder="Repeat new password"
                      />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '28px' }}>
                  <button type="submit" className="btn-gold-save">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ════ TAB 6: TAX INVOICES & RECEIPTS ════ */}
          {activeTab === 'invoices' && (
            <div>
              <div className="account-section-header">
                <div>
                  <h2>Tax Invoices &amp; Receipts</h2>
                  <p>Official GST invoices for all verified artisan rug acquisitions</p>
                </div>
              </div>

              {selectedInvoice && (
                <div style={{ background: '#fbf9f5', border: '1.5px solid #c5a059', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '22px', margin: 0, color: '#1e3328' }}>
                      Invoice #{selectedInvoice.id}
                    </h3>
                    <button
                      className="btn-secondary-sm"
                      onClick={() => window.print()}
                    >
                      🖨️ Print / Save as PDF
                    </button>
                  </div>
                  <div style={{ fontSize: '13px', color: '#55665e', lineHeight: 1.6 }}>
                    <strong>Supplier:</strong> Pakiza Rugs &amp; Co. (Bhadohi, UP - GSTIN: 09AAECP1029F1ZS)<br />
                    <strong>Customer:</strong> {profileName} ({selectedInvoice.shippingAddress})<br />
                    <strong>Invoice Date:</strong> {selectedInvoice.date}<br />
                    <strong>Amount Paid:</strong> {formatPrice(selectedInvoice.total)} (Inclusive of 12% GST)
                  </div>
                </div>
              )}

              <table className="invoices-table">
                <thead>
                  <tr>
                    <th>Invoice No.</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord) => (
                    <tr key={ord.id}>
                      <td style={{ fontWeight: 600, color: '#1e3328' }}>#{ord.id}</td>
                      <td>{ord.date}</td>
                      <td>{ord.items.length} Rug(s)</td>
                      <td style={{ fontWeight: 700, color: '#1e3328' }}>{formatPrice(ord.total)}</td>
                      <td>
                        <span style={{ color: '#03543f', fontWeight: 600, fontSize: '12px', background: '#def7ec', padding: '2px 8px', borderRadius: '10px' }}>
                          ✓ Paid
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn-secondary-sm"
                          onClick={() => setSelectedInvoice(ord)}
                        >
                          View &amp; Print
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
