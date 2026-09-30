import { testimonials } from '../data/products';

function Stars({ count }) {
  return (
    <div className="sq-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i < count ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="sq-testimonials">
      <div className="container">

        {/* Header */}
        <div className="sq-testimonials__header">
          <span className="eyebrow">Client Stories</span>
          <h2 className="sq-testimonials__title">
            Loved by collectors<br /><em>across the world</em>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="sq-testimonials__grid">
          {testimonials.map((t) => (
            <div key={t.id} className="sq-tcard" id={`testimonial-${t.id}`}>
              <Stars count={t.rating} />
              <p className="sq-tcard__text">"{t.text}"</p>
              <div className="sq-tcard__author">
                <div className="sq-tcard__avatar">{t.avatar}</div>
                <div className="sq-tcard__info">
                  <p className="sq-tcard__name">{t.name}</p>
                  <p className="sq-tcard__role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar — Squarespace social-proof strip */}
        <div className="sq-testimonials__trust-bar">
          {[
            { n: '4.9★', l: 'Average Rating' },
            { n: '2,800+', l: 'Satisfied Clients' },
            { n: '100%', l: 'Authentic Pieces' },
            { n: 'Lifetime', l: 'Quality Guarantee' },
          ].map((b) => (
            <div key={b.l} className="sq-trust-pill">
              <span className="sq-trust-pill__n">{b.n}</span>
              <span className="sq-trust-pill__l">{b.l}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
