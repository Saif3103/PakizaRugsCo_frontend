import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function FabricDivider({ flip = false }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const path = svgRef.current.querySelector('.fabric-wave');
    if (!path) return;

    gsap.to(path, {
      attr: {
        d: flip
          ? 'M0,40 C200,80 400,0 600,50 C800,100 1000,20 1200,60 L1200,0 L0,0 Z'
          : 'M0,60 C200,20 400,80 600,40 C800,0 1000,70 1200,30 L1200,80 L0,80 Z',
      },
      duration: 4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, [flip]);

  return (
    <div className="fabric-divider" aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="fabric-divider__svg"
      >
        <defs>
          <linearGradient id="fabricGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#7B3F1A" stopOpacity="0.6" />
            <stop offset="30%"  stopColor="#C4A882" stopOpacity="0.4" />
            <stop offset="70%"  stopColor="#5C2D0E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3B1A0A" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="fabricGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#4A2210" stopOpacity="0.3" />
            <stop offset="50%"  stopColor="#C4A882" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2A1206" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Shadow wave behind */}
        <path
          d="M0,55 C200,25 400,75 600,45 C800,15 1000,65 1200,35 L1200,80 L0,80 Z"
          fill="url(#fabricGrad2)"
          className="fabric-shadow"
        />
        {/* Main ribbon */}
        <path
          d={flip
            ? 'M0,50 C200,90 400,10 600,55 C800,100 1000,25 1200,65 L1200,80 L0,80 Z'
            : 'M0,65 C200,25 400,75 600,45 C800,15 1000,65 1200,35 L1200,80 L0,80 Z'}
          fill="url(#fabricGrad)"
          className="fabric-wave"
        />
        {/* Sheen line */}
        <path
          d="M0,50 C300,30 600,60 900,40 C1050,32 1150,45 1200,38"
          fill="none"
          stroke="rgba(196,168,130,0.25)"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
}
