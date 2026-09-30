import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Shipping destinations
const destinations = [
  { name: 'New York', x: 22, y: 34, region: 'North America' },
  { name: 'London', x: 46, y: 26, region: 'Europe' },
  { name: 'Paris', x: 48, y: 27, region: 'Europe' },
  { name: 'Dubai', x: 61, y: 40, region: 'Middle East' },
  { name: 'Mumbai', x: 65, y: 45, region: 'South Asia' },
  { name: 'Singapore', x: 74, y: 52, region: 'Southeast Asia' },
  { name: 'Sydney', x: 82, y: 72, region: 'Oceania' },
  { name: 'Tokyo', x: 82, y: 33, region: 'East Asia' },
  { name: 'Toronto', x: 20, y: 30, region: 'North America' },
  { name: 'São Paulo', x: 28, y: 68, region: 'South America' },
  { name: 'Nairobi', x: 57, y: 57, region: 'Africa' },
  { name: 'Chandauli', x: 67, y: 39, region: 'Origin' },
];

const routes = [
  { from: destinations[11], to: destinations[0] },  // Chandauli → NY
  { from: destinations[11], to: destinations[1] },  // Chandauli → London
  { from: destinations[11], to: destinations[3] },  // Chandauli → Dubai
  { from: destinations[11], to: destinations[5] },  // Chandauli → Singapore
  { from: destinations[11], to: destinations[7] },  // Chandauli → Tokyo
  { from: destinations[11], to: destinations[6] },  // Chandauli → Sydney
];

function ShippingLine({ from, to, index }) {
  const d = `M ${from.x}% ${from.y}% Q ${(from.x + to.x) / 2}% ${Math.min(from.y, to.y) - 15}% ${to.x}% ${to.y}%`;

  return (
    <motion.path
      d={d}
      fill="none"
      stroke="rgba(196,168,130,0.5)"
      strokeWidth="1"
      strokeDasharray="6 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 2, delay: index * 0.3, ease: 'easeInOut' }}
    />
  );
}

function CityPin({ city, index }) {
  const isOrigin = city.region === 'Origin';
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 200 }}
    >
      {/* Pulse ring */}
      <motion.circle
        cx={`${city.x}%`}
        cy={`${city.y}%`}
        r={isOrigin ? "12" : "8"}
        fill="none"
        stroke={isOrigin ? '#C4A882' : 'rgba(196,168,130,0.4)'}
        strokeWidth="1"
        animate={{ r: [isOrigin ? '10' : '6', isOrigin ? '18' : '14', isOrigin ? '10' : '6'], opacity: [0.8, 0, 0.8] }}
        transition={{ repeat: Infinity, duration: 2.5, delay: index * 0.2 }}
      />
      {/* Dot */}
      <motion.circle
        cx={`${city.x}%`}
        cy={`${city.y}%`}
        r={isOrigin ? "5" : "3"}
        fill={isOrigin ? '#C4A882' : 'rgba(196,168,130,0.7)'}
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ repeat: Infinity, duration: 2, delay: index * 0.15 }}
      />
    </motion.g>
  );
}

const stats = [
  { n: '60+', l: 'Countries' },
  { n: '2,800+', l: 'Deliveries' },
  { n: '15 Days', l: 'Avg Delivery' },
  { n: '100%', l: 'Insured' },
];

export default function GlobalShippingMap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="global-shipping" className="map-section" ref={ref}>
      {/* Header */}
      <div className="container">
        <div className="map-section__header">
          <span className="eyebrow eyebrow--gold">Worldwide Delivery</span>
          <h2 className="map-section__title">
            From Chandauli, UP.<br /><em>To your door.</em>
          </h2>
          <p className="map-section__subtitle">
            White-glove delivery to 60+ countries. Every rug insured, tracked, and placed by our team.
          </p>
        </div>

        {/* Stats row */}
        <div className="map-stats">
          {stats.map((s, i) => (
            <motion.div
              key={s.l}
              className="map-stat"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <span className="map-stat__n">{s.n}</span>
              <span className="map-stat__l">{s.l}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="map-wrap">
        {/* World map background using SVG paths — simplified continents */}
        <svg
          viewBox="0 0 100 65"
          className="map-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grid lines */}
          {[15, 25, 35, 45, 55].map(y => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(196,168,130,0.06)" strokeWidth="0.3"/>
          ))}
          {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="65" stroke="rgba(196,168,130,0.06)" strokeWidth="0.3"/>
          ))}

          {/* North America */}
          <path d="M5 15 L25 13 L28 22 L24 32 L18 36 L12 34 L8 28 Z" fill="rgba(196,168,130,0.12)" stroke="rgba(196,168,130,0.2)" strokeWidth="0.3"/>
          {/* South America */}
          <path d="M20 40 L30 38 L33 52 L28 62 L22 60 L18 52 Z" fill="rgba(196,168,130,0.12)" stroke="rgba(196,168,130,0.2)" strokeWidth="0.3"/>
          {/* Europe */}
          <path d="M43 18 L53 16 L56 24 L50 28 L44 26 Z" fill="rgba(196,168,130,0.12)" stroke="rgba(196,168,130,0.2)" strokeWidth="0.3"/>
          {/* Africa */}
          <path d="M45 32 L58 30 L62 42 L58 58 L48 58 L44 48 Z" fill="rgba(196,168,130,0.12)" stroke="rgba(196,168,130,0.2)" strokeWidth="0.3"/>
          {/* Asia */}
          <path d="M55 15 L85 13 L88 30 L80 42 L65 45 L58 35 Z" fill="rgba(196,168,130,0.12)" stroke="rgba(196,168,130,0.2)" strokeWidth="0.3"/>
          {/* Australia */}
          <path d="M76 55 L88 53 L90 62 L82 64 L76 62 Z" fill="rgba(196,168,130,0.12)" stroke="rgba(196,168,130,0.2)" strokeWidth="0.3"/>

          {/* Shipping routes (shown when in view) */}
          {inView && (
            <svg viewBox="0 0 100 65" style={{ overflow: 'visible' }}>
              {routes.map((r, i) => (
                <ShippingLine key={i} from={r.from} to={r.to} index={i} />
              ))}
            </svg>
          )}

          {/* City pins */}
          {inView && destinations.map((city, i) => (
            <CityPin key={city.name} city={city} index={i} />
          ))}
        </svg>

        {/* Chandauli label */}
        {inView && (
          <motion.div
            className="map-origin-label"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <span className="map-origin-label__dot" />
            Chandauli, Uttar Pradesh, India — Origin
          </motion.div>
        )}
      </div>

      <div className="container">
        <div className="map-cta-row">
          <a href="#contact" className="btn btn--outline-white" id="map-shipping-btn">
            Enquire About Shipping
          </a>
        </div>
      </div>
    </section>
  );
}
