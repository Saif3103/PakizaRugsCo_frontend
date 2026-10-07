import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
  return (
    <div
      className={`img-slot ${img ? 'img-slot--filled' : ''} ${isPrimary ? 'img-slot--primary' : ''}`}
      onClick={() => !img && inputRef.current?.click()}
      id={`edit-img-slot-${index}`}
    >
      {img ? (
        <>
          <img src={img.preview || img} alt={`img-${index}`} className="img-slot__img" />
          <button className="img-slot__remove" onClick={e => { e.stopPropagation(); onRemove(index); }} id={`edit-remove-img-${index}`}>×</button>
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
          <span style={{ fontSize: '11px', marginTop: '4px' }}>{index === 0 ? 'Cover' : `Image ${index + 1}`}</span>
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

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, categories, updateProduct, slugify } = useProducts();

  const product = products.find(p => p.id === id);

  const [form, setForm] = useState(null);
  const [images, setImages] = useState(Array(MAX_IMAGES).fill(null));
  const [primaryIdx, setPrimaryIdx] = useState(0);
  const [urlInput, setUrlInput] = useState('');
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [customBadge, setCustomBadge] = useState('');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('basic');

  useEffect(() => {
    if (!product) return;
    const existingImages = (product.images || (product.image ? [product.image] : [])).map(url => ({ preview: url }));
    const slots = Array(MAX_IMAGES).fill(null);
    existingImages.forEach((img, i) => { if (i < MAX_IMAGES) slots[i] = img; });
    setImages(slots);
    setColors(product.colors || ['Beige']);
    setSizes(product.sizes || []);
    setCustomBadge(!BADGE_OPTIONS.includes(product.badge || '') && product.badge ? product.badge : '');
    setForm({
      title: product.title || product.name || '',
      categoryId: product.categoryId || (categories[0]?.id || ''),
      shortDesc: product.shortDesc || '',
      fullDesc: product.fullDesc || product.description || '',
      price: product.price || '',
      discountPrice: product.discountPrice || '',
      currency: product.currency || '₹',
      material: product.material || 'Wool',
      shape: product.shape || 'Rectangle',
      pileHeight: product.pileHeight || '12mm',
      stockQty: product.stockQty !== undefined ? product.stockQty : 10,
      sku: product.sku || '',
      badge: BADGE_OPTIONS.includes(product.badge || '') ? (product.badge || '') : (product.badge ? 'Custom' : ''),
      featured: product.featured || false,
      newArrival: product.newArrival || false,
      bestSeller: product.bestSeller || false,
      inStock: product.inStock !== false,
      status: product.status || 'published',
      slug: product.slug || '',
      metaTitle: product.metaTitle || '',
      metaDesc: product.metaDesc || '',
      tags: Array.isArray(product.tags) ? product.tags.join(', ') : '',
    });
  }, [product, categories]);

  if (!product || !form) {
    return (
      <AdminLayout>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ color: '#a39c94', marginBottom: '16px' }}>Product not found.</p>
          <Link to="/admin/products" style={{ color: '#9d6e3f', fontWeight: '600' }}>← Back to Products</Link>
        </div>
      </AdminLayout>
    );
  }

  const setField = (k, v) => {
    setForm(f => {
      const next = { ...f, [k]: v };
      if (k === 'title' && !f.slug) next.slug = slugify(v);
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
      toast(`Updated image slot ${idx + 1}!`, 'success');
    } catch (err) {
      console.error('Error compressing image:', err);
      const reader = new FileReader();
      reader.onload = e => {
        setImages(imgs => {
          const next = [...imgs];
          next[idx] = { file, preview: e.target.result };
          return next;
        });
        toast(`Updated image slot ${idx + 1}!`, 'success');
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

  const validate = () => {
    if (!form.title || !form.title.trim()) {
      setActiveSection('basic');
      toast('Please enter a product title', 'error');
      return false;
    }
    const catId = form.categoryId || (categories && categories[0]?.id) || 'cat-1';
    if (!form.categoryId && categories && categories.length > 0) {
      setForm(f => ({ ...f, categoryId: catId }));
    }
    const cleanPrice = typeof form.price === 'string' ? parseFloat(form.price.replace(/[^\d.]/g, '')) : Number(form.price);
    if (isNaN(cleanPrice) || cleanPrice <= 0) {
      setActiveSection('pricing');
      toast('Please enter a valid price', 'error');
      return false;
    }
    return true;
  };

  const handleSave = async (saveStatus) => {
    if (!validate()) return;
    setSaving(true);

    try {
      let imgArr = images.filter(Boolean);
      if (imgArr.length === 0) {
        imgArr = [{ preview: product.image || '/rugs/rug-8.jpeg' }];
      }
      if (primaryIdx > 0 && images[primaryIdx]) {
        const primary = images[primaryIdx];
        const rest = images.filter((img, i) => img && i !== primaryIdx);
        imgArr = [primary, ...rest];
      }

      const badgeVal = form.badge === 'Custom' ? customBadge : form.badge;
      const catId = form.categoryId || (categories && categories[0]?.id) || 'cat-1';
      const selectedCat = categories.find(c => c.id === catId);
      const finalStatus = saveStatus || form.status || 'published';

      await new Promise(r => setTimeout(r, 200));

      const cleanPrice = typeof form.price === 'string' ? parseFloat(form.price.replace(/[^\d.]/g, '')) : Number(form.price);
      const finalPrice = isNaN(cleanPrice) || cleanPrice <= 0 ? (product.price || 14999) : cleanPrice;
      const cleanDiscount = form.discountPrice
        ? (typeof form.discountPrice === 'string' ? parseFloat(form.discountPrice.replace(/[^\d.]/g, '')) : Number(form.discountPrice))
        : null;

      updateProduct(product.id, {
        title: form.title.trim(),
        name: form.title.trim(),
        categoryId: catId,
        category: selectedCat?.name || 'Handcrafted',
        shortDesc: form.shortDesc,
        description: form.fullDesc || form.shortDesc,
        fullDesc: form.fullDesc || form.shortDesc,
        price: finalPrice,
        discountPrice: cleanDiscount,
        currency: form.currency || '₹',
        material: form.material,
        shape: form.shape,
        pileHeight: form.pileHeight,
        stockQty: form.stockQty !== '' ? parseInt(form.stockQty) : 10,
        inStock: form.inStock,
        sku: form.sku || product.sku,
        colors,
        sizes,
        tags: typeof form.tags === 'string' ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : (Array.isArray(form.tags) ? form.tags : []),
        badge: badgeVal,
        featured: Boolean(form.featured),
        newArrival: Boolean(form.newArrival),
        bestSeller: Boolean(form.bestSeller),
        status: finalStatus,
        slug: form.slug ? slugify(form.slug) : slugify(form.title),
        images: imgArr.map(i => i.preview || i),
        image: imgArr[0]?.preview || imgArr[0] || product.image || '/rugs/rug-8.jpeg',
        hoverImage: imgArr[1]?.preview || imgArr[1] || imgArr[0]?.preview || '/rugs/rug-6.jpeg',
      });

      setSaving(false);
      toast(finalStatus === 'published' ? '✦ Product updated and published!' : 'Product updated as draft!', 'success');
      navigate('/admin/products');
    } catch (err) {
      console.error('Failed to update product:', err);
      setSaving(false);
      toast(`Error updating product: ${err.message || 'Please try again'}`, 'error');
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
        <div className="admin-page-header">
          <div>
            <h2 className="admin-page-title">Edit Rug Masterpiece</h2>
            <p className="admin-page-sub">
              <Link to="/admin/products" style={{ color: '#9d6e3f', textDecoration: 'none', fontWeight: '600' }}>Products</Link>
              <span>→</span>
              <span>Edit "{form.title}"</span>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button className="admin-btn-secondary" onClick={() => handleSave('draft')} disabled={saving}>
              {saving ? 'Saving...' : 'Save as Draft'}
            </button>
            <button className="adm-btn-gold" onClick={() => handleSave('published')} disabled={saving}>
              {saving ? 'Publishing...' : '✦ Publish Changes'}
            </button>
          </div>
        </div>

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

        {activeSection === 'basic' && (
          <div className="admin-card admin-fields">
            <h3 className="admin-section-title">Product Information</h3>
            <div className="admin-field-group">
              <label className="admin-field-label">Rug Title / Name *</label>
              <input
                type="text"
                className="admin-field-input"
                value={form.title}
                onChange={e => setField('title', e.target.value)}
              />
            </div>
            <div className="admin-field-row">
              <div className="admin-field-group">
                <label className="admin-field-label">Category *</label>
                <select className="admin-field-select" value={form.categoryId} onChange={e => setField('categoryId', e.target.value)}>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="admin-field-group">
                <label className="admin-field-label">Badge</label>
                <select className="admin-field-select" value={form.badge} onChange={e => setField('badge', e.target.value)}>
                  {BADGE_OPTIONS.map(b => <option key={b} value={b}>{b ? b : 'No Badge'}</option>)}
                </select>
              </div>
            </div>
            <div className="admin-field-group">
              <label className="admin-field-label">Short Description</label>
              <input type="text" className="admin-field-input" value={form.shortDesc} onChange={e => setField('shortDesc', e.target.value)} />
            </div>
            <div className="admin-field-group">
              <label className="admin-field-label">Full Story & Curation Details</label>
              <textarea className="admin-field-textarea" rows={4} value={form.fullDesc} onChange={e => setField('fullDesc', e.target.value)} />
            </div>
          </div>
        )}

        {activeSection === 'media' && (
          <div className="admin-card admin-fields">
            <h3 className="admin-section-title">Product Imagery & Gallery</h3>
            <div style={{ display: 'flex', gap: '8px', margin: '16px 0', alignItems: 'center' }}>
              <input
                type="text"
                className="admin-field-input"
                placeholder="Paste direct Image URL (e.g. /rugs/rug-8.jpeg or https://...)"
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                style={{ flex: 1 }}
              />
              <button type="button" className="admin-btn-secondary" onClick={() => handleAddImageUrl(urlInput)}>
                + Add URL
              </button>
            </div>
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
            <div style={{ marginTop: '20px', padding: '16px', background: '#fdfcf9', borderRadius: '12px', border: '1px solid #ede7df' }}>
              <strong style={{ fontSize: '13px', color: '#1b1816', display: 'block', marginBottom: '10px' }}>
                ✦ 1-Click Pick from Gallery:
              </strong>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '8px' }}>
                {GALLERY_PRESETS.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleAddImageUrl(p.url)}
                    style={{
                      cursor: 'pointer', borderRadius: '8px', overflow: 'hidden',
                      border: '1px solid #ede7df', aspectRatio: '1/1', position: 'relative', background: '#fff'
                    }}
                    title={`Click to add ${p.label}`}
                  >
                    <img src={p.url} alt={p.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'pricing' && (
          <div className="admin-card admin-fields">
            <h3 className="admin-section-title">Pricing & Stock Management</h3>
            <div className="admin-field-row">
              <div className="admin-field-group">
                <label className="admin-field-label">Selling Price (₹) *</label>
                <input type="number" className="admin-field-input" value={form.price} onChange={e => setField('price', e.target.value)} />
              </div>
              <div className="admin-field-group">
                <label className="admin-field-label">Original Price (₹)</label>
                <input type="number" className="admin-field-input" value={form.discountPrice} onChange={e => setField('discountPrice', e.target.value)} />
              </div>
            </div>
            <div className="admin-field-row">
              <div className="admin-field-group">
                <label className="admin-field-label">Stock Quantity</label>
                <input type="number" className="admin-field-input" value={form.stockQty} onChange={e => setField('stockQty', e.target.value)} />
              </div>
              <div className="admin-field-group">
                <label className="admin-field-label">SKU</label>
                <input type="text" className="admin-field-input" value={form.sku} onChange={e => setField('sku', e.target.value)} />
              </div>
            </div>
            <div className="admin-field-group" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
              <input
                type="checkbox"
                id="inStockEditCheck"
                checked={form.inStock}
                onChange={e => setField('inStock', e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: '#9d6e3f' }}
              />
              <label htmlFor="inStockEditCheck" style={{ fontSize: '14px', fontWeight: '600', color: '#1b1816', cursor: 'pointer' }}>
                Item is available in stock
              </label>
            </div>
          </div>
        )}

        {activeSection === 'details' && (
          <div className="admin-card admin-fields">
            <h3 className="admin-section-title">Weave Specifications</h3>
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
          </div>
        )}

        {activeSection === 'seo' && (
          <div className="admin-card admin-fields">
            <h3 className="admin-section-title">SEO & Metadata</h3>
            <div className="admin-field-group">
              <label className="admin-field-label">URL Slug</label>
              <input type="text" className="admin-field-input" value={form.slug} onChange={e => setField('slug', e.target.value)} />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
