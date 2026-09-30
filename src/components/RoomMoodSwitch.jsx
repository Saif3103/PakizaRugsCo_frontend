import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const moods = [
  {
    id: 'modern',
    label: 'Modern',
    icon: '◻',
    rugColor: '#3B3B3B',
    wallColor: '#F0EDEA',
    floorColor: '#D4C9B8',
    accent: '#2A2A2A',
    rugPattern: 'geometric',
    desc: 'Clean lines, muted tones, contemporary geometry',
  },
  {
    id: 'minimal',
    label: 'Minimal',
    icon: '—',
    rugColor: '#EDE0CC',
    wallColor: '#FAFAFA',
    floorColor: '#E8E0D4',
    accent: '#C4A882',
    rugPattern: 'plain',
    desc: 'Calm, uncluttered, breathable luxury',
  },
  {
    id: 'luxury',
    label: 'Luxury',
    icon: '◈',
    rugColor: '#7B3F1A',
    wallColor: '#2A1206',
    floorColor: '#3B1A0A',
    accent: '#C4A882',
    rugPattern: 'medallion',
    desc: 'Rich textures, deep hues, opulent detail',
  },
  {
    id: 'cozy',
    label: 'Cozy',
    icon: '❧',
    rugColor: '#8B4513',
    wallColor: '#F5E6D3',
    floorColor: '#C4A882',
    accent: '#7B3F1A',
    rugPattern: 'floral',
    desc: 'Warm tones, soft textures, welcoming atmosphere',
  },
];

