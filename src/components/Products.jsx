import { useState } from 'react';
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
  const gallery = product.gallery && product.gallery.length > 1 ? product.gallery : null;
  const currentImg = gallery ? gallery[activeImg] : product.image;
  const fmt = (p) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(p);

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

        {/* Hover overlay */}
        <div className="sq-pcard__hover-overlay">
          <button className="sq-pcard__quick-btn" id={`quick-view-${product.id}`}>Quick View</button>

          {/* Gallery dot switcher — only for multi-image products */}
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

        {/* Gallery thumbnail strip (always visible if multi-image) */}
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
        <p className="sq-pcard__material">{product.material}{product.knotsPerInch ? ` · ${product.knotsPerInch} KPI` : ''}</p>
        <div className="sq-pcard__footer">
          <div className="sq-pcard__prices">
            <span className="sq-pcard__price">{fmt(product.price)}</span>
            {product.originalPrice && <span className="sq-pcard__original">{fmt(product.originalPrice)}</span>}
          </div>
          <button className="sq-pcard__enquire-btn" id={`enquire-btn-${product.id}`}>
            Enquire →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [activeTab, setActiveTab] = useState('All');

  const displayedProducts = activeTab === 'All'
    ? featuredProducts
    : featuredProducts.filter(p => p.category?.toLowerCase() === activeTab.toLowerCase());

  return (
    <section id="collections" className="sq-products">
      <div className="container">
        {/* Header — Squarespace split layout */}
        <div className="sq-products__header">
          <div className="sq-products__header-left">
            <span className="eyebrow">Our Collections</span>
            <h2 className="sq-products__title">
              Grow your<br /><em>collection</em>
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

        {/* Cards grid */}
        <div className="sq-products__grid">
          {displayedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
