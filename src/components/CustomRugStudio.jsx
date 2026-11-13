import { useState } from 'react';
import { motion } from 'framer-motion';
import WhatsAppOrderModal from './WhatsAppOrderModal';

const shapes = [
  { id: 'rect', label: 'Rectangle', path: 'M 20 20 L 180 20 L 180 130 L 20 130 Z' },
  { id: 'round', label: 'Round', path: 'M 100 25 A 75 75 0 1 1 99.99 25 Z' },
  { id: 'runner', label: 'Runner', path: 'M 25 40 L 175 40 L 175 110 L 25 110 Z' },
  { id: 'oval', label: 'Oval', path: 'M 100 25 A 80 50 0 1 1 99.99 25 Z' },
];

const sizes = ['2×3 ft', '4×6 ft', '6×9 ft', '8×10 ft', '9×12 ft'];

const borders = [
  { id: 'none', label: 'None', width: 0 },
  { id: 'thin', label: 'Thin', width: 4 },
  { id: 'medium', label: 'Medium', width: 8 },
  { id: 'wide', label: 'Wide', width: 14 },
];

const colorPalettes = [
  { id: 'ivory', label: 'Ivory', main: '#EDE0CC', border: '#C4A882' },
  { id: 'burgundy', label: 'Burgundy', main: '#7B1A1A', border: '#C4A882' },
  { id: 'charcoal', label: 'Charcoal', main: '#2A2A2A', border: '#EDE0CC' },
  { id: 'emerald', label: 'Emerald', main: '#1A4A2A', border: '#C4A882' },
  { id: 'terracotta', label: 'Terracotta', main: '#8B4513', border: '#EDE0CC' },
  { id: 'navy', label: 'Navy', main: '#1A1A4A', border: '#C4A882' },
];

