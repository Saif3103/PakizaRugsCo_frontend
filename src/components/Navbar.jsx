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
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`sq-nav${scrolled ? ' sq-nav--scrolled' : ''}${menuOpen ? ' sq-nav--open' : ''}`}>
      <div className="sq-nav__inner container">
        {/* Logo */}
        <a href="#" className="sq-nav__logo" aria-label="Pakiza Rugs & Co. — Home">
          <img src={logoImg} alt="" className="sq-nav__logo-img" />
          <div className="sq-nav__wordmark">
            <span className="sq-nav__word-main">PAKIZA</span>
            <span className="sq-nav__word-sub">RUGS &amp; CO.</span>
          </div>
        </a>

        {/* Center Links */}
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

          {/* Auth Buttons */}
          {user ? (
            <div className="sq-nav__auth-group">
              {user.role === 'admin' && (
                <Link to="/admin" className="sq-nav__admin-btn" id="nav-admin-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                  </svg>
                  Admin Panel
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

          {/* Hamburger */}
          <button
            id="mobile-menu-btn"
            className={`sq-nav__hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`sq-nav__drawer${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <ul>
          {navLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="sq-nav__drawer-link" onClick={() => setMenuOpen(false)}>{l.label}</a>
            </li>
          ))}
          {user ? (
            <>
              {user.role === 'admin' && (
                <li><Link to="/admin" className="sq-nav__drawer-link" onClick={() => setMenuOpen(false)}>Admin Panel</Link></li>
              )}
              <li><button onClick={() => { logout(); setMenuOpen(false); }} className="sq-nav__drawer-link" style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', padding: 0 }}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login" className="sq-nav__drawer-link" onClick={() => setMenuOpen(false)}>Login</Link></li>
          )}
        </ul>
        <a href="#collections" className="sq-nav__drawer-cta btn--white btn" onClick={() => setMenuOpen(false)}>
          Shop Collection →
        </a>
      </div>
    </nav>
  );
}
