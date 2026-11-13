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

// ─── Default products (pre-seeded catalog) ───────────────────────────────────
export const DEFAULT_PRODUCTS = [
  {
    id: 'prod-leopard-mirage',
    title: 'Leopard Mirage Irregular Hand-Tufted Wool Rug - Artisan Safari Statement Carpet',
    name: 'Leopard Mirage Irregular Hand-Tufted Wool Rug',
    categoryId: 'cat-4',
    category: 'Irregular Shaped',
    price: 14999,
    discountPrice: 24999,
    badge: '✦ TRENDING',
    inStock: true,
    stockQty: 8,
    status: 'published',
    images: [
      '/product/il_fullxfull.8467535162_lhvi.jpg',
      '/product/il_fullxfull.8467535300_4kuk.jpg',
      '/product/il_fullxfull.8467535124_3hzm.jpg',
      '/product/il_fullxfull.8467535344_brcm.jpg',
      '/product/il_fullxfull.8467535376_kjvl.jpg',
      '/product/il_fullxfull.8515390629_d2rb.jpg',
      '/product/il_fullxfull.8515390735_npso.jpg',
      '/product/il_fullxfull.8515390843_mtyf.jpg',
      '/product/il_fullxfull.8515390845_95iu.jpg'
    ],
    image: '/product/il_fullxfull.8467535162_lhvi.jpg',
    hoverImage: '/product/il_fullxfull.8467535300_4kuk.jpg',
    material: '100% New Zealand Wool & Bamboo Silk',
    shape: 'Irregular',
    sku: 'LPD-MRG-01',
    colors: ['Safari Beige & Camel', 'Oatmeal & Black Spots', 'Desert Sand'],
    sizes: ['3 x 5 ft', '4 x 6 ft', '5 x 8 ft', '6 x 9 ft', '8 x 10 ft'],
    shortDesc: 'A sculptural masterpiece featuring a fluid, contoured leopard silhouette handcrafted with plush New Zealand wool and bamboo silk highlights.',
    fullDesc: 'The Leopard Mirage Irregular Hand-Tufted Carpet is an evocative fusion of wildlife majesty and high-end sculptural interior design. Handcrafted by master karigars in Bhadohi, each piece showcases an organic curved silhouette that breaks away from conventional rectangular borders.\n\nCrafted from 100% fine New Zealand wool with raised bamboo silk spots, this carpet offers plush tactile comfort and a subtle artisan sheen. Perfect for accentuating living spaces, contemporary bedrooms, luxury dressing rooms, or artistic lounge corners.\n\n• Artisan Hand-Tufted Mastery: Authentic Bhadohi loom craft with dense yarn knotting.\n• Organic Contour Edge: Wave-carved silhouette that serves as functional floor art.\n• High-Low Pile Relief: Detailed shearing provides dimensional texture underfoot.\n• Natural Cotton Canvas Backing: Stamped with authentic Pakiza artisan seal.\n• Easy Care: Stain-resistant natural wool fibers with minimal shedding.',
    slug: 'leopard-mirage-irregular-hand-tufted-wool-rug',
    createdAt: '2026-10-12T19:30:00.000Z'
  },
  {
    id: 'prod-scalloped-aztec',
    title: 'Scalloped Aztec Diamond Geometric Hand-Tufted Wool Rug - Nordic Minimalist Border Carpet',
    name: 'Scalloped Aztec Diamond Geometric Hand-Tufted Wool Rug',
    categoryId: 'cat-1',
    category: 'Hand Tufted',
    price: 16499,
    discountPrice: 26000,
    badge: '✦ BESTSELLER',
    inStock: true,
    stockQty: 10,
    status: 'published',
    images: [
      '/product/il_fullxfull.8470429044_bexe.jpg',
      '/product/il_fullxfull.8518337305_loxk.jpg',
      '/product/il_fullxfull.8470428978_torq.jpg',
      '/product/il_fullxfull.8470429068_lnx6.jpg',
      '/product/il_fullxfull.8470429074_qyz7.jpg',
      '/product/il_fullxfull.8470429156_27mx.jpg',
      '/product/il_fullxfull.8518337323_hd1b.jpg',
      '/product/il_fullxfull.8518337393_58mk.jpg',
      '/product/il_fullxfull.8518337419_aanz.jpg'
    ],
    image: '/product/il_fullxfull.8470429044_bexe.jpg',
    hoverImage: '/product/il_fullxfull.8518337305_loxk.jpg',
    material: '100% Premium New Zealand Wool',
    shape: 'Scalloped Rectangle',
    sku: 'SCL-AZT-01',
    colors: ['Ivory Cream & Charcoal', 'Soft Grey & Noir', 'Oatmeal & Slate'],
    sizes: ['3 x 5 ft', '4 x 6 ft', '5 x 8 ft', '6 x 9 ft', '8 x 10 ft', '9 x 12 ft'],
    shortDesc: 'A chic Nordic-inspired geometric rug framed with delicate wavy scalloped perimeter borders and timeless Aztec diamond motifs in warm charcoal and cream.',
    fullDesc: 'Elevate your hallway, living room, or bedroom with the Scalloped Aztec Diamond Hand-Tufted Wool Rug. Featuring whimsical wave-cut scalloped edges paired with structured Southwestern Aztec diamond iconography, this design bridges playful elegance and grounded symmetry.\n\nHand-tufted in Bhadohi from pure long-staple New Zealand wool, it features a dense 12mm velvety pile that resists heavy foot traffic while cradling every step.\n\n• Playful Scalloped Border: Precision hand-carved scalloped edges that frame the room.\n• Modern Aztec Motifs: Stepped diamond geometry that pairs with bohemian, minimalist, or transitional spaces.\n• Dense Wool Velvet Pile: Ultra-resilient, sound-dampening, and naturally insulating.\n• Multi-Room Versatility: Ideal for entryway runners, focal living spaces, or beneath dining tables.\n• Artisan Crafted: Hand-bound and inspected for lifelong durability.',
    slug: 'scalloped-aztec-diamond-geometric-hand-tufted-wool-rug',
    createdAt: '2026-10-12T19:25:00.000Z'
  },
  {
    id: 'prod-midnight-sapphire-gold',
    title: 'Midnight Sapphire & Gold Art Deco Hand-Tufted Wool Rug - Architectural High-Low Relief Carpet',
    name: 'Midnight Sapphire & Gold Art Deco Hand-Tufted Wool Rug',
    categoryId: 'cat-6',
    category: 'Exclusive Carpets',
    price: 28500,
    discountPrice: 42000,
    badge: '✦ EXCLUSIVE',
    inStock: true,
    stockQty: 6,
    status: 'published',
    images: [
      '/product/il_fullxfull.8513069892_g1if.jpg',
      '/product/il_fullxfull.8560937257_a0hj.jpg',
      '/product/il_fullxfull.8513069890_tf46.jpg',
      '/product/il_fullxfull.8513069894_nkao.jpg',
      '/product/il_fullxfull.8513069896_6eof.jpg',
      '/product/il_fullxfull.8513069906_nsow.jpg',
      '/product/il_fullxfull.8513069980_sbye.jpg',
      '/product/il_fullxfull.8513070072_p89v.jpg',
      '/product/il_fullxfull.8560937491_4wxs.jpg',
      '/product/il_fullxfull.8560937493_qppt.jpg',
      '/product/il_fullxfull.8560937497_4khv.jpg'
    ],
    image: '/product/il_fullxfull.8513069892_g1if.jpg',
    hoverImage: '/product/il_fullxfull.8560937257_a0hj.jpg',
    material: '100% Pure Virgin Wool & Botanical Silk Relief',
    shape: 'Rectangle',
    sku: 'SAP-GLD-01',
    colors: ['Midnight Blue & Gold', 'Deep Royal Navy', 'Imperial Sapphire'],
    sizes: ['5 x 8 ft', '6 x 9 ft', '8 x 10 ft', '9 x 12 ft', '10 x 14 ft'],
    shortDesc: 'A grand luxury statement rug in royal midnight navy with sculptured architectural 3D gold arch relief and 12-15mm dense wool pile.',
    fullDesc: 'Immerse your interior in pure opulence with the Midnight Sapphire & Gold Art Deco Hand-Tufted Carpet. Drawing inspiration from classic 1920s geometric grandeur and celestial architecture, this luxury statement carpet features contrasting deep royal navy velvet with raised golden carved arches and linear relief work.\n\nEvery knot is meticulously hand-sheared to achieve dramatic depth, tactile variation, and an extraordinary underfoot feel.\n\n• High-Low 3D Carved Relief: 12-15mm plush wool pile with hand-sculpted raised golden contours.\n• Deep Royal Navy Velvet: High-luster wool dyed with premium colorfast pigments.\n• Luxury Art Deco Composition: Dual concentric arch portals and linear perimeter stripes.\n• Master Loom Heritage: Woven in Bhadohi on traditional looms for estate-level resilience.\n• Grand Aesthetic Statement: Perfectly suited for master bedrooms, luxury living halls, and executive estates.',
    slug: 'midnight-sapphire-gold-art-deco-hand-tufted-wool-rug',
    createdAt: '2026-10-12T19:20:00.000Z'
  },
  {
    id: 'prod-los-santos-gaming',
    title: 'Los Santos Sunset Artisan Hand-Tufted Gaming Rug - Retro Pop Culture Collector Carpet',
    name: 'Los Santos Sunset Artisan Hand-Tufted Gaming Rug',
    categoryId: 'cat-1',
    category: 'Hand Tufted',
    price: 15999,
    discountPrice: 24500,
    badge: '✦ COLLECTOR EDITION',
    inStock: true,
    stockQty: 7,
    status: 'published',
    images: [
      '/product/il_fullxfull.8567506842_ltin.jpg',
      '/product/il_fullxfull.8615355167_2z6i.jpg',
      '/product/il_fullxfull.8567506810_mn2f.jpg',
      '/product/il_fullxfull.8567506864_k9l8.jpg',
      '/product/il_fullxfull.8567506868_ndty.jpg',
      '/product/il_fullxfull.8567513754_pqvn.jpg',
      '/product/il_fullxfull.8615355201_80n0.jpg',
      '/product/il_fullxfull.8615355237_l5op.jpg',
      '/product/il_fullxfull.8615355239_kx72.jpg',
      '/product/il_fullxfull.8615355283_jqhu.jpg'
    ],
    image: '/product/il_fullxfull.8567506842_ltin.jpg',
    hoverImage: '/product/il_fullxfull.8615355167_2z6i.jpg',
    material: 'Ultra-Dense Hand-Tufted New Zealand Wool Blend',
    shape: 'Rectangle',
    sku: 'LSA-GAM-01',
    colors: ['Sunset Orange & Emerald Green', 'Retro Palm Noir', 'West Coast Sunburst'],
    sizes: ['4 x 6 ft', '5 x 8 ft', '6 x 9 ft', '8 x 10 ft'],
    shortDesc: 'A collector-grade pop-culture statement rug celebrating retro West Coast gaming vibes with warm sunset gradients and iconic character art.',
    fullDesc: 'Celebrate your passion for legendary gaming culture with the Los Santos Sunset Artisan Hand-Tufted Rug. Depicting a breathtaking California dusk over palm trees, vintage muscle cars, and classic street aesthetics, this collector-grade carpet is crafted entirely by hand using premium tufted wool.\n\nThe vibrant orange-to-gold sunset gradient is achieved using nuanced yarn blending, providing a warm, energetic centerpiece for modern gamer setups, bachelor pads, creative studios, and music lounges.\n\n• Artisan Pop-Culture Icon: Meticulously hand-tufted by Bhadohi karigars using vivid wool dyes.\n• Sunburst Color Gradient: Rich sunset orange, palm silhouettes, and classic automotive motifs.\n• Ultra-Comfortable Plush Pile: Soft, thick, and durable under heavy gaming chairs and gaming setups.\n• Anti-Skid Heavy Canvas Back: Keeps the carpet firmly grounded on hardwood or tiled floors.\n• Collector Conversation Piece: The ultimate luxury decor gift for gamers and pop culture enthusiasts.',
    slug: 'los-santos-sunset-artisan-hand-tufted-gaming-rug',
    createdAt: '2026-10-12T19:15:00.000Z'
  },
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

const DELETED_LEGACY_IDS = new Set(['prod-4', 'prod-9']);

function getDeletedProductIds() {
  try {
    const stored = localStorage.getItem('pakiza_deleted_product_ids');
    const set = stored ? new Set(JSON.parse(stored)) : new Set();
    DELETED_LEGACY_IDS.forEach(id => set.add(id));
    return set;
  } catch {
    return new Set(DELETED_LEGACY_IDS);
  }
}

function markProductAsDeleted(idOrIds) {
  try {
    const deleted = getDeletedProductIds();
    if (Array.isArray(idOrIds)) {
      idOrIds.forEach(id => deleted.add(id));
    } else if (idOrIds) {
      deleted.add(idOrIds);
    }
    localStorage.setItem('pakiza_deleted_product_ids', JSON.stringify([...deleted]));
  } catch (err) {
    console.error('Failed to mark product deleted:', err);
  }
}

function loadProducts() {
  try {
    const deletedIds = getDeletedProductIds();
    const stored = localStorage.getItem('pakiza_products');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Filter out any explicitly deleted products
        const validProds = parsed.filter(p =>
          !deletedIds.has(p.id) &&
          p.id !== 'prod-4' &&
          p.id !== 'prod-9' &&
          p.slug !== 'round-indigo-handwoven-jute-carpet' &&
          p.slug !== 'braided-natural-jute-carpet'
        );

        // Ensure new DEFAULT_PRODUCTS automatically merge to the top ONLY if NOT deleted
        const existingIds = new Set(validProds.map(p => p.id));
        const missingDefaults = DEFAULT_PRODUCTS.filter(p => !existingIds.has(p.id) && !deletedIds.has(p.id));
        if (missingDefaults.length > 0) {
          const merged = [...missingDefaults, ...validProds];
          localStorage.setItem('pakiza_products', JSON.stringify(merged));
          return merged;
        }
        if (validProds.length !== parsed.length) {
          localStorage.setItem('pakiza_products', JSON.stringify(validProds));
        }
        return validProds;
      }
    }
    const initial = DEFAULT_PRODUCTS.filter(p => !deletedIds.has(p.id));
    localStorage.setItem('pakiza_products', JSON.stringify(initial));
    return initial;
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
    markProductAsDeleted(id);
    setProducts(prev => {
      const u = prev.filter(p => p.id !== id);
      saveProducts(u);
      return u;
    });
  }, []);

  const bulkDeleteProducts = useCallback((ids) => {
    markProductAsDeleted(ids);
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
