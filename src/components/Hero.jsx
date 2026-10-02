import { useState, useEffect, useRef } from 'react';
import { getHeroVideoSource } from '../utils/heroVideoStorage';

const heroFeatures = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 12l2.5 2.5L16 9"/>
      </svg>
    ),
    label: 'HAND-KNOTTED',
    sub: 'HERITAGE',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    label: 'PREMIUM',
    sub: 'QUALITY',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    label: 'TIMELESS',
    sub: 'DESIGNS',
  },
];

export default function Hero() {
  const [videoSrc, setVideoSrc] = useState('/hero.mp4');
  const videoRef = useRef(null);

  useEffect(() => {
    let active = true;
    const loadVideo = async () => {
      try {
        const src = await getHeroVideoSource();
        if (active && src) {
          setVideoSrc(src);
          if (videoRef.current) {
            videoRef.current.load();
          }
        }
      } catch (err) {
        console.warn('Failed loading hero video:', err);
      }
    };

    loadVideo();

    const handleVideoChange = () => {
      loadVideo();
    };

    window.addEventListener('pakiza_hero_video_changed', handleVideoChange);
    return () => {
      active = false;
      window.removeEventListener('pakiza_hero_video_changed', handleVideoChange);
    };
  }, []);

  return (
    <section id="hero" className="sq-hero">
      {/* Full-bleed background video */}
      <div className="sq-hero__bg">
        <video
          ref={videoRef}
          key={videoSrc}
          className="sq-hero__video"
          autoPlay muted loop playsInline
        >
          <source
            src={videoSrc}
            type="video/mp4"
          />
        </video>
        <div className="sq-hero__overlay" />
      </div>

      {/* Centered content */}
      <div className="sq-hero__body">
        {/* Brand eyebrow — gold with decorative lines */}
        <div className="sq-hero__eyebrow">
          <span className="sq-hero__eyebrow-line" />
          <span className="sq-hero__eyebrow-text">PAKIZA RUGS &amp; CO</span>
          <span className="sq-hero__eyebrow-line" />
        </div>

        {/* Main headline */}
        <h1 className="sq-hero__title">
          A RUG THAT<br />
          <em>Makes it Home</em>
        </h1>

        {/* Feature badges — visible on mobile like screenshot */}
        <div className="sq-hero__features">
          {heroFeatures.map((f) => (
            <div key={f.label} className="sq-hero__feature-item">
              <span className="sq-hero__feature-icon">{f.icon}</span>
              <span className="sq-hero__feature-label">{f.label}<br />{f.sub}</span>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <a href="#collections" className="sq-hero__cta" id="hero-shop-btn">
          SHOP COLLECTION
          <span className="sq-hero__cta-arrow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </a>

        {/* Caption */}
        <p className="sq-hero__caption">Est. 1987 · Hand-knotted · Certified Authentic</p>
      </div>

      {/* Marquee strip at bottom */}
      <div className="sq-hero__marquee">
        <div className="sq-hero__marquee-track">
          {['Persian Heritage','Moroccan Dreams','Turkish Kilim','Silk Treasures','Beni Ourain','Qom Silk','Kashmir Wool','Tribal Flatweave',
            'Persian Heritage','Moroccan Dreams','Turkish Kilim','Silk Treasures','Beni Ourain','Qom Silk','Kashmir Wool','Tribal Flatweave'].map((c, i) => (
            <span key={i} className="sq-hero__marquee-item">
              <svg width="5" height="5" viewBox="0 0 5 5"><circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" opacity="0.45"/></svg>
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
