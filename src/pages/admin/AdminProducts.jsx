import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('pakiza_products') || '[]'));
  }, []);

  const handleDelete = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('pakiza_products', JSON.stringify(updated));
    setDeleteId(null);
  };

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'all' || p.category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <AdminLayout>
      <div className="admin-products-page">
        <div className="admin-page-header">
          <div>
            <h2 className="admin-page-title">Products</h2>
            <p className="admin-page-sub">{products.length} products in catalog</p>
          </div>
          <Link to="/admin/add-product" className="admin-btn-primary" id="products-add-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Product
          </Link>
        </div>

        {/* Filters */}
        <div className="admin-filters">
          <div className="admin-search-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input id="product-search" className="admin-search" placeholder="Search products…"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="admin-cat-filters">
            {['all', 'persian', 'moroccan', 'contemporary', 'tribal', 'silk', 'kilim'].map(cat => (
              <button key={cat} id={`filter-${cat}`}
                className={`admin-cat-btn ${filterCat === cat ? 'admin-cat-btn--active' : ''}`}
                onClick={() => setFilterCat(cat)}>
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="admin-empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="1">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: 12 }}>
              {search || filterCat !== 'all' ? 'No products match your filter' : 'No products yet'}
            </p>
            {!search && filterCat === 'all' && (
              <Link to="/admin/add-product" className="admin-btn-primary" style={{ marginTop: 16 }} id="empty-products-add-btn">
                Add Your First Product
              </Link>
            )}
          </div>
        ) : (
          <div className="admin-products-grid">
            {filtered.map(p => (
              <div key={p.id} className="admin-prod-card">
                <div className="admin-prod-card__img-wrap">
                  {p.image
                    ? <img src={p.image} alt={p.name} className="admin-prod-card__img" />
                    : <div className="admin-prod-card__no-img">🏺</div>
                  }
                  {p.badge && <span className="admin-prod-card__badge">{p.badge}</span>}
                  <div className="admin-prod-card__overlay">
                    <button className="admin-prod-card__action" onClick={() => setDeleteId(p.id)}
                      id={`delete-prod-${p.id}`} title="Delete">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="admin-prod-card__body">
                  <span className="admin-prod-card__cat">{p.category}</span>
                  <h4 className="admin-prod-card__name">{p.name}</h4>
                  <div className="admin-prod-card__footer">
                    <span className="admin-prod-card__price">${p.price?.toLocaleString()}</span>
                    <span className={`admin-prod-card__stock ${p.inStock ? 'in' : 'out'}`}>
                      {p.inStock ? '● In Stock' : '○ Out'}
                    </span>
                  </div>
                  {p.images?.length > 1 && (
                    <div className="admin-prod-card__imgs-count">
                      📷 {p.images.length} images {p.videoUrl && '· 🎬 1 video'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirm Modal */}
        {deleteId && (
          <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
              <div className="admin-modal__icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="1.5">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </div>
              <h3 className="admin-modal__title">Delete Product?</h3>
              <p className="admin-modal__sub">This action cannot be undone.</p>
              <div className="admin-modal__actions">
                <button className="admin-modal__cancel" onClick={() => setDeleteId(null)} id="cancel-delete-btn">Cancel</button>
                <button className="admin-modal__confirm" onClick={() => handleDelete(deleteId)} id="confirm-delete-btn">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
