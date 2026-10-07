import logoImg from '../assets/logo.png';

const footerCols = [
  {
    heading: 'Collections',
    links: ['Persian Heritage', 'Moroccan Dreams', 'Turkish Kilim', 'Silk Treasures', 'Contemporary', 'Tribal & Nomadic'],
  },
  {
    heading: 'Services',
    links: ['Custom Orders', 'Rug Restoration', 'Interior Consultation', 'Authentication', 'White Glove Delivery', 'Corporate Sourcing'],
  },
  {
    heading: 'Company',
    links: ['About Us', 'Blog & Guides', 'Care Instructions', 'Shipping Policy', 'Returns', 'Privacy Policy'],
  },
];

export default function Footer() {
  return (
    <footer className="sq-footer">
      <div className="container">

        {/* Newsletter band — Squarespace style */}
        <div className="sq-footer__newsletter">
          <div className="sq-footer__newsletter-text">
            <h3>Stay in the loop</h3>
            <p>New arrivals, collector's guides, and exclusive offers — straight to your inbox.</p>
          </div>
          <form className="sq-footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" aria-label="Email for newsletter" />
            <button type="submit" className="btn--white btn">Subscribe</button>
          </form>
        </div>

        <div className="sq-footer__divider" />

        {/* Main footer grid */}
        <div className="sq-footer__main">
          {/* Brand */}
          <div className="sq-footer__brand">
            <a href="#" className="sq-footer__logo">
              <img src={logoImg} alt="Pakiza Rugs & Co." className="sq-footer__logo-img" />
              <div>
                <span className="sq-footer__logo-main">PAKIZA</span>
                <span className="sq-footer__logo-sub">RUGS &amp; CO.</span>
              </div>
            </a>
            <p className="sq-footer__tagline">
              Authentic handcrafted rugs from the world's finest ateliers.
              Each piece is a living work of art.
            </p>
            <div className="sq-footer__socials">
              {[
                { label: 'IG', name: 'Instagram', href: 'https://www.instagram.com/pakiza_rugs_co?stkn=MTYzMzZoMjZiOWdwdA==' },
                { label: 'FB', name: 'Facebook', href: '#' },
                { label: 'PT', name: 'Pinterest', href: '#' },
                { label: 'WA', name: 'WhatsApp', href: 'https://wa.me/917007626680' },
              ].map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="sq-footer__social" aria-label={s.name}>{s.label}</a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerCols.map((col) => (
            <div key={col.heading} className="sq-footer__col">
              <h4 className="sq-footer__col-heading">{col.heading}</h4>
              {col.links.map((l) => (
                <a key={l} href="#" className="sq-footer__link">{l}</a>
              ))}
            </div>
          ))}
        </div>

        <div className="sq-footer__divider" />

        {/* Bottom bar */}
        <div className="sq-footer__bottom">
          <p>© {new Date().getFullYear()} Pakiza Rugs &amp; Co. All rights reserved.</p>
          <p>Est. 1987 · Chandauli, Uttar Pradesh, India · Woven with care</p>
        </div>

      </div>
    </footer>
  );
}
