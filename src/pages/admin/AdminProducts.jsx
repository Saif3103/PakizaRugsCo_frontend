import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { useProducts } from '../../context/ProductContext';
import { toast } from '../../utils/toast';

export default function AdminProducts() {
  const { products, categories, deleteProduct, bulkDeleteProducts, toggleProductStatus } = useProducts();
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBadge, setFilterBadge] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [selected, setSelected] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  // ── Filtered & sorted ──────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        (p.title || p.name || '').toLowerCase().includes(q) ||
        (p.sku || '').toLowerCase().includes(q) ||
        (p.tags || []).join(' ').toLowerCase().includes(q)
      );
    }
    if (filterCat !== 'all') list = list.filter(p => p.categoryId === filterCat);
    if (filterStatus !== 'all') {
      if (filterStatus === 'in-stock') list = list.filter(p => p.inStock);
      else if (filterStatus === 'out-of-stock') list = list.filter(p => !p.inStock);
      else list = list.filter(p => p.status === filterStatus);
    }
    if (filterBadge !== 'all') list = list.filter(p => p.badge === filterBadge);

    switch (sortBy) {
      case 'price-asc': list.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
      case 'price-desc': list.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
      case 'name-asc': list.sort((a, b) => (a.title || '').localeCompare(b.title || '')); break;
      default: list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return list;
  }, [products, search, filterCat, filterStatus, filterBadge, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // ── Selection helpers ──────────────────────────────────────────────────────
  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(i => i !== id) : [...s, id]);
  const selectAll = () => setSelected(paginated.map(p => p.id));
  const clearSelect = () => setSelected([]);
  const allSelected = paginated.length > 0 && paginated.every(p => selected.includes(p.id));

  // ── Actions ────────────────────────────────────────────────────────────────
  const handleDelete = (id) => {
    deleteProduct(id);
    setDeleteId(null);
    setSelected(s => s.filter(i => i !== id));
    toast('Product deleted successfully', 'success');
  };

  const handleBulkDelete = () => {
    bulkDeleteProducts(selected);
    setSelected([]);
    setBulkDeleteConfirm(false);
    toast(`${selected.length} product(s) deleted`, 'success');
  };

  const handleToggleStatus = (id, currentStatus) => {
    toggleProductStatus(id);
    toast(`Product ${currentStatus === 'published' ? 'unpublished' : 'published'}`, 'success');
  };

  const getCatName = (catId) => categories.find(c => c.id === catId)?.name || catId || '—';

  return (
    <AdminLayout>
      <div className="admin-products-page">
        {/* Header */}
        <div className="admin-page-header">
          <div>
            <h2 className="admin-page-title">Products</h2>
            <p className="admin-page-sub">{products.length} products · {filtered.length} matching</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {selected.length > 0 && (
              <button className="adm-bulk-delete-btn" onClick={() => setBulkDeleteConfirm(true)} id="bulk-delete-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
                Delete ({selected.length})
              </button>
            )}
            <Link to="/admin/products/new" className="admin-btn-primary" id="products-add-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Product
            </Link>
          </div>
        </div>

        {/* Filters Row */}
        <div className="admin-filters" style={{ flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
          {/* Search */}
          <div className="admin-search-wrap" style={{ flex: '1', minWidth: '200px', maxWidth: '320px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#999' }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input id="product-search" className="admin-search" placeholder="Search by name, SKU, tag…"
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>

          {/* Category filter */}
          <select className="adm-select-pill" value={filterCat} onChange={e => { setFilterCat(e.target.value); setPage(1); }} id="filter-category" style={{ padding: '8px 12px' }}>
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          {/* Status filter */}
          <select className="adm-select-pill" value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }} id="filter-status" style={{ padding: '8px 12px' }}>
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>

          {/* Badge filter */}
          <select className="adm-select-pill" value={filterBadge} onChange={e => { setFilterBadge(e.target.value); setPage(1); }} id="filter-badge" style={{ padding: '8px 12px' }}>
            <option value="all">All Badges</option>
            <option value="NEW">NEW</option>
            <option value="EXCLUSIVE">EXCLUSIVE</option>
            <option value="UP TO 50% OFF">UP TO 50% OFF</option>
            <option value="Best Seller">Best Seller</option>
            <option value="New Arrival">New Arrival</option>
          </select>

          {/* Sort */}
          <select className="adm-select-pill" value={sortBy} onChange={e => setSortBy(e.target.value)} id="sort-by" style={{ padding: '8px 12px' }}>
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name A-Z</option>
          </select>

          {/* View Toggle */}
          <div style={{ display: 'flex', gap: '4px', background: '#f0ece5', borderRadius: '8px', padding: '3px' }}>
            <button onClick={() => setViewMode('table')} id="view-table-btn" style={{
              padding: '5px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer',
              background: viewMode === 'table' ? '#fff' : 'transparent', color: '#555', fontSize: '12px', fontWeight: '600'
            }}>≡ Table</button>
            <button onClick={() => setViewMode('grid')} id="view-grid-btn" style={{
              padding: '5px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer',
              background: viewMode === 'grid' ? '#fff' : 'transparent', color: '#555', fontSize: '12px', fontWeight: '600'
            }}>⊞ Grid</button>
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="admin-empty-state">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            </svg>
            <p style={{ color: '#a39c94', marginTop: '12px' }}>
              {search || filterCat !== 'all' ? 'No products match your filters' : 'No products yet'}
            </p>
            {!search && filterCat === 'all' && (
              <Link to="/admin/products/new" className="admin-btn-primary" style={{ marginTop: '16px' }} id="empty-add-btn">
                Add Your First Product
              </Link>
            )}
          </div>
        ) : viewMode === 'table' ? (
          /* TABLE VIEW */
          <div className="adm-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th style={{ width: '36px', paddingLeft: '16px' }}>
                      <input type="checkbox" checked={allSelected} onChange={allSelected ? clearSelect : selectAll} id="select-all-cb" style={{ cursor: 'pointer' }} />
                    </th>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Badge</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(p => (
                    <tr key={p.id}>
                      <td style={{ paddingLeft: '16px' }}>
                        <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleSelect(p.id)} id={`cb-${p.id}`} style={{ cursor: 'pointer' }} />
                      </td>
                      <td>
                        <div className="adm-product-cell">
                          {p.images?.[0] || p.image
                            ? <img src={p.images?.[0] || p.image} alt={p.title} className="adm-product-thumb" style={{ width: '44px', height: '44px' }} />
                            : <div className="adm-product-thumb--placeholder">🏺</div>
                          }
                          <div className="adm-product-meta">
                            <span className="adm-product-title" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                              {p.title || p.name}
                            </span>
                            {p.sku && <span className="adm-product-spec">SKU: {p.sku}</span>}
                          </div>
                        </div>
                      </td>
                      <td style={{ fontSize: '12.5px', color: '#736d66' }}>{getCatName(p.categoryId)}</td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: '700', color: '#1b1b1b', fontSize: '13.5px' }}>₹{Number(p.price || 0).toLocaleString('en-IN')}</span>
                          {p.discountPrice && <span style={{ fontSize: '11px', color: '#dc2626', textDecoration: 'line-through' }}>₹{Number(p.discountPrice).toLocaleString('en-IN')}</span>}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '12px', color: p.inStock ? '#16a34a' : '#dc2626', fontWeight: '600' }}>
                          {p.inStock ? `● ${p.stockQty !== undefined ? p.stockQty : 'In Stock'}` : '○ Out'}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleToggleStatus(p.id, p.status)}
                          id={`status-toggle-${p.id}`}
                          style={{
                            border: 'none', borderRadius: '20px', padding: '4px 12px', fontSize: '11.5px', fontWeight: '600', cursor: 'pointer',
                            background: p.status === 'published' ? '#dcfce7' : '#fef3c7',
                            color: p.status === 'published' ? '#15803d' : '#b45309',
                          }}
                        >
                          {p.status === 'published' ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td>
                        {p.badge ? (
                          <span style={{
                            fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '12px',
                            background: '#fde8cf', color: '#9d3f2e', textTransform: 'uppercase', letterSpacing: '0.5px'
                          }}>{p.badge}</span>
                        ) : <span style={{ color: '#ccc', fontSize: '12px' }}>—</span>}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          <Link to={`/admin/products/${p.id}/edit`} id={`edit-${p.id}`} style={{
                            padding: '5px 10px', borderRadius: '7px', background: '#f0ece5', color: '#3b3630',
                            fontSize: '12px', fontWeight: '600', textDecoration: 'none', border: '1px solid #e5e0d6', display: 'flex', alignItems: 'center', gap: '4px'
                          }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            Edit
                          </Link>
                          <button onClick={() => setDeleteId(p.id)} id={`delete-${p.id}`} style={{
                            padding: '5px 8px', borderRadius: '7px', background: '#fef2f2', color: '#dc2626',
                            fontSize: '12px', fontWeight: '600', border: '1px solid #fecaca', cursor: 'pointer', display: 'flex', alignItems: 'center'
                          }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* GRID VIEW */
          <div className="admin-products-grid">
            {paginated.map(p => (
              <div key={p.id} className="admin-prod-card">
                <div className="admin-prod-card__img-wrap">
                  {p.images?.[0] || p.image
                    ? <img src={p.images?.[0] || p.image} alt={p.title} className="admin-prod-card__img" />
                    : <div className="admin-prod-card__no-img">🏺</div>
                  }
                  {p.badge && <span className="admin-prod-card__badge">{p.badge}</span>}
                  <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
                    <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleSelect(p.id)} id={`grid-cb-${p.id}`} style={{ cursor: 'pointer' }} />
                  </div>
                  <div className="admin-prod-card__overlay">
                    <Link to={`/admin/products/${p.id}/edit`} className="admin-prod-card__action" id={`grid-edit-${p.id}`} title="Edit" style={{ color: '#fff' }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </Link>
                    <button className="admin-prod-card__action" onClick={() => setDeleteId(p.id)} id={`grid-delete-${p.id}`} title="Delete">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="admin-prod-card__body">
                  <span className="admin-prod-card__cat">{getCatName(p.categoryId)}</span>
                  <h4 className="admin-prod-card__name">{p.title || p.name}</h4>
                  <div className="admin-prod-card__footer">
                    <span className="admin-prod-card__price">₹{Number(p.price || 0).toLocaleString('en-IN')}</span>
                    <button onClick={() => handleToggleStatus(p.id, p.status)} style={{
                      border: 'none', borderRadius: '12px', padding: '2px 8px', fontSize: '10.5px', fontWeight: '600', cursor: 'pointer',
                      background: p.status === 'published' ? '#dcfce7' : '#fef3c7',
                      color: p.status === 'published' ? '#15803d' : '#b45309',
                    }}>
                      {p.status === 'published' ? '● Live' : '○ Draft'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{
              padding: '7px 14px', borderRadius: '8px', border: '1px solid #e5e0d6', background: '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.5 : 1
            }}>← Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)} id={`page-${n}`} style={{
                padding: '7px 12px', borderRadius: '8px', border: '1px solid', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                background: n === page ? '#9d6e3f' : '#fff',
                borderColor: n === page ? '#9d6e3f' : '#e5e0d6',
                color: n === page ? '#fff' : '#3b3630',
              }}>{n}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{
              padding: '7px 14px', borderRadius: '8px', border: '1px solid #e5e0d6', background: '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? 0.5 : 1
            }}>Next →</button>
          </div>
        )}

        {/* Delete Confirm Modal */}
        {deleteId && (
          <div className="admin-modal-overlay" onClick={() => setDeleteId(null)}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
              <div className="admin-modal__icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </div>
              <h3 className="admin-modal__title">Delete Product?</h3>
              <p className="admin-modal__sub">This action cannot be undone. The product will be permanently removed.</p>
              <div className="admin-modal__actions">
                <button className="admin-modal__cancel" onClick={() => setDeleteId(null)} id="cancel-delete-btn">Cancel</button>
                <button className="admin-modal__confirm" onClick={() => handleDelete(deleteId)} id="confirm-delete-btn">Delete</button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Delete Confirm Modal */}
        {bulkDeleteConfirm && (
          <div className="admin-modal-overlay" onClick={() => setBulkDeleteConfirm(false)}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
              <div className="admin-modal__icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </div>
              <h3 className="admin-modal__title">Delete {selected.length} Products?</h3>
              <p className="admin-modal__sub">All selected products will be permanently deleted. This cannot be undone.</p>
              <div className="admin-modal__actions">
                <button className="admin-modal__cancel" onClick={() => setBulkDeleteConfirm(false)} id="cancel-bulk-btn">Cancel</button>
                <button className="admin-modal__confirm" onClick={handleBulkDelete} id="confirm-bulk-btn">Delete All</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