function RoomIllustration({ mood }) {
  const { rugColor, wallColor, floorColor, accent, rugPattern } = mood;

  return (
    <motion.svg
      viewBox="0 0 600 380"
      className="room-mood__svg"
      initial={false}
      animate={{ opacity: 1 }}
    >
      {/* Background wall */}
      <motion.rect
        x="0" y="0" width="600" height="380"
        animate={{ fill: wallColor }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Floor */}
      <motion.path
        d="M0 240 L600 240 L600 380 L0 380 Z"
        animate={{ fill: floorColor }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Rug */}
      <motion.rect
        x="120" y="260" width="360" height="100" rx="4"
        animate={{ fill: rugColor }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      {/* Rug border */}
      <motion.rect
        x="130" y="268" width="340" height="84" rx="2"
        fill="none" strokeWidth="2"
        animate={{ stroke: accent }}
        transition={{ duration: 0.8 }}
        opacity={0.5}
      />

      {/* Rug pattern based on mood */}
      {rugPattern === 'geometric' && (
        <>
          <motion.line x1="200" y1="268" x2="200" y2="352" stroke={accent} strokeWidth="1" opacity="0.3" animate={{ stroke: accent }} transition={{ duration: 0.8 }}/>
          <motion.line x1="280" y1="268" x2="280" y2="352" stroke={accent} strokeWidth="1" opacity="0.3" animate={{ stroke: accent }} transition={{ duration: 0.8 }}/>
          <motion.line x1="360" y1="268" x2="360" y2="352" stroke={accent} strokeWidth="1" opacity="0.3" animate={{ stroke: accent }} transition={{ duration: 0.8 }}/>
          <motion.line x1="130" y1="310" x2="470" y2="310" stroke={accent} strokeWidth="1" opacity="0.3" animate={{ stroke: accent }} transition={{ duration: 0.8 }}/>
        </>
      )}
      {rugPattern === 'medallion' && (
        <>
          <motion.circle cx="300" cy="310" r="30" fill="none" strokeWidth="2" opacity="0.4" animate={{ stroke: accent }} transition={{ duration: 0.8 }}/>
          <motion.circle cx="300" cy="310" r="15" fill="none" strokeWidth="1.5" opacity="0.5" animate={{ stroke: accent }} transition={{ duration: 0.8 }}/>
          <motion.circle cx="300" cy="310" r="5" opacity="0.6" animate={{ fill: accent }} transition={{ duration: 0.8 }}/>
        </>
      )}
      {rugPattern === 'floral' && (
        <>
          <motion.ellipse cx="300" cy="310" rx="25" ry="15" fill="none" strokeWidth="1.5" opacity="0.4" animate={{ stroke: accent }} transition={{ duration: 0.8 }}/>
          <motion.ellipse cx="300" cy="310" rx="10" ry="6" opacity="0.5" animate={{ fill: accent }} transition={{ duration: 0.8 }}/>
        </>
      )}

      {/* Sofa */}
      <motion.rect
        x="130" y="195" width="340" height="60" rx="6"
        animate={{ fill: accent }}
        transition={{ duration: 0.8 }}
        opacity={0.7}
      />
      <motion.rect
        x="125" y="200" width="50" height="55" rx="4"
        animate={{ fill: accent }}
        transition={{ duration: 0.8 }}
        opacity={0.8}
      />
      <motion.rect
        x="425" y="200" width="50" height="55" rx="4"
        animate={{ fill: accent }}
        transition={{ duration: 0.8 }}
        opacity={0.8}
      />

      {/* Coffee table */}
      <motion.rect
        x="220" y="250" width="160" height="12" rx="2"
        animate={{ fill: floorColor }}
        transition={{ duration: 0.8 }}
        opacity={0.8}
      />

      {/* Window */}
      <motion.rect
        x="220" y="30" width="160" height="100" rx="2"
        animate={{ fill: wallColor }}
        transition={{ duration: 0.8 }}
        opacity={0.6}
      />
      <motion.rect
        x="220" y="30" width="160" height="100" rx="2"
        fill="none" strokeWidth="2"
        animate={{ stroke: accent }}
        transition={{ duration: 0.8 }}
        opacity={0.3}
      />
      <motion.line x1="300" y1="30" x2="300" y2="130" stroke={accent} strokeWidth="1" opacity="0.25" animate={{ stroke: accent }} transition={{ duration: 0.8 }}/>
      <motion.line x1="220" y1="80" x2="380" y2="80" stroke={accent} strokeWidth="1" opacity="0.25" animate={{ stroke: accent }} transition={{ duration: 0.8 }}/>

      {/* Lamp */}
      <motion.path
        d="M480 140 L520 140 L500 100 Z"
        animate={{ fill: accent }}
        transition={{ duration: 0.8 }}
        opacity={0.5}
      />
      <motion.rect x="498" y="140" width="4" height="60" animate={{ fill: accent }} transition={{ duration: 0.8 }} opacity={0.4}/>

      {/* Plant */}
      <motion.circle cx="90" cy="150" r="30" animate={{ fill: '#2D5A27' }} transition={{ duration: 0.8 }} opacity={0.5}/>
      <motion.rect x="84" y="178" width="12" height="30" animate={{ fill: floorColor }} transition={{ duration: 0.8 }} opacity={0.6}/>

      {/* Light overlay from window */}
      <motion.ellipse
        cx="300" cy="200" rx="120" ry="40"
        fill="rgba(255,255,240,0.07)"
        animate={{ opacity: mood.id === 'luxury' ? 0.03 : mood.id === 'cozy' ? 0.08 : 0.06 }}
        transition={{ duration: 0.8 }}
      />
    </motion.svg>
  );
}

export default function RoomMoodSwitch() {
  const [activeMood, setActiveMood] = useState(moods[0]);

  return (
    <section id="room-mood" className="mood-section">
      <div className="container">
        {/* Header */}
        <div className="mood-section__header">
          <span className="eyebrow eyebrow--gold">Room Mood Visualiser</span>
          <h2 className="mood-section__title">
            Your room.<br /><em>Your mood.</em>
          </h2>
          <p className="mood-section__subtitle">
            See how different rug styles transform the same space. Switch moods to visualise.
          </p>
        </div>

        {/* Mood buttons */}
        <div className="mood-btns">
          {moods.map(mood => (
            <button
              key={mood.id}
              className={`mood-btn ${activeMood.id === mood.id ? 'mood-btn--active' : ''}`}
              onClick={() => setActiveMood(mood)}
              id={`mood-btn-${mood.id}`}
              style={{ '--mood-color': mood.accent }}
            >
              <span className="mood-btn__icon">{mood.icon}</span>
              <span className="mood-btn__label">{mood.label}</span>
            </button>
          ))}
        </div>

        {/* Room illustration */}
        <div className="mood-room-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMood.id}
              className="mood-room"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <RoomIllustration mood={activeMood} />
            </motion.div>
          </AnimatePresence>

          {/* Mood description badge */}
          <motion.div
            className="mood-desc-badge"
            key={activeMood.id + '-desc'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span className="mood-desc-badge__mood">{activeMood.label}</span>
            <span className="mood-desc-badge__text">{activeMood.desc}</span>
          </motion.div>
        </div>

        <div className="mood-cta-row">
          <a href="#collections" className="btn btn--outline-white" id="mood-explore-btn">
            Explore {activeMood.label} Collection →
          </a>
        </div>
      </div>
    </section>
  );
}
