import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { useProducts } from '../../context/ProductContext';

export default function AdminDashboard() {
  const { stats, categories, products, recentProducts, getCategoryProductCount } = useProducts();
  const [filterTab, setFilterTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Category-wise product distribution
  const catDistribution = useMemo(() => {
    return categories
      .filter(c => c.active !== false)
      .map(c => ({ ...c, count: getCategoryProductCount(c.id) }))
      .sort((a, b) => b.count - a.count);
  }, [categories, getCategoryProductCount]);

  const maxCount = Math.max(...catDistribution.map(c => c.count), 1);

  // Total catalog valuation
  const totalValuation = useMemo(() => {
    return products.reduce((acc, p) => acc + (Number(p.price) || 0), 0);
  }, [products]);

  const avgPrice = stats.total > 0 ? Math.round(totalValuation / stats.total) : 0;

  // Filtered recent/display products
  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (filterTab === 'published') {
      list = list.filter(p => p.status === 'published');
    } else if (filterTab === 'draft') {
      list = list.filter(p => p.status === 'draft');
    } else if (filterTab === 'bestseller') {
      list = list.filter(p => p.badge?.toLowerCase().includes('bestseller') || p.badge?.toLowerCase().includes('best'));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        (p.title || p.name || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
      );
    }

    return list.slice(0, 8);
  }, [products, filterTab, searchQuery]);

  // Donut Gauge math
  const C = 2 * Math.PI * 46; // radius 46
  const pubPercent = stats.total > 0 ? (stats.published / stats.total) : 0;
  const draftPercent = stats.total > 0 ? (stats.draft / stats.total) : 0;
  const oosPercent = stats.total > 0 ? (stats.outOfStock / stats.total) : 0;

  const pubDash = pubPercent * C;
  const draftDash = draftPercent * C;
  const oosDash = oosPercent * C;

  return (
    <AdminLayout>
      <div className="adm-dashboard-page adm-luxury-vault">
        
        {/* ══════════════════════════════════════════════════════════
            1. ATELIER EXECUTIVE BANNER
            ══════════════════════════════════════════════════════════ */}
        <div className="adm-atelier-hero">
          <div className="adm-atelier-hero__ambient" />
          <div className="adm-atelier-hero__content">
            <div className="adm-atelier-hero__left">
              <div className="adm-atelier-badge">
                <span className="adm-atelier-badge__dot" />
                <span>ATELIER MASTER VAULT &bull; BHADOHI GUILD</span>
              </div>
              <h1 className="adm-atelier-title">
                Executive <span className="adm-atelier-title__gold">Dashboard</span>
              </h1>
              <p className="adm-atelier-subtitle">
                Welcome to the Pakiza Rugs Co. curation suite. Monitor handcrafted inventory, live showroom listings, and artisanal collections.
              </p>
            </div>

            <div className="adm-atelier-hero__actions">
              <Link to="/admin/products/new" className="adm-btn-gold" id="dash-add-product-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>+ Curate New Rug</span>
              </Link>

              <Link to="/admin/settings" className="adm-btn-ghost-gold" id="dash-hero-video-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
                <span>Hero Cinematics</span>
              </Link>

              <a href="/" target="_blank" rel="noopener noreferrer" className="adm-btn-ghost" title="Open live storefront">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                <span>Live Boutique</span>
              </a>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            2. BESPOKE METRIC MATRIX (5 REFINED ATELIER TILES)
            ══════════════════════════════════════════════════════════ */}
        <div className="adm-metric-matrix">
          {/* Card 1: Total Catalog Vault */}
          <div className="adm-metric-tile" id="stat-total-products">
            <div className="adm-metric-tile__header">
              <span className="adm-metric-tile__label">VAULT PIECES</span>
              <div className="adm-metric-tile__icon-wrap adm-metric-tile__icon-wrap--gold">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
            </div>
            <div className="adm-metric-tile__body">
              <span className="adm-metric-tile__number">{stats.total}</span>
              <div className="adm-metric-tile__trend">
                <span className="adm-metric-pill adm-metric-pill--gold">
                  ₹{totalValuation.toLocaleString('en-IN')}
                </span>
                <span className="adm-metric-note">Catalog valuation</span>
              </div>
            </div>
            <div className="adm-metric-tile__footer-bar" style={{ width: '100%', background: 'linear-gradient(90deg, #c9a84c, transparent)' }} />
          </div>

          {/* Card 2: Showroom Live */}
          <div className="adm-metric-tile" id="stat-published">
            <div className="adm-metric-tile__header">
              <span className="adm-metric-tile__label">LIVE IN SHOWROOM</span>
              <div className="adm-metric-tile__icon-wrap adm-metric-tile__icon-wrap--green">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><polyline points="8 12 11 15 16 9" />
                </svg>
              </div>
            </div>
            <div className="adm-metric-tile__body">
              <span className="adm-metric-tile__number" style={{ color: '#4ade80' }}>{stats.published}</span>
              <div className="adm-metric-tile__trend">
                <span className="adm-metric-pill adm-metric-pill--green">
                  {stats.total > 0 ? Math.round((stats.published / stats.total) * 100) : 0}% Active
                </span>
                <span className="adm-metric-note">Publicly visible</span>
              </div>
            </div>
            <div className="adm-metric-tile__footer-bar" style={{ width: `${stats.total > 0 ? (stats.published / stats.total) * 100 : 0}%`, background: 'linear-gradient(90deg, #22c55e, #4ade80)' }} />
          </div>

          {/* Card 3: Private Reserve / Drafts */}
          <div className="adm-metric-tile" id="stat-draft">
            <div className="adm-metric-tile__header">
              <span className="adm-metric-tile__label">PRIVATE RESERVE</span>
              <div className="adm-metric-tile__icon-wrap adm-metric-tile__icon-wrap--amber">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
            </div>
            <div className="adm-metric-tile__body">
              <span className="adm-metric-tile__number">{stats.draft}</span>
              <div className="adm-metric-tile__trend">
                <span className="adm-metric-pill adm-metric-pill--muted">
                  In staging
                </span>
                <span className="adm-metric-note">Unpublished drafts</span>
              </div>
            </div>
            <div className="adm-metric-tile__footer-bar" style={{ width: '40%', background: 'linear-gradient(90deg, #eab308, transparent)' }} />
          </div>

          {/* Card 4: Reserve Health / Out of Stock */}
          <div className="adm-metric-tile" id="stat-out-of-stock">
            <div className="adm-metric-tile__header">
              <span className="adm-metric-tile__label">RESERVE STATUS</span>
              <div className={`adm-metric-tile__icon-wrap ${stats.outOfStock > 0 ? 'adm-metric-tile__icon-wrap--red' : 'adm-metric-tile__icon-wrap--green'}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
            </div>
            <div className="adm-metric-tile__body">
              <span className="adm-metric-tile__number" style={{ color: stats.outOfStock > 0 ? '#f87171' : '#e2d5c8' }}>
                {stats.outOfStock}
              </span>
              <div className="adm-metric-tile__trend">
                <span className={`adm-metric-pill ${stats.outOfStock > 0 ? 'adm-metric-pill--red' : 'adm-metric-pill--green'}`}>
                  {stats.outOfStock > 0 ? 'Low stock alert' : 'Optimal stock'}
                </span>
                <span className="adm-metric-note">Out of stock items</span>
              </div>
            </div>
            <div className="adm-metric-tile__footer-bar" style={{ width: '100%', background: stats.outOfStock > 0 ? 'linear-gradient(90deg, #ef4444, transparent)' : 'linear-gradient(90deg, #10b981, transparent)' }} />
          </div>

          {/* Card 5: Weaving Collections */}
          <div className="adm-metric-tile" id="stat-categories">
            <div className="adm-metric-tile__header">
              <span className="adm-metric-tile__label">COLLECTIONS</span>
              <div className="adm-metric-tile__icon-wrap adm-metric-tile__icon-wrap--gold">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="9" rx="1.5" />
                  <rect x="14" y="3" width="7" height="5" rx="1.5" />
                  <rect x="14" y="12" width="7" height="9" rx="1.5" />
                  <rect x="3" y="16" width="7" height="5" rx="1.5" />
                </svg>
              </div>
            </div>
            <div className="adm-metric-tile__body">
              <span className="adm-metric-tile__number">{categories.length}</span>
              <div className="adm-metric-tile__trend">
                <span className="adm-metric-pill adm-metric-pill--gold">
                  ₹{avgPrice.toLocaleString('en-IN')} avg
                </span>
                <span className="adm-metric-note">Weave categories</span>
              </div>
            </div>
            <div className="adm-metric-tile__footer-bar" style={{ width: '100%', background: 'linear-gradient(90deg, #c9a84c, #9d6e3f)' }} />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            3. MIDDLE SECTION: WEAVING COLLECTIONS & ATELIER HEALTH
            ══════════════════════════════════════════════════════════ */}
        <div className="adm-vault-columns">
          
          {/* Left Panel: Collections Portfolio Distribution */}
          <div className="adm-luxury-panel" id="chart-category-distribution">
            <div className="adm-luxury-panel__header">
              <div>
                <div className="adm-section-eyebrow">PORTFOLIO COMPOSITION</div>
                <h2 className="adm-luxury-panel__title">Weaving Collections & Depth</h2>
              </div>
              <Link to="/admin/categories" className="adm-luxury-link">
                <span>Manage Collections</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            {catDistribution.length === 0 ? (
              <div className="adm-empty-state">
                <p>No rug categories populated.</p>
                <Link to="/admin/products/new" className="adm-btn-gold">Create First Rug</Link>
              </div>
            ) : (
              <div className="adm-cat-stack">
                {catDistribution.slice(0, 6).map((cat, idx) => {
                  const percent = maxCount > 0 ? Math.round((cat.count / maxCount) * 100) : 0;
                  const totalShare = stats.total > 0 ? Math.round((cat.count / stats.total) * 100) : 0;
                  return (
                    <div key={cat.id || idx} className="adm-cat-row">
                      <div className="adm-cat-row__meta">
                        <div className="adm-cat-row__name-wrap">
                          <span className="adm-cat-row__index">0{idx + 1}</span>
                          <span className="adm-cat-row__name">{cat.name}</span>
                          {cat.badge && (
                            <span className="adm-cat-row__badge">{cat.badge}</span>
                          )}
                        </div>
                        <div className="adm-cat-row__stats">
                          <span className="adm-cat-row__count">{cat.count} Rugs</span>
                          <span className="adm-cat-row__share">({totalShare}% share)</span>
                        </div>
                      </div>

                      <div className="adm-cat-bar-bg">
                        <div
                          className="adm-cat-bar-fill"
                          style={{
                            width: `${Math.max(percent, 6)}%`,
                            background: idx === 0
                              ? 'linear-gradient(90deg, #c9a84c, #f3e3a2)'
                              : idx === 1
                              ? 'linear-gradient(90deg, #a67c4e, #c9a84c)'
                              : 'linear-gradient(90deg, #5a4838, #8c6d48)'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Panel: Showroom Status Gauge & Atelier Health */}
          <div className="adm-luxury-panel adm-luxury-panel--compact" id="chart-product-status">
            <div className="adm-luxury-panel__header">
              <div>
                <div className="adm-section-eyebrow">SHOWROOM HEALTH</div>
                <h2 className="adm-luxury-panel__title">Inventory Pulse</h2>
              </div>
            </div>

            {/* Circular Atelier Dial */}
            <div className="adm-dial-container">
              <div className="adm-dial-wrap">
                <svg viewBox="0 0 120 120" className="adm-dial-svg">
                  {/* Background Track */}
                  <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                  
                  {/* Segments */}
                  {stats.total > 0 && (
                    <>
                      {/* Published (Gold / Green) */}
                      <circle
                        cx="60" cy="60" r="46" fill="none"
                        stroke="#c9a84c"
                        strokeWidth="10"
                        strokeDasharray={`${pubDash} ${C}`}
                        strokeDashoffset={0}
                        strokeLinecap="round"
                      />
                      {/* Draft */}
                      <circle
                        cx="60" cy="60" r="46" fill="none"
                        stroke="#786146"
                        strokeWidth="10"
                        strokeDasharray={`${draftDash} ${C}`}
                        strokeDashoffset={-pubDash}
                        strokeLinecap="round"
                      />
                      {/* Out of stock */}
                      {stats.outOfStock > 0 && (
                        <circle
                          cx="60" cy="60" r="46" fill="none"
                          stroke="#ef4444"
                          strokeWidth="10"
                          strokeDasharray={`${oosDash} ${C}`}
                          strokeDashoffset={-(pubDash + draftDash)}
                          strokeLinecap="round"
                        />
                      )}
                    </>
                  )}
                </svg>

                <div className="adm-dial-center">
                  <span className="adm-dial-center__num">{stats.total}</span>
                  <span className="adm-dial-center__lbl">TOTAL RUGS</span>
                </div>
              </div>

              {/* Status Breakdown Legend */}
              <div className="adm-dial-legend">
                <div className="adm-dial-legend__item">
                  <div className="adm-dial-legend__key">
                    <span className="adm-dial-dot" style={{ background: '#c9a84c', boxShadow: '0 0 8px rgba(201,168,76,0.6)' }} />
                    <span>Live in Showroom</span>
                  </div>
                  <strong className="adm-dial-legend__val">{stats.published}</strong>
                </div>

                <div className="adm-dial-legend__item">
                  <div className="adm-dial-legend__key">
                    <span className="adm-dial-dot" style={{ background: '#786146' }} />
                    <span>Private Reserve</span>
                  </div>
                  <strong className="adm-dial-legend__val">{stats.draft}</strong>
                </div>

                <div className="adm-dial-legend__item">
                  <div className="adm-dial-legend__key">
                    <span className="adm-dial-dot" style={{ background: '#ef4444' }} />
                    <span>Out of Stock</span>
                  </div>
                  <strong className="adm-dial-legend__val" style={{ color: stats.outOfStock > 0 ? '#ef4444' : 'inherit' }}>
                    {stats.outOfStock}
                  </strong>
                </div>
              </div>
            </div>

            {/* Atelier Live Services Health */}
            <div className="adm-services-bar">
              <div className="adm-service-item">
                <div className="adm-service-item__dot adm-service-item__dot--live" />
                <span className="adm-service-item__title">Cloudinary HD Assets</span>
              </div>
              <div className="adm-service-item">
                <div className="adm-service-item__dot adm-service-item__dot--live" />
                <span className="adm-service-item__title">WhatsApp Concierge</span>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            4. RECENT MASTERPIECES (BESPOKE ATELIER REGISTRY TABLE)
            ══════════════════════════════════════════════════════════ */}
        <div className="adm-luxury-panel adm-table-panel" id="table-recent-products">
          <div className="adm-luxury-panel__header adm-table-panel__header">
            <div>
              <div className="adm-section-eyebrow">VAULT REGISTRY</div>
              <h2 className="adm-luxury-panel__title">Recently Curated Masterpieces</h2>
            </div>

            {/* Search & Filter bar */}
            <div className="adm-table-toolbar">
              <div className="adm-filter-chips">
                <button
                  className={`adm-filter-chip ${filterTab === 'all' ? 'adm-filter-chip--active' : ''}`}
                  onClick={() => setFilterTab('all')}
                >
                  All ({products.length})
                </button>
                <button
                  className={`adm-filter-chip ${filterTab === 'published' ? 'adm-filter-chip--active' : ''}`}
                  onClick={() => setFilterTab('published')}
                >
                  ✦ Live ({stats.published})
                </button>
                <button
                  className={`adm-filter-chip ${filterTab === 'draft' ? 'adm-filter-chip--active' : ''}`}
                  onClick={() => setFilterTab('draft')}
                >
                  Drafts ({stats.draft})
                </button>
                <button
                  className={`adm-filter-chip ${filterTab === 'bestseller' ? 'adm-filter-chip--active' : ''}`}
                  onClick={() => setFilterTab('bestseller')}
                >
                  Best Sellers
                </button>
              </div>

              <div className="adm-table-search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search rug title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="adm-table-search__input"
                />
              </div>

              <Link to="/admin/products" className="adm-luxury-link">
                <span>View Full Catalog</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="adm-empty-state">
              <div className="adm-empty-state__icon">🏺</div>
              <p className="adm-empty-state__title">No matching rug creations found</p>
              <p className="adm-empty-state__sub">Try changing your search term or tab filter above.</p>
              <Link to="/admin/products/new" className="adm-btn-gold" style={{ marginTop: '14px' }}>
                Curate New Rug
              </Link>
            </div>
          ) : (
            <div className="adm-table-wrap">
              <table className="adm-table adm-table--luxury">
                <thead>
                  <tr>
                    <th>MASTERPIECE & WEAVE</th>
                    <th>COLLECTION</th>
                    <th>VALUATION</th>
                    <th>INVENTORY</th>
                    <th>SHOWROOM STATUS</th>
                    <th>CURATED DATE</th>
                    <th style={{ textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(p => {
                    const cat = categories.find(c => c.id === p.categoryId);
                    const mainImg = p.images?.[0] || p.image;
                    return (
                      <tr key={p.id} className="adm-table-row">
                        <td>
                          <div className="adm-rug-cell">
                            <div className="adm-rug-thumb-wrap">
                              {mainImg ? (
                                <img src={mainImg} alt={p.title} className="adm-rug-thumb" />
                              ) : (
                                <div className="adm-rug-thumb adm-rug-thumb--empty">🏺</div>
                              )}
                              {p.badge && (
                                <span className="adm-rug-badge-micro">{p.badge}</span>
                              )}
                            </div>
                            <div className="adm-rug-cell__info">
                              <span className="adm-rug-cell__title">{p.title || p.name}</span>
                              <span className="adm-rug-cell__sku">SKU: {p.id.slice(-6).toUpperCase()}</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="adm-tag-pill">
                            {cat?.name || p.category || 'Handcrafted'}
                          </span>
                        </td>

                        <td>
                          <span className="adm-rug-price">
                            ₹{Number(p.price || 0).toLocaleString('en-IN')}
                          </span>
                        </td>

                        <td>
                          <span className={`adm-stock-pill ${p.inStock ? 'adm-stock-pill--in' : 'adm-stock-pill--out'}`}>
                            <span className="adm-stock-pill__dot" />
                            {p.inStock ? 'In Vault' : 'Reserved'}
                          </span>
                        </td>

                        <td>
                          <span className={`adm-status-chip ${p.status === 'published' ? 'adm-status-chip--live' : 'adm-status-chip--draft'}`}>
                            {p.status === 'published' ? '✦ LIVE' : 'DRAFT'}
                          </span>
                        </td>

                        <td>
                          <span className="adm-date-cell">
                            {p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent'}
                          </span>
                        </td>

                        <td style={{ textAlign: 'right' }}>
                          <div className="adm-row-actions">
                            <Link
                              to={`/admin/products/${p.id}/edit`}
                              className="adm-action-btn adm-action-btn--edit"
                              title="Edit Rug Specifications"
                            >
                              Edit
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════════════════════════
            5. QUICK ATELIER OPERATIONS RIBBON
            ══════════════════════════════════════════════════════════ */}
        <div className="adm-operations-grid">
          <Link to="/admin/products/new" className="adm-op-card">
            <div className="adm-op-card__icon">✦</div>
            <div className="adm-op-card__body">
              <strong className="adm-op-card__title">Add New Rug Masterpiece</strong>
              <p className="adm-op-card__sub">Upload 4K imagery, dimension matrices & weaves</p>
            </div>
          </Link>

          <Link to="/admin/categories" className="adm-op-card">
            <div className="adm-op-card__icon">❖</div>
            <div className="adm-op-card__body">
              <strong className="adm-op-card__title">Curate Categories</strong>
              <p className="adm-op-card__sub">Organize Hand Tufted, Shag, Jute & Shapes</p>
            </div>
          </Link>

          <Link to="/admin/settings" className="adm-op-card">
            <div className="adm-op-card__icon">▶</div>
            <div className="adm-op-card__body">
              <strong className="adm-op-card__title">Hero Cinematics & Video</strong>
              <p className="adm-op-card__sub">Manage storefront ambient video & branding</p>
            </div>
          </Link>

          <Link to="/admin/customers" className="adm-op-card">
            <div className="adm-op-card__icon">♕</div>
            <div className="adm-op-card__body">
              <strong className="adm-op-card__title">VIP Client Registry</strong>
              <p className="adm-op-card__sub">Track customer profiles & bespoke inquiries</p>
            </div>
          </Link>
        </div>

      </div>
    </AdminLayout>
  );
}
