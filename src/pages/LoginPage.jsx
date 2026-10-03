import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import wordmarkLogo from '../assets/pakiza-3d-wordmark.png';
import authBg from '../assets/auth-bg.jpg';
import './auth.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      if (email === 'admin@pakizarugs.com') {
        navigate('/admin');
      } else {
        navigate('/account');
      }
    } else {
      setError(result.error);
    }
  };

  const fillAdminDemo = () => {
    setEmail('admin@pakizarugs.com');
    setPassword('pakiza@admin2024');
    setError('');
  };

  const fillCustomerDemo = () => {
    setEmail('customer@pakizarugs.com');
    setPassword('customer123');
    setError('');
  };

  return (
    <div className="split-auth">
      {/* ── LEFT SHOWCASE PANEL ──────────────────────────────── */}
      <div className="split-auth__left">
        <img src={authBg} alt="Pakiza Rugs Atelier" className="split-auth__bg-img" />
        <div className="split-auth__overlay" />
        <div className="split-auth__ambient-glow" />

        <Link to="/" className="split-auth__back-home" id="login-back-home" title="Return to Boutique">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Boutique
        </Link>

        <div className="split-auth__left-content">
          <div className="split-auth__badge-pill">
            <span className="split-auth__badge-dot" />
            Heritage Atelier • Est. 1987
          </div>

          <h2 className="split-auth__headline">
            Enter the World of<br />
            <em>Handcrafted Elegance</em>
          </h2>

          <p className="split-auth__tagline">
            Immerse yourself in heirloom hand-knotted creations, crafted with passion by Bhadohi master artisans.
          </p>

          <div className="split-auth__perks">
            <div className="split-auth__perk-item">
              <span className="split-auth__perk-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>100% Pure New Zealand Wool &amp; Real Bamboo Silk</span>
            </div>
            <div className="split-auth__perk-item">
              <span className="split-auth__perk-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>Direct Loom Craftsmanship from Master Weavers</span>
            </div>
            <div className="split-auth__perk-item">
              <span className="split-auth__perk-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>White-Glove Pan-India &amp; Global Insured Delivery</span>
            </div>
          </div>

          <div className="split-auth__testimonial-card">
            <div className="split-auth__stars">★★★★★</div>
            <p className="split-auth__testimonial-text">
              &ldquo;Pakiza's craftsmanship transformed our living sanctuary. Pure heirloom luxury with timeless soul.&rdquo;
            </p>
            <p className="split-auth__testimonial-author">— Aditi &amp; Rajesh S., South Mumbai</p>
          </div>
        </div>
      </div>

      {/* ── RIGHT LOGIN CARD PANEL ───────────────────────────── */}
      <div className="split-auth__right">
        <div className="split-auth__form-wrap">
          {/* 3D Embossed Logo */}
          <div className="split-auth__brand-header">
            <Link to="/" className="split-auth__wordmark-link">
              <img src={wordmarkLogo} alt="Pakiza Rugs Co." className="split-auth__wordmark-img" />
            </Link>
          </div>

          <div className="split-auth__heading">
            <h1>Welcome Back</h1>
            <p>Sign in to manage orders, wishlists &amp; bespoke orders</p>
          </div>

          {/* Quick Demo Pre-fill Bar */}
          <div className="split-auth__demo-bar">
            <span className="split-auth__demo-label">⚡ Demo:</span>
            <button type="button" className="split-auth__demo-btn" onClick={fillAdminDemo} title="Click to fill Admin credentials">
              ✨ Admin Portal
            </button>
            <button type="button" className="split-auth__demo-btn" onClick={fillCustomerDemo} title="Click to fill Customer credentials">
              👤 Customer
            </button>
          </div>

          <form onSubmit={handleSubmit} className="split-auth__form">
            <div className="split-auth__field-group">
              <label className="split-auth__label" htmlFor="login-email">Email Address</label>
              <div className="split-auth__field">
                <span className="split-auth__field-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  id="login-email"
                  type="email"
                  className="split-auth__input"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="split-auth__field-group">
              <label className="split-auth__label" htmlFor="login-password">Password</label>
              <div className="split-auth__field">
                <span className="split-auth__field-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  className="split-auth__input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="split-auth__eye"
                  onClick={() => setShowPass((p) => !p)}
                  aria-label="Toggle password visibility"
                >
                  {showPass ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="split-auth__row">
              <label className="split-auth__remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  id="login-remember"
                />
                <span>Remember this device</span>
              </label>
              <a
                href="#forgot"
                className="split-auth__forgot"
                id="forgot-password-link"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Password reset link has been dispatched to your registered email.');
                }}
              >
                Forgot Password?
              </a>
            </div>

            {error && (
              <div className="split-auth__error">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="split-auth__submit"
              disabled={loading}
              id="login-submit-btn"
            >
              {loading ? <span className="split-auth__spinner" /> : <>SIGN IN TO BOUTIQUE <span>&rarr;</span></>}
            </button>

            <div className="split-auth__divider">
              <span>OR CONTINUE WITH</span>
            </div>

            <button
              type="button"
              className="split-auth__google"
              id="google-login-btn"
              onClick={() => {
                const userData = { email: 'user@google.com', name: 'Google User', role: 'user', avatar: 'GU' };
                localStorage.setItem('pakiza_user', JSON.stringify(userData));
                navigate('/');
                window.location.reload();
              }}
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 12 24 12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.1l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.1C9.4 36.1 16.2 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C37 39.1 44 34 44 24c0-1.3-.1-2.7-.4-3.9z" />
              </svg>
              Sign In with Google
            </button>
          </form>

          <p className="split-auth__switch">
            Don't have an account yet? <Link to="/signup" id="goto-signup-link">Create Account &rarr;</Link>
          </p>

          <div className="split-auth__security-note">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            256-Bit SSL Encrypted &amp; Authentic Guarantee
          </div>
        </div>
      </div>
    </div>
  );
}
