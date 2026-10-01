import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';

const MAX_IMAGES = 10;

function ImageSlot({ index, file, preview, onAdd, onRemove }) {
  const inputRef = useRef();
  return (
    <div
      className={`img-slot ${preview ? 'img-slot--filled' : ''} ${index === 0 ? 'img-slot--primary' : ''}`}
      onClick={() => !preview && inputRef.current?.click()}
      id={`img-slot-${index}`}
    >
      {preview ? (
        <>
          <img src={preview} alt={`img-${index}`} className="img-slot__img" />
          <button className="img-slot__remove" onClick={e => { e.stopPropagation(); onRemove(index); }} id={`remove-img-${index}`}>×</button>
          {index === 0 && <span className="img-slot__badge">Primary</span>}
        </>
      ) : (
        <div className="img-slot__empty">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span>{index === 0 ? 'Add Primary Image' : `Image ${index + 1}`}</span>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="img-slot__input"
        onChange={e => e.target.files[0] && onAdd(index, e.target.files[0])} />
    </div>
  );
}

export default function AdminAddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', category: 'persian', origin: '', size: '',
    material: '', pile: '', knotsPerInch: '', price: '',
    originalPrice: '', badge: '', description: '', inStock: true,
  });
  const [images, setImages] = useState(Array(MAX_IMAGES).fill(null)); // { file, preview }
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const videoRef = useRef();

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleImageAdd = (idx, file) => {
    const reader = new FileReader();
    reader.onload = e => {
      setImages(imgs => {
        const next = [...imgs];
        next[idx] = { file, preview: e.target.result };
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = (idx) => {
    setImages(imgs => {
      const next = [...imgs];
      next[idx] = null;
      return next;
    });
  };

  const handleVideo = (file) => {
    setVideo(file);
    const url = URL.createObjectURL(file);
    setVideoPreview(url);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Product name is required';
    if (!form.price || isNaN(form.price)) e.price = 'Valid price is required';
    if (!images[0]) e.images = 'At least one image is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));

    const product = {
      id: Date.now(),
      ...form,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
      knotsPerInch: form.knotsPerInch ? parseInt(form.knotsPerInch) : null,
      images: images.filter(Boolean).map(i => i.preview),
      image: images[0]?.preview || '',
      videoUrl: videoPreview || '',
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem('pakiza_products') || '[]');
    existing.push(product);
    localStorage.setItem('pakiza_products', JSON.stringify(existing));

    setSaving(false);
    setSuccess(true);
    setTimeout(() => navigate('/admin/products'), 1500);
  };

  if (success) {
    return (
      <AdminLayout>
        <div className="admin-success-screen">
          <div className="admin-success-screen__icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h2>Product Added Successfully!</h2>
          <p>Redirecting to products list…</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-add-product">
        <div className="admin-page-header">
          <div>
            <h2 className="admin-page-title">Add New Product</h2>
            <p className="admin-page-sub">Upload up to 10 images and 1 video</p>
          </div>
          <button className="admin-btn-primary" onClick={handleSave} disabled={saving} id="save-product-btn">
            {saving ? <span className="auth-btn__spinner" /> : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                </svg>
                Save Product
              </>
            )}
          </button>
        </div>

        <div className="admin-form-grid">
          {/* LEFT: Images & Video */}
          <div className="admin-form-media">
            <div className="admin-section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              Product Images <span className="admin-section-title__count">({images.filter(Boolean).length}/{MAX_IMAGES})</span>
            </div>
            {errors.images && <div className="admin-field-error">{errors.images}</div>}
            <div className="img-grid">
              {images.map((img, i) => (
                <ImageSlot
                  key={i} index={i}
                  file={img?.file} preview={img?.preview}
                  onAdd={handleImageAdd} onRemove={handleImageRemove}
                />
              ))}
            </div>

            {/* Video Upload */}
            <div className="admin-section-title" style={{ marginTop: 28 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
              Product Video <span className="admin-section-title__count">(1 video)</span>
            </div>
            <div
              className={`video-slot ${videoPreview ? 'video-slot--filled' : ''}`}
              onClick={() => !videoPreview && videoRef.current?.click()}
              id="video-upload-slot"
            >
              {videoPreview ? (
                <>
                  <video src={videoPreview} controls className="video-slot__player" />
                  <button className="img-slot__remove" onClick={e => { e.stopPropagation(); setVideo(null); setVideoPreview(''); }} id="remove-video-btn">×</button>
                </>
              ) : (
                <div className="video-slot__empty">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.4)" strokeWidth="1.5">
                    <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                  </svg>
                  <span>Click to upload product video</span>
                  <span className="video-slot__sub">MP4, MOV, WebM — max 100MB</span>
                </div>
              )}
              <input ref={videoRef} type="file" accept="video/*" className="img-slot__input"
                onChange={e => e.target.files[0] && handleVideo(e.target.files[0])} />
            </div>
          </div>

          {/* RIGHT: Product Details */}
          <div className="admin-form-details">
            <div className="admin-section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
              Product Details
            </div>

            <div className="admin-fields">
              <div className="admin-field-group">
                <label className="admin-label" htmlFor="prod-name">Product Name *</label>
                <input id="prod-name" className={`admin-input ${errors.name ? 'admin-input--error' : ''}`}
                  placeholder="e.g. Isfahan Garden Heritage" value={form.name}
                  onChange={e => setField('name', e.target.value)} />
                {errors.name && <span className="admin-field-error">{errors.name}</span>}
              </div>

              <div className="admin-field-row">
                <div className="admin-field-group">
                  <label className="admin-label" htmlFor="prod-category">Category</label>
                  <select id="prod-category" className="admin-input admin-select"
                    value={form.category} onChange={e => setField('category', e.target.value)}>
                    <option value="persian">Persian Heritage</option>
                    <option value="moroccan">Moroccan Dreams</option>
                    <option value="contemporary">Contemporary</option>
                    <option value="tribal">Tribal & Kilim</option>
                    <option value="silk">Silk</option>
                    <option value="kilim">Kilim</option>
                  </select>
                </div>
                <div className="admin-field-group">
                  <label className="admin-label" htmlFor="prod-badge">Badge</label>
                  <select id="prod-badge" className="admin-input admin-select"
                    value={form.badge} onChange={e => setField('badge', e.target.value)}>
                    <option value="">None</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="New Arrival">New Arrival</option>
                    <option value="Limited">Limited</option>
                    <option value="Premium">Premium</option>
                    <option value="Sale">Sale</option>
                    <option value="Trending">Trending</option>
                    <option value="Collector's Piece">Collector&apos;s Piece</option>
                  </select>
                </div>
              </div>

              <div className="admin-field-row">
                <div className="admin-field-group">
                  <label className="admin-label" htmlFor="prod-price">Price (USD) *</label>
                  <div className="admin-input-prefix-wrap">
                    <span className="admin-input-prefix">$</span>
                    <input id="prod-price" className={`admin-input admin-input--prefixed ${errors.price ? 'admin-input--error' : ''}`}
                      type="number" placeholder="2500" value={form.price}
                      onChange={e => setField('price', e.target.value)} />
                  </div>
                  {errors.price && <span className="admin-field-error">{errors.price}</span>}
                </div>
                <div className="admin-field-group">
                  <label className="admin-label" htmlFor="prod-orig-price">Original Price</label>
                  <div className="admin-input-prefix-wrap">
                    <span className="admin-input-prefix">$</span>
                    <input id="prod-orig-price" className="admin-input admin-input--prefixed"
                      type="number" placeholder="3200" value={form.originalPrice}
                      onChange={e => setField('originalPrice', e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="admin-field-row">
                <div className="admin-field-group">
                  <label className="admin-label" htmlFor="prod-size">Size</label>
                  <input id="prod-size" className="admin-input" placeholder="8' × 10'"
                    value={form.size} onChange={e => setField('size', e.target.value)} />
                </div>
                <div className="admin-field-group">
                  <label className="admin-label" htmlFor="prod-knots">Knots Per Inch</label>
                  <input id="prod-knots" className="admin-input" type="number" placeholder="220"
                    value={form.knotsPerInch} onChange={e => setField('knotsPerInch', e.target.value)} />
                </div>
              </div>

              <div className="admin-field-group">
                <label className="admin-label" htmlFor="prod-material">Material</label>
                <input id="prod-material" className="admin-input" placeholder="100% Hand-spun Wool"
                  value={form.material} onChange={e => setField('material', e.target.value)} />
              </div>

              <div className="admin-field-row">
                <div className="admin-field-group">
                  <label className="admin-label" htmlFor="prod-pile">Pile Type</label>
                  <input id="prod-pile" className="admin-input" placeholder="Hand-knotted"
                    value={form.pile} onChange={e => setField('pile', e.target.value)} />
                </div>
                <div className="admin-field-group">
                  <label className="admin-label" htmlFor="prod-origin">Origin</label>
                  <input id="prod-origin" className="admin-input" placeholder="Chandauli, UP"
                    value={form.origin} onChange={e => setField('origin', e.target.value)} />
                </div>
              </div>

              <div className="admin-field-group">
                <label className="admin-label" htmlFor="prod-desc">Description</label>
                <textarea id="prod-desc" className="admin-input admin-textarea"
                  placeholder="Describe the rug's history, weaving technique, and uniqueness…"
                  rows={4} value={form.description}
                  onChange={e => setField('description', e.target.value)} />
              </div>

              <div className="admin-field-group">
                <label className="admin-label">Stock Status</label>
                <div className="admin-toggle-row">
                  <button
                    type="button"
                    className={`admin-toggle-btn ${form.inStock ? 'admin-toggle-btn--active' : ''}`}
                    onClick={() => setField('inStock', true)} id="stock-in-btn">
                    In Stock
                  </button>
                  <button
                    type="button"
                    className={`admin-toggle-btn ${!form.inStock ? 'admin-toggle-btn--active' : ''}`}
                    onClick={() => setField('inStock', false)} id="stock-out-btn">
                    Out of Stock
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
