import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import wordmarkLogo from '../assets/pakiza-3d-wordmark.png';
import authBg from '../assets/auth-bg.jpg';
import './auth.css';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!termsAgreed) {
      setError('Please accept the Terms of Service & Privacy Policy');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match. Please verify.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = signup(name, email, password);
    setLoading(false);
    if (result.success) {
      navigate('/account');
    } else {
      setError(result.error);
    }
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'];
  const strengthColor = ['', '#e74c3c', '#e5be7a', '#27ae60'];

  return (
    <div className="split-auth">
      {/* ── LEFT SHOWCASE PANEL ──────────────────────────────── */}
      <div className="split-auth__left">
        <img src={authBg} alt="Pakiza Rugs Atelier" className="split-auth__bg-img" />
        <div className="split-auth__overlay" />
        <div className="split-auth__ambient-glow" />

        <Link to="/" className="split-auth__back-home" id="signup-back-home" title="Return to Boutique">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Boutique
        </Link>

        <div className="split-auth__left-content">
          <div className="split-auth__badge-pill">
            <span className="split-auth__badge-dot" />
            Join The Pakiza Circle
          </div>

          <h2 className="split-auth__headline">
            Begin Your Bespoke<br />
            <em>Rug Experience</em>
          </h2>

          <p className="split-auth__tagline">
            Unlock exclusive private previews, custom rug sizing consultations, and artisan craft stories.
          </p>

          <div className="split-auth__perks">
            <div className="split-auth__perk-item">
              <span className="split-auth__perk-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>Complimentary 1-on-1 Rug Styling Consultation</span>
            </div>
            <div className="split-auth__perk-item">
              <span className="split-auth__perk-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>Priority Access to Limited Masterpiece Drops</span>
            </div>
            <div className="split-auth__perk-item">
              <span className="split-auth__perk-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span>Lifetime Authenticity &amp; Care Assistance</span>
            </div>
          </div>

          <div className="split-auth__testimonial-card">
            <div className="split-auth__stars">★★★★★</div>
            <p className="split-auth__testimonial-text">
              &ldquo;Ordering our customized living room rug was an unforgettable experience. The texture and depth are world-class.&rdquo;
            </p>
            <p className="split-auth__testimonial-author">— Dr. Alok &amp; Neha V., New Delhi</p>
          </div>
        </div>
      </div>

      {/* ── RIGHT SIGNUP CARD PANEL ──────────────────────────── */}
      <div className="split-auth__right">
        <div className="split-auth__form-wrap">
          {/* 3D Embossed Logo */}
          <div className="split-auth__brand-header">
            <Link to="/" className="split-auth__wordmark-link">
              <img src={wordmarkLogo} alt="Pakiza Rugs Co." className="split-auth__wordmark-img" />
            </Link>
          </div>

          <div className="split-auth__heading">
            <h1>Create Account</h1>
            <p>Join the Pakiza family for curated luxury access</p>
          </div>

          <form onSubmit={handleSubmit} className="split-auth__form">
            <div className="split-auth__field-group">
              <label className="split-auth__label" htmlFor="signup-name">Full Name</label>
              <div className="split-auth__field">
                <span className="split-auth__field-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="signup-name"
                  type="text"
                  className="split-auth__input"
                  placeholder="e.g. Saif Ali"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="split-auth__field-group">
              <label className="split-auth__label" htmlFor="signup-email">Email Address</label>
              <div className="split-auth__field">
                <span className="split-auth__field-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <input
                  id="signup-email"
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
              <label className="split-auth__label" htmlFor="signup-password">Create Password</label>
              <div className="split-auth__field">
                <span className="split-auth__field-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="signup-password"
                  type={showPass ? 'text' : 'password'}
                  className="split-auth__input"
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
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

              {password && (
                <div className="split-auth__strength">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="split-auth__strength-bar"
                      style={{
                        background: i <= strength ? strengthColor[strength] : '#e5e0d8',
                      }}
                    />
                  ))}
                  <span
                    className="split-auth__strength-text"
                    style={{ color: strengthColor[strength] }}
                  >
                    {strengthLabel[strength]}
                  </span>
                </div>
              )}
            </div>

            <div className="split-auth__field-group">
              <label className="split-auth__label" htmlFor="signup-confirm">Confirm Password</label>
              <div className="split-auth__field">
                <span className="split-auth__field-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <input
                  id="signup-confirm"
                  type={showPass ? 'text' : 'password'}
                  className="split-auth__input"
                  placeholder="Re-enter password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>

            <div className="split-auth__row">
              <label className="split-auth__remember">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  id="signup-terms"
                />
                <span style={{ fontSize: '12px' }}>
                  I agree to the <a href="#" style={{ color: '#1e3328', fontWeight: '600' }} onClick={(e) => { e.preventDefault(); alert('Terms of Service: Pakiza Rugs Co. provides 100% authentic handcrafted rugs with genuine warranty and secure client protection.'); }}>Terms of Service</a> &amp; <a href="#" style={{ color: '#1e3328', fontWeight: '600' }} onClick={(e) => { e.preventDefault(); alert('Privacy Policy: Your details are encrypted and never shared with 3rd parties.'); }}>Privacy Policy</a>
                </span>
              </label>
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
              id="signup-submit-btn"
            >
              {loading ? <span className="split-auth__spinner" /> : <>CREATE MY ACCOUNT <span>&rarr;</span></>}
            </button>

            <div className="split-auth__divider">
              <span>OR CONTINUE WITH</span>
            </div>

            <button
              type="button"
              className="split-auth__google"
              id="google-signup-btn"
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
              Sign Up with Google
            </button>
          </form>

          <p className="split-auth__switch">
            Already a Pakiza Member? <Link to="/login" id="goto-login-link">Sign In &rarr;</Link>
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
