const categories = [
  {
    id: 1,
    name: 'Oushak Collection',
    count: '18 Designs',
    image: '/rugs/rug-7.jpeg',
    href: '#collections',
  },
  {
    id: 2,
    name: 'Persian Silk',
    count: '24 Designs',
    image: '/rugs/rug-3.jpeg',
    href: '#collections',
  },
  {
    id: 3,
    name: 'Kilim Heritage',
    count: '14 Designs',
    image: '/rugs/rug-5.jpeg',
    href: '#collections',
  },
  {
    id: 4,
    name: 'Modern & Abstract',
    count: '20 Designs',
    image: '/rugs/rug-8.jpeg',
    href: '#collections',
  },
];

export default function CategoriesSection() {
  return (
    <section id="categories" className="pk-categories-section">
      <div className="container">
        <div className="pk-categories-header">
          <div>
            <span className="eyebrow eyebrow--gold">CURATED STYLES</span>
            <h2 className="pk-categories-title">
              Shop by <em>Category</em>
            </h2>
          </div>
          <a href="#collections" className="pk-categories-view-all">
            View All →
          </a>
        </div>

        <div className="pk-categories-grid">
          {categories.map((cat) => (
            <a key={cat.id} href={cat.href} className="pk-cat-card">
              <div className="pk-cat-card__img-wrap">
                <img src={cat.image} alt={cat.name} className="pk-cat-card__img" />
                <div className="pk-cat-card__overlay" />
              </div>
              <div className="pk-cat-card__content">
                <h3 className="pk-cat-card__name">{cat.name}</h3>
                <span className="pk-cat-card__count">{cat.count}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
