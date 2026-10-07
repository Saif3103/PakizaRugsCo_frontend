import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { useProducts } from '../../context/ProductContext';
import { toast } from '../../utils/toast';
import { compressImage } from '../../utils/imageCompressor';

const MAX_IMAGES = 8;
const MATERIALS = ['Wool', 'Polyester', 'Jute', 'Cotton', 'Viscose', 'Mixed', 'Silk', 'Bamboo Silk'];
const SHAPES = ['Rectangle', 'Round', 'Runner', 'Irregular'];
const COLOR_OPTIONS = ['Beige', 'Ivory', 'White', 'Black', 'Grey', 'Blue', 'Navy', 'Green', 'Red', 'Pink', 'Orange', 'Yellow', 'Brown', 'Purple', 'Multi-color', 'Gold', 'Cream'];
const BADGE_OPTIONS = ['', 'NEW', 'EXCLUSIVE', 'UP TO 50% OFF', 'Best Seller', 'New Arrival', 'Limited Edition', 'Custom'];
const PRESET_SIZES = ['2x3 ft', '3x5 ft', '4x6 ft', '5x7 ft', '6x9 ft', '8x10 ft', '9x12 ft', 'Custom'];

const GALLERY_PRESETS = [
  { label: 'Rug 1 (Shag Pink/Beige)', url: '/rugs/rug-1.jpeg' },
  { label: 'Rug 2 (Textured Leaves)', url: '/rugs/rug-2.jpeg' },
  { label: 'Rug 3 (Persian Medallion)', url: '/rugs/rug-3.jpeg' },
  { label: 'Rug 4 (Jute Braided)', url: '/rugs/rug-4.jpeg' },
  { label: 'Rug 5 (Persian Red Hall)', url: '/rugs/rug-5.jpeg' },
  { label: 'Rug 6 (Green Medallion Side)', url: '/rugs/rug-6.jpeg' },
  { label: 'Rug 7 (Isfahan Red Room)', url: '/rugs/rug-7.jpeg' },
  { label: 'Rug 8 (Emerald Living Room)', url: '/rugs/rug-8.jpeg' },
  { label: 'Rug 9 (Emerald Store Display)', url: '/rugs/rug-9.jpeg' },
  { label: 'Rug 10 (Abstract Swirl Teal)', url: '/rugs/rug-10.jpeg' },
  { label: 'Rug 11 (Green Round Floor)', url: '/rugs/rug-11.jpeg' },
  { label: 'Rug 12 (Abstract Swirl Room)', url: '/rugs/rug-12.jpeg' },
  { label: 'Rug 13 (Textured Blocks)', url: '/rugs/rug-13.jpeg' },
  { label: 'Rug 14 (Monochrome Silk/Wool)', url: '/rugs/rug-14.jpeg' },
  { label: 'Rug 15 (Heart Shaggy Pattern)', url: '/rugs/rug-15.jpeg' },
  { label: 'Rug 16 (Black Flow Abstract)', url: '/rugs/rug-16.jpeg' },
  { label: 'Rug 17 (Teal Lattice Shaggy)', url: '/rugs/rug-17.jpeg' },
  { label: 'Rug 18 (Blossom Motif Silk)', url: '/rugs/rug-18.jpeg' },
  { label: 'Rug 19 (Petal Bloom Round)', url: '/rugs/rug-19.jpeg' },
];

