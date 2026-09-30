import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const roomTypes = ['Living Room', 'Bedroom', 'Dining Room', 'Office', 'Hallway'];
const colors = ['Ivory & Cream', 'Deep Burgundy', 'Forest Green', 'Charcoal Black', 'Terracotta', 'Navy Blue'];
const sizes = ['2×3 ft (Small)', '4×6 ft (Medium)', '6×9 ft (Large)', '8×10 ft (XL)', '9×12 ft (Statement)', 'Custom Size'];
const styles = ['Persian Traditional', 'Moroccan Tribal', 'Modern Minimal', 'Kilim Flatweave', 'Silk Luxury', 'Beni Ourain'];

const rugRecommendations = {
  default: [
    { name: 'Isfahan Garden Heritage', origin: 'Hand-knotted Wool', price: '$4,800', match: '98%', badge: "Collector's Piece", image: '/rugs/rug-7.jpeg' },
    { name: 'Emerald Imperial Medallion', origin: 'Pure NZ Wool', price: '$3,200', match: '95%', badge: 'Bestseller', image: '/rugs/rug-8.jpeg' },
    { name: 'Modern Hexa-Loom', origin: 'Highland Fleece', price: '$3,600', match: '92%', badge: 'Trending', image: '/rugs/rug-16.jpeg' },
  ],
};

function TypedText({ text, active }) {
  return (
    <AnimatePresence mode="wait">
      {active && (
        <motion.span
          key={text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="ai-typed"
        >
          {text.split('').map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.025, duration: 0.1 }}
            >
              {char}
            </motion.span>
          ))}
          <motion.span
            className="ai-cursor"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          >|</motion.span>
        </motion.span>
      )}
    </AnimatePresence>
  );
}

function SelectPill({ options, value, onChange, label }) {
  return (
    <div className="ai-select-group">
      <span className="ai-select-label">{label}</span>
      <div className="ai-pills">
        {options.map(opt => (
          <button
            key={opt}
            className={`ai-pill ${value === opt ? 'ai-pill--active' : ''}`}
            onClick={() => onChange(opt)}
            id={`ai-pill-${opt.replace(/\s+/g, '-').toLowerCase()}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AIRugConcierge() {
  const [room, setRoom] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [style, setStyle] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSearch = room && color && size && style;

  const handleFind = () => {
    if (!canSearch) return;
    setLoading(true);
    setShowResults(false);
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1800);
  };

  const recs = rugRecommendations.default;

  return (
    <section id="ai-concierge" className="ai-section">
      <div className="container">
        {/* Header */}
        <div className="ai-section__header">
          <span className="eyebrow eyebrow--gold">AI Rug Concierge</span>
          <h2 className="ai-section__title">
            Tell us your space.<br /><em>We'll find your rug.</em>
          </h2>
          <p className="ai-section__subtitle">
            Our AI-powered concierge matches you with the perfect rug based on your preferences.
          </p>
        </div>

        {/* Glass panel */}
        <div className="ai-glass">
          {/* Chat header */}
          <div className="ai-glass__header">
            <div className="ai-glass__avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
            </div>
            <div className="ai-glass__header-text">
              <span className="ai-glass__name">Pakiza Concierge</span>
              <span className="ai-glass__status">
                <span className="ai-dot" />
                Online — Ready to assist
              </span>
            </div>
          </div>

          {/* Message bubble */}
          <div className="ai-bubble">
            <TypedText
              text="Hello! Tell me about your space and I'll curate the perfect rugs from our collection."
              active={true}
            />
          </div>

          {/* Selector form */}
          <div className="ai-form">
            <SelectPill options={roomTypes} value={room} onChange={setRoom} label="🏠 Room Type" />
            <SelectPill options={colors} value={color} onChange={setColor} label="🎨 Color Palette" />
            <SelectPill options={sizes} value={size} onChange={setSize} label="📐 Size" />
            <SelectPill options={styles} value={style} onChange={setStyle} label="✨ Style" />
          </div>

          {/* CTA */}
          <div className="ai-form__cta-row">
            <button
              className={`ai-find-btn ${canSearch ? 'ai-find-btn--active' : ''}`}
              onClick={handleFind}
              disabled={!canSearch}
              id="ai-find-rug-btn"
            >
              {loading ? (
                <span className="ai-loading">
                  <span className="ai-loading__dot" />
                  <span className="ai-loading__dot" />
                  <span className="ai-loading__dot" />
                  Analysing your space...
                </span>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                  Find My Perfect Rug
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              className="ai-results"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="ai-results__label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Perfect matches for your {room}
              </div>
              <div className="ai-cards">
                {recs.map((rec, i) => (
                  <motion.div
                    key={rec.name}
                    className="ai-rec-card"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    id={`ai-rec-${i}`}
                  >
                    {/* Rug thumbnail image */}
                    <div className="ai-rec-card__swatch" style={{ position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={rec.image}
                        alt={rec.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span className="ai-rec-card__match">{rec.match} match</span>
                    </div>
                    <div className="ai-rec-card__body">
                      <span className="ai-rec-card__badge">{rec.badge}</span>
                      <h4 className="ai-rec-card__name">{rec.name}</h4>
                      <p className="ai-rec-card__origin">{rec.origin} · {size}</p>
                      <div className="ai-rec-card__footer">
                        <span className="ai-rec-card__price">{rec.price}</span>
                        <button className="ai-rec-card__btn" id={`ai-enquire-${i}`}>Enquire →</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
