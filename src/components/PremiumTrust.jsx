import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const trustItems = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 4L6 12v16c0 10 7.5 18 18 20 10.5-2 18-10 18-20V12L24 4z"/>
        <path d="M16 24l6 6 10-12"/>
      </svg>
    ),
    title: 'Handmade',
    sub: 'Artisan Crafted',
    desc: 'Every knot tied by master weavers with generations of expertise passed down through family ateliers.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="18" r="10"/>
        <path d="M14 28c-5 3-8 8-8 14h36c0-6-3-11-8-14"/>
        <path d="M24 28v12"/>
      </svg>
    ),
    title: 'Natural Wool',
    sub: '100% Organic',
    desc: 'Premium hand-spun wool and silk sourced ethically from high-altitude pastures, dyed with natural pigments.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="6" width="36" height="36" rx="3"/>
        <path d="M6 18h36M18 6v36M30 6v36M6 30h36"/>
      </svg>
    ),
    title: 'Custom Sizes',
    sub: 'Bespoke to Order',
    desc: 'Any dimension, any shape. Our weavers craft rugs precisely to your space — no standard sizes required.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 16l18-10 18 10v16l-18 10L6 32V16z"/>
        <path d="M6 16l18 10 18-10M24 26v16"/>
      </svg>
    ),
    title: 'Worldwide',
    sub: 'White Glove Shipping',
    desc: 'Climate-controlled crating, real-time tracking, and in-home placement by our specialist team in 60+ countries.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.94 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function PremiumTrust() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="premium-trust" className="pt-section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="pt-section__header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="eyebrow eyebrow--gold">Our Promise</span>
          <h2 className="pt-section__title">
            Crafted with intent.<br /><em>Built to last lifetimes.</em>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="pt-grid">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              className="pt-card"
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="pt-card__icon-wrap">
                {item.icon}
              </div>
              <div className="pt-card__content">
                <span className="pt-card__sub">{item.sub}</span>
                <h3 className="pt-card__title">{item.title}</h3>
                <p className="pt-card__desc">{item.desc}</p>
              </div>
              {/* Hover glow border */}
              <div className="pt-card__glow" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
