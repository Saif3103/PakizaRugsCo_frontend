export default function Founder() {
  return (
    <section id="founder" className="sq-founder">
      <div className="container">

        {/* Eyebrow */}
        <div className="sq-founder__eyebrow-wrap">
          <span className="eyebrow eyebrow--gold">The Person Behind the Brand</span>
          <span className="sq-founder__eyebrow-line" />
        </div>

        <div className="sq-founder__inner">

          {/* Left — Image */}
          <div className="sq-founder__img-col">
            <div className="sq-founder__img-frame">
              <img
                src="/founder.jpg"
                alt="Saif Ali — Founder, Pakiza Rugs & Co."
                className="sq-founder__img"
              />
              <span className="sq-founder__corner sq-founder__corner--tl" />
              <span className="sq-founder__corner sq-founder__corner--br" />
            </div>
            {/* Floating badge */}
            <div className="sq-founder__badge">
              <span className="sq-founder__badge-num">New</span>
              <span className="sq-founder__badge-label">Fresh<br/>Vision</span>
            </div>
          </div>

          {/* Right — Content */}
          <div className="sq-founder__content">

            <h2 className="sq-founder__title">
              Saif Ali
            </h2>
            <p className="sq-founder__role">Founder — Pakiza Rugs &amp; Co.</p>

            <div className="sq-founder__divider" />

            <p className="sq-founder__quote">
              "Every great brand starts with a simple belief. Mine is this — every home deserves a rug that tells a real story."
            </p>

            <p className="sq-founder__bio">
              Pakiza Rugs &amp; Co. is a fresh venture born out of a genuine passion for authentic craftsmanship and thoughtful interiors. As a young founder, I started this brand because I believed there was a gap — beautiful, hand-crafted rugs that are both accessible and honest about where they come from.
            </p>

            <p className="sq-founder__bio">
              We are just getting started, and that excites me more than anything. Every rug we bring is carefully selected with one simple question in mind: would I put this in my own home? If the answer is yes — it makes the cut.
            </p>

            {/* Vision pillars */}
            <div className="sq-founder__stats">
              <div className="sq-founder__stat">
                <span className="sq-founder__stat-num">100%</span>
                <span className="sq-founder__stat-label">Authentic Pieces</span>
              </div>
              <div className="sq-founder__stat">
                <span className="sq-founder__stat-num">0</span>
                <span className="sq-founder__stat-label">Compromises on Quality</span>
              </div>
              <div className="sq-founder__stat">
                <span className="sq-founder__stat-num">∞</span>
                <span className="sq-founder__stat-label">Passion &amp; Vision</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
