import { useState, useEffect, useRef } from 'react';
import { getHeroVideoSource } from '../utils/heroVideoStorage';

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

      {/* Centered content — Squarespace style */}
      <div className="sq-hero__body">
        {/* Brand eyebrow — gold with decorative lines */}
        <div className="sq-hero__eyebrow">
          <span className="sq-hero__eyebrow-line" />
          <span className="sq-hero__eyebrow-text">PAKIZA RUGS &amp; CO</span>
          <span className="sq-hero__eyebrow-line" />
        </div>

        {/* Main headline — display + serif mix like Squarespace */}
        <h1 className="sq-hero__title">
          A rug that<br />
          <em>makes it home</em>
        </h1>

        {/* Primary CTA — white rectangle, sharp corners */}
        <a href="#collections" className="sq-hero__cta" id="hero-shop-btn">
          Shop Collection
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
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

