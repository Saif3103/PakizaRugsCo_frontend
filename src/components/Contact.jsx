import { useState } from 'react';

const interests = ['Persian Rugs', 'Moroccan Rugs', 'Kilim & Flatweave', 'Silk Rugs', 'Custom Orders', 'Interior Consultation'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section id="contact" className="sq-contact">
      <div className="container">
        <div className="sq-contact__inner">

          {/* Left column — info */}
          <div className="sq-contact__info">
            <span className="eyebrow">Get in Touch</span>
            <h2 className="sq-contact__title">
              Begin your<br /><em>rug journey</em>
            </h2>
            <p className="sq-contact__desc">
              Whether you're furnishing a home, a hotel lobby, or building a rare collection —
              our specialists are ready to guide you to your perfect piece.
            </p>

            <div className="sq-contact__details">
              {[
                { icon: '📍', label: 'Showroom & Atelier', value: 'Chandauli, Uttar Pradesh, India' },
                { icon: '📞', label: 'Phone / WhatsApp', value: '+91 98765 43210' },
                { icon: '✉️', label: 'Email', value: 'info@pakizarugs.com' },
                { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 10am – 8pm IST' },
              ].map((d) => (
                <div key={d.label} className="sq-contact__detail-row">
                  <span className="sq-contact__detail-icon">{d.icon}</span>
                  <div>
                    <p className="sq-contact__detail-label">{d.label}</p>
                    <p className="sq-contact__detail-value">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — form */}
          <div className="sq-contact__form-box">
            {submitted ? (
              <div className="sq-contact__success">
                <div className="sq-contact__success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3>Message Received</h3>
                <p>A specialist will reach out within 24 hours.</p>
                <button className="btn--outline-dark btn" onClick={() => setSubmitted(false)} style={{ marginTop: '28px' }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} id="enquiry-form">
                <h3 className="sq-contact__form-title">Send an Enquiry</h3>

                <div className="sq-form-row">
                  <div className="sq-form-group">
                    <label htmlFor="f-name">Full Name *</label>
                    <input id="f-name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="sq-form-group">
                    <label htmlFor="f-email">Email *</label>
                    <input id="f-email" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>

                <div className="sq-form-row">
                  <div className="sq-form-group">
                    <label htmlFor="f-phone">Phone / WhatsApp</label>
                    <input id="f-phone" name="phone" type="tel" placeholder="+92 300 000 0000" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="sq-form-group">
                    <label htmlFor="f-interest">Interest</label>
                    <select id="f-interest" name="interest" value={form.interest} onChange={handleChange}>
                      <option value="">Select category</option>
                      {interests.map((i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                </div>

                <div className="sq-form-group">
                  <label htmlFor="f-message">Message *</label>
                  <textarea id="f-message" name="message" rows={5} placeholder="Describe the space, desired size, budget..." value={form.message} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn--dark btn" id="submit-enquiry" style={{ width: '100%', marginTop: '8px' }}>
                  Send Enquiry
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
