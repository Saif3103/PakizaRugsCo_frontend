import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 'wool',
    phase: '01',
    label: 'Raw Wool',
    title: 'The Finest Wool',
    desc: 'Hand-sorted fleece from highland sheep — every fiber inspected for length, texture, and purity before spinning.',
    color: '#EDE0CC',
    bg: 'rgba(237,224,204,0.06)',
    svgPath: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="cs-step__svg">
        <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
        <circle cx="60" cy="60" r="35" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
        <circle cx="60" cy="60" r="18" fill="currentColor" opacity="0.15"/>
        <path d="M30 60 Q45 45 60 60 Q75 75 90 60" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.7"/>
        <path d="M35 70 Q50 55 60 68 Q70 81 85 68" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
        <circle cx="60" cy="60" r="5" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
  },
  {
    id: 'dye',
    phase: '02',
    label: 'Natural Dye',
    title: 'Colours of the Earth',
    desc: 'Pomegranate rind, indigo, saffron, madder root — ancient dye recipes create hues that deepen beautifully with age.',
    color: '#C4A882',
    bg: 'rgba(196,168,130,0.06)',
    svgPath: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="cs-step__svg">
        <path d="M20 90 Q40 30 60 50 Q80 70 100 30" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.7" strokeLinecap="round"/>
        <circle cx="60" cy="55" r="22" fill="currentColor" opacity="0.12"/>
        <path d="M40 60 Q55 40 70 55 Q80 65 95 45" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
        <circle cx="40" cy="75" r="8" fill="currentColor" opacity="0.2"/>
        <circle cx="75" cy="35" r="6" fill="currentColor" opacity="0.3"/>
        <circle cx="95" cy="70" r="5" fill="currentColor" opacity="0.15"/>
      </svg>
    ),
  },
  {
    id: 'tufting',
    phase: '03',
    label: 'Hand Tufting',
    title: 'The Art of the Knot',
    desc: 'Each knot is hand-tied at 200–800 knots per square inch. A 9×12 rug takes 4–6 months to complete.',
    color: '#7B3F1A',
    bg: 'rgba(123,63,26,0.08)',
    svgPath: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="cs-step__svg">
        <rect x="20" y="20" width="80" height="80" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
        {[0,1,2,3,4].map(r => [0,1,2,3,4].map(c => (
          <circle key={`${r}-${c}`} cx={30 + c*16} cy={30 + r*16} r="3" fill="currentColor" opacity={0.2 + (r+c)*0.05}/>
        )))}
        <path d="M25 60 Q45 40 60 60 Q75 80 95 55" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'finish',
    phase: '04',
    label: 'Finished Rug',
    title: 'A Masterpiece Emerges',
    desc: 'Stretching, washing, clipping, and blocking — the final rug is a living artwork ready to transform your space.',
    color: '#EDE0CC',
    bg: 'rgba(237,224,204,0.04)',
    svgPath: (
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="cs-step__svg">
        <rect x="15" y="15" width="90" height="90" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
        <rect x="25" y="25" width="70" height="70" rx="2" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
        <rect x="35" y="35" width="50" height="50" fill="currentColor" opacity="0.08"/>
        <path d="M35 60 Q55 40 60 60 Q65 80 85 60" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.7" strokeLinecap="round"/>
        <path d="M15 15 L105 105M105 15 L15 105" stroke="currentColor" strokeWidth="0.5" opacity="0.15"/>
      </svg>
    ),
  },
];

export default function CraftsmanshipReveal() {
  const sectionRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.cs-step');

      cards.forEach((card, i) => {
        // Stagger reveal
        gsap.fromTo(card,
          { opacity: 0, x: i % 2 === 0 ? -80 : 80, scale: 0.92 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // SVG draw-on
        const svg = card.querySelector('.cs-step__svg path, .cs-step__svg circle');
        if (svg) {
          gsap.fromTo(svg,
            { opacity: 0, scale: 0.5, transformOrigin: 'center' },
            {
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
              },
            }
          );
        }
      });

      // Progress line
      if (progressRef.current) {
        gsap.fromTo(progressRef.current,
          { scaleY: 0, transformOrigin: 'top center' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="craftsmanship" className="cs-section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="cs-section__header">
          <span className="eyebrow eyebrow--gold">From Fleece to Floor</span>
          <h2 className="cs-section__title">
            The art of<br /><em>making a rug</em>
          </h2>
          <p className="cs-section__subtitle">
            Each Pakiza rug passes through four sacred stages, each taking weeks of patient, dedicated craft.
          </p>
        </div>

        {/* Steps */}
        <div className="cs-steps-wrap">
          {/* Vertical progress line */}
          <div className="cs-progress-line">
            <div className="cs-progress-line__track" ref={progressRef} />
          </div>

          <div className="cs-steps">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className={`cs-step cs-step--${i % 2 === 0 ? 'left' : 'right'}`}
                style={{ '--step-color': step.color, '--step-bg': step.bg }}
              >
                {/* Phase number */}
                <div className="cs-step__phase">{step.phase}</div>

                {/* Card */}
                <div className="cs-step__card">
                  <div className="cs-step__icon-wrap">
                    {step.svgPath}
                  </div>
                  <div className="cs-step__text">
                    <span className="cs-step__label">{step.label}</span>
                    <h3 className="cs-step__title">{step.title}</h3>
                    <p className="cs-step__desc">{step.desc}</p>
                  </div>
                </div>

                {/* Connector dot */}
                <div className="cs-step__dot" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
