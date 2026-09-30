import { useState, useEffect } from 'react';
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
          <a href="#collections" className="sq-nav__cta-btn" id="nav-shop-btn">
            Shop Collection
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
        </ul>
        <a href="#collections" className="sq-nav__drawer-cta btn--white btn" onClick={() => setMenuOpen(false)}>
          Shop Collection →
        </a>
      </div>
    </nav>
  );
}
