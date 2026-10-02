import { useState, useRef } from 'react';
import { testimonials } from '../data/products';

const countryFlags = {
  'Interior Designer, Dubai': '🇦🇪',
  'Art Collector, London': '🇬🇧',
  'Homeowner, Karachi': '🇵🇰',
};

const countryName = {
  'Interior Designer, Dubai': 'UAE',
  'Art Collector, London': 'UK',
  'Homeowner, Karachi': 'Pakistan',
};

function Stars() {
  return (
    <div className="pk-tcard__stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C9973A" stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const goTo = (dir) => {
    const next = Math.max(0, Math.min(testimonials.length - 1, active + dir));
    setActive(next);
    if (trackRef.current) {
      const cards = trackRef.current.querySelectorAll('.pk-tcard');
      if (cards[next]) {
        cards[next].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  return (
    <section className="pk-testimonials" id="pk-testimonials">
      <div className="container">
        {/* Header */}
        <div className="pk-testimonials__header">
          <div>
            <span className="pk-eyebrow">What Our Customers Say</span>
            <h2 className="pk-testimonials__title">Real Homes, Real Stories</h2>
          </div>
          <div className="pk-testimonials__nav">
            <button
              className="pk-testimonials__nav-btn"
              onClick={() => goTo(-1)}
              aria-label="Previous"
              id="testimonial-prev"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              className="pk-testimonials__nav-btn"
              onClick={() => goTo(1)}
              aria-label="Next"
              id="testimonial-next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="pk-testimonials__track" ref={trackRef}>
          {testimonials.map((t, i) => (
            <div key={t.id} className={`pk-tcard${i === active ? ' pk-tcard--active' : ''}`} id={`tcard-${t.id}`}>
              <Stars />
              <p className="pk-tcard__text">"{t.text}"</p>
              <div className="pk-tcard__author">
                <div className="pk-tcard__avatar">{t.avatar}</div>
                <div className="pk-tcard__info">
                  <span className="pk-tcard__name">– {t.name}</span>
                  <span className="pk-tcard__country">
                    {countryFlags[t.role] || '🌍'} {countryName[t.role] || ''}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
