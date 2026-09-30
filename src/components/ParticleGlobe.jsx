import { useEffect, useRef } from 'react';

// ─── Config ───────────────────────────────────────────────────────────────────
const CONFIG = {
  count: 1600,          // number of particles
  radius: 220,          // sphere radius (canvas units)
  dotMin: 0.6,          // min dot size
  dotMax: 2.0,          // max dot size
  speedX: 0.0018,       // auto-rotation speed X axis
  speedY: 0.0032,       // auto-rotation speed Y axis
  color: [255, 255, 255], // RGB
  alphaMin: 0.08,       // back-face min opacity
  alphaMax: 0.95,       // front-face max opacity
  mouseFactor: 0.00018, // how much mouse influences rotation
  glowRadius: 1.8,      // glow spread multiplier around each dot
};

// ─── Build particle positions on a sphere (Fibonacci lattice) ─────────────────
function buildParticles(n) {
  const pts = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
  for (let i = 0; i < n; i++) {
    const y   = 1 - (i / (n - 1)) * 2;       // y from 1 to -1
    const r   = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push({ x: r * Math.cos(theta), y, z: r * Math.sin(theta) });
  }
  return pts;
}

export default function ParticleGlobe({ className = '' }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef({
    rotX: 0.42, rotY: 0,
    mouseX: 0, mouseY: 0,
    raf: null,
    particles: buildParticles(CONFIG.count),
  });

  useEffect(() => {
    const canvas  = canvasRef.current;
    if (!canvas) return;
    const ctx     = canvas.getContext('2d');
    const state   = stateRef.current;

    // ── Resize ──────────────────────────────────────────────────────────────
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Mouse tracking ───────────────────────────────────────────────────────
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      state.mouseX = (e.clientX - rect.left - rect.width  / 2);
      state.mouseY = (e.clientY - rect.top  - rect.height / 2);
    };
    window.addEventListener('mousemove', onMove);

    // ── Touch tracking ───────────────────────────────────────────────────────
    const onTouch = (e) => {
      if (!e.touches.length) return;
      const rect = canvas.getBoundingClientRect();
      state.mouseX = (e.touches[0].clientX - rect.left - rect.width  / 2);
      state.mouseY = (e.touches[0].clientY - rect.top  - rect.height / 2);
    };
    window.addEventListener('touchmove', onTouch, { passive: true });

    // ── Rotation helpers ─────────────────────────────────────────────────────
    const rotateX = (p, a) => {
      const cos = Math.cos(a), sin = Math.sin(a);
      return { x: p.x, y: p.y * cos - p.z * sin, z: p.y * sin + p.z * cos };
    };
    const rotateY = (p, a) => {
      const cos = Math.cos(a), sin = Math.sin(a);
      return { x: p.x * cos + p.z * sin, y: p.y, z: -p.x * sin + p.z * cos };
    };

    // ── Draw loop ────────────────────────────────────────────────────────────
    const draw = () => {
      const dpr  = window.devicePixelRatio || 1;
      const W    = canvas.width  / dpr;
      const H    = canvas.height / dpr;
      const cx   = W / 2;
      const cy   = H / 2;
      const R    = CONFIG.radius * Math.min(W, H) / 520; // scale to canvas

      // advance rotation
      state.rotY += CONFIG.speedY + state.mouseX * CONFIG.mouseFactor;
      state.rotX += CONFIG.speedX + state.mouseY * CONFIG.mouseFactor * 0.5;

      ctx.clearRect(0, 0, W, H);

      // project & sort particles by depth
      const projected = state.particles.map((p) => {
        let q = rotateY(p, state.rotY);
            q = rotateX(q, state.rotX);
        const depth   = (q.z + 1) / 2;                  // 0 = back, 1 = front
        const alpha   = CONFIG.alphaMin + depth * (CONFIG.alphaMax - CONFIG.alphaMin);
        const size    = (CONFIG.dotMin  + depth * (CONFIG.dotMax  - CONFIG.dotMin));
        const sx      = cx + q.x * R;
        const sy      = cy + q.y * R;
        return { sx, sy, depth, alpha, size };
      });
      projected.sort((a, b) => a.depth - b.depth);   // paint back-to-front

      // draw particles
      const [r, g, b] = CONFIG.color;
      for (const p of projected) {
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha.toFixed(3)})`;
        ctx.fill();

        // soft glow on front-facing dots
        if (p.depth > 0.55) {
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, p.size * CONFIG.glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${(p.alpha * 0.12).toFixed(3)})`;
          ctx.fill();
        }
      }

      state.raf = requestAnimationFrame(draw);
    };

    state.raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(state.raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-globe ${className}`}
      aria-hidden="true"
    />
  );
}
