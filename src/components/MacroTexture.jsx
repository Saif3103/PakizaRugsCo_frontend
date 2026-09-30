import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const textures = [
  {
    id: 'wool',
    label: 'Wool Fibers',
    sub: 'Highland Merino',
    description: 'Each fiber is hand-sorted by length and crimp — only the finest fleece makes the cut.',
    gradient: 'radial-gradient(ellipse at 30% 40%, #EDE0CC 0%, #C4A882 30%, #7B3F1A 65%, #4A2210 100%)',
    image: '/rugs/rug-1.jpeg',
    pattern: (
      <svg className="texture-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="fuzzy">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
        {Array.from({ length: 40 }).map((_, i) => (
          <path
            key={i}
            d={`M${(i % 10) * 44 + 5} ${Math.floor(i / 10) * 80 + 10} Q${(i % 10) * 44 + 22} ${Math.floor(i / 10) * 80 - 20} ${(i % 10) * 44 + 40} ${Math.floor(i / 10) * 80 + 10}`}
            stroke="rgba(237,224,204,0.35)"
            strokeWidth={1 + (i % 3) * 0.5}
            fill="none"
            filter="url(#fuzzy)"
          />
        ))}
      </svg>
    ),
  },
  {
    id: 'loops',
    label: 'Hand-Tufted Loops',
    sub: 'Loop Pile Weave',
    description: 'Thousands of hand-looped knots, each tied with tension that will hold for generations.',
    gradient: 'radial-gradient(ellipse at 60% 35%, #C4A882 0%, #7B3F1A 40%, #3B1A0A 100%)',
    image: '/rugs/rug-2.jpeg',
    pattern: (
      <svg className="texture-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 10 }).map((_, col) => (
            <ellipse
              key={`${row}-${col}`}
              cx={col * 42 + 21}
              cy={row * 38 + 19}
              rx="14"
              ry="9"
              fill="none"
              stroke="rgba(196,168,130,0.5)"
              strokeWidth="2.5"
            />
          ))
        )}
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 10 }).map((_, col) => (
            <circle
              key={`d-${row}-${col}`}
              cx={col * 42 + 21}
              cy={row * 38 + 19}
              r="3"
              fill="rgba(237,224,204,0.3)"
            />
          ))
        )}
      </svg>
    ),
  },
  {
    id: 'cutpile',
    label: 'Cut Pile',
    sub: 'Velvet Touch',
    description: 'A dense, plush surface cut to precise height — creating that signature soft underfoot feeling.',
    gradient: 'radial-gradient(ellipse at 50% 50%, #A08060 0%, #5C2D0E 45%, #2A1206 100%)',
    image: '/rugs/rug-10.jpeg',
    pattern: (
      <svg className="texture-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 200 }).map((_, i) => (
          <line
            key={i}
            x1={(i % 20) * 21 + 10}
            y1={Math.floor(i / 20) * 31 + 28}
            x2={(i % 20) * 21 + 10 + (Math.sin(i) * 4)}
            y2={Math.floor(i / 20) * 31 + 5}
            stroke="rgba(196,168,130,0.4)"
            strokeWidth={1 + Math.abs(Math.sin(i * 0.7)) * 1.5}
            strokeLinecap="round"
          />
        ))}
      </svg>
    ),
  },
  {
    id: 'shine',
    label: 'Silk Sheen',
    sub: 'Natural Lustre',
    description: 'Silk threads woven at specific angles catch light differently — alive with every movement.',
    gradient: 'radial-gradient(ellipse at 40% 30%, #FAF5EC 0%, #C4A882 25%, #7B3F1A 60%, #3B1A0A 100%)',
    image: '/rugs/rug-14.jpeg',
    pattern: (
      <svg className="texture-svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sheen1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(250,245,236,0.6)"/>
            <stop offset="50%" stopColor="rgba(196,168,130,0.1)"/>
            <stop offset="100%" stopColor="rgba(250,245,236,0.4)"/>
          </linearGradient>
        </defs>
        {Array.from({ length: 15 }).map((_, i) => (
          <path
            key={i}
            d={`M0 ${i * 22} L400 ${i * 22 + 60}`}
            stroke="rgba(250,245,236,0.15)"
            strokeWidth={i % 3 === 0 ? 3 : 1}
            fill="none"
          />
        ))}
        <ellipse cx="160" cy="100" rx="80" ry="40" fill="url(#sheen1)" opacity="0.6"/>
        <ellipse cx="300" cy="200" rx="60" ry="30" fill="url(#sheen1)" opacity="0.4"/>
      </svg>
    ),
  },
];

export default function MacroTexture() {
  const [active, setActive] = useState(textures[0]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section id="macro-texture" className="macro-section">
      <div className="container">
        {/* Header */}
        <div className="macro-section__header">
          <span className="eyebrow eyebrow--gold">Macro Texture Experience</span>
          <h2 className="macro-section__title">
            Up close.<br /><em>Breathtakingly beautiful.</em>
          </h2>
          <p className="macro-section__subtitle">
            Hover to explore the microscopic world of luxury rug craftsmanship.
          </p>
        </div>

        {/* Texture tabs */}
        <div className="macro-tabs">
          {textures.map((t) => (
            <button
              key={t.id}
              className={`macro-tab ${active.id === t.id ? 'macro-tab--active' : ''}`}
              onClick={() => setActive(t)}
              id={`macro-tab-${t.id}`}
            >
              <span className="macro-tab__label">{t.label}</span>
              <span className="macro-tab__sub">{t.sub}</span>
            </button>
          ))}
        </div>

        {/* Main texture window */}
        <div
          className="macro-window"
          ref={containerRef}
          onMouseMove={handleMouseMove}
        >
          {/* Background gradient + Real macro photo */}
          <motion.div
            className="macro-window__bg"
            key={active.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              background: active.gradient,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {active.image && (
              <img
                src={active.image}
                alt={active.label}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.65,
                  mixBlendMode: 'luminosity',
                  transform: `scale(1.2) translate(${(mousePos.x - 50) * -0.15}px, ${(mousePos.y - 50) * -0.15}px)`,
                  transition: 'transform 0.1s ease-out',
                }}
              />
            )}
          </motion.div>

          {/* SVG pattern */}
          <motion.div
            className="macro-window__pattern"
            key={active.id + '-p'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {active.pattern}
          </motion.div>

          {/* Magnifier lens effect */}
          <div
            className="macro-lens"
            style={{
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
            }}
          />

          {/* Info overlay */}
          <div className="macro-window__info">
            <motion.div
              key={active.id + '-info'}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="macro-window__info-label">{active.label}</span>
              <p className="macro-window__info-desc">{active.description}</p>
            </motion.div>
          </div>

          {/* Corner detail label */}
          <div className="macro-window__corner">
            <span>⟲ Move cursor to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
