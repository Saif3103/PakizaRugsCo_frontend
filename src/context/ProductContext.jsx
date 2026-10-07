import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ProductContext = createContext(null);

// ─── Default categories (seeded once) ────────────────────────────────────────
export const DEFAULT_CATEGORIES = [
  { id: 'cat-1', name: 'Hand Tufted', slug: 'hand-tufted', badge: '', coverImage: '/rugs/cat-tufted.jpg', order: 1, active: true, createdAt: new Date().toISOString() },
  { id: 'cat-2', name: 'Shaggy Carpet', slug: 'shaggy-carpet', badge: '', coverImage: '/rugs/cat-shaggy.jpg', order: 2, active: true, createdAt: new Date().toISOString() },
  { id: 'cat-3', name: 'Jute Carpets', slug: 'jute-carpets', badge: 'NEW', coverImage: '/rugs/cat-jute.jpg', order: 3, active: true, createdAt: new Date().toISOString() },
  { id: 'cat-4', name: 'Irregular Shaped', slug: 'irregular-shaped', badge: 'UP TO 50% OFF', coverImage: '/rugs/cat-irregular.jpg', order: 4, active: true, createdAt: new Date().toISOString() },
  { id: 'cat-5', name: 'Textured Rugs', slug: 'textured-rugs', badge: '', coverImage: '/rugs/rug-2.jpeg', order: 5, active: true, createdAt: new Date().toISOString() },
  { id: 'cat-6', name: 'Exclusive Carpets', slug: 'exclusive-carpets', badge: 'EXCLUSIVE', coverImage: '/rugs/rug-8.jpeg', order: 6, active: true, createdAt: new Date().toISOString() },
  { id: 'cat-7', name: 'Traditional Persian', slug: 'traditional-persian', badge: '', coverImage: '/rugs/rug-3.jpeg', order: 7, active: true, createdAt: new Date().toISOString() },
  { id: 'cat-8', name: 'Silk & Wool', slug: 'silk-wool', badge: 'UP TO 50% OFF', coverImage: '/rugs/rug-12.jpeg', order: 8, active: true, createdAt: new Date().toISOString() },
];

