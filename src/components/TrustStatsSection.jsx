export default function TrustStatsSection() {
  const trustFeatures = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: 'Premium Quality',
      desc: '100% pure New Zealand wool & natural silk.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="3" width="15" height="13"/>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
      title: 'Secure Delivery',
      desc: 'Insured white-glove shipping to your doorstep.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: 'Authentic Craft',
      desc: 'Master weavers with generational heritage.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
      title: 'Customer Love',
      desc: 'Trusted by 500+ luxury homeowners & designers.',
    },
  ];

  const stats = [
    { num: '500+', label: 'Happy Customers' },
    { num: '1000+', label: 'Rugs Delivered' },
    { num: '10+', label: 'Years Experience' },
    { num: '100%', label: 'Handcrafted' },
  ];

  return (
    <section className="pk-trust-stats-section">
      <div className="container">
        {/* 2x2 Trust Guarantees */}
        <div className="pk-trust-grid">
          {trustFeatures.map((f, i) => (
            <div key={i} className="pk-trust-card">
              <div className="pk-trust-card__icon">{f.icon}</div>
              <h3 className="pk-trust-card__title">{f.title}</h3>
              <p className="pk-trust-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* 2x2 Stats Counters */}
        <div className="pk-stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="pk-stat-box">
              <span className="pk-stat-box__number">{s.num}</span>
              <span className="pk-stat-box__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
