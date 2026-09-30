import ParticleGlobe from './ParticleGlobe';

export default function GlobeCTA() {
  return (
    <section id="globe-cta" className="globe-cta" aria-label="Start your collection">
      {/* Background Rug Texture & Full-bleed particle globe canvas */}
      <div className="globe-cta__canvas-wrap">
        <img
          src="/rugs/rug-7.jpeg"
          alt="Pakiza Handcrafted Luxury Rug Background"
          className="globe-cta__bg-img"
        />
        <ParticleGlobe className="globe-cta__canvas" />
        {/* Soft radial vignette & dark gradient for high legibility */}
        <div className="globe-cta__vignette" />
      </div>

      {/* Centred content overlay */}
      <div className="globe-cta__body">
        <h2 className="globe-cta__title">
          Start your rug<br />
          <em>collection today</em>
        </h2>
        <p className="globe-cta__sub">
          Hand-picked. Certified authentic. Delivered to your door.
        </p>
        <a href="#contact" className="globe-cta__btn" id="globe-cta-btn">
          GET IN TOUCH
        </a>
      </div>
    </section>
  );
}
