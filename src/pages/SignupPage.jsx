import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logoImg from "../assets/logo.png";
import authBg from "../assets/auth-bg.jpg";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords do not match"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const result = signup(name, email, password);
    setLoading(false);
    if (result.success) { navigate("/"); } else { setError(result.error); }
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Weak", "Good", "Strong"];
  const strengthColor = ["", "#e74c3c", "#f39c12", "#27ae60"];

  return (
    <div className="split-auth">
      <div className="split-auth__left">
        <img src={authBg} alt="Luxury rug interior" className="split-auth__bg-img" />
        <div className="split-auth__overlay" />
        <Link to="/" className="split-auth__back-home" id="signup-back-home">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to Home
        </Link>
        <div className="split-auth__left-content">
          <div className="split-auth__badge">JOIN THE FAMILY</div>
          <h2 className="split-auth__headline">
            Discover rugs<br /><em>made for you</em>
          </h2>
          <p className="split-auth__tagline">
            Create an account and explore our<br />exclusive collection of handcrafted rugs.
          </p>
        </div>
      </div>

      <div className="split-auth__right">
        <div className="split-auth__form-wrap">
          <div className="split-auth__logo">
            <img src={logoImg} alt="Pakiza Rugs" className="split-auth__logo-img" />
            <div className="split-auth__logo-text">
              <span className="split-auth__logo-main">PAKIZA</span>
              <span className="split-auth__logo-sub">RUGS &amp; CO.</span>
            </div>
          </div>

          <div className="split-auth__heading">
            <h1>Create Account</h1>
            <p>Join the Pakiza family today</p>
          </div>

          <form onSubmit={handleSubmit} className="split-auth__form">
            <div className="split-auth__field">
              <span className="split-auth__field-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
              <input id="signup-name" type="text" className="split-auth__input" placeholder="Full name"
                value={name} onChange={e => setName(e.target.value)} required autoComplete="name" />
            </div>

            <div className="split-auth__field">
              <span className="split-auth__field-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <input id="signup-email" type="email" className="split-auth__input" placeholder="Email address"
                value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
            </div>

            <div className="split-auth__field">
              <span className="split-auth__field-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input id="signup-password" type={showPass ? "text" : "password"} className="split-auth__input"
                placeholder="Password (min 6 chars)" value={password} onChange={e => setPassword(e.target.value)}
                required autoComplete="new-password" />
              <button type="button" className="split-auth__eye" onClick={() => setShowPass(p => !p)}>
                {showPass ? (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>

            {password && (
              <div className="split-auth__strength">
                {[1,2,3].map(i => (
                  <div key={i} className="split-auth__strength-bar"
                    style={{ background: i <= strength ? strengthColor[strength] : "rgba(255,255,255,0.1)" }} />
                ))}
                <span style={{ color: strengthColor[strength], fontSize: "11px", marginLeft: "8px" }}>
                  {strengthLabel[strength]}
                </span>
              </div>
            )}

            <div className="split-auth__field">
              <span className="split-auth__field-icon">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              <input id="signup-confirm" type={showPass ? "text" : "password"} className="split-auth__input"
                placeholder="Confirm password" value={confirm} onChange={e => setConfirm(e.target.value)}
                required autoComplete="new-password" />
            </div>

            {error && (
              <div className="split-auth__error">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <button type="submit" className="split-auth__submit" disabled={loading} id="signup-submit-btn">
              {loading ? <span className="split-auth__spinner" /> : "CREATE ACCOUNT \u2192"}
            </button>

            <div className="split-auth__divider"><span>OR</span></div>

            <button type="button" className="split-auth__google" id="google-signup-btn">
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.9z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 12 24 12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.5 6.5 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.1l-6.2-5.2C29.2 35.3 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8H6.1C9.4 36.1 16.2 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C37 39.1 44 34 44 24c0-1.3-.1-2.7-.4-3.9z"/>
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="split-auth__switch">
            Already have an account? <Link to="/login" id="goto-login-link">Sign In &rarr;</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