export default function CustomRugStudio() {
  const [activeShape, setActiveShape] = useState(shapes[0]);
  const [activeSize, setActiveSize] = useState(sizes[2]);
  const [activeBorder, setActiveBorder] = useState(borders[1]);
  const [activeColor, setActiveColor] = useState(colorPalettes[0]);
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);

  const priceMap = {
    '2×3 ft': 4499,
    '4×6 ft': 12499,
    '6×9 ft': 24999,
    '8×10 ft': 38999,
    '9×12 ft': 49999
  };
  const customPrice = priceMap[activeSize] || 24999;

  const shapeTransform = {
    rect: 'translate(0 0)',
    round: 'translate(0 0)',
    runner: 'translate(0 10) scale(1 0.72)',
    oval: 'translate(0 10) scale(1 0.75)',
  };

  return (
    <section id="rug-studio" className="studio-section">
      <div className="container">
        {/* Header */}
        <div className="studio-section__header">
          <span className="eyebrow">PAKIZA BESPOKE ATELIER • HANDCRAFTED IN BHADOHI</span>
          <h2 className="studio-section__title">
            Design Your Custom Rug with Our <em>AI Atelier</em>
          </h2>
          <p className="studio-section__subtitle">
            Describe the carpet you envision for your room, or choose from our handcrafted master styles. Our master weavers in Bhadohi handcraft every design to your exact dimensions using pure New Zealand wool and bamboo silk.
          </p>
        </div>

        <div className="studio-layout">
          {/* Live Preview */}
          <div className="studio-preview">
            <div className="studio-preview__label">Live Preview</div>
            <div className="studio-preview__canvas">
              <svg viewBox="0 0 200 160" className="studio-preview__svg">
                <defs>
                  {/* Weave texture pattern */}
                  <pattern id="weave" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="4" height="4" fill={activeColor.main} opacity="0.9"/>
                    <rect x="4" y="4" width="4" height="4" fill={activeColor.main} opacity="0.75"/>
                    <rect x="4" y="0" width="4" height="4" fill={activeColor.main} opacity="0.6"/>
                    <rect x="0" y="4" width="4" height="4" fill={activeColor.main} opacity="0.8"/>
                  </pattern>
                  <clipPath id="rugClip">
                    <path d={activeShape.path} transform={shapeTransform[activeShape.id]}/>
                  </clipPath>
                </defs>

                {/* Shadow */}
                <motion.path
                  d={activeShape.path}
                  transform={`${shapeTransform[activeShape.id]} translate(4 4)`}
                  fill="rgba(0,0,0,0.25)"
                  key={activeShape.id + '-shadow'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Rug body */}
                <motion.path
                  d={activeShape.path}
                  transform={shapeTransform[activeShape.id]}
                  fill={`url(#weave)`}
                  key={activeShape.id + activeColor.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ transformOrigin: 'center' }}
                />

                {/* Border */}
                {activeBorder.width > 0 && (
                  <motion.path
                    d={activeShape.path}
                    transform={shapeTransform[activeShape.id]}
                    fill="none"
                    stroke={activeColor.border}
                    strokeWidth={activeBorder.width / 2}
                    key={activeShape.id + activeBorder.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    clipPath="url(#rugClip)"
                  />
                )}

                {/* Size label */}
                <text x="100" y="152" textAnchor="middle" fontSize="9" fill="rgba(196,168,130,0.7)" fontFamily="Inter">
                  {activeSize} · {activeShape.label} · {activeBorder.label} border
                </text>
              </svg>
            </div>

            {/* Summary card */}
            <div className="studio-summary">
              <div className="studio-summary__row">
                <span>Shape</span><strong>{activeShape.label}</strong>
              </div>
              <div className="studio-summary__row">
                <span>Size</span><strong>{activeSize}</strong>
              </div>
              <div className="studio-summary__row">
                <span>Border</span><strong>{activeBorder.label}</strong>
              </div>
              <div className="studio-summary__row">
                <span>Colour</span>
                <strong style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="studio-swatch" style={{ background: activeColor.main }} />
                  {activeColor.label}
                </strong>
              </div>
            </div>

            <a href="#contact" className="btn btn--outline-white studio-cta-btn" id="studio-enquire-btn">
              Enquire About This Design
            </a>
          </div>

          {/* Controls */}
          <div className="studio-controls">
            {/* Shape */}
            <div className="studio-control-group">
              <span className="studio-control-group__label">Shape</span>
              <div className="studio-control-group__options">
                {shapes.map(s => (
                  <button
                    key={s.id}
                    className={`studio-option-btn ${activeShape.id === s.id ? 'studio-option-btn--active' : ''}`}
                    onClick={() => setActiveShape(s)}
                    id={`studio-shape-${s.id}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="studio-control-group">
              <span className="studio-control-group__label">Size</span>
              <div className="studio-control-group__options">
                {sizes.map(s => (
                  <button
                    key={s}
                    className={`studio-option-btn ${activeSize === s ? 'studio-option-btn--active' : ''}`}
                    onClick={() => setActiveSize(s)}
                    id={`studio-size-${s.replace(/\s/g, '').replace(/×/g, 'x')}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Border */}
            <div className="studio-control-group">
              <span className="studio-control-group__label">Border</span>
              <div className="studio-control-group__options">
                {borders.map(b => (
                  <button
                    key={b.id}
                    className={`studio-option-btn ${activeBorder.id === b.id ? 'studio-option-btn--active' : ''}`}
                    onClick={() => setActiveBorder(b)}
                    id={`studio-border-${b.id}`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Colour */}
            <div className="studio-control-group">
              <span className="studio-control-group__label">Colour</span>
              <div className="studio-color-swatches">
                {colorPalettes.map(c => (
                  <button
                    key={c.id}
                    className={`studio-color-swatch ${activeColor.id === c.id ? 'studio-color-swatch--active' : ''}`}
                    style={{ background: c.main }}
                    onClick={() => setActiveColor(c)}
                    title={c.label}
                    id={`studio-color-${c.id}`}
                    aria-label={`Select ${c.label} colour`}
                  />
                ))}
              </div>
            </div>

            {/* Custom Rug Order Bar */}
            <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', background: '#f5f0ea', borderRadius: '10px', border: '1px solid #e2d5c3' }}>
                <span style={{ fontSize: '13px', color: '#555', fontWeight: 500 }}>Estimated Atelier Price:</span>
                <strong style={{ fontSize: '18px', color: '#0c3b2e' }}>₹{customPrice.toLocaleString('en-IN')}.00</strong>
              </div>

              <button
                type="button"
                className="pdp-btn-whatsapp-order"
                onClick={() => setIsWaModalOpen(true)}
                style={{ height: '48px', fontSize: '15px' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.77 14.16c-.24.68-1.2 1.25-1.68 1.3-.47.05-1.07.07-3.46-.92-2.88-1.19-4.73-4.14-4.87-4.33-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.66.5.24.58.82 2.01.9 2.16.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.7 2.11 1.17 1.04 2.15 1.36 2.46 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.84.87 2.16 1.03.32.16.53.24.61.37.08.13.08.77-.16 1.45z" />
                </svg>
                <span>Order Custom Rug on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Quick Order Modal for Bespoke Rug */}
      <WhatsAppOrderModal
        isOpen={isWaModalOpen}
        onClose={() => setIsWaModalOpen(false)}
        items={[{
          id: `custom-rug-${activeShape.id}-${activeSize}-${activeColor.id}`,
          title: `Bespoke ${activeShape.label} Rug (${activeColor.label})`,
          name: `Bespoke ${activeShape.label} Rug - ${activeColor.label} (Border: ${activeBorder.label})`,
          price: customPrice,
          size: activeSize,
          color: activeColor.label,
          shape: activeShape.label,
          qty: 1,
          image: '/rugs/cat-irregular.jpg'
        }]}
        totalPrice={customPrice}
      />
    </section>
  );
}
