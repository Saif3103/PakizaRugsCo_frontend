import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import pakizaRoyalGoldLogo from '../assets/pakiza-royal-gold-logo.png';
import { toast } from '../utils/toast';
import './checkout.css';

const INDIAN_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
  'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal'
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Load items from direct buy-now state or from cart
  const [items, setItems] = useState(() => {
    if (location.state?.buyNowItem) {
      return [location.state.buyNowItem];
    }
    try {
      const saved = JSON.parse(localStorage.getItem('pakiza_cart') || '[]');
      if (saved.length > 0) return saved;
    } catch {
      // fallback
    }
    return [
      {
        id: 'prod-driftic-beige-default',
        productId: 'prod-driftic-beige',
        name: 'Irregular Shaped Rug Driftic Beige (4 x 6 ft)',
        title: 'Irregular Shaped Rug Driftic Beige Hand Tufted Carpet',
        price: 15999,
        size: '4 x 6 ft',
        color: 'Driftic Beige',
        qty: 1,
        image: '/rugs/cat-irregular.jpg'
      }
    ];
  });

  // Form State
  const [contact, setContact] = useState('');
  const [emailOffers, setEmailOffers] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Uttar Pradesh');
  const [pinCode, setPinCode] = useState('');
  const [phone, setPhone] = useState('');
  const [saveInfo, setSaveInfo] = useState(true);

  // Payment method selection
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay', 'cod', 'whatsapp'
  const [billingSame, setBillingSame] = useState(true);

  // Discount Code
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  // Order Placement Modal
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Calculate Subtotal & Totals
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + (Number(item.price || 0) * (item.qty || 1)), 0);
  }, [items]);

  const discountAmount = useMemo(() => {
    return Math.round((subtotal * discountPercent) / 100);
  }, [subtotal, discountPercent]);

  const total = subtotal - discountAmount;

  // Handle Coupon Apply
  const handleApplyCoupon = (e) => {
    e?.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (!clean) return;
    if (clean === 'PAKIZA10' || clean === 'RUGROOM10' || clean === 'WELCOME10') {
      setDiscountPercent(10);
      setAppliedCoupon(clean);
      toast('✦ Promo code applied! 10% discount added.', 'success');
    } else if (clean === 'ROYAL15') {
      setDiscountPercent(15);
      setAppliedCoupon(clean);
      toast('✦ VIP Promo code applied! 15% discount added.', 'success');
    } else {
      toast('Invalid promo code. Try "PAKIZA10"', 'error');
    }
  };

  // Handle Complete Order
  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (!contact.trim()) {
      toast('Please enter your email or phone number for order updates.', 'error');
      return;
    }
    if (!firstName.trim() || !address.trim() || !city.trim() || !pinCode.trim()) {
      toast('Please fill in complete shipping address details.', 'error');
      return;
    }

    const newOrderNum = `PAK-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(newOrderNum);

    const orderData = {
      orderId: newOrderNum,
      date: new Date().toISOString(),
      customer: {
        name: `${firstName} ${lastName}`.trim(),
        contact,
        phone: phone || contact,
        address: `${address}, ${apartment ? apartment + ', ' : ''}${city}, ${state} - ${pinCode}`
      },
      items,
      subtotal,
      discountAmount,
      total,
      paymentMethod,
      status: 'Confirmed'
    };

    // Store in localStorage orders
    try {
      const existing = JSON.parse(localStorage.getItem('pakiza_orders') || '[]');
      existing.unshift(orderData);
      localStorage.setItem('pakiza_orders', JSON.stringify(existing));
      // Clear cart
      localStorage.removeItem('pakiza_cart');
    } catch (err) {
      console.warn('Could not save order', err);
    }

    setOrderPlaced(true);
    toast(`🎉 Order ${newOrderNum} placed successfully!`, 'success');
  };

  const getWhatsAppOrderLink = () => {
    const itemsText = items.map(i => `• ${i.name || i.title} (Qty: ${i.qty || 1}) - Rs. ${(Number(i.price) * (i.qty || 1)).toLocaleString('en-IN')}`).join('\n');
    const msg = `🌟 *PAKIZA RUGS CO. — NEW ORDER CONFIRMATION*\n\n• *Order #:* ${orderNumber}\n• *Customer:* ${firstName} ${lastName}\n• *Contact:* ${contact} | ${phone}\n• *Address:* ${address}, ${city}, ${state} - ${pinCode}\n\n*Ordered Rugs:*\n${itemsText}\n\n• *Total Amount:* Rs. ${total.toLocaleString('en-IN')}.00\n• *Payment Option:* ${paymentMethod.toUpperCase()}\n\nPlease verify shipment & dispatch schedule. Thank you!`;
    return `https://wa.me/917007626680?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="chk-page">
      <div className="chk-layout">
        {/* ── Left Column: Checkout Form ─────────────────────── */}
        <main className="chk-main">
          {/* Header */}
          <header className="chk-header">
            <Link to="/" className="chk-logo-link" aria-label="Pakiza Rugs Co. Home">
              <img src={pakizaRoyalGoldLogo} alt="Pakiza Rugs Co." className="chk-logo-img" />
            </Link>
          </header>

          {/* Breadcrumb Steps */}
          <nav className="chk-breadcrumbs" aria-label="Checkout Steps">
            <Link to="/cart" className="chk-crumb">Cart</Link>
            <span className="chk-crumb-sep">›</span>
            <span className="chk-crumb chk-crumb--active">Information</span>
            <span className="chk-crumb-sep">›</span>
            <span className="chk-crumb">Shipping</span>
            <span className="chk-crumb-sep">›</span>
            <span className="chk-crumb">Payment</span>
          </nav>

          {/* Express Checkout */}
          <div className="chk-express-box">
            <div className="chk-express-title">Express Checkout</div>
            <div className="chk-express-btns">
              <button
                type="button"
                className="chk-exp-btn chk-exp-btn--gpay"
                onClick={() => toast('Redirecting to Google Pay...', 'info')}
              >
                GPay
              </button>
              <button
                type="button"
                className="chk-exp-btn chk-exp-btn--paytm"
                onClick={() => toast('Redirecting to Paytm UPI...', 'info')}
              >
                Paytm
              </button>
              <button
                type="button"
                className="chk-exp-btn chk-exp-btn--upi"
                onClick={() => toast('Opening UPI Apps...', 'info')}
              >
                PhonePe / UPI
              </button>
            </div>
          </div>

          <div className="chk-divider">
            <span>OR</span>
          </div>

          {/* Main Checkout Form */}
          <form onSubmit={handleSubmitOrder}>
            {/* 1. Contact Info */}
            <div className="chk-section-header">
              <h2 className="chk-section-title">Contact</h2>
              <div className="chk-login-prompt">
                Have an account?
                <Link to="/login" className="chk-login-link">Log in</Link>
              </div>
            </div>

            <div className="chk-field-group">
              <div className="chk-input-wrap">
                <input
                  type="text"
                  className="chk-input"
                  placeholder="Email or mobile phone number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
              </div>
              <label className="chk-checkbox-label">
                <input
                  type="checkbox"
                  className="chk-checkbox"
                  checked={emailOffers}
                  onChange={(e) => setEmailOffers(e.target.checked)}
                />
                <span>Email me with news and exclusive atelier offers</span>
              </label>
            </div>

            {/* 2. Delivery Address */}
            <div className="chk-section-header" style={{ marginTop: '32px' }}>
              <h2 className="chk-section-title">Delivery</h2>
            </div>

            <div className="chk-field-group">
              {/* Country */}
              <div className="chk-input-wrap">
                <select className="chk-input chk-select" defaultValue="India" disabled>
                  <option value="India">India</option>
                </select>
                <span className="chk-select-arrow">▾</span>
              </div>

              {/* First & Last Name */}
              <div className="chk-field-row chk-field-row--2">
                <div className="chk-input-wrap">
                  <input
                    type="text"
                    className="chk-input"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="chk-input-wrap">
                  <input
                    type="text"
                    className="chk-input"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="chk-input-wrap">
                <input
                  type="text"
                  className="chk-input"
                  placeholder="Address (House No., Building, Street)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              {/* Apartment / Suite */}
              <div className="chk-input-wrap">
                <input
                  type="text"
                  className="chk-input"
                  placeholder="Apartment, suite, landmark, etc. (optional)"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                />
              </div>

              {/* City, State, PIN */}
              <div className="chk-field-row chk-field-row--3">
                <div className="chk-input-wrap">
                  <input
                    type="text"
                    className="chk-input"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>

                <div className="chk-input-wrap">
                  <select
                    className="chk-input chk-select"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  <span className="chk-select-arrow">▾</span>
                </div>

                <div className="chk-input-wrap">
                  <input
                    type="text"
                    className="chk-input"
                    placeholder="PIN code"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="chk-input-wrap">
                <input
                  type="tel"
                  className="chk-input"
                  placeholder="Phone number for insured courier updates"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <label className="chk-checkbox-label">
                <input
                  type="checkbox"
                  className="chk-checkbox"
                  checked={saveInfo}
                  onChange={(e) => setSaveInfo(e.target.checked)}
                />
                <span>Save this information for next time</span>
              </label>
            </div>

            {/* 3. Shipping Method */}
            <div className="chk-section-header" style={{ marginTop: '32px' }}>
              <h2 className="chk-section-title">Shipping method</h2>
            </div>
            <div className="chk-shipping-box">
              <div>
                <div className="chk-shipping-name">Complimentary Insured Doorstep Delivery</div>
                <div className="chk-shipping-time">Dispatched via premium express courier (2-3 business days)</div>
              </div>
              <div className="chk-shipping-price">FREE</div>
            </div>

            {/* 4. Payment Options */}
            <div className="chk-section-header" style={{ marginTop: '32px' }}>
              <h2 className="chk-section-title">Payment</h2>
            </div>
            <p style={{ fontSize: '13px', color: '#737373', marginTop: '-8px', marginBottom: '14px' }}>
              All transactions are secure, encrypted, and processed through RBI certified gateways.
            </p>

            <div className="chk-payment-card">
              {/* Option 1: Razorpay / Online */}
              <div
                className={`chk-payment-option ${paymentMethod === 'razorpay' ? 'chk-payment-option--active' : ''}`}
                onClick={() => setPaymentMethod('razorpay')}
              >
                <label className="chk-payment-radio-label">
                  <input
                    type="radio"
                    name="payment_choice"
                    value="razorpay"
                    checked={paymentMethod === 'razorpay'}
                    onChange={() => setPaymentMethod('razorpay')}
                  />
                  <span>Razorpay Secure (UPI, Cards, NetBanking, Wallets)</span>
                </label>
                <div className="chk-payment-icons">
                  <span className="chk-pay-badge">UPI</span>
                  <span className="chk-pay-badge">VISA</span>
                  <span className="chk-pay-badge">MC</span>
                </div>
              </div>

              {paymentMethod === 'razorpay' && (
                <div className="chk-payment-subbox">
                  After clicking "Pay Now", you will be redirected to Razorpay Secure checkout to complete your purchase safely.
                </div>
              )}

              {/* Option 2: Cash On Delivery / Partial Deposit */}
              <div
                className={`chk-payment-option ${paymentMethod === 'cod' ? 'chk-payment-option--active' : ''}`}
                onClick={() => setPaymentMethod('cod')}
              >
                <label className="chk-payment-radio-label">
                  <input
                    type="radio"
                    name="payment_choice"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <span>Cash on Delivery (COD) / Advance Verification</span>
                </label>
                <span className="chk-pay-badge" style={{ background: '#dcfce7', color: '#166534' }}>
                  Available
                </span>
              </div>

              {paymentMethod === 'cod' && (
                <div className="chk-payment-subbox">
                  Our atelier team will call you to confirm rug dimensions and provide tracking before dispatch.
                </div>
              )}

              {/* Option 3: WhatsApp Concierge Order */}
              <div
                className={`chk-payment-option ${paymentMethod === 'whatsapp' ? 'chk-payment-option--active' : ''}`}
                onClick={() => setPaymentMethod('whatsapp')}
              >
                <label className="chk-payment-radio-label">
                  <input
                    type="radio"
                    name="payment_choice"
                    value="whatsapp"
                    checked={paymentMethod === 'whatsapp'}
                    onChange={() => setPaymentMethod('whatsapp')}
                  />
                  <span>Direct WhatsApp Concierge &amp; Custom Invoice</span>
                </label>
                <span className="chk-pay-badge" style={{ background: '#25d366', color: '#fff' }}>
                  Instant
                </span>
              </div>
            </div>

            {/* 5. Action Buttons */}
            <div className="chk-actions">
              <Link to="/cart" className="chk-back-link">
                ‹ Return to cart
              </Link>
              <button type="submit" className="chk-submit-btn">
                {paymentMethod === 'razorpay' ? `Pay Now (Rs. ${total.toLocaleString('en-IN')})` : 'Complete Order'}
              </button>
            </div>

            <div className="chk-trust-note">
              <span>🔒 256-bit SSL Bank-Grade Encryption • Pakiza Rugs Co. Guarantee</span>
            </div>

            {/* Footer Policy Links */}
            <footer className="chk-footer-links">
              <a href="#refund" className="chk-footer-link">Refund policy</a>
              <a href="#shipping" className="chk-footer-link">Shipping policy</a>
              <a href="#privacy" className="chk-footer-link">Privacy policy</a>
              <a href="#terms" className="chk-footer-link">Terms of service</a>
              <a href="#contact" className="chk-footer-link">Contact information</a>
            </footer>
          </form>
        </main>

        {/* ── Right Column: Order Summary ────────────────────── */}
        <aside className="chk-sidebar">
          <div className="chk-sidebar-inner">
            {/* List of Cart Items */}
            <div className="chk-items-list">
              {items.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="chk-item-card">
                  <div className="chk-item-left">
                    <div className="chk-thumb-box">
                      <img src={item.image || '/rugs/cat-irregular.jpg'} alt={item.name || item.title} className="chk-thumb-img" />
                      <span className="chk-qty-badge">{item.qty || 1}</span>
                    </div>
                    <div className="chk-item-info">
                      <div className="chk-item-name">{item.title || item.name}</div>
                      <div className="chk-item-variant">
                        {item.size || '4 x 6 ft'} {item.color ? `• ${item.color}` : ''}
                      </div>
                    </div>
                  </div>
                  <div className="chk-item-price">
                    Rs. {(Number(item.price || 0) * (item.qty || 1)).toLocaleString('en-IN')}.00
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon / Discount Code Box */}
            <form onSubmit={handleApplyCoupon} className="chk-coupon-box">
              <input
                type="text"
                className="chk-coupon-input"
                placeholder="Discount code or gift card"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button type="submit" className="chk-coupon-btn">
                Apply
              </button>
            </form>

            {appliedCoupon && (
              <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: 600, marginBottom: '16px' }}>
                ✓ Coupon "{appliedCoupon}" applied ({discountPercent}% OFF)
              </div>
            )}

            {/* Totals Table */}
            <div className="chk-totals-table">
              <div className="chk-total-row">
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: '#1a1a1a' }}>
                  Rs. {subtotal.toLocaleString('en-IN')}.00
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="chk-total-row" style={{ color: '#16a34a' }}>
                  <span>Discount ({discountPercent}%)</span>
                  <span>- Rs. {discountAmount.toLocaleString('en-IN')}.00</span>
                </div>
              )}

              <div className="chk-total-row">
                <span>Shipping</span>
                <span style={{ fontWeight: 700, color: '#16a34a' }}>FREE</span>
              </div>

              <div className="chk-total-row">
                <span>Estimated taxes (GST Included)</span>
                <span>Rs. 0.00</span>
              </div>

              <div className="chk-grand-total-row">
                <span className="chk-grand-total-label">Total</span>
                <div className="chk-grand-total-val">
                  <span className="chk-currency">INR</span>
                  <span>Rs. {total.toLocaleString('en-IN')}.00</span>
                </div>
              </div>
            </div>

            {/* Trust Points */}
            <div className="chk-side-trust">
              <div className="chk-side-trust-item">
                <span>🛡️</span>
                <span><strong>7-Day Home Trial:</strong> Hassle-free exchange guarantee.</span>
              </div>
              <div className="chk-side-trust-item">
                <span>🧶</span>
                <span><strong>Authentic Bhadohi Weave:</strong> Hand-tufted 100% NZ Wool.</span>
              </div>
              <div className="chk-side-trust-item">
                <span>📦</span>
                <span><strong>Insured Doorstep Transit:</strong> Zero transit damage risk.</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Order Placed Celebration Modal ────────────────────── */}
      {orderPlaced && (
        <div className="chk-success-modal">
          <div className="chk-success-box">
            <div className="chk-success-icon">✓</div>
            <h2 className="chk-success-title">Order Confirmed!</h2>
            <div className="chk-order-number-badge">Order #{orderNumber}</div>
            <p className="chk-success-desc">
              Thank you, <strong>{firstName}</strong>! Your bespoke carpet order has been received at our Bhadohi atelier. We have dispatched a confirmation receipt to <strong>{contact}</strong>.
            </p>

            <div className="chk-success-actions">
              <a
                href={getWhatsAppOrderLink()}
                target="_blank"
                rel="noreferrer"
                className="chk-success-btn chk-success-btn--wa"
              >
                <span>💬 Confirm on WhatsApp</span>
              </a>
              <Link to="/" className="chk-success-btn chk-success-btn--primary">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
