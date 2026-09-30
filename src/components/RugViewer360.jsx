import { useEffect, useRef } from 'react';

/* ── Config ─────────────────────────────────────── */
const COLS      = 9;      // cards per ring
const ROWS      = 4;      // rings stacked vertically
const RADIUS    = 620;    // px — cylinder radius
const CARD_W    = 264;    // px
const CARD_H    = 165;    // px
const ROW_GAP   = 18;     // px between rows
const AUTO_SPD  = 0.13;   // °/frame auto-rotate

/* ── Rug images (all 19 local collection assets) ─── */
const IMGS = [
  '/rugs/rug-1.jpeg',
  '/rugs/rug-2.jpeg',
  '/rugs/rug-3.jpeg',
  '/rugs/rug-4.jpeg',
  '/rugs/rug-5.jpeg',
  '/rugs/rug-6.jpeg',
  '/rugs/rug-7.jpeg',
  '/rugs/rug-8.jpeg',
  '/rugs/rug-9.jpeg',
  '/rugs/rug-10.jpeg',
  '/rugs/rug-11.jpeg',
  '/rugs/rug-12.jpeg',
  '/rugs/rug-13.jpeg',
  '/rugs/rug-14.jpeg',
  '/rugs/rug-15.jpeg',
  '/rugs/rug-16.jpeg',
  '/rugs/rug-17.jpeg',
  '/rugs/rug-18.jpeg',
  '/rugs/rug-19.jpeg',
];

export default function RugViewer360() {
  const cylRef  = useRef(null);
  const rotY    = useRef(0);
  const velY    = useRef(AUTO_SPD);
  const dragging = useRef(false);
  const lastX   = useRef(0);
  const rafRef  = useRef(null);

  useEffect(() => {
    /* ── Pointer events ── */
    const onDown = (e) => {
      dragging.current = true;
      lastX.current = e.clientX ?? e.touches?.[0]?.clientX;
    };
    const onMove = (e) => {
      if (!dragging.current) return;
      const x  = e.clientX ?? e.touches?.[0]?.clientX;
      const dx = x - lastX.current;
      velY.current = dx * 0.28;
      lastX.current = x;
    };
    const onUp = () => { dragging.current = false; };

    /* ── RAF loop ── */
    const loop = () => {
      if (dragging.current) {
        velY.current *= 0.82;          // inertia while holding
      } else {
        velY.current += (AUTO_SPD - velY.current) * 0.022; // glide back to auto
      }
      rotY.current += velY.current;
      if (cylRef.current) {
        cylRef.current.style.transform = `rotateY(${rotY.current}deg)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    window.addEventListener('mousedown',  onDown);
    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mouseup',    onUp);
    window.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove',  onMove, { passive: true });
    window.addEventListener('touchend',   onUp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mouseup',    onUp);
      window.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchmove',  onMove);
      window.removeEventListener('touchend',   onUp);
    };
  }, []);

  /* ── Build cards ── */
  const cards = [];
  const rowMid = (ROWS - 1) / 2;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const angle  = (col / COLS) * 360;
      const yOff   = (row - rowMid) * (CARD_H + ROW_GAP);
      const imgIdx = (row * COLS + col) % IMGS.length;
      cards.push(
        <div
          key={`${row}-${col}`}
          className="rv360__card"
          style={{
            transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) translateY(${yOff}px)`,
          }}
        >
          <img src={IMGS[imgIdx]} alt="" loading="lazy" draggable={false} />
        </div>
      );
    }
  }

  return (
    <section className="rv360" id="gallery360">

      {/* ── Section header ── */}
      <div className="container rv360__top">
        <span className="eyebrow eyebrow--gold">360° Collection View</span>
        <h2 className="rv360__heading">
          Explore Our <em>Rugs</em>
        </h2>
        <p className="rv360__subhead">
          Drag left or right to explore the full collection
        </p>
      </div>

      {/* ── 3-D scene ── */}
      <div className="rv360__scene">

        {/* Cylinder */}
        <div ref={cylRef} className="rv360__cylinder">
          {cards}
        </div>

        {/* Center overlay */}
        <div className="rv360__overlay" aria-hidden="true">
          <span className="rv360__overlay-brand">Pakiza Rugs &amp; Co.</span>
          <p className="rv360__overlay-hint">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Drag to rotate
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </p>
        </div>
      </div>

    </section>
  );
}
