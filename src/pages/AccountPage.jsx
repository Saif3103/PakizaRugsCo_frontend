import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from '../utils/toast';
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
    progressStep: 3,
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
    name: 'Emma Watson',
    phone: '+91 98124 56525',
    street: 'Flat 802, Regency Towers, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050'
  },
  {
    id: 'addr-2',
    isDefault: false,
    tag: 'Design Studio / Office',
    name: 'Emma Watson (Atelier)',
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
  const fileInputRef = useRef(null);

  // Default active tab to 'profile' as requested in reference image
  const [activeTab, setActiveTab] = useState('profile');
  const [profileSubTab, setProfileSubTab] = useState('basic'); // 'basic' | 'password' | 'delete'

  // Profile Form state
  const [firstName, setFirstName] = useState(
    user?.firstName || (user?.name ? user.name.split(' ')[0] : 'Emma')
  );
  const [lastName, setLastName] = useState(
    user?.lastName || (user?.name && user.name.split(' ').length > 1 ? user.name.split(' ').slice(1).join(' ') : 'Watson')
  );
  const [email, setEmail] = useState(user?.email || 'bnicouse@example.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98124 56525');
  const [dob, setDob] = useState(user?.dob || '1996-04-15');
  const [altPhone, setAltPhone] = useState(user?.altPhone || '+91 70076 26680');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '/customer-avatar.jpg');

  // Password tab state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Bank & Wallet Details
  const [bankInfo, setBankInfo] = useState({
    accountHolder: 'Emma Watson',
    accountNumber: '•••• •••• •••• 8924',
    ifsc: 'HDFC0001824',
    bankName: 'HDFC Bank - Bandra West',
    upiId: 'emma.watson@okaxis'
  });

  const [orders, setOrders] = useState(initialOrders);
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [addresses, setAddresses] = useState(initialAddresses);
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

  // Handle Photo Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast('Please upload an image smaller than 5MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        setAvatarUrl(result);
        const updated = { ...user, avatarUrl: result };
        localStorage.setItem('pakiza_user', JSON.stringify(updated));
        toast('✦ Profile picture updated successfully!', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePhoto = () => {
    setAvatarUrl('/customer-avatar.jpg');
    const updated = { ...user, avatarUrl: '/customer-avatar.jpg' };
    localStorage.setItem('pakiza_user', JSON.stringify(updated));
    toast('Profile photo reset to default.', 'info');
  };

  // Handle Save Profile Details
  const handleSaveProfile = (e) => {
    e.preventDefault();
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const updatedUser = {
      ...user,
      name: fullName,
      firstName,
      lastName,
      email,
      phone,
      dob,
      altPhone,
      avatarUrl
    };
    localStorage.setItem('pakiza_user', JSON.stringify(updatedUser));
    toast('✦ Profile details saved successfully!', 'success');
  };

  // Handle Cancel
  const handleCancelProfile = () => {
    setFirstName(user?.firstName || (user?.name ? user.name.split(' ')[0] : 'Emma'));
    setLastName(user?.lastName || (user?.name && user.name.split(' ').length > 1 ? user.name.split(' ').slice(1).join(' ') : 'Watson'));
    setEmail(user?.email || 'bnicouse@example.com');
    setPhone(user?.phone || '+91 98124 56525');
    setDob(user?.dob || '1996-04-15');
    setAltPhone(user?.altPhone || '+91 70076 26680');
    toast('Changes discarded.', 'info');
  };

  // Handle Password Update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast('New password must be at least 6 characters.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast('Passwords do not match.', 'error');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    toast('✦ Password updated successfully!', 'success');
  };

  // Handle Address actions
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
    toast('Address saved successfully!', 'success');
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((a) => a.id !== id));
    toast('Address removed.', 'info');
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
    toast('Default address updated.', 'success');
  };

  const handleRemoveWishlist = (id) => {
    setWishlist(wishlist.filter((w) => w.id !== id));
    toast('Item removed from wishlist.', 'info');
  };

  return (
    <div className="account-shell">
      {/* ── Top Boutique Header ───────────────────────────────── */}
      <header className="account-top-header">
        <div className="account-top-header__inner">
          <Link to="/" className="account-top-header__logo" title="Back to Pakiza Rugs Boutique">
            <img src={logoImg} alt="Pakiza Monogram" className="account-top-header__logo-img" />
            <img src={wordmark3DImg} alt="Pakiza Rugs Co." className="account-top-header__wordmark" />
          </Link>

          <div className="account-top-header__right">
            <Link to="/" className="account-header-back-btn">
              ← Boutique Store
            </Link>
            <button onClick={logout} className="account-header-logout-btn" title="Sign out">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Dashboard Container ─────────────────────────── */}
      <div className="account-dashboard-layout">
        {/* ══════════════════════════════════════════════════════
            LEFT BLUE SIDEBAR (Exact Match to Reference Design)
            ══════════════════════════════════════════════════════ */}
        <aside className="blue-sidebar">
          <div className="blue-sidebar__nav">
            {/* 1. Dashboard Item */}
            <div className="blue-sidebar__single">
              <button
                className={`blue-sidebar__item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <span className="blue-sidebar__icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                  </svg>
                </span>
                <span className="blue-sidebar__label">Dashboard</span>
              </button>
            </div>

            {/* 2. ORDERS Group */}
            <div className="blue-sidebar__group">
              <div className="blue-sidebar__group-title">
                <span>ORDERS</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              <div className="blue-sidebar__group-items">
                <button
                  className={`blue-sidebar__item ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  <span className="blue-sidebar__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                  </span>
                  <span className="blue-sidebar__label">Orders &amp; Returns</span>
                  {orders.length > 0 && <span className="blue-sidebar__count">{orders.length}</span>}
                </button>

                <button
                  className={`blue-sidebar__item ${activeTab === 'shared-catalogs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('shared-catalogs')}
                >
                  <span className="blue-sidebar__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                  </span>
                  <span className="blue-sidebar__label">My Shared Catalogs</span>
                </button>

                <button
                  className={`blue-sidebar__item ${activeTab === 'wishlist' ? 'active' : ''}`}
                  onClick={() => setActiveTab('wishlist')}
                >
                  <span className="blue-sidebar__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </span>
                  <span className="blue-sidebar__label">My Wishlist</span>
                  {wishlist.length > 0 && <span className="blue-sidebar__count">{wishlist.length}</span>}
                </button>
              </div>
            </div>

            {/* 3. ACCOUNT Group (Contains Active Profile) */}
            <div className="blue-sidebar__group">
              <div className="blue-sidebar__group-title">
                <span>ACCOUNT</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              <div className="blue-sidebar__group-items">
                {/* Active Profile Item with distinct card look */}
                <button
                  className={`blue-sidebar__item ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <span className="blue-sidebar__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <span className="blue-sidebar__label">Profile</span>
                </button>

                <button
                  className={`blue-sidebar__item ${activeTab === 'addresses' ? 'active' : ''}`}
                  onClick={() => setActiveTab('addresses')}
                >
                  <span className="blue-sidebar__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <span className="blue-sidebar__label">Manage Addresses</span>
                </button>

                <button
                  className={`blue-sidebar__item ${activeTab === 'bank' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bank')}
                >
                  <span className="blue-sidebar__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="3" y1="21" x2="21" y2="21" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                      <polyline points="5 6 12 3 19 6" />
                      <line x1="4" y1="10" x2="4" y2="21" />
                      <line x1="20" y1="10" x2="20" y2="21" />
                      <line x1="8" y1="14" x2="8" y2="17" />
                      <line x1="12" y1="14" x2="12" y2="17" />
                      <line x1="16" y1="14" x2="16" y2="17" />
                    </svg>
                  </span>
                  <span className="blue-sidebar__label">Bank Details</span>
                </button>

                <button
                  className={`blue-sidebar__item ${activeTab === 'payments' ? 'active' : ''}`}
                  onClick={() => setActiveTab('payments')}
                >
                  <span className="blue-sidebar__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                  </span>
                  <span className="blue-sidebar__label">Payments</span>
                </button>

                <button
                  className={`blue-sidebar__item ${activeTab === 'wallet' ? 'active' : ''}`}
                  onClick={() => setActiveTab('wallet')}
                >
                  <span className="blue-sidebar__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 7h-7" />
                      <path d="M14 17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v2" />
                      <rect x="16" y="9" width="6" height="8" rx="2" />
                    </svg>
                  </span>
                  <span className="blue-sidebar__label">Wallet</span>
                </button>
              </div>
            </div>

            {/* 4. CREDITS Group */}
            <div className="blue-sidebar__group">
              <div className="blue-sidebar__group-title">
                <span>CREDITS</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              <div className="blue-sidebar__group-items">
                <button
                  className={`blue-sidebar__item ${activeTab === 'coupons' ? 'active' : ''}`}
                  onClick={() => setActiveTab('coupons')}
                >
                  <span className="blue-sidebar__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </span>
                  <span className="blue-sidebar__label">Coupons</span>
                </button>

                <button
                  className={`blue-sidebar__item ${activeTab === 'rewards' ? 'active' : ''}`}
                  onClick={() => setActiveTab('rewards')}
                >
                  <span className="blue-sidebar__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="8" r="7" />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                  </span>
                  <span className="blue-sidebar__label">Rewards</span>
                </button>

                <button
                  className={`blue-sidebar__item ${activeTab === 'gifts' ? 'active' : ''}`}
                  onClick={() => setActiveTab('gifts')}
                >
                  <span className="blue-sidebar__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 12 20 22 4 22 4 12" />
                      <rect x="2" y="7" width="20" height="5" />
                      <line x1="12" y1="22" x2="12" y2="7" />
                      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                    </svg>
                  </span>
                  <span className="blue-sidebar__label">Gifts</span>
                </button>

                <button
                  className={`blue-sidebar__item ${activeTab === 'refer' ? 'active' : ''}`}
                  onClick={() => setActiveTab('refer')}
                >
                  <span className="blue-sidebar__icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </span>
                  <span className="blue-sidebar__label">Refer &amp; Earn</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Pinned User Profile Summary Card */}
          <div className="blue-sidebar__footer-card">
            <div className="blue-sidebar__avatar-wrap">
              <img src={avatarUrl} alt={firstName} className="blue-sidebar__avatar-img" />
            </div>
            <div className="blue-sidebar__user-meta">
              <div className="blue-sidebar__user-name">{firstName} {lastName}</div>
              <div className="blue-sidebar__user-phone">{phone}</div>
            </div>
          </div>
        </aside>

        {/* ══════════════════════════════════════════════════════
            MAIN RIGHT PANEL (Matches Reference Image Screen)
            ══════════════════════════════════════════════════════ */}
        <main className="account-main-content">
          {/* ════════════ VIEW 1: MY PROFILE (Exact Target) ════════════ */}
          {activeTab === 'profile' && (
            <div className="profile-card-container">
              {/* Header Title */}
              <h1 className="profile-main-title">My Profile</h1>

              {/* Subtabs Bar: Basic Info, Password Change, Delete Account */}
              <div className="profile-subtabs-bar">
                <button
                  type="button"
                  className={`profile-subtab-btn ${profileSubTab === 'basic' ? 'active' : ''}`}
                  onClick={() => setProfileSubTab('basic')}
                >
                  Basic Info
                </button>
                <button
                  type="button"
                  className={`profile-subtab-btn ${profileSubTab === 'password' ? 'active' : ''}`}
                  onClick={() => setProfileSubTab('password')}
                >
                  Password Change
                </button>
                <button
                  type="button"
                  className={`profile-subtab-btn ${profileSubTab === 'delete' ? 'active' : ''}`}
                  onClick={() => setProfileSubTab('delete')}
                >
                  Delete Account
                </button>
              </div>

              {/* ── Subtab 1: Basic Info ── */}
              {profileSubTab === 'basic' && (
                <div className="profile-tab-pane">
                  {/* Profile Picture Header & Actions */}
                  <div className="profile-pic-section">
                    <div className="profile-pic-avatar-wrap">
                      <img src={avatarUrl} alt="Profile" className="profile-pic-avatar-img" />
                    </div>

                    <div className="profile-pic-info">
                      <h3 className="profile-pic-title">Profile picture</h3>
                      <p className="profile-pic-hint">
                        PNG or JPG no bigger than 1000px wide and tall.
                      </p>

                      <div className="profile-pic-btns-row">
                        {/* Hidden input for photo upload */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          accept="image/png, image/jpeg, image/webp"
                          onChange={handlePhotoUpload}
                        />
                        <button
                          type="button"
                          className="profile-btn-upload"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          <span>Upload New Photo</span>
                        </button>

                        <button
                          type="button"
                          className="profile-btn-delete"
                          onClick={handleDeletePhoto}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                          <span>Delete Photo</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 2-Column Form Fields */}
                  <form onSubmit={handleSaveProfile} className="profile-fields-form">
                    <div className="profile-form-grid">
                      {/* First Name */}
                      <div className="profile-form-group">
                        <label className="profile-form-label" htmlFor="user-first-name">
                          First Name
                        </label>
                        <input
                          id="user-first-name"
                          type="text"
                          className="profile-form-input"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First Name"
                          required
                        />
                      </div>

                      {/* Last Name */}
                      <div className="profile-form-group">
                        <label className="profile-form-label" htmlFor="user-last-name">
                          Last Name
                        </label>
                        <input
                          id="user-last-name"
                          type="text"
                          className="profile-form-input"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last Name"
                          required
                        />
                      </div>

                      {/* Email Address */}
                      <div className="profile-form-group">
                        <label className="profile-form-label" htmlFor="user-email-address">
                          Email Address
                        </label>
                        <input
                          id="user-email-address"
                          type="email"
                          className="profile-form-input"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          required
                        />
                      </div>

                      {/* Phone */}
                      <div className="profile-form-group">
                        <label className="profile-form-label" htmlFor="user-phone-number">
                          Phone
                        </label>
                        <input
                          id="user-phone-number"
                          type="tel"
                          className="profile-form-input"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98124 56525"
                        />
                      </div>

                      {/* Date of Birth */}
                      <div className="profile-form-group">
                        <label className="profile-form-label" htmlFor="user-dob">
                          Date of Birth
                        </label>
                        <input
                          id="user-dob"
                          type="text"
                          className="profile-form-input"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          placeholder="Birthday (dd/mm/yyyy)"
                        />
                      </div>

                      {/* Alternate mobile details */}
                      <div className="profile-form-group">
                        <label className="profile-form-label" htmlFor="user-alt-phone">
                          Alternate mobile details
                        </label>
                        <input
                          id="user-alt-phone"
                          type="text"
                          className="profile-form-input"
                          value={altPhone}
                          onChange={(e) => setAltPhone(e.target.value)}
                          placeholder="Mobile details"
                        />
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="profile-form-actions">
                      <button type="submit" className="profile-btn-save">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Save Details</span>
                      </button>

                      <button
                        type="button"
                        className="profile-btn-cancel"
                        onClick={handleCancelProfile}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        <span>Cancel</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ── Subtab 2: Password Change ── */}
              {profileSubTab === 'password' && (
                <div className="profile-tab-pane">
                  <form onSubmit={handlePasswordUpdate} className="profile-fields-form" style={{ maxWidth: '520px' }}>
                    <div className="profile-form-group" style={{ marginBottom: '16px' }}>
                      <label className="profile-form-label">Current Password</label>
                      <input
                        type="password"
                        className="profile-form-input"
                        placeholder="Enter your current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="profile-form-group" style={{ marginBottom: '16px' }}>
                      <label className="profile-form-label">New Password</label>
                      <input
                        type="password"
                        className="profile-form-input"
                        placeholder="At least 6 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="profile-form-group" style={{ marginBottom: '24px' }}>
                      <label className="profile-form-label">Confirm New Password</label>
                      <input
                        type="password"
                        className="profile-form-input"
                        placeholder="Re-enter your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="profile-form-actions">
                      <button type="submit" className="profile-btn-save">
                        <span>Update Password</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ── Subtab 3: Delete Account ── */}
              {profileSubTab === 'delete' && (
                <div className="profile-tab-pane">
                  <div className="profile-danger-box">
                    <h3>⚠️ Delete Your Pakiza Account</h3>
                    <p>
                      Permanently delete your account, order archives, saved addresses, and active wishlist rugs.
                      This action cannot be undone.
                    </p>
                    <button
                      type="button"
                      className="profile-btn-danger"
                      onClick={() => {
                        if (window.confirm('Are you certain you wish to delete your Pakiza account permanently?')) {
                          logout();
                          navigate('/');
                        }
                      }}
                    >
                      Permanently Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ════════════ VIEW 2: ORDERS & RETURNS ════════════ */}
          {activeTab === 'orders' && (
            <div className="account-inner-view">
              <div className="account-view-header">
                <h2>Orders &amp; Returns</h2>
                <p>Track your handcrafted rugs from Bhadohi looms to doorstep dispatch</p>
              </div>

              {orders.map((order) => (
                <div className="order-card" key={order.id}>
                  <div className="order-card__header">
                    <div>
                      <span className="order-id-text">Order #{order.id}</span>
                      <span className="order-date-text">Placed on {order.date}</span>
                    </div>
                    <span className={`order-status-badge ${order.status}`}>
                      ● {order.statusLabel}
                    </span>
                  </div>

                  <div className="order-tracking-stepper">
                    <div className="tracking-track">
                      <div
                        className="tracking-progress-fill"
                        style={{ width: `${((order.progressStep - 1) / 3) * 100}%` }}
                      />
                      <div className={`tracking-node ${order.progressStep >= 1 ? 'completed' : ''}`}>
                        <div className="tracking-dot">1</div>
                        <span className="tracking-label">Order Placed</span>
                      </div>
                      <div className={`tracking-node ${order.progressStep >= 2 ? 'completed' : ''}`}>
                        <div className="tracking-dot">2</div>
                        <span className="tracking-label">Loom Weaving</span>
                      </div>
                      <div className={`tracking-node ${order.progressStep >= 3 ? 'completed' : ''}`}>
                        <div className="tracking-dot">3</div>
                        <span className="tracking-label">Dispatched</span>
                      </div>
                      <div className={`tracking-node ${order.progressStep >= 4 ? 'completed' : ''}`}>
                        <div className="tracking-dot">4</div>
                        <span className="tracking-label">Delivered</span>
                      </div>
                    </div>
                  </div>

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
                        <div className="order-item-price">{formatPrice(item.price * item.qty)}</div>
                      </div>
                    ))}
                  </div>

                  <div className="order-card__footer">
                    <div className="order-total-sum">
                      Total: <strong>{formatPrice(order.total)}</strong>
                    </div>
                    <div className="order-action-btns">
                      <button
                        className="btn-secondary-sm"
                        onClick={() => alert(`Tracking AWB #${order.trackingNumber} via ${order.courier}`)}
                      >
                        🚚 Live Tracking
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ════════════ VIEW 3: WISHLIST ════════════ */}
          {activeTab === 'wishlist' && (
            <div className="account-inner-view">
              <div className="account-view-header">
                <h2>My Saved Wishlist</h2>
                <p>Rugs reserved for your interior design preview</p>
              </div>

              <div className="wishlist-grid">
                {wishlist.map((item) => (
                  <div className="wishlist-card" key={item.id}>
                    <img src={item.image} alt={item.name} className="wishlist-img" />
                    <div className="wishlist-body">
                      <h4>{item.name}</h4>
                      <div className="wishlist-price">{formatPrice(item.price)}</div>
                      <div className="wishlist-actions">
                        <Link to={`/collections/all`} className="btn-primary-sm">
                          Add to Cart
                        </Link>
                        <button
                          className="btn-secondary-sm"
                          onClick={() => handleRemoveWishlist(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════════ VIEW 4: MANAGE ADDRESSES ════════════ */}
          {activeTab === 'addresses' && (
            <div className="account-inner-view">
              <div className="account-view-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2>Saved Addresses</h2>
                  <p>Manage your doorstep delivery &amp; showroom locations</p>
                </div>
                <button
                  className="profile-btn-save"
                  onClick={() => setShowAddAddress(!showAddAddress)}
                >
                  {showAddAddress ? 'Close Form' : '+ Add New Address'}
                </button>
              </div>

              {showAddAddress && (
                <form onSubmit={handleAddAddress} className="add-address-form" style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
                  <div className="profile-form-grid">
                    <div className="profile-form-group">
                      <label className="profile-form-label">Full Name</label>
                      <input
                        type="text"
                        className="profile-form-input"
                        placeholder="Full Name"
                        value={newAddr.name}
                        onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="profile-form-group">
                      <label className="profile-form-label">Phone Number</label>
                      <input
                        type="tel"
                        className="profile-form-input"
                        placeholder="+91 98124 56525"
                        value={newAddr.phone}
                        onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="profile-form-group" style={{ gridColumn: 'span 2' }}>
                      <label className="profile-form-label">Street / Apartment / Villa</label>
                      <input
                        type="text"
                        className="profile-form-input"
                        placeholder="House / Flat / Street"
                        value={newAddr.street}
                        onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                        required
                      />
                    </div>
                    <div className="profile-form-group">
                      <label className="profile-form-label">City</label>
                      <input
                        type="text"
                        className="profile-form-input"
                        placeholder="City"
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="profile-form-group">
                      <label className="profile-form-label">PIN Code</label>
                      <input
                        type="text"
                        className="profile-form-input"
                        placeholder="6-digit PIN"
                        value={newAddr.pincode}
                        onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <button type="submit" className="profile-btn-save" style={{ marginTop: '16px' }}>
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
                        <span style={{ fontSize: '11px', color: '#11478c', fontWeight: 700, marginLeft: '8px' }}>
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

          {/* ════════════ VIEW 5: BANK & PAYMENTS ════════════ */}
          {activeTab === 'bank' && (
            <div className="account-inner-view">
              <div className="account-view-header">
                <h2>Bank Details</h2>
                <p>Saved bank accounts for verified refunds &amp; custom sizing transactions</p>
              </div>

              <div className="bank-details-card" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px', maxWidth: '600px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#e0edff', color: '#11478c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    🏛️
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{bankInfo.bankName}</h4>
                    <span style={{ fontSize: '12.5px', color: '#64748b' }}>Primary Linked Account • Verified</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px', color: '#334155' }}>
                  <div><strong>Account Holder:</strong> {bankInfo.accountHolder}</div>
                  <div><strong>Account Number:</strong> {bankInfo.accountNumber}</div>
                  <div><strong>IFSC Code:</strong> {bankInfo.ifsc}</div>
                  <div><strong>Linked UPI:</strong> {bankInfo.upiId}</div>
                </div>
              </div>
            </div>
          )}

          {/* ════════════ VIEW 6: WALLET & CREDITS ════════════ */}
          {(activeTab === 'wallet' || activeTab === 'coupons' || activeTab === 'rewards' || activeTab === 'refer' || activeTab === 'gifts') && (
            <div className="account-inner-view">
              <div className="account-view-header">
                <h2>Pakiza Wallet &amp; Privé Rewards</h2>
                <p>Exclusive boutique store credits, membership privileges and reward vouchers</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                <div style={{ background: 'linear-gradient(135deg, #11478c 0%, #1e3a8a 100%)', color: '#ffffff', padding: '24px', borderRadius: '14px' }}>
                  <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.85 }}>Wallet Balance</span>
                  <div style={{ fontSize: '32px', fontWeight: 800, margin: '8px 0 14px' }}>Rs. 1,500.00</div>
                  <span style={{ fontSize: '12px', opacity: 0.9 }}>Applicable instantly at checkout</span>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '24px', borderRadius: '14px' }}>
                  <span style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Exclusive Coupon</span>
                  <div style={{ fontSize: '20px', fontWeight: 800, margin: '8px 0', color: '#11478c' }}>PAKIZA10</div>
                  <span style={{ fontSize: '12.5px', color: '#475569' }}>10% Off introductory discount voucher on bespoke rugs</span>
                </div>
              </div>
            </div>
          )}

          {/* ════════════ VIEW 7: DASHBOARD SUMMARY ════════════ */}
          {activeTab === 'dashboard' && (
            <div className="account-inner-view">
              <div className="account-view-header">
                <h2>Welcome Back, {firstName}!</h2>
                <p>Overview of your Pakiza Rugs boutique orders, rewards and profile</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '18px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Active Orders</span>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#11478c', marginTop: '4px' }}>{orders.length}</div>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '18px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Saved Rugs</span>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#11478c', marginTop: '4px' }}>{wishlist.length}</div>
                </div>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '18px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Saved Addresses</span>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#11478c', marginTop: '4px' }}>{addresses.length}</div>
                </div>
              </div>

              <button
                className="profile-btn-save"
                onClick={() => setActiveTab('profile')}
              >
                Go to My Profile &rarr;
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