// ─── Default products (pre-seeded catalog) ───────────────────────────────────
export const DEFAULT_PRODUCTS = [
  {
    id: 'prod-driftic-beige',
    title: 'Irregular Shaped Rug - Driftic Beige Hand-Tufted Carpet for Living Room & Bedroom',
    name: 'Irregular Shaped Rug - Driftic Beige Hand-Tufted Carpet',
    categoryId: 'cat-4',
    category: 'Irregular Shaped',
    price: 9999,
    discountPrice: 19999,
    badge: '✦ 50% OFF',
    inStock: true,
    stockQty: 9,
    status: 'published',
    images: ['/rugs/cat-irregular.jpg', '/rugs/rug-10.jpeg', '/rugs/rug-12.jpeg', '/rugs/rug-13.jpeg'],
    image: '/rugs/cat-irregular.jpg',
    hoverImage: '/rugs/rug-10.jpeg',
    material: '100% Wool & Silk Highlights',
    shape: 'Irregular',
    sku: 'DRF-BG-01',
    colors: ['Driftic Beige', 'Warm Oatmeal', 'Natural Sand', 'Charcoal Accent'],
    sizes: ['3 x 5 ft', '4 x 6 ft', '5 x 8 ft', '6 x 9 ft', '8 x 10 ft', '9 x 12 ft'],
    shortDesc: 'Transform your space with the Driftic Beige Irregular Shaped Hand-Tufted Carpet, a unique blend of modern design, premium craftsmanship, and lasting durability.',
    fullDesc: 'Transform your space with the Driftic Beige Irregular Shaped Hand-Tufted Carpet, a unique blend of modern design, premium craftsmanship, and lasting durability. Made with high-quality New Zealand wool and silky highlights, this soft and plush area rug is perfect for living rooms, bedrooms, lounges, and contemporary interiors.\n\nIts abstract, freeform shape adds an artistic touch, making it a standout piece in any home decor style, from bohemian to minimalist and modern luxury.\n\n• Premium Hand-Tufted Quality: Expertly crafted by skilled artisans in Bhadohi for superior durability and density.\n• Ultra-Soft & Comfortable: Features a dense, 14mm high-low pile that feels cozy and luxurious underfoot.\n• Freeform Irregular Aesthetic: Fluid, organic silhouette that doubles as sculptural floor art.\n• Easy Maintenance: Non-shedding, durable construction, and simple spot cleaning.\n• Versatile Placement: Ideal for beneath coffee tables, accent chairs, bedside, or entryway.',
    slug: 'irregular-shaped-rug-driftic-beige-hand-tufted-carpet',
    createdAt: '2026-09-08T10:00:00.000Z'
  },
  {
    id: 'prod-arrow-divide',
    title: 'Arrow Divide Black & Grey Hand Tufted Wool & Silk Carpet',
    name: 'Arrow Divide Black & Grey Hand Tufted Wool & Silk Carpet',
    categoryId: 'cat-1',
    category: 'Hand Tufted',
    price: 12999,
    discountPrice: 18500,
    badge: '✦ 30% OFF',
    inStock: true,
    stockQty: 7,
    status: 'published',
    images: ['/rugs/rug-14.jpeg', '/rugs/rug-15.jpeg', '/rugs/rug-8.jpeg', '/rugs/rug-6.jpeg'],
    image: '/rugs/rug-14.jpeg',
    hoverImage: '/rugs/rug-15.jpeg',
    material: 'Wool & Silk',
    shape: 'Rectangle',
    sku: 'ARR-DIV-01',
    colors: ['Black & Grey', 'Ivory & Charcoal', 'Oatmeal & Slate', 'Sage & Cream'],
    sizes: ['3x5 ft', '4x6 ft', '5x8 ft', '6x9 ft', '8x10 ft', '9x12 ft'],
    shortDesc: 'The Arrow Divide carpet features a striking contrast of bold geometric arrow patterns on one side and soft, painterly grey textures on the other, creating a dramatic split design that blends structure with fluidity.',
    fullDesc: 'Hand tufted by skilled artisans in Bhadohi, this carpet is crafted from premium 100% New Zealand wool for durability and plush comfort, combined with bamboo silk accents that add a subtle sheen and refined depth to the surface. The mix of textures and materials creates visual interest while maintaining a soft, luxurious feel underfoot.\n\nIdeal for contemporary living rooms, bedrooms, offices, and designer spaces, the Arrow Divide carpet brings bold character, elegance, and craftsmanship into your décor. Custom sizes are available to fit your space perfectly.',
    slug: 'arrow-divide-black-grey-hand-tufted-wool-silk-carpet',
    createdAt: '2026-09-10T10:00:00.000Z'
  },
  {
    id: 'prod-1',
    title: 'Geometric Abstract Hand-Tufted Wool Carpet',
    name: 'Geometric Abstract Hand-Tufted Wool Carpet',
    categoryId: 'cat-1',
    category: 'Hand Tufted',
    price: 22450,
    discountPrice: null,
    badge: 'Exclusive',
    inStock: true,
    stockQty: 8,
    status: 'published',
    images: ['/rugs/rug-8.jpeg', '/rugs/rug-6.jpeg'],
    image: '/rugs/rug-8.jpeg',
    hoverImage: '/rugs/rug-6.jpeg',
    material: 'Wool',
    shape: 'Rectangle',
    sku: 'GEO-HT-01',
    shortDesc: 'Artisanal geometric pattern hand-tufted in Bhadohi.',
    fullDesc: 'Crafted with 100% fine New Zealand wool for exceptional resilience and sumptuous comfort underfoot.',
    slug: 'geometric-abstract-hand-tufted-wool-carpet',
    createdAt: '2026-09-15T10:00:00.000Z'
  },
  {
    id: 'prod-2',
    title: 'Beige Irregular Shaped Hand-Tufted Carpet',
    name: 'Beige Irregular Shaped Hand-Tufted Carpet',
    categoryId: 'cat-4',
    category: 'Irregular Shaped',
    price: 10999,
    discountPrice: null,
    badge: 'NEW',
    inStock: true,
    stockQty: 5,
    status: 'published',
    images: ['/rugs/rug-10.jpeg', '/rugs/rug-12.jpeg'],
    image: '/rugs/rug-10.jpeg',
    hoverImage: '/rugs/rug-12.jpeg',
    material: 'Wool',
    shape: 'Irregular',
    sku: 'IRR-BG-02',
    shortDesc: 'Fluid organic contours that redefine contemporary floor art.',
    fullDesc: 'Sculpted high-low pile with natural undyed wool fibers.',
    slug: 'beige-irregular-shaped-hand-tufted-carpet',
    createdAt: '2026-09-18T11:30:00.000Z'
  },
  {
    id: 'prod-3',
    title: 'Multicolour Abstract Wool and Silk Carpet',
    name: 'Multicolour Abstract Wool and Silk Carpet',
    categoryId: 'cat-8',
    category: 'Silk & Wool',
    price: 12999,
    discountPrice: 25999,
    badge: 'UP TO 50% OFF',
    inStock: true,
    stockQty: 12,
    status: 'published',
    images: ['/rugs/rug-7.jpeg', '/rugs/rug-3.jpeg'],
    image: '/rugs/rug-7.jpeg',
    hoverImage: '/rugs/rug-3.jpeg',
    material: 'Silk',
    shape: 'Rectangle',
    sku: 'SLK-MC-03',
    shortDesc: 'Luminous bamboo silk blended with soft hand-spun wool.',
    fullDesc: 'Richly dyed jewel tones with subtle sheen shifts depending on room lighting.',
    slug: 'multicolour-abstract-wool-and-silk-carpet',
    createdAt: '2026-09-20T14:15:00.000Z'
  },
  {
    id: 'prod-4',
    title: 'Round Indigo Handwoven Jute Carpet',
    name: 'Round Indigo Handwoven Jute Carpet',
    categoryId: 'cat-3',
    category: 'Jute Carpets',
    price: 4599,
    discountPrice: 9199,
    badge: 'UP TO 50% OFF',
    inStock: true,
    stockQty: 15,
    status: 'published',
    images: ['/rugs/rug-4.jpeg', '/rugs/rug-2.jpeg'],
    image: '/rugs/rug-4.jpeg',
    hoverImage: '/rugs/rug-2.jpeg',
    material: 'Jute',
    shape: 'Round',
    sku: 'JUT-RD-04',
    shortDesc: '100% natural braided sustainable golden jute.',
    fullDesc: 'Handcrafted by artisanal braiders using sun-dried organic jute fiber.',
    slug: 'round-indigo-handwoven-jute-carpet',
    createdAt: '2026-09-22T09:45:00.000Z'
  },
  {
    id: 'prod-5',
    title: 'Pink Beige Triangle Shaggy Carpet',
    name: 'Pink Beige Triangle Shaggy Carpet',
    categoryId: 'cat-2',
    category: 'Shaggy Carpet',
    price: 2625,
    discountPrice: 5250,
    badge: 'UP TO 50% OFF',
    inStock: true,
    stockQty: 6,
    status: 'published',
    images: ['/rugs/rug-1.jpeg', '/rugs/rug-2.jpeg'],
    image: '/rugs/rug-1.jpeg',
    hoverImage: '/rugs/rug-2.jpeg',
    material: 'Polyester',
    shape: 'Rectangle',
    sku: 'SHG-PK-05',
    shortDesc: 'Ultra-soft microfiber shaggy pile for bedrooms and cozy lounges.',
    fullDesc: 'Non-shedding cloud-like texture with non-slip backing.',
    slug: 'pink-beige-triangle-shaggy-carpet',
    createdAt: '2026-09-24T16:20:00.000Z'
  },
  {
    id: 'prod-6',
    title: 'Black and Grey Wool and Silk Carpet',
    name: 'Black and Grey Wool and Silk Carpet',
    categoryId: 'cat-8',
    category: 'Silk & Wool',
    price: 12999,
    discountPrice: 25999,
    badge: 'UP TO 50% OFF',
    inStock: true,
    stockQty: 4,
    status: 'published',
    images: ['/rugs/rug-14.jpeg', '/rugs/rug-15.jpeg'],
    image: '/rugs/rug-14.jpeg',
    hoverImage: '/rugs/rug-15.jpeg',
    material: 'Mixed',
    shape: 'Rectangle',
    sku: 'LUX-BG-06',
    shortDesc: 'Contemporary monochrome elegance for grand living rooms.',
    fullDesc: 'Hand-knotted with lustrous viscose and premium wool.',
    slug: 'black-and-grey-wool-and-silk-carpet',
    createdAt: '2026-09-26T12:00:00.000Z'
  },
  {
    id: 'prod-7',
    title: 'Beige Textured Blocks Wool Carpet',
    name: 'Beige Textured Blocks Wool Carpet',
    categoryId: 'cat-5',
    category: 'Textured Rugs',
    price: 11999,
    discountPrice: null,
    badge: 'EXCLUSIVE',
    inStock: true,
    stockQty: 7,
    status: 'published',
    images: ['/rugs/rug-13.jpeg', '/rugs/rug-10.jpeg'],
    image: '/rugs/rug-13.jpeg',
    hoverImage: '/rugs/rug-10.jpeg',
    material: 'Wool',
    shape: 'Rectangle',
    sku: 'TXT-BK-07',
    shortDesc: 'Sculpted high-low textured blocks for architectural warmth.',
    fullDesc: 'Pure New Zealand wool with dual pile depth.',
    slug: 'beige-textured-blocks-wool-carpet',
    createdAt: '2026-09-28T08:30:00.000Z'
  },
  {
    id: 'prod-8',
    title: 'Blossom Motif Silk Hand Tufted Carpet',
    name: 'Blossom Motif Silk Hand Tufted Carpet',
    categoryId: 'cat-6',
    category: 'Exclusive Carpets',
    price: 12999,
    discountPrice: null,
    badge: 'Exclusive',
    inStock: true,
    stockQty: 3,
    status: 'published',
    images: ['/rugs/rug-18.jpeg', '/rugs/rug-19.jpeg'],
    image: '/rugs/rug-18.jpeg',
    hoverImage: '/rugs/rug-19.jpeg',
    material: 'Silk',
    shape: 'Rectangle',
    sku: 'EXC-BL-08',
    shortDesc: 'Subtle oriental floral accents woven with royal silk threads.',
    fullDesc: 'Refined craftsmanship capturing timeless heritage elegance.',
    slug: 'blossom-motif-silk-hand-tufted-carpet',
    createdAt: '2026-09-29T15:10:00.000Z'
  },
  {
    id: 'prod-9',
    title: 'Braided Natural Jute Carpet',
    name: 'Braided Natural Jute Carpet',
    categoryId: 'cat-3',
    category: 'Jute Carpets',
    price: 4799,
    discountPrice: 9600,
    badge: 'UP TO 50% OFF',
    inStock: true,
    stockQty: 10,
    status: 'published',
    images: ['/rugs/rug-4.jpeg', '/rugs/rug-1.jpeg'],
    image: '/rugs/rug-4.jpeg',
    hoverImage: '/rugs/rug-1.jpeg',
    material: 'Jute',
    shape: 'Rectangle',
    sku: 'JUT-BR-09',
    shortDesc: 'Chunky braided eco-friendly natural fiber rug.',
    fullDesc: 'Heavyweight jute with double stitched borders for long life.',
    slug: 'braided-natural-jute-carpet',
    createdAt: '2026-09-30T11:00:00.000Z'
  },
  {
    id: 'prod-10',
    title: 'Ivory and Teal Lattice Shaggy Carpet',
    name: 'Ivory and Teal Lattice Shaggy Carpet',
    categoryId: 'cat-2',
    category: 'Shaggy Carpet',
    price: 2850,
    discountPrice: 5700,
    badge: 'UP TO 50% OFF',
    inStock: true,
    stockQty: 9,
    status: 'published',
    images: ['/rugs/rug-17.jpeg', '/rugs/rug-16.jpeg'],
    image: '/rugs/rug-17.jpeg',
    hoverImage: '/rugs/rug-16.jpeg',
    material: 'Polyester',
    shape: 'Rectangle',
    sku: 'SHG-TL-10',
    shortDesc: 'Fluffy Moroccan trellis pattern in tranquil teal and ivory.',
    fullDesc: '35mm plush pile height that feels extraordinary to step on.',
    slug: 'ivory-and-teal-lattice-shaggy-carpet',
    createdAt: '2026-10-01T14:40:00.000Z'
  },
  {
    id: 'prod-11',
    title: 'Traditional Persian Isfahan Medallion',
    name: 'Traditional Persian Isfahan Medallion',
    categoryId: 'cat-7',
    category: 'Traditional Persian',
    price: 34500,
    discountPrice: 48000,
    badge: 'Best Seller',
    inStock: true,
    stockQty: 4,
    status: 'published',
    images: ['/rugs/rug-3.jpeg', '/rugs/rug-7.jpeg', '/rugs/rug-5.jpeg'],
    image: '/rugs/rug-3.jpeg',
    hoverImage: '/rugs/rug-7.jpeg',
    material: 'Wool',
    shape: 'Rectangle',
    sku: 'PER-ISF-11',
    shortDesc: 'Classic regal Persian medallion with intricate floral borders.',
    fullDesc: 'Master weaver heritage collection from Bhadohi.',
    slug: 'traditional-persian-isfahan-medallion',
    createdAt: '2026-10-02T10:20:00.000Z'
  },
  {
    id: 'prod-12',
    title: 'Irregular Contour Silhouette Art Rug',
    name: 'Irregular Contour Silhouette Art Rug',
    categoryId: 'cat-4',
    category: 'Irregular Shaped',
    price: 11999,
    discountPrice: null,
    badge: 'EXCLUSIVE',
    inStock: true,
    stockQty: 5,
    status: 'published',
    images: ['/rugs/rug-7.jpeg', '/rugs/rug-3.jpeg'],
    image: '/rugs/rug-7.jpeg',
    hoverImage: '/rugs/rug-3.jpeg',
    material: 'Wool',
    shape: 'Irregular',
    sku: 'IRR-SL-12',
    shortDesc: 'Modern wavy organic rug silhouette designed for avant-garde spaces.',
    fullDesc: 'Hand-sheared relief contours with 100% pure wool.',
    slug: 'irregular-contour-silhouette-art-rug',
    createdAt: '2026-10-03T16:00:00.000Z'
  }
];

