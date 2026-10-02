import { useState } from 'react';
import { featuredProducts } from '../data/products';

function WishlistHeart({ id }) {
  const [liked, setLiked] = useState(false);
  return (
    <button
      className={`pk-pcard__heart${liked ? ' active' : ''}`}
      onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
      aria-label="Add to wishlist"
      id={`wishlist-${id}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    </button>
  );
}

function StarRating({ rating = 4.8 }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  return (
    <div className="pk-pcard__stars" aria-label={`${rating} stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24"
          fill={i < full ? '#C9973A' : (i === full && half ? 'url(#half)' : 'none')}
          stroke="#C9973A" strokeWidth="1.5">
          {i === full && half && (
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="#C9973A"/>
                <stop offset="50%" stopColor="transparent"/>
              </linearGradient>
            </defs>
          )}
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
      <span className="pk-pcard__rating-val">{rating}</span>
    </div>
  );
}

// Show first 4 featured products
const popularProducts = featuredProducts.slice(0, 4);

export default function PopularRugsSection() {
  const fmt = (p) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);

  return (
    <section className="pk-popular" id="pk-popular">
      <div className="container">
        {/* Header */}
        <div className="pk-popular__header">
          <div>
            <span className="pk-eyebrow">Best Selling</span>
            <h2 className="pk-popular__title">Popular Rugs</h2>
          </div>
          <a href="#collections" className="pk-view-all" id="popular-view-all">
            View All
            <span className="pk-view-all__arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </a>
        </div>

        {/* Grid */}
        <div className="pk-popular__grid">
          {popularProducts.map((p) => (
            <div className="pk-pcard" key={p.id} id={`popular-${p.id}`}>
              <div className="pk-pcard__img-wrap">
                <img
                  src={p.image}
                  alt={p.name}
                  className="pk-pcard__img"
                  loading="lazy"
                />
                <WishlistHeart id={p.id} />
                {p.badge && (
                  <span className="pk-pcard__badge">{p.badge}</span>
                )}
              </div>
              <div className="pk-pcard__info">
                <h3 className="pk-pcard__name">{p.name}</h3>
                <p className="pk-pcard__origin">{p.origin}</p>
                <div className="pk-pcard__bottom">
                  <span className="pk-pcard__price">{fmt(p.price)}</span>
                  <StarRating rating={4.8} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
