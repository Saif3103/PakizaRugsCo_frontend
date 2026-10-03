import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import wordmarkLogo from '../assets/pakiza-3d-wordmark.png';
import authBg from '../assets/auth-bg.jpg';
import './auth.css';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@pakizarugs.com');
  const [password, setPassword] = useState('pakiza@admin2024');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeDemo, setActiveDemo] = useState('admin');
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
    setActiveDemo('admin');
    setEmail('admin@pakizarugs.com');
    setPassword('pakiza@admin2024');
    setError('');
  };

  const fillCustomerDemo = () => {
    setActiveDemo('customer');
    setEmail('customer@pakizarugs.com');
    setPassword('customer123');
    setError('');
  };

  return (
    <div className="royal-auth-page">
      {/* Background Arch & Oriental Carpet Motifs */}
      <div className="royal-auth-bg">
        <div className="royal-auth-arch-top" />
        <div className="royal-auth-corner-tr" />
        <div className="royal-auth-corner-tl" />
        <div className="royal-auth-carpet-bottom-left" />
        <div className="royal-auth-carpet-bottom-right" />
      </div>

      {/* Main Centered Authentication Container */}
      <div className="royal-auth-card">
        {/* Top Return Link */}
        <Link to="/" className="royal-auth-back-btn" title="Back to Home">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>Store</span>
        </Link>

        {/* ── Brand Crest & Wordmark ──────────────────────── */}
        <div className="royal-auth-brand">
          <Link to="/" className="royal-auth-logo-link">
            {/* Botanical Floral Leaf Crest */}
            <div className="royal-auth-leaf-crest">
              <svg width="44" height="26" viewBox="0 0 50 30" fill="none">
                <path d="M25 2C25 2 28.5 9 25 17C21.5 9 25 2 25 2Z" fill="#1b3a2b" />
                <path d="M25 17C25 17 18 13 13 7C19 7 23 13 25 17Z" fill="#2d523e" />
                <path d="M25 17C25 17 32 13 37 7C31 7 27 13 25 17Z" fill="#2d523e" />
                <path d="M25 17C25 17 16 19 9 17C14 14.5 21 16 25 17Z" fill="#3b6850" />
                <path d="M25 17C25 17 34 19 41 17C36 14.5 29 16 25 17Z" fill="#3b6850" />
                <circle cx="25" cy="20.5" r="1.5" fill="#c5a059" />
              </svg>
            </div>
            {/* Brand Title */}
            <h1 className="royal-auth-brand-name">PAKIZA</h1>
            {/* Subline Divider */}
            <div className="royal-auth-brand-sub">
              <span className="royal-auth-line" />
              <span className="royal-auth-sub-text">RUGS &amp; CO.</span>
              <span className="royal-auth-line" />
            </div>
          </Link>
        </div>

        {/* Filigree Ornament */}
        <div className="royal-auth-filigree">
          <svg width="68" height="14" viewBox="0 0 68 14" fill="none">
            <line x1="0" y1="7" x2="26" y2="7" stroke="#d5c7b2" strokeWidth="1" />
            <path d="M34 2L37 7L34 12L31 7Z" fill="#c5a059" />
            <circle cx="28" cy="7" r="1.5" fill="#d5c7b2" />
            <circle cx="40" cy="7" r="1.5" fill="#d5c7b2" />
            <line x1="42" y1="7" x2="68" y2="7" stroke="#d5c7b2" strokeWidth="1" />
          </svg>
        </div>

        {/* Heading & Subtitle */}
        <div className="royal-auth-heading">
          <h2>Welcome Back</h2>
          <p>Sign in to manage orders, wishlists &amp; bespoke orders</p>
        </div>

        {/* ── Demo Quick Switcher Card ─────────────────────── */}
        <div className="royal-auth-demo-card">
          <div className="royal-auth-demo-label">
            <span className="bolt">⚡</span> DEMO:
          </div>
          <div className="royal-auth-demo-grid">
            <button
              type="button"
              className={`royal-auth-demo-pill ${activeDemo === 'admin' ? 'active' : ''}`}
              onClick={fillAdminDemo}
            >
              <span className="pill-icon">✨</span>
              <span>Admin Portal</span>
            </button>
            <button
              type="button"
              className={`royal-auth-demo-pill ${activeDemo === 'customer' ? 'active' : ''}`}
              onClick={fillCustomerDemo}
            >
              <span className="pill-icon">👤</span>
              <span>Customer</span>
            </button>
          </div>
        </div>

        {/* ── Login Form ──────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="royal-auth-form">
          {/* Email Field */}
          <div className="royal-auth-field-group">
            <label htmlFor="login-email">Email Address</label>
            <div className="royal-auth-input-wrap">
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7e8a83" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <input
                id="login-email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setActiveDemo('');
                }}
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="royal-auth-field-group">
            <label htmlFor="login-password">Password</label>
            <div className="royal-auth-input-wrap">
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7e8a83" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="login-password"
                type={showPass ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setActiveDemo('');
                }}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="eye-toggle-btn"
                onClick={() => setShowPass(!showPass)}
                aria-label="Toggle password visibility"
              >
                {showPass ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7e8a83" strokeWidth="1.8">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7e8a83" strokeWidth="1.8">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember & Forgot Row */}
          <div className="royal-auth-options-row">
            <label className="royal-auth-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Remember this device</span>
            </label>
            <a
              href="#forgot"
              className="royal-auth-forgot"
              onClick={(e) => {
                e.preventDefault();
                alert('Password reset link has been dispatched to your email.');
              }}
            >
              Forgot Password?
            </a>
          </div>

          {/* Error Message */}
          {error && (
            <div className="royal-auth-error">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="royal-auth-submit-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="royal-auth-spinner" />
            ) : (
              <>SIGN IN TO BOUTIQUE &rarr;</>
            )}
          </button>

          {/* Divider */}
          <div className="royal-auth-divider">
            <span>OR CONTINUE WITH</span>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            className="royal-auth-google-btn"
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
            <span>Sign In with Google</span>
          </button>
        </form>

        {/* Switch to Signup */}
        <div className="royal-auth-switch-link">
          Don't have an account yet?{' '}
          <Link to="/signup" className="create-account-link">
            Create Account &rarr;
          </Link>
        </div>

        {/* Security Note */}
        <div className="royal-auth-security-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8a8070" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>256-Bit SSL Encrypted &amp; Authentic Guarantee</span>
        </div>
      </div>
    </div>
  );
}
