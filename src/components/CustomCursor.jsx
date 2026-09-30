import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const pos      = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ring     = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafRef   = useRef(null);
  const [visible, setVisible]   = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onEnter = (e) => {
      const el = e.target.closest('a, button, [data-cursor], input, textarea, label, select');
      if (el) setHovering(true);
    };
    const onLeave = (e) => {
      const el = e.target.closest('a, button, [data-cursor], input, textarea, label, select');
      if (el) setHovering(false);
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    const onLeaveWin = () => setVisible(false);
    const onEnterWin = () => setVisible(true);

    document.addEventListener('mousemove',  onMove);
    document.addEventListener('mouseover',  onEnter);
    document.addEventListener('mouseout',   onLeave);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    document.addEventListener('mouseleave', onLeaveWin);
    document.addEventListener('mouseenter', onEnterWin);

    const LERP = 0.10;
    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ring.current.x += (pos.current.x - ring.current.x) * LERP;
        ring.current.y += (pos.current.y - ring.current.y) * LERP;
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseover',  onEnter);
      document.removeEventListener('mouseout',   onLeave);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseleave', onLeaveWin);
      document.removeEventListener('mouseenter', onEnterWin);
      cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  useEffect(() => {
    document.documentElement.style.cursor = 'none';
    return () => { document.documentElement.style.cursor = ''; };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className={[
          'c-cursor__ring',
          hovering ? 'c-cursor__ring--hover'  : '',
          clicking ? 'c-cursor__ring--click'  : '',
          !visible ? 'c-cursor__ring--hidden' : '',
        ].join(' ')}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className={[
          'c-cursor__dot',
          hovering ? 'c-cursor__dot--hover'  : '',
          clicking ? 'c-cursor__dot--click'  : '',
          !visible ? 'c-cursor__dot--hidden' : '',
        ].join(' ')}
        aria-hidden="true"
      />
    </>
  );
}
