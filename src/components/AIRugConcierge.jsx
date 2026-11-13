import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import GeminiAIChatModal, { GeminiSparkleIcon } from './GeminiAIChatModal';

const roomTypes = ['Living Room', 'Bedroom', 'Dining Room', 'Office', 'Hallway'];
const colors = ['Ivory & Cream', 'Deep Burgundy', 'Forest Green', 'Charcoal Black', 'Terracotta', 'Navy Blue'];
const sizes = ['2×3 ft (Small)', '4×6 ft (Medium)', '6×9 ft (Large)', '8×10 ft (XL)', '9×12 ft (Statement)', 'Custom Size'];
const styles = ['Persian Traditional', 'Moroccan Tribal', 'Modern Minimal', 'Kilim Flatweave', 'Silk Luxury', 'Beni Ourain'];

const rugRecommendations = {
  default: [
    { name: 'Isfahan Imperial Garden Medallion', origin: 'Hand-knotted NZ Wool & Silk', price: '₹24,500', match: '98%', badge: "Collector's Piece", image: '/rugs/rug-7.jpeg', href: '/products/new-0' },
    { name: 'Emerald Imperial Oushak', origin: 'Pure High-Loom Wool', price: '₹22,450', match: '96%', badge: 'Bestseller', image: '/rugs/rug-8.jpeg', href: '/products/new-0' },
    { name: 'Modern Organic Contour Wave', origin: 'Sculptural Bamboo Silk', price: '₹12,999', match: '94%', badge: 'Trending', image: '/rugs/rug-16.jpeg', href: '/products/lux-2' },
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
              transition={{ delay: i * 0.02, duration: 0.1 }}
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
  const [isFullChatOpen, setIsFullChatOpen] = useState(false);

  const canSearch = room && color && size && style;

  const handleFind = () => {
    if (!canSearch) return;
    setLoading(true);
    setShowResults(false);
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1200);
  };

  const recs = rugRecommendations.default;

  return (
    <>
      <GeminiAIChatModal
        isOpen={isFullChatOpen}
        onClose={() => setIsFullChatOpen(false)}
      />

      <section id="ai-concierge" className="ai-section">
        <div className="container">
          {/* Header */}
          <div className="ai-section__header">
            <span className="eyebrow eyebrow--gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <GeminiSparkleIcon size={16} /> Google Gemini AI Concierge
            </span>
            <h2 className="ai-section__title">
              Tell us your space.<br /><em>Gemini finds your perfect rug.</em>
            </h2>
            <p className="ai-section__subtitle">
              Our Gemini-powered intelligence pairs master Bhadohi weaves, sizes, and palettes to your exact interior aesthetic.
            </p>
          </div>

          {/* Glass panel */}
          <div className="ai-glass" style={{ border: '1px solid rgba(66, 133, 244, 0.25)', boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 0 30px rgba(66, 133, 244, 0.1)' }}>
            {/* Chat header */}
            <div className="ai-glass__header" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="ai-glass__avatar" style={{ background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.2), rgba(155, 114, 203, 0.2))', border: '1px solid rgba(155, 114, 203, 0.4)' }}>
                  <GeminiSparkleIcon size={20} />
                </div>
                <div className="ai-glass__header-text">
                  <span className="ai-glass__name" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Pakiza Gemini 1.5 Concierge
                    <span style={{ fontSize: '10px', background: 'linear-gradient(90deg, #4285f4, #9b72cb)', color: '#fff', padding: '1px 6px', borderRadius: '6px', fontWeight: 700 }}>AI</span>
                  </span>
                  <span className="ai-glass__status">
                    <span className="ai-dot" />
                    Online — Multimodal Vision &amp; Sizing Assistant
                  </span>
                </div>
              </div>

              {/* Live Chat Direct Action */}
              <button
                className="gemini-launcher-btn"
                style={{ padding: '7px 14px', fontSize: '13px' }}
                onClick={() => setIsFullChatOpen(true)}
              >
                <GeminiSparkleIcon size={14} />
                <span>Open Full Gemini Chat</span>
              </button>
            </div>

            {/* Message bubble */}
            <div className="ai-bubble" style={{ background: 'rgba(20, 30, 26, 0.85)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <TypedText
                text="Hello! Select your room dimensions & style preferences below, or click 'Open Full Gemini Chat' to ask free-form questions or upload a room photo."
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
            <div className="ai-form__cta-row" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
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
                    Analyzing space with Gemini...
                  </span>
                ) : (
                  <>
                    <GeminiSparkleIcon size={16} />
                    Find My Perfect Rug Match
                  </>
                )}
              </button>

              <button
                className="ai-find-btn"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#e5ece8', border: '1px solid rgba(255,255,255,0.15)' }}
                onClick={() => setIsFullChatOpen(true)}
              >
                💬 Speak / Upload Photo to Gemini
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
                  <GeminiSparkleIcon size={15} />
                  Gemini matches for your {color} {room} ({size})
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
                        <p className="ai-rec-card__origin">{rec.origin} · {size || '8×10 ft'}</p>
                        <div className="ai-rec-card__footer">
                          <span className="ai-rec-card__price">{rec.price}</span>
                          <Link to="/ai-designer" className="ai-rec-card__btn" id={`ai-enquire-${i}`}>
                            Customize ✦
                          </Link>
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
    </>
  );
}
