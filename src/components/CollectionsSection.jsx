import { useRef } from 'react';

const collections = [
  { id: 1, name: 'Oushak\nCollection',   image: '/rugs/rug-7.jpeg',  href: '#collections' },
  { id: 2, name: 'Classic\nCollection',  image: '/rugs/rug-3.jpeg',  href: '#collections' },
  { id: 3, name: 'Modern\nCollection',   image: '/rugs/rug-12.jpeg', href: '#collections' },
  { id: 4, name: 'Custom\nRugs',         image: '/rugs/rug-2.jpeg',  href: '#collections' },
  { id: 5, name: 'Runner\nRugs',         image: '/rugs/rug-4.jpeg',  href: '#collections' },
  { id: 6, name: 'Round\nRugs',          image: '/rugs/rug-14.jpeg', href: '#collections' },
];

export default function CollectionsSection() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 220, behavior: 'smooth' });
    }
  };

  return (
    <section className="pk-collections" id="pk-collections">
      <div className="pk-collections__inner container">
        {/* Header */}
        <div className="pk-collections__header">
          <div className="pk-collections__header-left">
            <span className="pk-eyebrow">Explore by Style</span>
            <h2 className="pk-collections__title">Our Collections</h2>
          </div>
          <div className="pk-collections__header-right">
            <a href="#collections" className="pk-view-all" id="collections-view-all">
              View All
              <span className="pk-view-all__arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Cards track */}
        <div className="pk-collections__track-wrap">
          <div className="pk-collections__track" ref={scrollRef}>
            {collections.map((col) => (
              <a
                key={col.id}
                href={col.href}
                className="pk-col-card"
                id={`col-card-${col.id}`}
                aria-label={col.name.replace('\n', ' ')}
              >
                <img
                  src={col.image}
                  alt={col.name.replace('\n', ' ')}
                  className="pk-col-card__img"
                  loading="lazy"
                />
                <div className="pk-col-card__overlay" />
                <span className="pk-col-card__label">
                  {col.name.split('\n').map((line, i) => (
                    <span key={i}>{line}{i === 0 && <br />}</span>
                  ))}
                </span>
              </a>
            ))}
          </div>

          {/* Scroll arrows — desktop hidden, mobile visible */}
          <button className="pk-collections__arrow pk-collections__arrow--left" onClick={() => scroll(-1)} aria-label="Scroll left">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button className="pk-collections__arrow pk-collections__arrow--right" onClick={() => scroll(1)} aria-label="Scroll right">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
