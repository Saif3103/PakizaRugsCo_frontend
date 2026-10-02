export default function BespokeSection() {
  return (
    <section className="pk-bespoke-section">
      <div className="container">
        <div className="pk-bespoke-card">
          <div className="pk-bespoke-card__bg">
            <img src="/rugs/rug-11.jpeg" alt="Pakiza Bespoke Loom" className="pk-bespoke-card__bg-img" />
            <div className="pk-bespoke-card__overlay" />
          </div>

          <div className="pk-bespoke-card__content">
            <span className="pk-bespoke-tag">BESPOKE ATELIER</span>
            <h2 className="pk-bespoke-title">
              Custom Rugs<br />
              <em>Made For You</em>
            </h2>
            <p className="pk-bespoke-desc">
              Have a specific floor plan, color palette, or heirloom pattern in mind? Our master artisans hand-weave custom carpets to your exact millimeter specifications.
            </p>

            <div className="pk-bespoke-perks">
              <div className="pk-bespoke-perk">
                <span className="pk-bespoke-perk__icon">✓</span>
                <span>Custom Dimensions</span>
              </div>
              <div className="pk-bespoke-perk">
                <span className="pk-bespoke-perk__icon">✓</span>
                <span>Wool &amp; Silk Blends</span>
              </div>
              <div className="pk-bespoke-perk">
                <span className="pk-bespoke-perk__icon">✓</span>
                <span>Complimentary CAD Mockup</span>
              </div>
            </div>

            <div className="pk-bespoke-actions">
              <a
                href="https://wa.me/917007626680?text=Hello%20Pakiza%20Rugs,%20I%20would%20like%20to%20inquire%20about%20a%20custom%20rug."
                target="_blank"
                rel="noopener noreferrer"
                className="pk-bespoke-btn pk-bespoke-btn--gold"
              >
                INQUIRE ON WHATSAPP
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="#contact" className="pk-bespoke-btn pk-bespoke-btn--outline">
                Contact Studio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
