import { useState, useRef } from 'react';
import AdminLayout from './AdminLayout';
import { useProducts } from '../../context/ProductContext';
import { toast } from '../../utils/toast';

const BADGE_OPTIONS = ['', 'NEW', 'EXCLUSIVE', 'UP TO 50% OFF', 'SALE', 'HOT', 'Custom'];

function CategoryModal({ cat, onSave, onClose, slugify }) {
  const [form, setForm] = useState({
    name: cat?.name || '',
    slug: cat?.slug || '',
    badge: cat?.badge || '',
    customBadge: !BADGE_OPTIONS.includes(cat?.badge || '') && cat?.badge ? cat.badge : '',
    coverImage: cat?.coverImage || '',
    order: cat?.order ?? 99,
    active: cat?.active !== false,
  });
  const [imgPreview, setImgPreview] = useState(cat?.coverImage || '');
  const [errors, setErrors] = useState({});
  const imgRef = useRef();
  const isEdit = !!cat?.id;

  const setField = (k, v) => {
    setForm(f => {
      const next = { ...f, [k]: v };
      if (k === 'name' && !isEdit) next.slug = slugify(v);
      return next;
    });
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }));
  };

  const handleImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => { setImgPreview(e.target.result); setField('coverImage', e.target.result); };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Category name is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const badgeVal = form.badge === 'Custom' ? form.customBadge : form.badge;
    onSave({ ...form, badge: badgeVal, slug: form.slug || slugify(form.name) });
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px', width: '90vw' }}>
        <h3 className="admin-modal__title" style={{ marginBottom: '20px' }}>
          {isEdit ? 'Edit Category' : 'Add New Category'}
        </h3>

        {/* Cover Image */}
        <div style={{ marginBottom: '16px' }}>
          <label className="admin-label">Cover Image</label>
          <div
            onClick={() => imgRef.current?.click()}
            style={{
              width: '100%', height: '120px', borderRadius: '10px', border: '2px dashed #d6cfc5',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              overflow: 'hidden', background: imgPreview ? '#000' : '#faf8f5', position: 'relative'
            }}
            id="cat-cover-img-slot"
          >
            {imgPreview
              ? <img src={imgPreview} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
              : <div style={{ textAlign: 'center', color: '#a39c94' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '4px' }}>
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <p style={{ fontSize: '12px', margin: 0 }}>Click to upload cover</p>
                </div>
            }
            {imgPreview && (
              <button onClick={e => { e.stopPropagation(); setImgPreview(''); setField('coverImage', ''); }}
                style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', borderRadius: '50%', width: '22px', height: '22px', cursor: 'pointer', fontSize: '14px' }}>×</button>
            )}
          </div>
          <input ref={imgRef} type="file" accept="image/*" style={{ display: 'none' }}
            onChange={e => { const f = e.target.files[0]; if (f) handleImage(f); }} id="cat-img-input" />
          <input className="admin-input" placeholder="Or paste image URL…" value={form.coverImage.startsWith('data:') ? '' : form.coverImage}
            onChange={e => { setField('coverImage', e.target.value); setImgPreview(e.target.value); }}
            style={{ marginTop: '6px' }} id="cat-img-url" />
        </div>

        {/* Name */}
        <div className="admin-field-group" style={{ marginBottom: '12px' }}>
          <label className="admin-label" htmlFor="cat-name">Category Name *</label>
          <input id="cat-name" className={`admin-input ${errors.name ? 'admin-input--error' : ''}`}
            placeholder="e.g. Hand Tufted" value={form.name} onChange={e => setField('name', e.target.value)} />
          {errors.name && <span className="admin-field-error">{errors.name}</span>}
        </div>

        {/* Slug */}
        <div className="admin-field-group" style={{ marginBottom: '12px' }}>
          <label className="admin-label" htmlFor="cat-slug">Slug</label>
          <input id="cat-slug" className="admin-input" placeholder="hand-tufted"
            value={form.slug} onChange={e => setField('slug', slugify(e.target.value))} />
        </div>

        {/* Badge */}
        <div className="admin-field-group" style={{ marginBottom: '12px' }}>
          <label className="admin-label" htmlFor="cat-badge">Badge (optional)</label>
          <select id="cat-badge" className="admin-input admin-select" value={form.badge} onChange={e => setField('badge', e.target.value)}>
            <option value="">No Badge</option>
            {BADGE_OPTIONS.filter(Boolean).map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          {form.badge === 'Custom' && (
            <input className="admin-input" placeholder="Custom badge text" value={form.customBadge}
              onChange={e => setField('customBadge', e.target.value)} style={{ marginTop: '6px' }} id="cat-custom-badge" />
          )}
        </div>

        {/* Display Order */}
        <div className="admin-field-row" style={{ marginBottom: '12px' }}>
          <div className="admin-field-group">
            <label className="admin-label" htmlFor="cat-order">Display Order</label>
            <input id="cat-order" className="admin-input" type="number" min="1"
              value={form.order} onChange={e => setField('order', parseInt(e.target.value) || 99)} />
          </div>
          <div className="admin-field-group" style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '4px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13.5px', fontWeight: '500', color: '#3b3630' }}>
              <div onClick={() => setField('active', !form.active)} id="cat-active-toggle" style={{
                width: '40px', height: '22px', borderRadius: '11px', position: 'relative', cursor: 'pointer',
                background: form.active ? '#9d6e3f' : '#ddd', transition: 'background 0.2s'
              }}>
                <div style={{ position: 'absolute', top: '3px', left: form.active ? '20px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
              </div>
              Active
            </label>
          </div>
        </div>

        <div className="admin-modal__actions" style={{ marginTop: '20px' }}>
          <button className="admin-modal__cancel" onClick={onClose} id="cat-modal-cancel-btn">Cancel</button>
          <button className="admin-modal__confirm" onClick={handleSubmit} id="cat-modal-save-btn"
            style={{ background: '#9d6e3f' }}>
            {isEdit ? 'Update Category' : 'Create Category'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminCategories() {
  const { categories, products, addCategory, updateCategory, deleteCategory, getCategoryProductCount, slugify } = useProducts();
  const [modalCat, setModalCat] = useState(null); // null = closed, {} = add, {...} = edit
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => (a.order || 99) - (b.order || 99));

  const handleSave = (data) => {
    if (modalCat?.id) {
      updateCategory(modalCat.id, data);
      toast('Category updated!', 'success');
    } else {
      addCategory(data);
      toast('Category created!', 'success');
    }
    setModalCat(null);
  };

  const handleDelete = (id) => {
    const result = deleteCategory(id, products);
    if (result?.error) {
      toast(result.error, 'error');
    } else {
      toast('Category deleted', 'success');
    }
    setDeleteId(null);
  };

  const toggleActive = (cat) => {
    updateCategory(cat.id, { active: !cat.active });
    toast(`Category ${!cat.active ? 'activated' : 'deactivated'}`, 'success');
  };

  return (
    <AdminLayout>
      <div className="admin-products-page">
        {/* Header */}
        <div className="admin-page-header">
          <div>
            <h2 className="admin-page-title">Categories</h2>
            <p className="admin-page-sub">{categories.length} categories · {categories.filter(c => c.active).length} active</p>
          </div>
          <button className="admin-btn-primary" onClick={() => setModalCat({})} id="add-category-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Category
          </button>
        </div>

        {/* Search */}
        <div className="admin-filters" style={{ marginBottom: '20px' }}>
          <div className="admin-search-wrap" style={{ maxWidth: '320px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#999' }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input className="admin-search" placeholder="Search categories…" id="cat-search"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Categories Table */}
        <div className="adm-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th style={{ width: '64px' }}>Cover</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Badge</th>
                  <th>Products</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(cat => {
                  const count = getCategoryProductCount(cat.id);
                  return (
                    <tr key={cat.id}>
                      <td style={{ paddingLeft: '16px' }}>
                        {cat.coverImage
                          ? <img src={cat.coverImage} alt={cat.name} style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }} />
                          : <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: '#f0ece5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏺</div>
                        }
                      </td>
                      <td>
                        <span style={{ fontWeight: '700', fontSize: '13.5px', color: '#1b1b1b' }}>{cat.name}</span>
                      </td>
                      <td style={{ fontSize: '12px', color: '#a39c94', fontFamily: 'monospace' }}>{cat.slug}</td>
                      <td>
                        {cat.badge ? (
                          <span style={{
                            fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '12px',
                            background: '#fde8cf', color: '#9d3f2e', textTransform: 'uppercase', letterSpacing: '0.5px'
                          }}>{cat.badge}</span>
                        ) : <span style={{ color: '#ddd', fontSize: '12px' }}>—</span>}
                      </td>
                      <td>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#3b3630' }}>{count}</span>
                        {count > 0 && <span style={{ fontSize: '11px', color: '#a39c94', marginLeft: '4px' }}>products</span>}
                      </td>
                      <td>
                        <span style={{ fontSize: '13px', color: '#736d66', fontWeight: '600' }}>#{cat.order || '—'}</span>
                      </td>
                      <td>
                        <button
                          onClick={() => toggleActive(cat)}
                          id={`cat-toggle-${cat.id}`}
                          style={{
                            border: 'none', borderRadius: '20px', padding: '4px 12px', fontSize: '11.5px', fontWeight: '600', cursor: 'pointer',
                            background: cat.active ? '#dcfce7' : '#f1f5f9',
                            color: cat.active ? '#15803d' : '#64748b',
                          }}
                        >
                          {cat.active ? '● Active' : '○ Inactive'}
                        </button>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={() => setModalCat(cat)}
                            id={`edit-cat-${cat.id}`}
                            style={{
                              padding: '5px 10px', borderRadius: '7px', background: '#f0ece5', color: '#3b3630',
                              fontSize: '12px', fontWeight: '600', border: '1px solid #e5e0d6', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', gap: '4px'
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteId(cat.id)}
                            id={`delete-cat-${cat.id}`}
                            disabled={count > 0}
                            title={count > 0 ? 'Remove all products first' : 'Delete category'}
                            style={{
                              padding: '5px 8px', borderRadius: '7px', border: '1px solid',
                              fontSize: '12px', fontWeight: '600', cursor: count > 0 ? 'not-allowed' : 'pointer',
                              background: count > 0 ? '#f9f9f9' : '#fef2f2',
                              borderColor: count > 0 ? '#e5e0d6' : '#fecaca',
                              color: count > 0 ? '#ccc' : '#dc2626',
                              display: 'flex', alignItems: 'center',
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: '#a39c94' }}>
                      {search ? 'No categories match your search' : 'No categories yet'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Note */}
        <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '10px', background: '#fef3c7', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span style={{ fontSize: '12.5px', color: '#92400e', fontWeight: '500' }}>
            Categories with products cannot be deleted. Remove or reassign all products first.
          </span>
        </div>

        {/* Add/Edit Modal */}
        {modalCat !== null && (
          <CategoryModal
            cat={modalCat?.id ? modalCat : null}
            onSave={handleSave}
            onClose={() => setModalCat(null)}
            slugify={slugify}
          />
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
              <h3 className="admin-modal__title">Delete Category?</h3>
              <p className="admin-modal__sub">This will permanently remove the category.</p>
              <div className="admin-modal__actions">
                <button className="admin-modal__cancel" onClick={() => setDeleteId(null)} id="cancel-cat-delete-btn">Cancel</button>
                <button className="admin-modal__confirm" onClick={() => handleDelete(deleteId)} id="confirm-cat-delete-btn">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
