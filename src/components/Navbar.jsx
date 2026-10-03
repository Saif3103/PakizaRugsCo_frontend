import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo.png';

const navLinks = [
  { label: 'Collections', href: '#collections' },
  { label: 'Heritage', href: '#heritage' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`sq-nav${scrolled ? ' sq-nav--scrolled' : ''}${menuOpen ? ' sq-nav--open' : ''}`}>
      <div className="sq-nav__inner container">
        
        {/* Left Hamburger — on Mobile */}
        <button
          id="mobile-menu-btn"
          className={`sq-nav__hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>

        {/* Logo */}
        <a href="#" className="sq-nav__logo" aria-label="Pakiza Rugs & Co. — Home">
          <img src={logoImg} alt="" className="sq-nav__logo-img" />
          <div className="sq-nav__wordmark">
            <span className="sq-nav__word-main">PAKIZA</span>
            <span className="sq-nav__word-sub">RUGS &amp; CO.</span>
          </div>
        </a>

        {/* Center Links — desktop only */}
        <ul className="sq-nav__links" role="navigation" aria-label="Main navigation">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="sq-nav__link">{l.label}</a>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="sq-nav__actions">
          <a href="#contact" className="sq-nav__text-cta">Inquire</a>

          {/* Auth Buttons — desktop */}
          {user ? (
            <div className="sq-nav__auth-group">
              {user.role === 'admin' ? (
                <Link to="/admin" className="sq-nav__admin-btn" id="nav-admin-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                  </svg>
                  Admin Panel
                </Link>
              ) : (
                <Link to="/account" className="sq-nav__admin-btn" id="nav-account-btn" style={{ background: '#1e3328', color: '#e5be7a', border: '1px solid #c5a059' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  My Account
                </Link>
              )}
              <button onClick={logout} className="sq-nav__logout-btn" id="nav-logout-btn" title="Logout">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="sq-nav__cta-btn" id="nav-login-btn">
              Login
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          )}

          <a href="#collections" className="sq-nav__shop-btn" id="nav-shop-btn">
            Shop Collection
          </a>

          {/* Mobile-only icon group: Search + Cart + Profile */}
          <div className="sq-nav__mobile-icons">
            <button
              className="sq-nav__icon-btn"
              aria-label="Search"
              id="nav-search-btn"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>

            <a href="#collections" className="sq-nav__icon-btn sq-nav__cart-btn" aria-label="Cart" id="nav-cart-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span className="sq-nav__cart-badge">{cartCount}</span>
            </a>

            <Link
              to={user ? (user.role === 'admin' ? '/admin' : '/account') : '/login'}
              className="sq-nav__icon-btn sq-nav__user-btn"
              aria-label="Account"
              id="nav-user-mobile-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {searchOpen && (
        <div className="sq-nav__search-bar container">
          <input
            type="text"
            placeholder="Search Persian, Silk, Oushak, Kilim..."
            autoFocus
            className="sq-nav__search-input"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const el = document.getElementById('collections');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                setSearchOpen(false);
              }
            }}
          />
          <button className="sq-nav__search-close" onClick={() => setSearchOpen(false)}>✕</button>
        </div>
      )}

      {/* Mobile Drawer */}
      <div className={`sq-nav__drawer${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div className="sq-nav__drawer-top">
          <span className="sq-nav__drawer-title">MENU</span>
          <button className="sq-nav__drawer-close" onClick={() => setMenuOpen(false)}>✕</button>
        </div>
        <ul className="sq-nav__drawer-list">
          <li>
            <a href="#" className="sq-nav__drawer-link" onClick={() => setMenuOpen(false)}>
              <span>Home</span>
              <span className="arrow">→</span>
            </a>
          </li>
          <li>
            <a href="#collections" className="sq-nav__drawer-link" onClick={() => setMenuOpen(false)}>
              <span>Shop Collections</span>
              <span className="arrow">→</span>
            </a>
          </li>
          <li>
            <a href="#categories" className="sq-nav__drawer-link" onClick={() => setMenuOpen(false)}>
              <span>Categories</span>
              <span className="arrow">→</span>
            </a>
          </li>
          <li>
            <a href="#heritage" className="sq-nav__drawer-link" onClick={() => setMenuOpen(false)}>
              <span>Heritage &amp; Craft</span>
              <span className="arrow">→</span>
            </a>
          </li>
          <li>
            <a href="#testimonials" className="sq-nav__drawer-link" onClick={() => setMenuOpen(false)}>
              <span>Collector Reviews</span>
              <span className="arrow">→</span>
            </a>
          </li>
          <li>
            <a href="#faq" className="sq-nav__drawer-link" onClick={() => setMenuOpen(false)}>
              <span>FAQs</span>
              <span className="arrow">→</span>
            </a>
          </li>
          <li>
            <a href="#contact" className="sq-nav__drawer-link" onClick={() => setMenuOpen(false)}>
              <span>Contact Us</span>
              <span className="arrow">→</span>
            </a>
          </li>
        </ul>

        <div className="sq-nav__drawer-footer">
          {user ? (
            <>
              {user.role === 'admin' ? (
                <Link to="/admin" className="sq-nav__drawer-btn sq-nav__drawer-btn--gold" onClick={() => setMenuOpen(false)}>
                  Admin Dashboard
                </Link>
              ) : (
                <Link to="/account" className="sq-nav__drawer-btn sq-nav__drawer-btn--gold" onClick={() => setMenuOpen(false)}>
                  My Account Dashboard
                </Link>
              )}
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                className="sq-nav__drawer-btn sq-nav__drawer-btn--outline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="sq-nav__drawer-btn sq-nav__drawer-btn--gold" onClick={() => setMenuOpen(false)}>
                LOGIN
              </Link>
              <Link to="/signup" className="sq-nav__drawer-btn sq-nav__drawer-btn--outline" onClick={() => setMenuOpen(false)}>
                CREATE ACCOUNT
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
