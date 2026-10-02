import { useState, useRef } from 'react';
import { featuredProducts } from '../data/products';

const tabs = ['All', 'Persian', 'Contemporary', 'Kilim', 'Silk'];

const badgeColors = {
  Bestseller:       '#c9a84c',
  'New Arrival':    '#3a8c6a',
  Limited:          '#c94c4c',
  "Collector's Piece": '#7c6cc9',
  Sale:             '#c97a4c',
  Premium:          '#c9a84c',
  Trending:         '#3a8c6a',
};

function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const gallery = product.gallery && product.gallery.length > 1 ? product.gallery : null;
  const currentImg = gallery ? gallery[activeImg] : product.image;
  const fmt = (p) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p * 85);

  const handleBuyNow = (e) => {
    e.stopPropagation();
    const msg = encodeURIComponent(`Hello Pakiza Rugs, I would like to buy: "${product.name}" (${product.size}) priced at ${fmt(product.price)}.`);
    window.open(`https://wa.me/917007626680?text=${msg}`, '_blank');
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="sq-pcard" id={`product-${product.id}`}>
      <div className="sq-pcard__img-wrap">
        {!imgError ? (
          <img
            src={currentImg}
            alt={`${product.name} view ${activeImg + 1}`}
            className="sq-pcard__img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="sq-pcard__img-fallback" style={{ background: product.color }}>
            <span>{product.name[0]}</span>
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          className={`sq-pcard__heart-btn ${liked ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          aria-label="Save to Wishlist"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? '#e63946' : 'none'} stroke={liked ? '#e63946' : 'currentColor'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Hover overlay */}
        <div className="sq-pcard__hover-overlay">
          <button className="sq-pcard__quick-btn" id={`quick-view-${product.id}`}>Quick View</button>

          {/* Gallery dot switcher */}
          {gallery && (
            <div className="sq-pcard__gallery-dots">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  className={`sq-pcard__dot${activeImg === i ? ' active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setActiveImg(i); }}
                  aria-label={`View photo ${i + 1}`}
                  id={`gallery-dot-${product.id}-${i}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Badge */}
        <span className="sq-pcard__badge" style={{ background: badgeColors[product.badge] || '#c9a84c' }}>
          {product.badge}
        </span>
        {product.originalPrice && (
          <span className="sq-pcard__sale-tag">
            −{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}

        {/* Gallery thumbnail strip */}
        {gallery && (
          <div className="sq-pcard__thumbs">
            {gallery.map((src, i) => (
              <button
                key={i}
                className={`sq-pcard__thumb${activeImg === i ? ' active' : ''}`}
                onClick={() => setActiveImg(i)}
                aria-label={`Photo ${i + 1}`}
                id={`thumb-btn-${product.id}-${i}`}
              >
                <img src={src} alt={`${product.name} ${i + 1}`} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="sq-pcard__body">
        <div className="sq-pcard__meta">
          <span className="sq-pcard__origin">{product.origin}</span>
          <span className="sq-pcard__size">{product.size}</span>
        </div>

        <h3 className="sq-pcard__name">{product.name}</h3>

        {/* Star Rating */}
        <div className="sq-pcard__rating">
          <span className="sq-pcard__stars">★★★★★</span>
          <span className="sq-pcard__reviews">(128)</span>
        </div>

        <p className="sq-pcard__material">{product.material}{product.knotsPerInch ? ` · ${product.knotsPerInch} KPI` : ''}</p>

        <div className="sq-pcard__footer">
          <div className="sq-pcard__prices">
            <span className="sq-pcard__price">{fmt(product.price)}</span>
            {product.originalPrice && <span className="sq-pcard__original">{fmt(product.originalPrice)}</span>}
          </div>
        </div>

        {/* Dual Action Buttons matching Jannat Mobile */}
        <div className="sq-pcard__action-row">
          <button
            className={`sq-pcard__btn-cart ${added ? 'added' : ''}`}
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            {added ? '✓ ADDED' : '🛒 ADD'}
          </button>
          <button
            className="sq-pcard__btn-buy"
            onClick={handleBuyNow}
            aria-label="Buy now on WhatsApp"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [activeTab, setActiveTab] = useState('All');
  const gridRef = useRef(null);

  const displayedProducts = activeTab === 'All'
    ? featuredProducts
    : featuredProducts.filter(p => p.category?.toLowerCase() === activeTab.toLowerCase());

  const scrollGrid = (dir) => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
    }
  };

  return (
    <section id="collections" className="sq-products">
      <div className="sq-products__header-wrap">
        {/* Header — Squarespace split layout */}
        <div className="sq-products__header container">
          <div className="sq-products__header-left">
            <span className="eyebrow">Explore Our</span>
            <h2 className="sq-products__title">
              Collections
              {/* Scroll arrows — mobile only */}
              <div className="sq-products__nav-arrows">
                <button
                  className="sq-products__nav-btn"
                  onClick={() => scrollGrid(-1)}
                  aria-label="Scroll left"
                  id="collections-scroll-left"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button
                  className="sq-products__nav-btn"
                  onClick={() => scrollGrid(1)}
                  aria-label="Scroll right"
                  id="collections-scroll-right"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </h2>
          </div>
          <div className="sq-products__header-right">
            <p className="sq-products__desc">
              Each rug is sourced directly from master weavers, authenticated for origin,
              and arrives with a certificate of provenance.
            </p>
            <a href="#contact" className="btn--outline-dark btn" id="catalogue-btn">
              View Full Catalogue →
            </a>
          </div>
        </div>

        {/* Pill tabs — Squarespace style */}
        <div className="container">
          <div className="sq-products__tabs" role="tablist" aria-label="Product categories">
            {tabs.map((t) => (
              <button
                key={t}
                className={`sq-products__tab${activeTab === t ? ' active' : ''}`}
                role="tab"
                aria-selected={activeTab === t}
                id={`tab-${t.toLowerCase()}`}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div className="container">
        <div className="sq-products__grid" ref={gridRef}>
          {displayedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
