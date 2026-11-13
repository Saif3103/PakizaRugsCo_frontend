import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ProductContext = createContext(null);

// ─── Default categories (seeded once) ────────────────────────────────────────
export const DEFAULT_CATEGORIES = [
  { id: 'cat-1', name: 'Hand Tufted', slug: 'hand-tufted', badge: 'POPULAR', coverImage: '/rugs/categories/cat-hand-tufted.jpg', order: 1, active: true, createdAt: new Date().toISOString() },
  { id: 'cat-2', name: 'Shaggy Carpet', slug: 'shaggy-carpet', badge: 'COZY PLUSH', coverImage: '/rugs/categories/cat-shaggy.jpg', order: 2, active: true, createdAt: new Date().toISOString() },
  { id: 'cat-3', name: 'Hand Knotted', slug: 'hand-knotted', badge: 'HERITAGE', coverImage: '/rugs/categories/cat-hand-knotted.jpg', order: 3, active: true, createdAt: new Date().toISOString() },
  { id: 'cat-4', name: 'Irregular Shaped', slug: 'irregular-shaped', badge: 'TRENDING', coverImage: '/rugs/categories/cat-irregular.jpg', order: 4, active: true, createdAt: new Date().toISOString() },
  { id: 'cat-5', name: 'Textured Rugs', slug: 'textured-rugs', badge: 'TACTILE 3D', coverImage: '/rugs/categories/cat-textured.jpg', order: 5, active: true, createdAt: new Date().toISOString() },
  { id: 'cat-6', name: 'Exclusive Carpets', slug: 'exclusive-carpets', badge: 'HAUTE COUTURE', coverImage: '/rugs/categories/cat-exclusive.jpg', order: 6, active: true, createdAt: new Date().toISOString() },
  { id: 'cat-7', name: 'Traditional Persian', slug: 'traditional-persian', badge: 'ROYAL PALACE', coverImage: '/rugs/categories/cat-traditional-persian.jpg', order: 7, active: true, createdAt: new Date().toISOString() },
  { id: 'cat-8', name: 'Silk & Wool', slug: 'silk-wool', badge: 'PURE LUXURY', coverImage: '/rugs/categories/cat-silk-wool.jpg', order: 8, active: true, createdAt: new Date().toISOString() },
];

// ─── Default products (empty initial catalog for clean admin listing) ────────
export const DEFAULT_PRODUCTS = [];

function slugify(text) {
  return (text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const CATEGORY_FIXED_IMAGES = {
  'cat-1': '/rugs/categories/cat-hand-tufted.jpg',
  'hand-tufted': '/rugs/categories/cat-hand-tufted.jpg',
  'cat-2': '/rugs/categories/cat-shaggy.jpg',
  'shaggy-carpet': '/rugs/categories/cat-shaggy.jpg',
  'cat-3': '/rugs/categories/cat-hand-knotted.jpg',
  'hand-knotted': '/rugs/categories/cat-hand-knotted.jpg',
  'cat-4': '/rugs/categories/cat-irregular.jpg',
  'irregular-shaped': '/rugs/categories/cat-irregular.jpg',
  'cat-5': '/rugs/categories/cat-textured.jpg',
  'textured-rugs': '/rugs/categories/cat-textured.jpg',
  'cat-6': '/rugs/categories/cat-exclusive.jpg',
  'exclusive-carpets': '/rugs/categories/cat-exclusive.jpg',
  'cat-7': '/rugs/categories/cat-traditional-persian.jpg',
  'traditional-persian': '/rugs/categories/cat-traditional-persian.jpg',
  'cat-8': '/rugs/categories/cat-silk-wool.jpg',
  'silk-wool': '/rugs/categories/cat-silk-wool.jpg',
};

function loadCategories() {
  try {
    const stored = localStorage.getItem('pakiza_categories');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        let updated = false;
        const upgraded = parsed.map(c => {
          const fixedImg = CATEGORY_FIXED_IMAGES[c.id] || CATEGORY_FIXED_IMAGES[c.slug];
          if (fixedImg && c.coverImage !== fixedImg) {
            updated = true;
            return { ...c, coverImage: fixedImg };
          }
          if (c.id === 'cat-3' && (c.slug === 'jute-carpets' || c.name === 'Jute Carpets')) {
            updated = true;
            return {
              id: 'cat-3',
              name: 'Hand Knotted',
              slug: 'hand-knotted',
              badge: 'HERITAGE',
              coverImage: '/rugs/categories/cat-hand-knotted.jpg',
              order: 3,
              active: true,
              createdAt: c.createdAt || new Date().toISOString()
            };
          }
          return c;
        });
        if (updated) {
          localStorage.setItem('pakiza_categories', JSON.stringify(upgraded));
          return upgraded;
        }
        return parsed;
      }
    }
    localStorage.setItem('pakiza_categories', JSON.stringify(DEFAULT_CATEGORIES));
    return DEFAULT_CATEGORIES;
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

const CURRENT_CATALOG_VERSION = 'v2_clean_fresh';

function loadProducts() {
  try {
    const version = localStorage.getItem('pakiza_catalog_version');
    if (version !== CURRENT_CATALOG_VERSION) {
      localStorage.setItem('pakiza_catalog_version', CURRENT_CATALOG_VERSION);
      localStorage.setItem('pakiza_products', JSON.stringify([]));
      localStorage.removeItem('pakiza_deleted_product_ids');
      return [];
    }
    const stored = localStorage.getItem('pakiza_products');
    if (stored !== null) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
    localStorage.setItem('pakiza_products', JSON.stringify([]));
    return [];
  } catch (err) {
    console.error('Failed to load products:', err);
    return [];
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

  const clearAllProducts = useCallback(() => {
    setProducts([]);
    saveProducts([]);
  }, []);

  const importProducts = useCallback((newProdsList) => {
    if (!Array.isArray(newProdsList)) return { error: 'Invalid product list' };
    setProducts(newProdsList);
    saveProducts(newProdsList);
    return { success: true, count: newProdsList.length };
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
      addProduct, updateProduct, deleteProduct, bulkDeleteProducts, clearAllProducts, importProducts, toggleProductStatus,
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
