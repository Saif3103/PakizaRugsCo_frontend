import { useState } from 'react';

export default function HeritageVideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="pk-heritage-video" id="pk-heritage">
      {/* Full-width video background */}
      <video
        className="pk-heritage-video__video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="pk-heritage-video__overlay" />

      <div className="container pk-heritage-video__content">
        {/* Left — text */}
        <div className="pk-heritage-video__left">
          <span className="pk-eyebrow pk-eyebrow--gold">Our Heritage</span>
          <h2 className="pk-heritage-video__title">
            Crafted by Hands,<br />
            Loved for Generations
          </h2>
          <p className="pk-heritage-video__desc">
            Each rug is a story of skilled artisans, natural materials, and timeless
            tradition passed down for generations.
          </p>
          <a href="#contact" className="pk-heritage-video__cta" id="heritage-story-btn">
            OUR STORY
            <span className="pk-heritage-video__cta-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </a>
        </div>

        {/* Right — watch button */}
        <div className="pk-heritage-video__right">
          <button
            className="pk-heritage-video__play-btn"
            onClick={() => setPlaying(!playing)}
            aria-label="Watch our artisan story"
            id="heritage-play-btn"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          <div className="pk-heritage-video__watch-label">
            <span>WATCH OUR</span>
            <span>ARTISAN STORY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
