export default function VirtualPreviewSection() {
  return (
    <section className="pk-vpreview" id="pk-virtual-preview">
      <div className="container">
        <div className="pk-vpreview__banner">
          {/* Background image */}
          <img
            src="/rugs/rug-8.jpeg"
            alt="Rug in room preview"
            className="pk-vpreview__bg-img"
            loading="lazy"
          />
          <div className="pk-vpreview__bg-overlay" />

          {/* Content */}
          <div className="pk-vpreview__content">
            {/* Left */}
            <div className="pk-vpreview__left">
              <h2 className="pk-vpreview__title">Bring Your Space to Life</h2>
              <p className="pk-vpreview__desc">
                See how our rugs look in your room before you buy.
              </p>
              <a href="#room-mood" className="pk-vpreview__cta" id="virtual-preview-cta">
                UPLOAD YOUR ROOM
                <span className="pk-vpreview__cta-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </a>
            </div>

            {/* Right — Steps visual */}
            <div className="pk-vpreview__right">
              {/* Phone mockup */}
              <div className="pk-vpreview__phone">
                <img src="/rugs/rug-11.jpeg" alt="Rug preview in room" className="pk-vpreview__phone-img" />
                <div className="pk-vpreview__phone-frame" />
              </div>

              {/* Steps */}
              <div className="pk-vpreview__steps">
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/>
                      </svg>
                    ),
                    label: 'Upload Photo',
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/>
                      </svg>
                    ),
                    label: 'Choose a Rug',
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                    ),
                    label: 'See in Your Room',
                  },
                ].map((step, i) => (
                  <div key={i} className="pk-vpreview__step">
                    <span className="pk-vpreview__step-icon">{step.icon}</span>
                    <span className="pk-vpreview__step-label">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
