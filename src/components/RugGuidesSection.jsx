const guides = [
  {
    id: 1,
    tag: 'RUG GUIDE',
    title: 'How to Choose the Right Rug for Your Space',
    image: '/rugs/rug-6.jpeg',
    href: '#contact',
  },
  {
    id: 2,
    tag: 'HERITAGE',
    title: 'Why Handmade Rugs Last a Lifetime',
    image: '/rugs/rug-2.jpeg',
    href: '#contact',
  },
  {
    id: 3,
    tag: 'TRENDS',
    title: 'Top Rug Trends for Modern Homes',
    image: '/rugs/rug-16.jpeg',
    href: '#contact',
  },
];

export default function RugGuidesSection() {
  return (
    <section className="pk-guides" id="pk-guides">
      <div className="container">
        {/* Header */}
        <div className="pk-guides__header">
          <div>
            <span className="pk-eyebrow pk-eyebrow--gold">Rug Guides</span>
            <h2 className="pk-guides__title">Tips &amp; Inspiration</h2>
          </div>
          <a href="#contact" className="pk-view-all pk-view-all--light" id="guides-view-all">
            View All
            <span className="pk-view-all__arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </a>
        </div>

        {/* Cards */}
        <div className="pk-guides__grid">
          {guides.map((g) => (
            <a key={g.id} href={g.href} className="pk-guide-card" id={`guide-${g.id}`} aria-label={g.title}>
              <img src={g.image} alt={g.title} className="pk-guide-card__img" loading="lazy" />
              <div className="pk-guide-card__overlay" />
              <div className="pk-guide-card__content">
                <span className="pk-guide-card__tag">{g.tag}</span>
                <h3 className="pk-guide-card__title">{g.title}</h3>
                <span className="pk-guide-card__arrow">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