function slugify(text) {
  return (text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function loadCategories() {
  try {
    const stored = localStorage.getItem('pakiza_categories');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    localStorage.setItem('pakiza_categories', JSON.stringify(DEFAULT_CATEGORIES));
    return DEFAULT_CATEGORIES;
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

function loadProducts() {
  try {
    const stored = localStorage.getItem('pakiza_products');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    localStorage.setItem('pakiza_products', JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

function saveCategories(cats) {
  try {
    localStorage.setItem('pakiza_categories', JSON.stringify(cats));
  } catch (err) {
    console.error('Failed to save categories to localStorage:', err);
  }
}

function saveProducts(prods) {
  try {
    localStorage.setItem('pakiza_products', JSON.stringify(prods));
  } catch (err) {
    console.warn('LocalStorage quota warning, attempting optimized compression of stored items:', err);
    try {
      // If quota exceeded, sanitize heavy base64 strings so storage doesn't crash
      const safeProds = prods.map(p => {
        const cleanImages = (p.images || []).map(img =>
          typeof img === 'string' && img.startsWith('data:image') && img.length > 250000
            ? '/rugs/rug-8.jpeg'
            : img
        );
        const cleanImage = typeof p.image === 'string' && p.image.startsWith('data:image') && p.image.length > 250000
          ? '/rugs/rug-8.jpeg'
          : p.image;
        const cleanHover = typeof p.hoverImage === 'string' && p.hoverImage.startsWith('data:image') && p.hoverImage.length > 250000
          ? '/rugs/rug-6.jpeg'
          : p.hoverImage;
        return { ...p, images: cleanImages, image: cleanImage, hoverImage: cleanHover };
      });
      localStorage.setItem('pakiza_products', JSON.stringify(safeProds));
    } catch (fallbackErr) {
      console.error('Critical localStorage quota error:', fallbackErr);
    }
  }
}

export function ProductProvider({ children }) {
  const [categories, setCategories] = useState(loadCategories);
  const [products, setProducts] = useState(loadProducts);

  useEffect(() => {
    // Ensure storage is seeded on mount
    const currentCats = loadCategories();
    const currentProds = loadProducts();
    setCategories(currentCats);
    setProducts(currentProds);
  }, []);

  const addCategory = useCallback((data) => {
    const newCat = {
      id: `cat-${Date.now()}`,
      name: data.name,
      slug: data.slug || slugify(data.name),
      badge: data.badge || '',
      coverImage: data.coverImage || '/rugs/cat-tufted.jpg',
      order: data.order ?? 99,
      active: data.active !== false,
      createdAt: new Date().toISOString(),
    };
    setCategories(prev => {
      const u = [...prev, newCat];
      saveCategories(u);
      return u;
    });
    return newCat;
  }, []);

  const updateCategory = useCallback((id, data) => {
    setCategories(prev => {
      const u = prev.map(c => c.id === id ? { ...c, ...data, updatedAt: new Date().toISOString() } : c);
      saveCategories(u);
      return u;
    });
  }, []);

  const deleteCategory = useCallback((id, allProducts) => {
    const hasProds = (allProducts || products).some(p => p.categoryId === id);
    if (hasProds) return { error: 'Cannot delete: category has products. Remove or reassign products first.' };
    setCategories(prev => {
      const u = prev.filter(c => c.id !== id);
      saveCategories(u);
      return u;
    });
    return { success: true };
  }, [products]);

  const addProduct = useCallback((data) => {
    const slug = data.slug || slugify(data.title || data.name || '');
    const newProd = {
      id: `prod-${Date.now()}`,
      ...data,
      title: data.title || data.name || 'Untitled Rug',
      name: data.name || data.title || 'Untitled Rug',
      status: data.status || 'published',
      inStock: data.inStock !== false,
      images: Array.isArray(data.images) && data.images.length > 0 ? data.images : [data.image || '/rugs/rug-8.jpeg'],
      image: data.image || (Array.isArray(data.images) ? data.images[0] : '/rugs/rug-8.jpeg'),
      hoverImage: data.hoverImage || (Array.isArray(data.images) && data.images[1] ? data.images[1] : data.image || '/rugs/rug-6.jpeg'),
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProducts(prev => {
      const u = [newProd, ...prev];
      saveProducts(u);
      return u;
    });
    return newProd;
  }, []);

  const updateProduct = useCallback((id, data) => {
    setProducts(prev => {
      const u = prev.map(p => {
        if (p.id === id) {
          const updated = {
            ...p,
            ...data,
            title: data.title || data.name || p.title || p.name,
            name: data.name || data.title || p.name || p.title,
            updatedAt: new Date().toISOString()
          };
          if (data.images && data.images.length > 0) {
            updated.image = data.images[0];
            if (data.images[1]) updated.hoverImage = data.images[1];
          }
          return updated;
        }
        return p;
      });
      saveProducts(u);
      return u;
    });
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts(prev => {
      const u = prev.filter(p => p.id !== id);
      saveProducts(u);
      return u;
    });
  }, []);

  const bulkDeleteProducts = useCallback((ids) => {
    setProducts(prev => {
      const u = prev.filter(p => !ids.includes(p.id));
      saveProducts(u);
      return u;
    });
  }, []);

  const toggleProductStatus = useCallback((id) => {
    setProducts(prev => {
      const u = prev.map(p => p.id === id ? {
        ...p,
        status: p.status === 'published' ? 'draft' : 'published',
        updatedAt: new Date().toISOString()
      } : p);
      saveProducts(u);
      return u;
    });
  }, []);

  const stats = {
    total: products.length,
    published: products.filter(p => p.status === 'published').length,
    draft: products.filter(p => p.status === 'draft').length,
    outOfStock: products.filter(p => !p.inStock || p.stockQty === 0).length,
    totalCategories: categories.filter(c => c.active).length,
  };

  const getCategoryProductCount = useCallback((catId) => {
    return products.filter(p => p.categoryId === catId || (p.category && p.category.toLowerCase() === catId.toLowerCase())).length;
  }, [products]);

  const recentProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <ProductContext.Provider value={{
      categories, products, stats, recentProducts,
      addCategory, updateCategory, deleteCategory,
      addProduct, updateProduct, deleteProduct, bulkDeleteProducts, toggleProductStatus,
      getCategoryProductCount, slugify,
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return ctx;
};
