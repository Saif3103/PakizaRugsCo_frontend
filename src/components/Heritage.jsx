import { useEffect, useRef, useState } from 'react';

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 1800;
        const steps = 60;
        const step = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { setCount(target); clearInterval(timer); }
          else { setCount(Math.floor(current)); }
        }, duration / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { value: 3000, suffix: '+', label: 'Handcrafted Rugs' },
  { value: 37,   suffix: '',  label: 'Years of Heritage' },
  { value: 60,   suffix: '+', label: 'Countries Served' },
  { value: 98,   suffix: '%', label: 'Client Satisfaction' },
];

const features = [
  {
    num: '01',
    title: 'Certified Authentic',
    desc: 'Every piece comes with documentation verifying its origin, materials, and weaving technique from the source atelier.',
  },
  {
    num: '02',
    title: 'Ethically Sourced',
    desc: 'Direct relationships with weaving families ensure fair wages and the preservation of ancient traditions.',
  },
  {
    num: '03',
    title: 'White Glove Delivery',
    desc: 'Climate-controlled shipping and in-home placement by our specialist team, worldwide.',
  },
  {
    num: '04',
    title: 'Lifetime Value',
    desc: 'Hand-knotted rugs appreciate over time. Many of our pieces have tripled in value over 20 years.',
  },
];

export default function Heritage() {
  return (
    <section id="heritage" className="sq-heritage">

      {/* ── Stats band — dark, Squarespace data bar style ── */}
      <div className="sq-heritage__stats-band">
        <div className="container">
          <div className="sq-heritage__stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="sq-heritage__stat">
                <span className="sq-heritage__stat-num">
                  <CountUp target={s.value} suffix={s.suffix} />
                </span>
                <span className="sq-heritage__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Feature strip — Squarespace "Offer services" layout ── */}
      <div className="sq-heritage__feature-strip">
        <div className="container">
          <div className="sq-heritage__feature-header">
            <span className="eyebrow">Why Pakiza Rugs &amp; Co.</span>
            <h2 className="sq-heritage__feature-title">
              You deserve a rug<br /><em>that tells a story</em>
            </h2>
          </div>

          <div className="sq-heritage__feature-grid">
            {features.map((f) => (
              <div key={f.num} className="sq-heritage__feature-card">
                <span className="sq-heritage__feature-num">{f.num}</span>
                <div className="sq-heritage__feature-body">
                  <h3 className="sq-heritage__feature-name">{f.title}</h3>
                  <p className="sq-heritage__feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Full-width quote image — Squarespace editorial style ── */}
      <div className="sq-heritage__quote-wrap">
        <img
          src="/rugs/rug-9.jpeg"
          alt="Heritage rug weaving atelier"
          className="sq-heritage__quote-img"
        />
        <div className="sq-heritage__quote-overlay" />
        <div className="container sq-heritage__quote-content">
          <span className="eyebrow eyebrow--gold">Our Philosophy</span>
          <blockquote className="sq-heritage__blockquote">
            "A rug is not merely a floor covering. It is a story woven in wool and silk,
            a connection between generations, between lands, between souls."
          </blockquote>
          <cite className="sq-heritage__cite">— Pakiza Rugs &amp; Co., Founded in Chandauli, Uttar Pradesh, India</cite>
          <a href="#contact" className="btn--outline-white btn sq-heritage__quote-cta" id="heritage-cta-btn">
            Our Heritage
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>

    </section>
  );
}
