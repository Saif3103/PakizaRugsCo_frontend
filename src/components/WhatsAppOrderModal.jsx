import { useState, useEffect } from 'react';
import { openWhatsAppOrder, getWhatsAppNumber } from '../utils/whatsappOrder';
import { toast } from '../utils/toast';

export default function WhatsAppOrderModal({
  isOpen,
  onClose,
  items = [],
  totalPrice = 0,
  onOrderSuccess
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill user details if logged in
  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem('pakiza_user') || 'null');
      if (savedUser) {
        if (savedUser.name) setName(savedUser.name);
        if (savedUser.phone) setPhone(savedUser.phone);
        if (savedUser.address) setAddress(savedUser.address);
      }
    } catch (e) {
      // ignore
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast('Please enter your full name.', 'error');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      toast('Please enter a valid 10-digit mobile/WhatsApp number.', 'error');
      return;
    }
    if (!address.trim() || !city.trim()) {
      toast('Please enter your delivery address and city.', 'error');
      return;
    }

    setSubmitting(true);

    const fullAddress = `${address.trim()}, ${city.trim()}${pinCode.trim() ? ' - ' + pinCode.trim() : ''}`;

    const orderResult = openWhatsAppOrder({
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        contact: phone.trim(),
        address: fullAddress
      },
      items,
      total: totalPrice,
      paymentMethod: 'WhatsApp Direct (COD / Online)',
      notes: notes.trim()
    });

    toast('🎉 Order submitted! Opening WhatsApp chat with our atelier...', 'success');
    setSubmitting(false);

    if (onOrderSuccess) {
      onOrderSuccess(orderResult);
    }
    onClose();
  };

  const handleDirectQuickChat = () => {
    const itemNames = items.map(i => `${i.title || i.name} (${i.size || 'Standard'})`).join(', ');
    const msg = `Hello Pakiza Rugs! 🌟\n\nI want to order: ${itemNames}\nTotal: ₹${Number(totalPrice).toLocaleString('en-IN')}.\n\nPlease guide me on the next steps for dispatch & payment.`;
    const targetNumber = getWhatsAppNumber();
    window.open(`https://wa.me/${targetNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
  };

  return (
    <div className="wa-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="wa-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="wa-modal-header">
          <div className="wa-modal-header__brand">
            <span className="wa-modal-badge">
              <span className="wa-modal-badge__dot" />
              DIRECT ATELIER ORDER
            </span>
            <h3 className="wa-modal-title">Order Directly via WhatsApp</h3>
            <p className="wa-modal-sub">
              Fastest dispatch &bull; Direct confirmation with founder &bull; Pay via UPI or COD
            </p>
          </div>
          <button
            type="button"
            className="wa-modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Rug preview strip */}
        <div className="wa-modal-items-summary">
          {items.map((item, idx) => (
            <div key={idx} className="wa-modal-item-row">
              <img
                src={item.image || '/rugs/cat-irregular.jpg'}
                alt={item.title || item.name}
                className="wa-modal-item-img"
              />
              <div className="wa-modal-item-details">
                <div className="wa-modal-item-name">{item.title || item.name}</div>
                <div className="wa-modal-item-meta">
                  {item.size && <span>Size: {item.size}</span>}
                  {item.color && <span> &bull; Color: {item.color}</span>}
                  {item.qty && <span> &bull; Qty: {item.qty}</span>}
                </div>
              </div>
              <div className="wa-modal-item-price">
                ₹{(Number(item.price || 0) * (item.qty || 1)).toLocaleString('en-IN')}
              </div>
            </div>
          ))}

          <div className="wa-modal-total-bar">
            <span>Grand Total (All Taxes & Shipping Included):</span>
            <strong>₹{Number(totalPrice).toLocaleString('en-IN')}.00</strong>
          </div>
        </div>

        {/* Customer Delivery Form */}
        <form onSubmit={handleSubmit} className="wa-modal-form">
          <div className="wa-form-row wa-form-row--2">
            <div className="wa-form-group">
              <label className="wa-form-label">Full Name *</label>
              <input
                type="text"
                className="wa-form-input"
                placeholder="e.g. Saif Ali"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="wa-form-group">
              <label className="wa-form-label">WhatsApp / Phone Number *</label>
              <div className="wa-phone-input-wrap">
                <span className="wa-phone-prefix">+91</span>
                <input
                  type="tel"
                  className="wa-form-input wa-form-input--phone"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={14}
                  required
                />
              </div>
            </div>
          </div>

          <div className="wa-form-group">
            <label className="wa-form-label">Delivery Address (House / Flat, Street, Area) *</label>
            <input
              type="text"
              className="wa-form-input"
              placeholder="e.g. House #14, Royal Palm Residency, Civil Lines"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="wa-form-row wa-form-row--2">
            <div className="wa-form-group">
              <label className="wa-form-label">City / District *</label>
              <input
                type="text"
                className="wa-form-input"
                placeholder="e.g. Bhadohi / Mumbai / Delhi"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="wa-form-group">
              <label className="wa-form-label">PIN Code *</label>
              <input
                type="text"
                className="wa-form-input"
                placeholder="e.g. 221401"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                maxLength={6}
                required
              />
            </div>
          </div>

          <div className="wa-form-group">
            <label className="wa-form-label">Special Request / Room Instructions (Optional)</label>
            <input
              type="text"
              className="wa-form-input"
              placeholder="e.g. Custom size adjustment, urgent delivery, extra wool pile"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Action buttons */}
          <div className="wa-modal-actions">
            <button
              type="submit"
              className="wa-btn-order"
              disabled={submitting}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.77 14.16c-.24.68-1.2 1.25-1.68 1.3-.47.05-1.07.07-3.46-.92-2.88-1.19-4.73-4.14-4.87-4.33-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.66.5.24.58.82 2.01.9 2.16.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.7 2.11 1.17 1.04 2.15 1.36 2.46 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.84.87 2.16 1.03.32.16.53.24.61.37.08.13.08.77-.16 1.45z" />
              </svg>
              <span>{submitting ? 'Preparing WhatsApp Order...' : 'Send Order to WhatsApp (+91 70076 26680)'}</span>
            </button>

            <button
              type="button"
              className="wa-btn-quick-skip"
              onClick={handleDirectQuickChat}
            >
              💬 Or directly chat with Master Weaver without filling form
            </button>
          </div>

          <div className="wa-modal-guarantee">
            <span>🛡️ 100% Authentic Bhadohi Craft &bull; Insured Delivery &bull; Safe & Verified</span>
          </div>
        </form>
      </div>
    </div>
  );
}

