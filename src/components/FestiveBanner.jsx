export default function FestiveBanner() {
  return (
    <section className="pk-festive-section">
      {/* Infinite scrolling luxury marquee ticker */}
      <div className="pk-marquee-bar">
        <div className="pk-marquee-bar__track">
          {[
            '• 100% PURE NEW ZEALAND WOOL & SILK',
            '• EXPRESS SHIPPING ACROSS INDIA',
            '• CUSTOM SIZES AVAILABLE',
            '• 10+ YEARS ARTISAN HERITAGE',
            '• CERTIFIED AUTHENTIC HANDMADE CARPETS',
            '• WHITE GLOVE DELIVERY',
            '• 100% PURE NEW ZEALAND WOOL & SILK',
            '• EXPRESS SHIPPING ACROSS INDIA',
            '• CUSTOM SIZES AVAILABLE',
            '• 10+ YEARS ARTISAN HERITAGE',
            '• CERTIFIED AUTHENTIC HANDMADE CARPETS',
            '• WHITE GLOVE DELIVERY',
          ].map((text, i) => (
            <span key={i} className="pk-marquee-bar__item">
              {text}
            </span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="pk-festive-card">
          <div className="pk-festive-card__glow" />
          <div className="pk-festive-card__content">
            <div className="pk-festive-card__tag">
              <span className="pk-festive-card__sparkle">✨</span>
              LIMITED TIME EXCLUSIVE
            </div>
            <h2 className="pk-festive-card__title">
              Festive Luxury<br />
              <em>Collection 2026</em>
            </h2>
            <p className="pk-festive-card__offer">
              Up to <span className="highlight">50% OFF</span> on Masterpiece Hand-Knotted Rugs
            </p>
            <div className="pk-festive-card__badges">
              <span>Premium Quality</span>
              <span>•</span>
              <span>Artisan Loom</span>
              <span>•</span>
              <span>Express Delivery</span>
            </div>
            <a href="#collections" className="pk-festive-card__btn">
              SHOP NOW
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