function ImageSlot({ index, img, onAdd, onRemove, onSetPrimary, isPrimary }) {
  const inputRef = useRef();
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) onAdd(index, file);
  };

  return (
    <div
      className={`img-slot ${img ? 'img-slot--filled' : ''} ${isPrimary ? 'img-slot--primary' : ''} ${dragging ? 'img-slot--drag' : ''}`}
      onClick={() => !img && inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      id={`img-slot-${index}`}
    >
      {img ? (
        <>
          <img src={img.preview || img} alt={`img-${index}`} className="img-slot__img" />
          <button className="img-slot__remove" onClick={e => { e.stopPropagation(); onRemove(index); }} id={`remove-img-${index}`}>×</button>
          {isPrimary
            ? <span className="img-slot__badge">Cover</span>
            : <button className="img-slot__set-primary" onClick={e => { e.stopPropagation(); onSetPrimary(index); }} title="Set as cover">★</button>
          }
        </>
      ) : (
        <div className="img-slot__empty">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(157,110,63,0.4)" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span style={{ fontSize: '11px', marginTop: '4px' }}>{index === 0 ? 'Cover Image' : `Image ${index + 1}`}</span>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="img-slot__input"
        onChange={e => {
          const f = e.target.files[0];
          if (f && f.size <= 10 * 1024 * 1024) onAdd(index, f);
          else if (f) toast('Image must be under 10MB', 'error');
        }}
      />
    </div>
  );
}

function SizeRow({ size, onRemove }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', background: '#f9f7f3', borderRadius: '8px', border: '1px solid #e8e2d9' }}>
      <span style={{ flex: 1, fontSize: '13px', fontWeight: '600', color: '#3b3630' }}>{size.label}</span>
      {size.price && <span style={{ fontSize: '12px', color: '#9d6e3f', fontWeight: '600' }}>₹{Number(size.price).toLocaleString('en-IN')}</span>}
      <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', fontSize: '16px', lineHeight: 1 }}>×</button>
    </div>
  );
}

export default function AdminAddProduct() {
  const navigate = useNavigate();
  const { categories, addProduct, addCategory, slugify } = useProducts();

  const emptyForm = {
    title: '', categoryId: '', shortDesc: '', fullDesc: '',
    price: '14999', discountPrice: '', currency: '₹',
    material: 'Wool', shape: 'Rectangle', pileHeight: '12mm',
    stockQty: '10', sku: '',
    badge: 'NEW', featured: false, newArrival: true, bestSeller: false,
    inStock: true, status: 'published',
    slug: '', metaTitle: '', metaDesc: '',
    tags: 'luxury, handcrafted, rug, pakiza',
  };

  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState(() => {
    const init = Array(MAX_IMAGES).fill(null);
    init[0] = { preview: '/rugs/rug-8.jpeg' };
    return init;
  });
  const [primaryIdx, setPrimaryIdx] = useState(0);
  const [urlInput, setUrlInput] = useState('');
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [colors, setColors] = useState(['Beige']);
  const [sizes, setSizes] = useState([{ label: '5x7 ft', price: '' }, { label: '8x10 ft', price: '' }]);
  const [sizeInput, setSizeInput] = useState('');
  const [sizePriceInput, setSizePriceInput] = useState('');
  const [customBadge, setCustomBadge] = useState('');
  const [showNewCatForm, setShowNewCatForm] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatBadge, setNewCatBadge] = useState('');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('basic');

  // Auto-select first category if empty
  useEffect(() => {
    if (categories && categories.length > 0 && !form.categoryId) {
      setForm(f => ({ ...f, categoryId: categories[0].id }));
    }
  }, [categories, form.categoryId]);

  const setField = (k, v) => {
    setForm(f => {
      const next = { ...f, [k]: v };
      if (k === 'title' && !f.slug) next.slug = slugify(v);
      if (k === 'title' && !f.metaTitle) next.metaTitle = v;
      return next;
    });
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }));
  };

  const handleImageAdd = async (idx, file) => {
    try {
      const compressedDataUrl = await compressImage(file, 1200, 1200, 0.78);
      setImages(imgs => {
        const next = [...imgs];
        next[idx] = { file, preview: compressedDataUrl };
        return next;
      });
      toast(`Image slot ${idx + 1} optimized & loaded!`, 'success');
    } catch (err) {
      console.error('Error compressing image:', err);
      const reader = new FileReader();
      reader.onload = e => {
        setImages(imgs => {
          const next = [...imgs];
          next[idx] = { file, preview: e.target.result };
          return next;
        });
        toast(`Image slot ${idx + 1} loaded!`, 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageUrl = (url) => {
    const targetUrl = (url || urlInput).trim();
    if (!targetUrl) return;
    const nextSlot = images.findIndex(img => !img);
    const targetIdx = nextSlot >= 0 ? nextSlot : 0;
    setImages(imgs => {
      const next = [...imgs];
      next[targetIdx] = { preview: targetUrl };
      return next;
    });
    setUrlInput('');
    toast(`Added image to slot ${targetIdx + 1}!`, 'success');
  };

  const handleImageRemove = (idx) => {
    setImages(imgs => {
      const next = [...imgs];
      next[idx] = null;
      return next;
    });
    if (primaryIdx === idx) setPrimaryIdx(0);
  };

  const handleVideo = (file) => {
    if (file.size > 50 * 1024 * 1024) {
      toast('Video must be under 50MB', 'error');
      return;
    }
    setVideo(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const toggleColor = (c) => setColors(cs => cs.includes(c) ? cs.filter(x => x !== c) : [...cs, c]);

  const addSize = () => {
    if (!sizeInput.trim()) return;
    setSizes(ss => [...ss, { label: sizeInput.trim(), price: sizePriceInput.trim() }]);
    setSizeInput('');
    setSizePriceInput('');
  };

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    const cat = addCategory({ name: newCatName, badge: newCatBadge });
    setForm(f => ({ ...f, categoryId: cat.id }));
    setNewCatName('');
    setNewCatBadge('');
    setShowNewCatForm(false);
    toast(`Category "${newCatName}" created & selected!`, 'success');
  };

  const validate = () => {
    const e = {};
    if (!form.title || !form.title.trim()) {
      e.title = 'Product title is required';
      setActiveSection('basic');
      toast('Please enter a Product Title / Name', 'error');
      setErrors(e);
      return false;
    }
    const catId = form.categoryId || (categories && categories[0]?.id) || 'cat-1';
    if (!form.categoryId && categories && categories.length > 0) {
      setForm(f => ({ ...f, categoryId: catId }));
    }
    const cleanPrice = typeof form.price === 'string' ? parseFloat(form.price.replace(/[^\d.]/g, '')) : Number(form.price);
    if (isNaN(cleanPrice) || cleanPrice <= 0) {
      e.price = 'Valid price is required';
      setActiveSection('pricing');
      toast('Please enter a valid Price (₹)', 'error');
      setErrors(e);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSave = async (saveStatus) => {
    if (!validate()) return;
    setSaving(true);

    try {
      // Reorder images: primary first
      let imgArr = images.filter(Boolean);
      if (imgArr.length === 0) {
        imgArr = [{ preview: '/rugs/rug-8.jpeg' }];
      }
      if (primaryIdx > 0 && images[primaryIdx]) {
        const primary = images[primaryIdx];
        const rest = images.filter((img, i) => img && i !== primaryIdx);
        imgArr = [primary, ...rest];
      }

      const badgeVal = form.badge === 'Custom' ? customBadge : form.badge;
      const catId = form.categoryId || (categories && categories[0]?.id) || 'cat-1';
      const selectedCat = categories.find(c => c.id === catId);

      await new Promise(r => setTimeout(r, 200));

      const finalStatus = saveStatus || form.status || 'published';
      const cleanPrice = typeof form.price === 'string' ? parseFloat(form.price.replace(/[^\d.]/g, '')) : Number(form.price);
      const finalPrice = isNaN(cleanPrice) || cleanPrice <= 0 ? 14999 : cleanPrice;
      const cleanDiscount = form.discountPrice
        ? (typeof form.discountPrice === 'string' ? parseFloat(form.discountPrice.replace(/[^\d.]/g, '')) : Number(form.discountPrice))
        : null;

      const newCreatedProd = addProduct({
        title: form.title.trim(),
        name: form.title.trim(),
        categoryId: catId,
        category: selectedCat?.name || 'Handcrafted',
        shortDesc: form.shortDesc || `${form.title.trim()} handcrafted with luxury fibers.`,
        description: form.fullDesc || form.shortDesc || `${form.title.trim()} handcrafted with luxury fibers.`,
        fullDesc: form.fullDesc || form.shortDesc || `${form.title.trim()} handcrafted with luxury fibers.`,
        price: finalPrice,
        discountPrice: cleanDiscount,
        currency: form.currency || '₹',
        material: form.material || 'Wool',
        shape: form.shape || 'Rectangle',
        pileHeight: form.pileHeight || '12mm',
        stockQty: form.stockQty !== '' ? parseInt(form.stockQty) : 10,
        inStock: form.inStock !== false,
        sku: form.sku || `PAK-${Date.now().toString().slice(-4)}`,
        colors: colors.length > 0 ? colors : ['Beige'],
        sizes: sizes.length > 0 ? sizes : [{ label: '5x7 ft', price: '' }],
        tags: typeof form.tags === 'string' ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : ['luxury'],
        badge: badgeVal || '',
        featured: Boolean(form.featured),
        newArrival: form.newArrival !== false,
        bestSeller: Boolean(form.bestSeller),
        status: finalStatus,
        slug: form.slug ? slugify(form.slug) : slugify(form.title),
        metaTitle: form.metaTitle || form.title,
        metaDesc: form.metaDesc || form.shortDesc,
        images: imgArr.map(i => i.preview || i),
        image: imgArr[0]?.preview || imgArr[0] || '/rugs/rug-8.jpeg',
        hoverImage: imgArr[1]?.preview || imgArr[1] || imgArr[0]?.preview || '/rugs/rug-6.jpeg',
        videoUrl: videoPreview || '',
      });

      setSaving(false);
      toast(finalStatus === 'published' ? '✦ Rug published and live on storefront!' : 'Rug saved as draft!', 'success');
      navigate('/admin/products');
    } catch (err) {
      console.error('Failed to save product:', err);
      setSaving(false);
      toast(`Error saving product: ${err.message || 'Please try again'}`, 'error');
    }
  };

  const SECTIONS = [
    { id: 'basic', num: '1', label: 'Basic Info' },
    { id: 'media', num: '2', label: 'Media & Gallery' },
    { id: 'pricing', num: '3', label: 'Pricing & Inventory' },
    { id: 'details', num: '4', label: 'Specs & Sizes' },
    { id: 'seo', num: '5', label: 'SEO & Meta' },
  ];

  return (
    <AdminLayout>
      <div className="admin-add-product">
        {/* Header */}
        <div className="admin-page-header">
          <div>
            <h2 className="admin-page-title">Curate New Rug Masterpiece</h2>
            <p className="admin-page-sub">
              <Link to="/admin/products" style={{ color: '#9d6e3f', textDecoration: 'none', fontWeight: '600' }}>Products</Link>
              <span>→</span>
              <span>Add & Publish Product</span>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="admin-btn-secondary" onClick={() => handleSave('draft')} disabled={saving} id="save-draft-btn">
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
            <button className="adm-btn-gold" onClick={() => handleSave('published')} disabled={saving} id="save-publish-btn">
              {saving ? 'Publishing...' : '✦ Publish Product'}
            </button>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="admin-section-tabs">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              className={`admin-section-tab ${activeSection === s.id ? 'admin-section-tab--active' : ''}`}
              onClick={() => setActiveSection(s.id)}
            >
              <span className="admin-tab-num">{s.num}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* ── SECTION 1: BASIC INFO ── */}
        {activeSection === 'basic' && (
          <div className="admin-card admin-fields">
            <h3 className="admin-section-title">Product Information</h3>

            <div className="admin-field-group">
              <label className="admin-field-label">Rug Title / Name *</label>
              <input
                type="text"
                className={`admin-field-input ${errors.title ? 'admin-field-input--error' : ''}`}
                placeholder="e.g. Isfahan Royal Heritage Wool Carpet"
                value={form.title}
                onChange={e => setField('title', e.target.value)}
              />
              {errors.title && <span className="admin-field-error">{errors.title}</span>}
            </div>

            <div className="admin-field-row">
              <div className="admin-field-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="admin-field-label">Category *</label>
                  <button
                    type="button"
                    onClick={() => setShowNewCatForm(!showNewCatForm)}
                    style={{ background: 'none', border: 'none', color: '#9d6e3f', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}
                  >
                    + New Category
                  </button>
                </div>
                <select
                  className={`admin-field-select ${errors.categoryId ? 'admin-field-select--error' : ''}`}
                  value={form.categoryId}
                  onChange={e => setField('categoryId', e.target.value)}
                >
                  <option value="">Select category...</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                {errors.categoryId && <span className="admin-field-error">{errors.categoryId}</span>}

                {showNewCatForm && (
                  <div style={{ marginTop: '10px', padding: '12px', background: '#fcfaf6', borderRadius: '10px', border: '1px dashed #d4be9b' }}>
                    <input
                      type="text"
                      className="admin-field-input"
                      placeholder="Category name..."
                      value={newCatName}
                      onChange={e => setNewCatName(e.target.value)}
                      style={{ marginBottom: '8px' }}
                    />
                    <button type="button" className="admin-btn-primary" onClick={handleAddCategory} style={{ padding: '6px 14px', fontSize: '12px' }}>
                      Add Category
                    </button>
                  </div>
                )}
              </div>

              <div className="admin-field-group">
                <label className="admin-field-label">Badge / Highlight</label>
                <select
                  className="admin-field-select"
                  value={form.badge}
                  onChange={e => setField('badge', e.target.value)}
                >
                  {BADGE_OPTIONS.map(b => (
                    <option key={b} value={b}>{b ? b : 'No Badge'}</option>
                  ))}
                </select>
                {form.badge === 'Custom' && (
                  <input
                    type="text"
                    className="admin-field-input"
                    placeholder="Custom badge text..."
                    value={customBadge}
                    onChange={e => setCustomBadge(e.target.value)}
                    style={{ marginTop: '8px' }}
                  />
                )}
              </div>
            </div>

            <div className="admin-field-row" style={{ marginTop: '4px' }}>
              <div className="admin-field-group">
                <label className="admin-field-label">Selling Price (₹) *</label>
                <input
                  type="number"
                  className={`admin-field-input ${errors.price ? 'admin-field-input--error' : ''}`}
                  placeholder="e.g. 14999"
                  value={form.price}
                  onChange={e => setField('price', e.target.value)}
                />
                {errors.price && <span className="admin-field-error">{errors.price}</span>}
              </div>

              <div className="admin-field-group">
                <label className="admin-field-label">Original / Compare Price (₹)</label>
                <input
                  type="number"
                  className="admin-field-input"
                  placeholder="e.g. 24999 (shows discount)"
                  value={form.discountPrice}
                  onChange={e => setField('discountPrice', e.target.value)}
                />
              </div>
            </div>

            {/* Quick Cover Image Selection */}
            <div className="admin-field-group" style={{ marginTop: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="admin-field-label" style={{ margin: 0 }}>Cover Image * (Choose or upload)</label>
                <button
                  type="button"
                  onClick={() => setActiveSection('media')}
                  style={{ background: 'none', border: 'none', color: '#9d6e3f', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Manage All 8 Images →
                </button>
              </div>

              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
                {GALLERY_PRESETS.slice(0, 8).map((p, idx) => {
                  const isSelected = images[0]?.preview === p.url;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleAddImageUrl(p.url)}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: isSelected ? '2.5px solid #9d6e3f' : '1px solid #ede7df',
                        width: '65px',
                        height: '65px',
                        flexShrink: 0,
                        position: 'relative',
                        background: '#fff',
                        boxShadow: isSelected ? '0 0 8px rgba(157,110,63,0.3)' : 'none'
                      }}
                      title={p.label}
                    >
                      <img src={p.url} alt={p.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      {isSelected && (
                        <span style={{ position: 'absolute', top: 2, right: 2, background: '#9d6e3f', color: '#fff', fontSize: '9px', padding: '1px 3px', borderRadius: '3px', fontWeight: '700' }}>✓</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="admin-field-group">
              <label className="admin-field-label">Short Description</label>
              <input
                type="text"
                className="admin-field-input"
                placeholder="Brief summary for catalog previews and search..."
                value={form.shortDesc}
                onChange={e => setField('shortDesc', e.target.value)}
              />
            </div>

            <div className="admin-field-group">
              <label className="admin-field-label">Full Story & Curation Details</label>
              <textarea
                className="admin-field-textarea"
                rows={3}
                placeholder="Detailed craft description, weaving heritage, room placement advice..."
                value={form.fullDesc}
                onChange={e => setField('fullDesc', e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f0ebe4', flexWrap: 'wrap', gap: '10px' }}>
              <button type="button" className="admin-btn-secondary" onClick={() => setActiveSection('media')}>
                Advanced Settings (Specs, Media, SEO) →
              </button>
              <button type="button" className="adm-btn-gold" onClick={() => handleSave('published')} disabled={saving}>
                {saving ? 'Publishing...' : '✦ Instant Publish Product'}
              </button>
            </div>
          </div>
        )}

        {/* ── SECTION 2: MEDIA ── */}
        {activeSection === 'media' && (
          <div className="admin-card admin-fields">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 className="admin-section-title" style={{ margin: 0 }}>Product Imagery & Gallery</h3>
                <p style={{ fontSize: '12.5px', color: '#786e64', margin: '4px 0 0' }}>
                  Upload high-resolution images, enter an image URL, or 1-click select from our curated rug gallery.
                </p>
              </div>
            </div>

            {/* Quick URL Input */}
            <div style={{ display: 'flex', gap: '8px', margin: '16px 0', alignItems: 'center' }}>
              <input
                type="text"
                className="admin-field-input"
                placeholder="Paste direct Image URL (e.g. https://... or /rugs/rug-8.jpeg)"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                style={{ flex: 1 }}
              />
              <button
                type="button"
                className="admin-btn-secondary"
                onClick={() => handleAddImageUrl(urlInput)}
                style={{ whiteSpace: 'nowrap' }}
              >
                + Add URL
              </button>
            </div>

            {/* 8 Image Slots */}
            <div className="img-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', margin: '18px 0' }}>
              {images.map((img, i) => (
                <ImageSlot
                  key={i}
                  index={i}
                  img={img}
                  onAdd={handleImageAdd}
                  onRemove={handleImageRemove}
                  onSetPrimary={setPrimaryIdx}
                  isPrimary={primaryIdx === i && !!img}
                />
              ))}
            </div>

            {/* Quick Gallery Picker */}
            <div style={{ marginTop: '20px', padding: '16px', background: '#fdfcf9', borderRadius: '12px', border: '1px solid #ede7df' }}>
              <strong style={{ fontSize: '13px', color: '#1b1816', display: 'block', marginBottom: '10px' }}>
                ✦ 1-Click Pick from Pakiza Rugs Gallery:
              </strong>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '8px' }}>
                {GALLERY_PRESETS.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleAddImageUrl(p.url)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: '1px solid #ede7df',
                      aspectRatio: '1/1',
                      position: 'relative',
                      background: '#fff'
                    }}
                    title={`Click to add ${p.label}`}
                  >
                    <img src={p.url} alt={p.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
              <button className="admin-btn-secondary" onClick={() => setActiveSection('basic')}>
                ← Back: Basic Info
              </button>
              <button className="admin-btn-primary" onClick={() => setActiveSection('pricing')}>
                Next: Pricing & Stock →
              </button>
            </div>
          </div>
        )}

        {/* ── SECTION 3: PRICING & INVENTORY ── */}
        {activeSection === 'pricing' && (
          <div className="admin-card admin-fields">
            <h3 className="admin-section-title">Pricing & Stock Management</h3>

            <div className="admin-field-row">
              <div className="admin-field-group">
                <label className="admin-field-label">Selling Price (₹) *</label>
                <input
                  type="number"
                  className={`admin-field-input ${errors.price ? 'admin-field-input--error' : ''}`}
                  placeholder="e.g. 14500"
                  value={form.price}
                  onChange={e => setField('price', e.target.value)}
                />
                {errors.price && <span className="admin-field-error">{errors.price}</span>}
              </div>

              <div className="admin-field-group">
                <label className="admin-field-label">Original / Compare Price (₹)</label>
                <input
                  type="number"
                  className="admin-field-input"
                  placeholder="e.g. 29000 (shows strike-through & discount)"
                  value={form.discountPrice}
                  onChange={e => setField('discountPrice', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-field-row">
              <div className="admin-field-group">
                <label className="admin-field-label">Stock Quantity</label>
                <input
                  type="number"
                  className="admin-field-input"
                  placeholder="e.g. 10"
                  value={form.stockQty}
                  onChange={e => setField('stockQty', e.target.value)}
                />
              </div>

              <div className="admin-field-group">
                <label className="admin-field-label">SKU / Catalog Code</label>
                <input
                  type="text"
                  className="admin-field-input"
                  placeholder="e.g. PAK-ISF-01"
                  value={form.sku}
                  onChange={e => setField('sku', e.target.value)}
                />
              </div>
            </div>

            <div className="admin-field-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
              <input
                type="checkbox"
                id="inStockCheck"
                checked={form.inStock}
                onChange={e => setField('inStock', e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#9d6e3f' }}
              />
              <label htmlFor="inStockCheck" style={{ fontSize: '14px', fontWeight: '600', color: '#1b1816', cursor: 'pointer' }}>
                Item is available in stock
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
              <button className="admin-btn-secondary" onClick={() => setActiveSection('media')}>
                ← Back: Media
              </button>
              <button className="admin-btn-primary" onClick={() => setActiveSection('details')}>
                Next: Specs & Sizes →
              </button>
            </div>
          </div>
        )}

        {/* ── SECTION 4: DETAILS & SPECS ── */}
        {activeSection === 'details' && (
          <div className="admin-card admin-fields">
            <h3 className="admin-section-title">Weave Specifications & Dimensions</h3>

            <div className="admin-field-row">
              <div className="admin-field-group">
                <label className="admin-field-label">Material</label>
                <select className="admin-field-select" value={form.material} onChange={e => setField('material', e.target.value)}>
                  {MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div className="admin-field-group">
                <label className="admin-field-label">Shape</label>
                <select className="admin-field-select" value={form.shape} onChange={e => setField('shape', e.target.value)}>
                  {SHAPES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="admin-field-group">
              <label className="admin-field-label">Pile Height / Thickness</label>
              <input
                type="text"
                className="admin-field-input"
                placeholder="e.g. 15mm plush pile"
                value={form.pileHeight}
                onChange={e => setField('pileHeight', e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
              <button className="admin-btn-secondary" onClick={() => setActiveSection('pricing')}>
                ← Back: Pricing
              </button>
              <button className="admin-btn-primary" onClick={() => setActiveSection('seo')}>
                Next: SEO & Publish →
              </button>
            </div>
          </div>
        )}

        {/* ── SECTION 5: SEO & FINAL PUBLISH ── */}
        {activeSection === 'seo' && (
          <div className="admin-card admin-fields">
            <h3 className="admin-section-title">SEO & Metadata</h3>

            <div className="admin-field-group">
              <label className="admin-field-label">URL Slug</label>
              <input
                type="text"
                className="admin-field-input"
                placeholder="e.g. isfahan-royal-heritage-wool-carpet"
                value={form.slug}
                onChange={e => setField('slug', e.target.value)}
              />
            </div>

            <div className="admin-field-group">
              <label className="admin-field-label">Meta Title</label>
              <input
                type="text"
                className="admin-field-input"
                placeholder="SEO page title..."
                value={form.metaTitle}
                onChange={e => setField('metaTitle', e.target.value)}
              />
            </div>

            <div className="admin-field-group">
              <label className="admin-field-label">Meta Description</label>
              <textarea
                className="admin-field-textarea"
                rows={3}
                placeholder="Search engine meta description..."
                value={form.metaDesc}
                onChange={e => setField('metaDesc', e.target.value)}
              />
            </div>

            {/* Final Action Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #ede7df' }}>
              <button className="admin-btn-secondary" onClick={() => setActiveSection('details')}>
                ← Back: Specs
              </button>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="admin-btn-secondary" onClick={() => handleSave('draft')} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Draft'}
                </button>
                <button className="adm-btn-gold" onClick={() => handleSave('published')} disabled={saving}>
                  {saving ? 'Publishing...' : '✦ Publish Product Now'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}
