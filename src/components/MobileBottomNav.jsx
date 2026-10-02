import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function MobileBottomNav({ onOpenCategories, onOpenQuiz }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      if (scrollPos < 400) {
        setActiveTab('home');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id, tab) => {
    setActiveTab(tab);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="pk-mobile-nav" aria-label="Mobile Navigation">
      {/* 1. Shop */}
      <button
        className={`pk-mobile-nav__item ${activeTab === 'shop' ? 'active' : ''}`}
        onClick={() => scrollToSection('collections', 'shop')}
        aria-label="Shop Collections"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <span>Shop</span>
      </button>

      {/* 2. Category */}
      <button
        className={`pk-mobile-nav__item ${activeTab === 'category' ? 'active' : ''}`}
        onClick={() => {
          if (onOpenCategories) {
            onOpenCategories();
          } else {
            scrollToSection('categories', 'category');
          }
        }}
        aria-label="Categories"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
        <span>Category</span>
      </button>

      {/* 3. Center Elevated Home */}
      <button
        className={`pk-mobile-nav__center-btn ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveTab('home');
        }}
        aria-label="Home"
      >
        <div className="pk-mobile-nav__center-circle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <span>Home</span>
      </button>

      {/* 4. WhatsApp */}
      <a
        href="https://wa.me/917007626680?text=Hello%20Pakiza%20Rugs,%20I%20am%20interested%20in%20your%20luxury%20carpets."
        target="_blank"
        rel="noopener noreferrer"
        className="pk-mobile-nav__item pk-mobile-nav__whatsapp"
        aria-label="Chat on WhatsApp"
        onClick={() => setActiveTab('whatsapp')}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-1.109-.064-.251-.083-.574-.207-1.026-.402-1.895-.819-3.125-2.738-3.22-2.865-.095-.127-.768-1.024-.768-1.954 0-.93.488-1.388.662-1.579.174-.191.38-.239.507-.239.127 0 .254.001.365.006.118.005.275-.045.431.33.16.386.549 1.341.597 1.439.048.098.08.212.016.34-.064.127-.096.207-.191.318-.095.111-.201.248-.287.333-.095.095-.195.198-.084.389.111.191.493.814 1.058 1.318.728.648 1.341.85 1.532.945.191.095.302.08.413-.048.111-.127.476-.556.603-.746.127-.191.254-.159.429-.095.175.064 1.111.524 1.302.619.191.095.318.143.365.222.048.079.048.459-.096.864z"/>
        </svg>
        <span>WhatsApp</span>
      </a>

      {/* 5. Account / Login */}
      {user ? (
        <Link
          to={user.role === 'admin' ? '/admin' : '/'}
          className={`pk-mobile-nav__item ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
          aria-label="My Account"
        >
          <div className="pk-mobile-nav__avatar-badge">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span className="pk-mobile-nav__dot" />
          </div>
          <span>{user.role === 'admin' ? 'Admin' : 'Profile'}</span>
        </Link>
      ) : (
        <Link
          to="/login"
          className={`pk-mobile-nav__item ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
          aria-label="Login"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>Login</span>
        </Link>
      )}
    </nav>
  );
}
