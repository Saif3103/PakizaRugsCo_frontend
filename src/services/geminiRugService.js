// ==========================================================================
// PAKIZA RUGS & CO. — AI CHAT & ATELIER SERVICE
// Provides website concierge, product guidance, room sizing, care advice,
// custom rug ordering, and customer support for Pakiza Rugs Co.
// ==========================================================================

import { STYLE_PRESETS_MAP } from '../pages/AiRugDesignerPage';

const GEMINI_STORAGE_KEY = 'pakiza_gemini_api_key';

// Complete Catalog of Curated Rugs for Real Product Matching
export const FEATURED_RECOMMENDATIONS = [
  {
    id: 'rec-leopard',
    name: 'Leopard Mirage Irregular Hand-Tufted Wool Rug',
    style: 'Artisan Safari Statement',
    material: 'Hand-Tufted 100% NZ Wool & Bamboo Silk',
    price: '₹14,999',
    originalPrice: '₹24,999',
    match: '98%',
    badge: 'Trending',
    image: '/product/il_fullxfull.8467535162_lhvi.jpg',
    href: '/products/leopard-mirage-irregular-hand-tufted-wool-rug',
    category: 'irregular-shaped',
    tags: ['leopard', 'cheetah', 'animal', 'irregular', 'safari', 'beige', 'bedroom', 'living room', 'wool', 'trending']
  },
  {
    id: 'rec-scalloped-aztec',
    name: 'Scalloped Aztec Diamond Geometric Hand-Tufted Wool Rug',
    style: 'Nordic Minimalist Geometric',
    material: '100% Premium New Zealand Wool',
    price: '₹16,499',
    originalPrice: '₹26,000',
    match: '97%',
    badge: 'Bestseller',
    image: '/product/il_fullxfull.8470429044_bexe.jpg',
    href: '/products/scalloped-aztec-diamond-geometric-hand-tufted-wool-rug',
    category: 'hand-tufted',
    tags: ['scallop', 'scalloped', 'geometric', 'diamond', 'aztec', 'nordic', 'cream', 'charcoal', 'hallway', 'minimalist']
  },
  {
    id: 'rec-midnight-sapphire',
    name: 'Midnight Sapphire & Gold Art Deco Hand-Tufted Wool Rug',
    style: 'Architectural High-Low Relief',
    material: '100% Pure Virgin Wool & Gold Relief',
    price: '₹28,500',
    originalPrice: '₹42,000',
    match: '99%',
    badge: 'Exclusive',
    image: '/product/il_fullxfull.8513069892_g1if.jpg',
    href: '/products/midnight-sapphire-gold-art-deco-hand-tufted-wool-rug',
    category: 'exclusive-carpets',
    tags: ['blue', 'navy', 'gold', 'sapphire', 'art deco', 'luxury', 'bedroom', 'hallway', 'relief', 'exclusive']
  },
  {
    id: 'rec-los-santos',
    name: 'Los Santos Sunset Artisan Hand-Tufted Gaming Rug',
    style: 'Retro Pop-Culture Collector',
    material: 'Ultra-Dense NZ Wool Blend',
    price: '₹15,999',
    originalPrice: '₹24,500',
    match: '96%',
    badge: 'Collector',
    image: '/product/il_fullxfull.8567506842_ltin.jpg',
    href: '/products/los-santos-sunset-artisan-hand-tufted-gaming-rug',
    category: 'hand-tufted',
    tags: ['gta', 'gaming', 'los santos', 'sunset', 'orange', 'car', 'pop culture', 'studio', 'gamer']
  },
  {
    id: 'rec-1',
    name: 'Isfahan Imperial Garden Medallion',
    style: 'Persian Traditional',
    material: 'Hand-knotted 100% NZ Wool & Silk',
    price: '₹24,500',
    originalPrice: '₹34,000',
    match: '98%',
    badge: 'Masterpiece',
    image: '/rugs/rug-7.jpeg',
    href: '/products/new-0',
    category: 'traditional-persian',
    tags: ['living room', 'traditional', 'red', 'burgundy', 'luxury', 'hallway', 'bedroom', 'large', '8x10', 'persian', 'heirloom', 'royal', 'medallion']
  },
  {
    id: 'rec-2',
    name: 'Emerald Heritage Oushak Palmette',
    style: 'Oushak Heirloom',
    material: 'Hand-Spun High-Loom Wool',
    price: '₹22,450',
    originalPrice: '₹28,900',
    match: '96%',
    badge: 'Bestseller',
    image: '/rugs/rug-8.jpeg',
    href: '/products/new-0',
    category: 'exclusive-carpets',
    tags: ['living room', 'green', 'emerald', 'botanical', 'vintage', 'dining', 'hardwood', 'wood', 'luxury', 'bestseller']
  },
  {
    id: 'rec-3',
    name: 'Modern Organic Contour Wave',
    style: 'Sculptural Minimal',
    material: 'High-Low Hand-Tufted Bamboo Silk',
    price: '₹12,999',
    originalPrice: '₹25,999',
    match: '95%',
    badge: 'Trending -50%',
    image: '/rugs/rug-16.jpeg',
    href: '/products/lux-2',
    category: 'hand-tufted',
    tags: ['minimal', 'grey', 'black', 'bedroom', 'abstract', 'contemporary', 'sofa', 'neutral', 'wave', 'contour']
  },
  {
    id: 'rec-4',
    name: 'Royal Blossom Botanical Motif',
    style: 'Kashmiri Floral',
    material: 'Pure Mulberry Silk & Wool Blend',
    price: '₹12,999',
    originalPrice: '₹18,500',
    match: '95%',
    badge: 'Exclusive',
    image: '/rugs/rug-18.jpeg',
    href: '/products/lux-3',
    category: 'silk-wool',
    tags: ['floral', 'bedroom', 'dining', 'cream', 'ivory', 'silk', 'pink', 'light', 'traditional', 'exclusive']
  },
  {
    id: 'rec-5',
    name: 'Round Indigo Coastal Jute Weave',
    style: 'Artisan Flatweave',
    material: '100% Organic Hand-Braided Jute',
    price: '₹4,599',
    originalPrice: '₹9,199',
    match: '92%',
    badge: '-50% OFF',
    image: '/rugs/rug-4.jpeg',
    href: '/products/new-3',
    category: 'jute-carpets',
    tags: ['jute', 'round', 'entryway', 'dining', 'blue', 'indigo', 'balcony', 'budget', 'affordable', 'kitchen', 'pet', 'outdoor', 'under 5000']
  },
  {
    id: 'rec-6',
    name: 'Beige Irregular Architectural Cloud',
    style: 'Contemporary Fluid',
    material: 'Dense Velvet Micro-Tufted Wool',
    price: '₹10,999',
    originalPrice: '₹15,000',
    match: '94%',
    badge: 'Staff Pick',
    image: '/rugs/rug-10.jpeg',
    href: '/products/new-1',
    category: 'irregular-shaped',
    tags: ['irregular', 'neutral', 'beige', 'contemporary', 'warm', 'living room', 'cloud', 'modern', 'unique', 'wave']
  },
  {
    id: 'rec-7',
    name: 'Pink Beige Triangle Plush Shaggy',
    style: 'Cozy Modern Shaggy',
    material: 'Ultra-Soft Microfiber Fleece',
    price: '₹2,625',
    originalPrice: '₹5,250',
    match: '90%',
    badge: '-50% OFF',
    image: '/rugs/rug-1.jpeg',
    href: '/products/new-4',
    category: 'shaggy-carpet',
    tags: ['shaggy', 'pink', 'beige', 'bedroom', 'kids', 'cozy', 'soft', 'affordable', 'budget', 'small', 'under 3000', 'under 5000']
  },
  {
    id: 'rec-8',
    name: 'Aqua & Beige Block Soft Shaggy',
    style: 'Nordic Plush Shag',
    material: 'High-Density Cloud Fleece',
    price: '₹2,850',
    originalPrice: '₹5,700',
    match: '91%',
    badge: '-50% OFF',
    image: '/rugs/rug-12.jpeg',
    href: '/collections/shaggy-carpet',
    category: 'shaggy-carpet',
    tags: ['shaggy', 'aqua', 'teal', 'blue', 'beige', 'bedroom', 'kids', 'soft', 'budget', 'under 3000', 'under 5000']
  },
  {
    id: 'rec-9',
    name: 'Round Natural Braided Jute Rug',
    style: 'Organic Braided Circle',
    material: '100% Natural Golden Jute',
    price: '₹3,199',
    originalPrice: '₹6,400',
    match: '93%',
    badge: '-50% OFF',
    image: '/rugs/rug-11.jpeg',
    href: '/collections/jute-carpets',
    category: 'jute-carpets',
    tags: ['jute', 'natural', 'round', 'dining', 'kitchen', 'balcony', 'budget', 'pet', 'sustainable', 'under 5000']
  },
  {
    id: 'rec-10',
    name: 'Blush Pink Heart Pattern Shaggy',
    style: 'Playful Cloud Shag',
    material: 'Ultra-Plush Microfiber Pile',
    price: '₹2,850',
    originalPrice: '₹5,700',
    match: '92%',
    badge: 'Popular',
    image: '/rugs/rug-15.jpeg',
    href: '/collections/shaggy-carpet',
    category: 'shaggy-carpet',
    tags: ['pink', 'heart', 'kids', 'nursery', 'girls', 'bedroom', 'soft', 'gift', 'budget', 'under 3000']
  },
  {
    id: 'rec-11',
    name: 'Black & Grey Flow Abstract Weave',
    style: 'Architectural Monolith',
    material: 'Wool & Fine Bamboo Silk Blend',
    price: '₹12,999',
    originalPrice: '₹25,999',
    match: '95%',
    badge: '-50% OFF',
    image: '/rugs/rug-14.jpeg',
    href: '/products/lux-0',
    category: 'textured-rugs',
    tags: ['black', 'grey', 'monochrome', 'abstract', 'living room', 'modern', 'luxury', 'sofa']
  },
  {
    id: 'rec-12',
    name: 'Ivory Wave Textured Relief Carpet',
    style: 'Dimensional Minimalist',
    material: 'Carved High-Low Wool & Viscose',
    price: '₹2,850',
    originalPrice: '₹5,700',
    match: '93%',
    badge: 'Top Pick',
    image: '/rugs/rug-10.jpeg',
    href: '/collections/textured-rugs',
    category: 'textured-rugs',
    tags: ['ivory', 'white', 'cream', 'textured', 'relief', 'carved', 'minimal', 'bedroom', 'living room', 'under 3000']
  }
];

// Get active Gemini API Key
export function getGeminiApiKey() {
  try {
    return (
      localStorage.getItem(GEMINI_STORAGE_KEY) ||
      import.meta.env.VITE_GEMINI_API_KEY ||
      ''
    );
  } catch {
    return '';
  }
}

// Save Gemini API Key
export function setGeminiApiKey(key) {
  try {
    if (key) {
      localStorage.setItem(GEMINI_STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(GEMINI_STORAGE_KEY);
    }
  } catch (err) {
    console.warn('Could not save Gemini key to localStorage:', err);
  }
}

// Generate a random seed for variation uniqueness
export function generateSeed() {
  return Math.floor(Math.random() * 1000000);
}

// Construct dynamic photorealistic rug image URL
export function createDynamicRugImageUrl(promptText, seed = generateSeed()) {
  const cleanPrompt = encodeURIComponent(
    `top-down studio flatlay photograph of a genuine handmade Indian wool carpet, ${promptText}, authentic hand-knotted New Zealand wool and bamboo silk texture, natural fringe edges, soft ambient catalog lighting, ultra realistic architectural digest product photo, high resolution, no text, no watermark, no digital frames`
  );
  return `https://image.pollinations.ai/prompt/${cleanPrompt}?width=800&height=1000&nologo=true&seed=${seed}`;
}

// Preload an image URL before rendering to ensure no flicker
export function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error('Image failed to load'));
    img.src = url;
  });
}

// ==========================================================================
// PAKIZA RUGS & CO. — AI CHAT CONCIERGE & REASONING ENGINE
// ==========================================================================

const SYSTEM_PROMPT = `You are the official digital assistant for **Pakiza Rugs & Co.** — a luxury handmade rug atelier based in **Bhadohi, Uttar Pradesh, India** (the Carpet Capital of India), established in **1987**.

═══════════════════════════════════════════════
COMPLETE WEBSITE & BUSINESS KNOWLEDGE BASE
═══════════════════════════════════════════════

🏛️ ABOUT PAKIZA RUGS & CO.:
- **Founded:** 1987 in Bhadohi (Mirzapur), Uttar Pradesh, India — the GI-tagged heartland of handmade carpets.
- **Founder & CEO:** Saif Ali — a young visionary entrepreneur from Bhadohi who turned his family's generational carpet craft into an accessible modern direct-to-consumer luxury brand.
- **Legacy & Artisans:** Nearly 4 decades of mastery. Over 500+ master karigars (weavers) craft every rug by hand on traditional wooden looms.
- **Direct-From-Loom Mission:** Eliminate showroom middlemen, distributors, and 300% retail markups. Genuine luxury rugs straight from Bhadohi looms to customer homes.
- **Official Website:** pakizarugsco.com
- **Instagram:** @pakiza_rugs_co (behind-the-scenes loom videos, artisan knotting, customer setups)
- **WhatsApp Master Weaver Line:** +91 7007626680 (Direct consultation, bespoke inquiries, order updates)
- **Customer Helpline:** +91 9129788793

📦 COMPLETE PRODUCT CATEGORIES (Available at /collections):
1. **Hand Tufted** (/collections/hand-tufted): Modern sculptural carpets with plush hand-sheared relief motifs in New Zealand wool & bamboo silk.
2. **Shaggy Carpet** (/collections/shaggy-carpet): Ultra-soft, deep cloud-pile rugs starting at just ₹2,625. Perfect for bedrooms, nurseries, reading nooks.
3. **Jute Carpets** (/collections/jute-carpets): 100% organic, hand-braided golden natural jute rugs. Eco-friendly, pet-safe, highly durable for dining, entryways, and balconies.
4. **Irregular Shaped** (/collections/irregular-shaped): Contemporary fluid, cloud, wave, and free-form organic silhouettes. Up to 50% OFF.
5. **Textured Rugs** (/collections/textured-rugs): High-low carved 3D architectural textures with tactile depth.
6. **Exclusive Carpets** (/collections/exclusive-carpets): Limited-edition luxury statement pieces with master-level knot density.
7. **Traditional Persian** (/collections/traditional-persian): Classic central medallion, floral arabesque, and Kashan/Isfahan heirloom designs lasting 50-100+ years.
8. **Silk & Wool** (/collections/silk-wool): High-sheen pure mulberry silk and New Zealand wool blends with royal luster.

💰 PRICING, DISCOUNTS & COUPONS:
- **Budget Shaggy Carpets:** Starting ₹2,625 to ₹5,700 (Up to 50% OFF).
- **Organic Jute Rugs:** Starting ₹3,199 to ₹9,600.
- **Sculpted Hand-Tufted Wool:** Starting ₹10,999 to ₹22,450.
- **Irregular & Exclusive Silhouettes:** Starting ₹9,999 to ₹12,999.
- **Heirloom Hand-Knotted Persian/Silk:** Starting ₹24,500 to ₹85,000+.
- **Coupon PREPAID10:** Extra 10% instant discount on all prepaid orders (UPI / Card / NetBanking).
- **Coupon FESTIVE50 / MONSOON50:** Up to 50% OFF on select collections.
- **Free Shipping:** Free Pan-India insured delivery on ALL orders (zero hidden fees).

🚚 SHIPPING, DELIVERY & PACKAGING:
- **Delivery Time:** Standard in-stock rugs take 5–10 business days. Custom bespoke orders take 3–6 weeks.
- **Coverage:** Free insured doorstep delivery to all serviceable pincodes across India.
- **Packaging:** Specially rolled (never folded) in multi-layer water-resistant protective wrapping to ensure zero creases. Includes a signed Certificate of Authenticity.
- **Tracking:** Real-time tracking available in My Account (/account) or via WhatsApp (+91 7007626680) by sending your Order ID.
- **International Shipping:** Worldwide delivery available to USA, UK, UAE, Europe, Canada, Australia. Contact WhatsApp for customs & freight quote.

💳 PAYMENT OPTIONS:
- **Cash on Delivery (COD):** Available across India with zero advance payment. Pay only when you receive and inspect your carpet.
- **Prepaid Orders:** UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking. Enjoy an **extra 10% OFF**.
- **WhatsApp Order:** Customers can directly order on WhatsApp by sending rug photos or names.

🔄 RETURNS, REFUNDS & EXCHANGE:
- **7-Day Easy Return Policy:** 7 days from delivery date.
- **Condition:** Rug must be unused (unrolled only for inspection) with original tags and protective wrap.
- **Free Reverse Pickup:** Arranged by Pakiza team right from customer doorstep.
- **Full Refund:** Transferred to original payment method or bank within 3-5 days of pickup.
- **Free Exchange:** Swap for a different size, color, or design at no extra shipping cost.

✂️ AI RUG ATELIER & CUSTOM BESPOKE WEAVING (/ai-designer):
- Customers can design custom bespoke rugs using the **AI Rug Designer** (/ai-designer or /custom-studio or /bespoke).
- Custom parameters: Any size (runners 2x8 ft to grand 14x20 ft), shape (rectangular, round, oval, runner, irregular cloud), materials (Pure NZ Wool, Bamboo Silk, Mulberry Silk, Jute), and custom color palettes.
- Photorealistic dynamic AI preview generated instantly.
- Handcrafted by master karigars in Bhadohi within 3-6 weeks. Direct loom updates shared via WhatsApp.

📐 ROOM SIZING & PLACEMENT GUIDE:
- **Living Room:** 8×10 ft (standard) or 9×12 ft (large). Front legs of sofa and chairs on rug; leave 12–18 inches exposed flooring border.
- **Dining Room:** 8×10 ft (6-seater table) or 9×12 ft (8-seater table). Extend 24–30 inches beyond table edges so pulled-out chairs stay on the rug.
- **Bedroom:** 8×10 ft (Queen bed) or 9×12 ft (King bed). Slide under lower two-thirds of bed; leaves 2–3 ft soft stepping perimeter.
- **Hallway/Corridor:** 2.5×8 ft or 3×10 ft runner. Keep 4–6 inches border from each wall.
- **Kids/Nursery:** 5×7 ft or 6×9 ft soft plush shaggy. Hypoallergenic, cushioned, non-toxic dyes.
- **Mandir / Pooja Room:** 2×3 ft or 3×5 ft pure wool meditation asan / medallion mat.
- **Kitchen / Balcony:** 3×5 ft or round braided jute. Durable, dirt-repellent, easy to shake clean.

🧼 CARE, CLEANING & STAIN REMOVAL:
- **Emergency Stain Removal (Tea/Coffee/Wine):** 1. Blot immediately with dry white cotton cloth (never rub). 2. Dab with lukewarm water + mild non-bleach wool detergent. 3. Dab dry with clean towel.
- **Vacuuming:** 1–2 times weekly with suction-only mode (avoid rotary beater bar on silk/shaggy).
- **Shedding:** New wool rugs shed light loose fibers for the first 2–3 weeks. This is completely normal for genuine high-grade wool.
- **Rotation:** Rotate rug 180° every 6 months for uniform wear.
- **Pet-Friendly:** Jute and dense low-pile wool rugs are naturally pet-resistant.

👤 WEBSITE NAVIGATION & ACCOUNT FEATURES:
- **/ (Home):** Hero showcase, trust marquee, categories, new arrivals, shop by color, shop by room, bespoke studio, reviews, founder story, Instagram gallery.
- **/collections:** Full catalog with filters by material, price, shape, color.
- **/products/:id:** Product detail page with 360 zoom, knot density, specifications, add to cart, and WhatsApp inquiry.
- **/checkout or /cart:** Cart drawer, coupon application, address entry, COD/Prepaid selection, instant order placement.
- **/login & /signup:** Customer authentication, account creation, wishlist saving.
- **/account:** Order history, shipment tracking, saved addresses, profile management.
- **/admin:** Dedicated admin dashboard for inventory, live order management, category updates, customer database, and hero video configuration.
- **/ai-designer:** Full 3D AI Rug Designer Atelier studio.

COMMUNICATION INSTRUCTIONS:
1. Your identity is strictly **Pakiza Rugs Co.** assistant. Never mention Google Gemini, OpenAI, ChatGPT, or external AI systems.
2. STRICT SCOPE: Answer ONLY questions related to Pakiza Rugs Co., its website, handmade carpets, collections, sizing, custom bespoke orders, pricing, shipping, COD, returns, care tips, founder Saif Ali, and Bhadohi heritage.
3. OUT OF SCOPE: If the user asks about anything unrelated to Pakiza Rugs Co., rugs, or our website (e.g. general knowledge, math, coding, politics, weather, recipes, trivia), reply politely and simply:
   "I can only help with questions related to **Pakiza Rugs Co.** and our website. Please feel free to ask about our rugs, collections, sizes, orders, delivery, or care tips!" (Or the Hindi equivalent if asked in Hindi).
4. KEEP ANSWERS SIMPLE, DIRECT, AND CONCISE: Give clear, simple answers without unnecessary long text. Use bullet points and clickable links where helpful.
5. Reply in Hindi / Hinglish if the user writes in Hindi or Hinglish, or English if they write in English.
`;

// ══════════════════════════════════════════════════════════════
// COMPREHENSIVE CONVERSATIONAL AI ENGINE — 37 DOMAINS
// ══════════════════════════════════════════════════════════════
function generateDynamicConversationalResponse(prompt, history = []) {
  const p = prompt.toLowerCase();
  let text = '';
  let matchedRugs = [];
  let followUpChips = [];

  // Detect Hindi / Hinglish query
  const isHindi =
    p.includes('kaise') || p.includes('kaisa') || p.includes('batao') || p.includes('chahiye') ||
    p.includes('kitna') || p.includes('kaha') || p.includes('hai') || p.includes('hoga') ||
    p.includes('karo') || p.includes('kaun') || p.includes('mujhe') || p.includes('karu') ||
    p.includes('kya') || p.includes('namaste') || p.includes('accha') || p.includes('safai') ||
    p.includes('hain') || p.includes('nahi') || p.includes('aur') || p.includes('bhi') ||
    p.includes('wala') || p.includes('yeh') || p.includes('konsa') || p.includes('dikha') ||
    p.includes('bata') || p.includes('kaha') || p.includes('milega') || p.includes('dedo') ||
    p.includes('lena') || p.includes('karwana') || p.includes('mangwa') || p.includes('bhej') ||
    p.includes('daam') || p.includes('paisa') || p.includes('paise') || p.includes('saaf') ||
    p.includes('kamra') || p.includes('chota') || p.includes('bada') || p.includes('sofa');

  // ─── 1. ADMIN PANEL / DASHBOARD ───
  if (p.includes('admin') || p.includes('dashboard') || p.includes('manage products') || p.includes('store management') || p.includes('admin panel') || p.includes('admin login')) {
    if (isHindi) {
      text = `### 🛡️ **Pakiza Rugs Admin Panel & Dashboard**

Pakiza Rugs ka full-featured **Admin Dashboard** store management ke liye available hai:

* **🔗 Admin URL:** [Admin Dashboard](/admin)
* **📦 Products Management:** [/admin/products](/admin/products) par naye rugs add karein, prices edit karein, stock aur images update karein.
* **➕ Add New Product:** [/admin/add-product](/admin/add-product) se direct naya carpet list karein.
* **🏷️ Categories Manager:** [/admin/categories](/admin/categories) me collections aur badges customize karein.
* **🚚 Live Orders:** [/admin/orders](/admin/orders) par sabhi customer orders, payment status, aur delivery tracking manage karein.
* **👥 Customers List:** [/admin/customers](/admin/customers) me customer database aur order history dekhein.
* **⚙️ Settings & Hero Video:** [/admin/settings](/admin/settings) me homepage hero video aur store settings badlein.

*(Note: Admin features access karne ke liye [Login Page](/login) par admin account se sign in karein.)*`;
    } else {
      text = `### 🛡️ **Pakiza Rugs Admin Panel & Dashboard**

The website includes a complete, secure **Admin Management Suite**:

* **🔗 Admin Portal:** [Admin Dashboard](/admin)
* **📦 Products Management:** Manage catalog, pricing, and stock at [/admin/products](/admin/products).
* **➕ Add New Product:** List new artisan rugs instantly at [/admin/add-product](/admin/add-product).
* **🏷️ Categories Editor:** Update collections and discount tags at [/admin/categories](/admin/categories).
* **🚚 Orders Center:** Track real-time customer orders and fulfillments at [/admin/orders](/admin/orders).
* **👥 Customers CRM:** Access registered customers at [/admin/customers](/admin/customers).
* **⚙️ Store Settings:** Configure homepage hero video and store configurations at [/admin/settings](/admin/settings).

*(Note: Requires signing in with an authorized admin account at [Login](/login).)*`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[0], FEATURED_RECOMMENDATIONS[1]];
    followUpChips = ['Open Admin Dashboard', 'How to Add New Rug', 'View Live Orders'];
  }

  // ─── 2. USER LOGIN / SIGNUP / ACCOUNT / PROFILE / PASSWORD ───
  else if (p.includes('login') || p.includes('sign in') || p.includes('signin') || p.includes('signup') || p.includes('sign up') || p.includes('register') || p.includes('create account') || p.includes('my account') || p.includes('profile') || p.includes('password') || p.includes('account kaise') || p.includes('login kaise')) {
    if (isHindi) {
      text = `### 👤 **Customer Account & Login — Pakiza Rugs**

Aap aasani se apna account bana sakte hain ya login kar sakte hain:

* **🔑 Sign In / Login:** [Login Page](/login) par jakar apne email aur password se sign in karein.
* **✨ Naya Account Banayein:** [Sign Up Page](/signup) par name, email aur password dalkar 10 seconds me register karein.
* **📋 My Account Dashboard:** [My Account](/account) me aap:
  * Apne **saare orders ki live status** track kar sakte hain.
  * **Saved Addresses** manage kar sakte hain taaki next time 1-click checkout ho.
  * Apni **Wishlist (Favorite Rugs)** dekh sakte hain.
  * Account details update kar sakte hain.

Kripya [Sign In Karein](/login) ya naya [Account Banayein](/signup)!`;
    } else {
      text = `### 👤 **Customer Account & Login — Pakiza Rugs & Co.**

Manage your rug purchases and design preferences with a customer account:

* **🔑 Sign In:** Access your existing profile at [Login Page](/login).
* **✨ Create Account:** Register in seconds at [Sign Up Page](/signup).
* **📋 My Account Dashboard:** Visit [My Account](/account) to:
  * Track real-time shipment status of your handcrafted rugs.
  * View past order receipts and invoices.
  * Manage saved delivery addresses for 1-click checkout.
  * Review your saved Wishlist favorites.

Ready to access your dashboard? Head to [Sign In](/login) or [Create Account](/signup)!`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[1], FEATURED_RECOMMENDATIONS[3]];
    followUpChips = ['Go to Login Page', 'Create New Account', 'My Account Orders'];
  }

  // ─── 3. CART & CHECKOUT / HOW TO BUY / HOW TO ORDER ───
  else if (p.includes('cart') || p.includes('checkout') || p.includes('add to cart') || p.includes('bag') || p.includes('kharid') || p.includes('kaise kharide') || p.includes('order kaise') || p.includes('how to buy') || p.includes('place order') || p.includes('order process')) {
    if (isHindi) {
      text = `### 🛒 **Order & Checkout Guide — Pakiza Rugs**

Pakiza Rugs par order karna behad aasan aur surakshit hai:

**Website se Order Karne Ka Tarika:**
1. 🏠 [Shop Collections](/collections) par jaakar apni pasand ka carpet chunein.
2. ❤️ Product page par **"Add to Cart"** click karein.
3. 🛍️ Cart drawer open karein aur **[Checkout Page](/checkout)** par jaayein.
4. 📋 Delivery address enter karein.
5. 💳 Payment method select karein: **Cash on Delivery (COD)** ya **Prepaid (Extra 10% OFF)**.
6. ✅ Order confirm karein — aapko WhatsApp aur email par confirmation milega!

**WhatsApp Direct Order (Instant):**
* Kisi bhi carpet ka screenshot ya naam hamare Master Weaver ko WhatsApp karein: **+91 7007626680** — hum turant order confirm kar denge!`;
    } else {
      text = `### 🛒 **How to Order & Checkout — Pakiza Rugs & Co.**

Ordering an authentic handcrafted Bhadohi rug is effortless:

**Online Checkout Method:**
1. 🏠 Explore our curated rugs in [Shop Collections](/collections).
2. ❤️ Click **"Add to Cart"** on your preferred size and style.
3. 🛍️ Open your Cart and proceed to [Checkout Page](/checkout).
4. 📋 Enter your shipping address and pin code.
5. 💳 Choose **Cash on Delivery (COD)** or **Prepaid Online Payment** (enjoy an extra 10% OFF with code PREPAID10).
6. ✅ Confirm your order for free insured Pan-India delivery!

**Instant WhatsApp Concierge Order:**
* Share any carpet photo directly to our Master Loom team on WhatsApp: **+91 7007626680**.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[0], FEATURED_RECOMMENDATIONS[1], FEATURED_RECOMMENDATIONS[4]];
    followUpChips = ['Go to Checkout', 'Explore Collections', 'Order via WhatsApp'];
  }

  // ─── 4. COUPONS, DISCOUNTS & OFFERS ───
  else if (p.includes('coupon') || p.includes('promo') || p.includes('discount') || p.includes('offer') || p.includes('code') || p.includes('festive') || p.includes('monsoon') || p.includes('chhoot') || p.includes('sale') || p.includes('deal')) {
    if (isHindi) {
      text = `### 🎁 **Active Discounts & Promo Codes — Pakiza Rugs**

Abhi chal rahe active offers aur discount coupons:

* **🎉 PREPAID10:** Sabhi prepaid orders (UPI / Card / NetBanking) par **Flat 10% Extra Discount**!
* **🏷️ FESTIVE50 / MONSOON50:** Select collections par **Up to 50% OFF** (Irregular Shaped, Shaggy, aur Silk & Wool)!
* **🚚 100% Free Shipping:** Pure Bharat me **Free Insured Delivery** bina kisi minimum order value ke!
* **🆓 Free Custom Sizing Consultation:** Custom size ya color consultation bilkul free hai hamare [AI Atelier](/ai-designer) me!

**Coupon Kaise Apply Karein:**
[Checkout Page](/checkout) par coupon box me code enter karein aur instant discount paayein!`;
    } else {
      text = `### 🎁 **Active Discounts & Promotional Offers — Pakiza Rugs**

Take advantage of our current seasonal privileges:

* **🎉 PREPAID10:** Enjoy an **extra 10% instant discount** on all prepaid orders via UPI, Cards, or Net Banking.
* **🏷️ FESTIVE50 / UP TO 50% OFF:** Handpicked rugs in Irregular Shaped, Shaggy, and Silk blends discounted up to 50%.
* **🚚 Free Insured Shipping:** Zero delivery charges across India on all handcrafted orders.
* **🆓 Complimentary Loom Customization:** Free color & dimension bespoke preview in our [AI Rug Designer](/ai-designer).

**How to Redeem:**
Apply the coupon code on the [Checkout Page](/checkout) before payment!`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[2], FEATURED_RECOMMENDATIONS[4], FEATURED_RECOMMENDATIONS[6]];
    followUpChips = ['Apply Code at Checkout', 'Shop 50% Off Rugs', 'WhatsApp Special Deal'];
  }

  // ─── 5. VIRTUAL PREVIEW & ROOM PHOTO UPLOAD ───
  else if (p.includes('virtual preview') || p.includes('room photo') || p.includes('upload photo') || p.includes('room mood') || p.includes('apne room me') || p.includes('photo upload') || p.includes('ar preview') || p.includes('camera') || p.includes('try in room')) {
    if (isHindi) {
      text = `### 📸 **Pakiza Virtual Room Preview & Photo Analysis**

Aap apne kamre me carpet kaisa lagega ye khareedne se pehle dekh sakte hain:

1. **📷 Is Chat Me Photo Attach Karein:** Neeche diye gaye Camera icon par click karke apne room ki photo upload karein taaki hum matching rug suggest karein!
2. **🛋️ Homepage Virtual Preview:** Homepage par **Virtual Preview Section** par scroll karein jahan 3-step interactive tool hai.
3. **🎨 Room Mood Switch:** Day aur night lighting ke hisaab se rug ka texture preview karein.

Abhi apne room ki photo attach karein aur customized recommendations paayein!`;
    } else {
      text = `### 📸 **Pakiza Virtual Room Preview & Spatial Analysis**

Visualize our handcrafted rugs directly in your space before commissioning:

1. **📷 In-Chat Photo Analysis:** Click the camera icon in this chat footer to upload a photo of your space for matching recommendations.
2. **🛋️ Homepage Virtual Preview:** Scroll to the interactive **Virtual Preview** module on the homepage to explore room mockups.
3. **🎨 Macro Texture Inspection:** Examine knot density and pile finish.

Upload your room photo now to get started!`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[1], FEATURED_RECOMMENDATIONS[5], FEATURED_RECOMMENDATIONS[0]];
    followUpChips = ['Attach Room Photo', 'Room Size Guide', 'Open AI Rug Designer'];
  }

  // ─── 6. AI RUG ATELIER & CUSTOM BESPOKE DESIGN ───
  else if (p.includes('ai designer') || p.includes('custom rug') || p.includes('bespoke') || p.includes('custom size') || p.includes('custom shape') || p.includes('custom color') || p.includes('apna design') || p.includes('customize') || p.includes('khud ka rug') || p.includes('banwana')) {
    if (isHindi) {
      text = `### ✂️ **Pakiza AI Rug Atelier — Apna Custom Rug Design Karein**

Hamara **AI Rug Designer** aapko apna mann-pasand rug design karne ki azaadi deta hai:

* **🔗 Launch Studio:** [AI Rug Designer Studio](/ai-designer) (ya [/custom-studio](/custom-studio))
* **📐 Any Size:** 2×3 ft runners se lekar 14×20 ft grand hall carpets tak.
* **🔷 Any Shape:** Rectangular, Round, Oval, Runner, ya Irregular Cloud shapes.
* **🧶 Premium Fibers:** 100% New Zealand Wool, Bamboo Silk, Mulberry Silk, Organic Jute.
* **🎨 Custom Prompt:** Likhein jaisa carpet aap chahte hain (e.g. *"Emerald green with gold floral medallion and ivory border"*), AI instant photorealistic preview banayega!
* **⏱️ Weaving Timeline:** Bhadohi ke master karigars **3 se 6 weeks** me haath se tayaar karte hain.

Abhi [AI Atelier Studio](/ai-designer) launch karein ya **WhatsApp (+91 7007626680)** par apne architect blueprints share karein!`;
    } else {
      text = `### ✂️ **Pakiza AI Rug Atelier — Bespoke Loom Crafting**

Commission a one-of-a-kind carpet through our revolutionary **AI Rug Designer Studio**:

* **🔗 Atelier Portal:** [Launch AI Rug Designer](/ai-designer) (or [/custom-studio](/custom-studio))
* **📐 Unlimited Dimensions:** From narrow 2×8 ft hallway runners to 14×20 ft grand estate carpets.
* **🔷 Custom Geometries:** Rectangular, Circular, Oval, S-Curve runners, or Free-Form Irregular contours.
* **🧶 Pure Materials:** 100% New Zealand Wool, Lustrous Bamboo Silk, Hand-Knotted Mulberry Silk, or Eco Jute.
* **🎨 AI Photorealistic Synthesis:** Type your aesthetic prompt and visualize your custom carpet in seconds.
* **⏱️ Artisan Execution:** Handcrafted on traditional Bhadohi looms in **3 to 6 weeks** with progress photos.

Visit the [AI Rug Designer](/ai-designer) now or consult our Master Weaver on WhatsApp (+91 7007626680)!`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[5], FEATURED_RECOMMENDATIONS[2], FEATURED_RECOMMENDATIONS[0]];
    followUpChips = ['Launch AI Designer Studio', 'Custom Sizing Inquiry', 'WhatsApp Master Weaver'];
  }

  // ─── 7. EMERGENCY STAIN REMOVAL & CLEANING ───
  else if (p.includes('stain') || p.includes('tea') || p.includes('coffee') || p.includes('chai') || p.includes('wine') || p.includes('daag') || p.includes('dhabba') || p.includes('gir gaya') || p.includes('spill') || p.includes('spot cleaning')) {
    if (isHindi) {
      text = `### 🚨 **Emergency Stain Removal Guide — Pakiza Rugs**

Agar carpet par chai, coffee, wine ya tel gir jaye, to yeh 4 steps follow karein:

1. **⚡ Turant Blot Karein (Ragdein Nahi!):** Ek saaf, sookha safed cotton kapda ya paper towel lekar press karein taaki liquid absorb ho jaye. **Kabhi bhi ragdein (rub) mat**, warna daag wool ke fibers me andar tak chala jayega!
2. **🥣 Lukewarm Water + Mild Wool Soap:** Gungune paani me thoda sa mild baby shampoo ya wool-safe detergent milayein. (Bleach ya harsh chemical kabhi na use karein!)
3. **🧽 Bahar se Andar Dab Karein:** Kapde ko halka geela karke daag ke outer edge se center ki taraf gently dab karein.
4. **💨 Sookhein:** Dry towel se press karke extra moisture nikalein aur fan ke niche sukhein. Tez dhoop me seedha na rakhein.

*Silk carpets ke liye paani kam se kam use karein ya professional dry clean karwayein.*`;
    } else {
      text = `### 🚨 **Emergency Stain Removal Advisory — Pakiza Rugs**

Follow this master weaver protocol immediately if tea, coffee, wine, or food spills on your rug:

1. **⚡ Blot Immediately (Never Rub!):** Press a clean, dry white cotton towel firmly over the spill to absorb liquid. **Rubbing or scrubbing damages wool fibers and locks the pigment in!**
2. **🥣 Lukewarm Water & Gentle Detergent:** Dilute a few drops of mild wool detergent or baby shampoo in lukewarm water. (Never use bleach, ammonia, or stain removers with harsh acids.)
3. **🧽 Dab Periphery to Center:** Moisten a clean cloth and dab gently from the outer perimeter of the spot inward to prevent the ring from spreading.
4. **💨 Air Dry Flat:** Press a dry towel to absorb remaining dampness and air dry with a room fan. Avoid harsh direct sun exposure.

*For pure Mulberry Silk rugs, professional dry cleaning is strictly recommended.*`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[0], FEATURED_RECOMMENDATIONS[1]];
    followUpChips = ['Regular Rug Care Guide', 'Pet Friendly Rugs', 'WhatsApp Care Help'];
  }

  // ─── 8. REGULAR CLEANING & MAINTENANCE ───
  else if (p.includes('clean') || p.includes('care') || p.includes('wash') || p.includes('vacuum') || p.includes('maintenance') || p.includes('safai') || p.includes('dhona') || p.includes('how to clean') || p.includes('shedding')) {
    if (isHindi) {
      text = `### 🧼 **Rug Care & Maintenance Guide — Pakiza Rugs**

Handcrafted carpet ki khubsurti aur umar badhane ke ahem niyam:

* **🧹 Vacuuming:** Hafte me 1–2 baar vacuum karein. Suction-only mode use karein (beater bar rotary brush band rakhein, khas taur par shaggy aur silk par).
* **🧶 Wool Shedding (Roan Nikalna):** Naye wool carpet me pehle 2–3 hafte halke loose fibers nikalte hain. Yeh 100% natural pure wool ki pehchan hai aur thode din me apne aap band ho jata hai.
* **🔄 6 Mahine me Rotate Karein:** Har 6 mahine me rug ko 180° ghuma dein taaki foot traffic aur sunlight barabar pade.
* **🌿 Jute Rug Care:** Jute ko paani me na bhigoyen. Dry shake ya halka vacuum karein.
* **🧼 Deep Wash:** 18 se 24 mahine me ek baar professional wool carpet dry wash karwayein.`;
    } else {
      text = `### 🧼 **Complete Rug Care & Longevity Guide — Pakiza Rugs**

Preserve the generational luster of your handcrafted carpet with these guidelines:

* **🧹 Vacuuming Frequency:** Vacuum 1–2 times per week using suction-only mode. Disengage rotary beater brushes to prevent pulling wool or silk loops.
* **🧶 Natural Wool Shedding:** New authentic wool carpets shed superficial fibers during the first 2–3 weeks. This is characteristic of premium hand-spun wool and naturally subsides.
* **🔄 Semi-Annual Rotation:** Rotate your rug 180° every 6 months to ensure uniform pile wear and sun exposure.
* **🌿 Organic Jute Care:** Never saturate jute in water. Dry brush or vacuum gently.
* **🧼 Professional Care:** Schedule a professional wool rug wash every 18–24 months.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[1], FEATURED_RECOMMENDATIONS[4]];
    followUpChips = ['Emergency Stain Guide', 'Rug Pad Underlay', 'Shop High Durability Rugs'];
  }

  // ─── 9. PET FRIENDLY RUGS ───
  else if (p.includes('pet') || p.includes('dog') || p.includes('cat') || p.includes('kutta') || p.includes('billi') || p.includes('pet friendly') || p.includes('animal') || p.includes('paws')) {
    if (isHindi) {
      text = `### 🐾 **Pet-Friendly Rugs Guide — Pakiza Rugs**

Agar aapke ghar me dogs ya cats hain, to sahi rug chunna zaroori hai:

* **🏆 Best Choice 1 — 100% Organic Jute:** [Jute Carpets](/collections/jute-carpets) pet owners ke liye sabse best hain! Claws se damage nahi hote, baal chipakte nahi, aur aasan se sweep ho jate hain.
* **🐑 Best Choice 2 — Low-Pile Hand-Tufted Wool:** [Hand-Tufted Wool](/collections/hand-tufted) me natural lanolin hota hai jo moisture aur pet odours ko repel karta hai.
* **⚠️ Kya Avoid Karein:** Deep-pile [Shaggy Carpets](/collections/shaggy-carpet) (baal phas jate hain) aur delicate Pure Mulberry Silk rugs avoid karein.
* **🛡️ Rug Pad:** Niche anti-slip rug pad zaroor lagayein taaki pet ke daudne par carpet fisle na!`;
    } else {
      text = `### 🐾 **Pet-Friendly Rug Recommendations — Pakiza Rugs**

For homes with beloved dogs and cats, durability and cleanability are paramount:

* **🏆 Top Recommendation 1 — Hand-Braided Jute:** [Jute Carpets](/collections/jute-carpets) are exceptionally claw-resistant, naturally textured, and shed pet hair effortlessly.
* **🐑 Top Recommendation 2 — Dense Low-Pile Wool:** [Hand-Tufted Wool](/collections/hand-tufted) contains natural lanolin oils that resist moisture, stains, and pet odors.
* **⚠️ Styles to Avoid:** Avoid deep-pile shaggy rugs (where fur and pet dander get trapped) and delicate pure silk.
* **🛡️ Underlay:** Pair with an anti-slip rug pad to keep the carpet stable during pet play.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[4], FEATURED_RECOMMENDATIONS[8], FEATURED_RECOMMENDATIONS[1]];
    followUpChips = ['Explore Jute Carpets', 'Low-Pile Wool Rugs', 'Rug Pad Advisory'];
  }

  // ─── 10. KIDS ROOM & NURSERY RUGS ───
  else if (p.includes('kid') || p.includes('kids') || p.includes('baby') || p.includes('child') || p.includes('children') || p.includes('nursery') || p.includes('bacha') || p.includes('bachon') || p.includes('play area')) {
    if (isHindi) {
      text = `### 👶 **Kids Room & Nursery Rugs — Pakiza Rugs**

Bachon ke kamre ke liye soft, safe aur non-toxic rugs:

* **☁️ Cloud Shaggy Rugs:** [Shaggy Carpets](/collections/shaggy-carpet) crawling aur playing ke liye ultra-cushioned aur soft hain (e.g. *Pink Beige Triangle Shaggy* ya *Heart Pattern Shaggy* starting ₹2,625).
* **🌿 100% AZO-Free Non-Toxic Dyes:** Hamare sabhi carpets me safe vegetable aur mineral dyes use hote hain jo skin-safe hain.
* **📐 Ideal Size:** 5×7 ft ya 6×9 ft bed ke samne ya play area me best fit hota hai.
* **🛡️ Hypoallergenic:** Natural wool aur microfiber dust ko trap karke air quality behtar rakhte hain.`;
    } else {
      text = `### 👶 **Kids Room & Nursery Rug Collection — Pakiza Rugs**

Crafted with supreme softness, non-toxic dyes, and protective cushioning for little ones:

* **☁️ Ultra-Plush Shaggy:** [Shaggy Carpets](/collections/shaggy-carpet) provide plush cushioning for crawling, reading, and floor play (featured designs like *Blush Pink Heart Shaggy* starting at ₹2,850).
* **🌿 Certified AZO-Free Dyes:** Dyed strictly with non-toxic, skin-safe mineral and vegetable colors.
* **📐 Recommended Dimensions:** 5×7 ft or 6×9 ft for nursery crib perimeters and play areas.
* **🛡️ Hypoallergenic Comfort:** Soft underfoot with thermal insulation against cold tile floors.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[6], FEATURED_RECOMMENDATIONS[9], FEATURED_RECOMMENDATIONS[7]];
    followUpChips = ['Shop Shaggy Carpets', 'Kids Room Size Guide', 'Custom Kids Rug Design'];
  }

  // ─── 11. MANDIR / POOJA ROOM / PRAYER RUGS ───
  else if (p.includes('mandir') || p.includes('pooja') || p.includes('puja') || p.includes('prayer') || p.includes('namaz') || p.includes('meditation') || p.includes('aasan') || p.includes('mandir ke liye')) {
    if (isHindi) {
      text = `### 🪔 **Mandir, Pooja Room & Prayer Aasan — Pakiza Rugs**

Pavitra sthan ke liye shuddh aur aasan rug vikalp:

* **🌺 Pure Wool Medallion Aasan:** Mandir aur prayer space ke liye shuddh New Zealand wool aur silk blend ka traditional medallion mat sabse shreshtha hai (e.g. *Isfahan Medallion* ya *Kashmiri Floral*).
* **📐 Sahi Size:** 2×3 ft (Small Aasan) ya 3×5 ft (Double Seating Aasan).
* **🌿 Shuddh Fibers:** 100% natural hand-knotted fibers — bina kisi synthetic plastic smell ke.
* **✨ Pavitra Colours:** Deep Burgundy, Royal Gold, Ivory Cream, aur Forest Green.`;
    } else {
      text = `### 🪔 **Mandir, Meditation & Prayer Asan Mats — Pakiza Rugs**

Sacred craftsmanship tailored for prayer alcoves, home mandirs, and meditation rooms:

* **🌺 Pure Hand-Knotted Medallion:** Traditional Kashmiri floral and Isfahan center medallions woven in pure New Zealand wool and natural silk blends.
* **📐 Sacred Dimensions:** 2×3 ft (individual meditation asan) or 3×5 ft (double seating layout).
* **🌿 100% Natural Fibers:** Zero synthetic petrochemical odors; pure hand-spun wool and bamboo silk.
* **✨ Revered Palettes:** Imperial Crimson, Temple Gold, Ivory Sand, and Deep Botanical Green.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[0], FEATURED_RECOMMENDATIONS[3]];
    followUpChips = ['Explore Traditional Persian', 'Small 2x3 ft Rugs', 'WhatsApp Custom Aasan'];
  }

  // ─── 12. KITCHEN / BALCONY / PATIO / OUTDOOR ───
  else if (p.includes('kitchen') || p.includes('balcony') || p.includes('patio') || p.includes('outdoor') || p.includes('verandah') || p.includes('rasoi') || p.includes('entryway') || p.includes('foyer')) {
    if (isHindi) {
      text = `### 🌿 **Kitchen, Balcony & Entryway Rugs — Pakiza Rugs**

High-traffic aur utility areas ke liye durable rugs:

* **🏆 100% Organic Braided Jute:** [Jute Carpets](/collections/jute-carpets) balcony, kitchen aur entryway ke liye sabse best hain! Natural golden weave dhool-mitti ko naturally conceal karta hai.
* **📐 Popular Sizes:** 2×3 ft, 3×5 ft, ya Round 4×4 ft circle rugs.
* **🚶 Hallway Runners:** 2.5×8 ft runners corridor aur entry gallery me royal look dete hain.
* **💧 Easy Maintenance:** Halka jhadu lagayein ya dry shake karein — paani me bhigone ki zaroorat nahi.`;
    } else {
      text = `### 🌿 **Kitchen, Balcony & Entryway Rug Collection — Pakiza Rugs**

Resilient natural fibers designed for indoor-outdoor transitions and high-traffic zones:

* **🏆 Hand-Braided Organic Jute:** [Jute Carpets](/collections/jute-carpets) are impervious to dirt, highly durable, and naturally earthy for balconies, kitchens, and foyers.
* **📐 Ideal Geometries:** 2×3 ft accents, 3×5 ft thresholds, or 4 ft round circular centerpieces.
* **🚶 Hallway Runners:** 2.5×8 ft runners for corridors and grand entry passages.
* **💧 Low Maintenance:** Shake out or sweep clean with zero washing hassle.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[4], FEATURED_RECOMMENDATIONS[8]];
    followUpChips = ['Shop Jute Carpets', 'View Hallway Runners', 'Entryway Sizing Tips'];
  }

  // ─── 13. LIVING ROOM SIZING & LAYOUT ───
  else if (p.includes('living room') || p.includes('sofa') || p.includes('hall') || p.includes('sitting room') || p.includes('drawing room') || p.includes('living area')) {
    if (isHindi) {
      text = `### 🛋️ **Living Room Rug Guide — Pakiza Rugs**

Living room aapke ghar ka center stage hai — yahan sahi layout ka tarika:

* **📐 Recommended Sizes:**
  * **8×10 ft (Standard):** 3-seater sofa + 2 accent chairs ke liye perfect.
  * **9×12 ft (Grand):** Bada sectional L-shape sofa aur center table poora rug par fit hota hai.
* **📏 Sofa Placement Rule:** Sofa ke **front legs** carpet par kam se kam 6–8 inches andar hone chahiye.
* **🎨 Style Match:**
  * Modern interior ke liye: [Hand-Tufted](/collections/hand-tufted) ya [Irregular Shaped](/collections/irregular-shaped).
  * Royal traditional ke liye: [Traditional Persian](/collections/traditional-persian).
* **✨ Floor Border:** Deewar aur rug ke beech **12–18 inches** ka floor space chodein.`;
    } else {
      text = `### 🛋️ **Living Room Rug Styling & Layout — Pakiza Rugs**

The focal anchor of your interior architecture:

* **📐 Optimal Dimensions:**
  * **8×10 ft (Standard Living Spaces):** Accommodates standard 3-seater sofas with armchair grouping.
  * **9×12 ft (Grand Open Concept):** Encompasses entire sectional layouts and center coffee tables.
* **📏 The Golden Rule:** Place at least the front legs of your seating 6–8 inches onto the carpet to anchor the conversation zone.
* **🎨 Aesthetic Pairings:**
  * Contemporary Minimalist: [Hand-Tufted](/collections/hand-tufted) or [Irregular Shaped](/collections/irregular-shaped).
  * Timeless Aristocracy: [Traditional Persian](/collections/traditional-persian).
* **✨ Perimeter Margin:** Maintain a 12–18 inch exposed hardwood/tile border around the perimeter.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[0], FEATURED_RECOMMENDATIONS[1], FEATURED_RECOMMENDATIONS[2]];
    followUpChips = ['Living Room Bestsellers', 'Size 8x10 vs 9x12', 'Design Custom Size Rug'];
  }

  // ─── 14. BEDROOM SIZING & LAYOUT ───
  else if (p.includes('bedroom') || p.includes('bed') || p.includes('master bedroom') || p.includes('guest room') || p.includes('palang')) {
    if (isHindi) {
      text = `### 🛏️ **Bedroom Rug Sizing & Layout — Pakiza Rugs**

Bed se subah uthte hi pair narm aur royal surface par pade:

* **📐 Recommended Sizes:**
  * **Queen Bed:** **8×10 ft** rug bed ke lower 2/3 hisse ke niche bichayein.
  * **King Bed:** **9×12 ft** rug taaki dono side 2 se 3 feet narm stepping space mile.
  * **Bedside Runners:** 2.5×6 ft ke 2 runners bed ke dono sides par laga sakte hain.
* **☁️ Best Texture:** [Shaggy Carpets](/collections/shaggy-carpet) ya high-density Bamboo Silk [Hand-Tufted](/collections/hand-tufted) jo ultra-cozy feel dete hain.
* **🎨 Colors:** Calming Ivory, Blush Pink, Sage Green, ya Neutral Beige.`;
    } else {
      text = `### 🛏️ **Bedroom Rug Sizing & Layout Guide — Pakiza Rugs**

Awaken each morning to tactile warmth and luxury underfoot:

* **📐 Size Specifications:**
  * **Queen Bed:** **8×10 ft** positioned beneath the lower two-thirds of the frame.
  * **King Bed:** **9×12 ft** extending 2.5 to 3 feet of plush stepping room on either flank.
  * **Flanking Runners:** Twin 2.5×6 ft runners placed symmetrically along bedside corridors.
* **☁️ Ideal Pile:** Deep-pile [Shaggy Carpets](/collections/shaggy-carpet) or velvety [Hand-Tufted Bamboo Silk](/collections/hand-tufted).
* **🎨 Palette Advice:** Soothing Creams, Muted Blush, Warm Sand, and Botanical Sage.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[6], FEATURED_RECOMMENDATIONS[3], FEATURED_RECOMMENDATIONS[2]];
    followUpChips = ['Bedroom Shaggy Rugs', 'King Bed Rug Sizing', 'Shop Silk & Wool'];
  }

  // ─── 15. DINING ROOM SIZING & LAYOUT ───
  else if (p.includes('dining') || p.includes('dining table') || p.includes('chairs') || p.includes('table ke niche')) {
    if (isHindi) {
      text = `### 🍽️ **Dining Room Rug Sizing — Pakiza Rugs**

Dining table ke niche rug lagate samay chair rule yaad rakhein:

* **📐 Recommended Sizes:**
  * **6-Seater Dining Table:** **8×10 ft** carpet.
  * **8-Seater / 10-Seater Table:** **9×12 ft** ya custom 10×14 ft carpet.
* **⚠️ Sabse Ahem Niyam:** Table ke har taraf se rug **24 se 30 inches bahar** hona chahiye, taaki jab koi kursi peeche khinche to kursi ke pichle pair bhi carpet par hi rahein!
* **🧼 Best Materials:** Flatweave Jute ya Low-Pile NZ Wool jo aasaani se saaf ho sake aur food spills resist kare.`;
    } else {
      text = `### 🍽️ **Dining Room Rug Proportions — Pakiza Rugs**

The cardinal rule of dining room rug architecture:

* **📐 Proportions:**
  * **6-Seater Table:** **8×10 ft** carpet.
  * **8-Seater to 10-Seater Table:** **9×12 ft** or custom bespoke 10×14 ft.
* **⚠️ The 24-Inch Chair Rule:** The rug must extend at least **24 to 30 inches** beyond all table edges so chairs remain securely on the carpet when guests pull them out.
* **🧼 Recommended Weave:** Low-pile New Zealand wool or flatweave [Jute Carpets](/collections/jute-carpets) for effortless crumb sweeping and stain resilience.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[1], FEATURED_RECOMMENDATIONS[4], FEATURED_RECOMMENDATIONS[0]];
    followUpChips = ['Shop Dining Rugs', 'Jute Carpets for Dining', 'Custom Dining Size'];
  }

  // ─── 16. HAND-KNOTTED vs HAND-TUFTED vs MACHINE-MADE ───
  else if (p.includes('hand knotted') || p.includes('hand tufted') || p.includes('farak') || p.includes('difference') || p.includes('kya antar') || p.includes('kya farak') || p.includes('machine made') || p.includes('knotting')) {
    if (isHindi) {
      text = `### 🧵 **Hand-Knotted vs Hand-Tufted — Pakiza Rugs**

Dono me kya farak hai aur aapke liye konsa sahi hai:

| Feature | 🪢 Hand-Knotted (Heirloom) | 🔫 Hand-Tufted (Modern Luxury) |
|---|---|---|
| **Banane Ka Tarika** | Har knot ko taani-baani par haath se baandha jata hai | Tufting gun se canvas par wool daala jata hai aur latex se seal karte hain |
| **Banne Me Time** | 3 se 12 mahine | 2 se 4 hafte |
| **Life / Umr** | **50 se 100+ saal** (Pidhiyon tak chalta hai) | **10 se 20 saal** |
| **Texture & Pile** | Barik, dense, authentic antique look | Plush, sculpted, modern high-low 3D relief |
| **Price Range** | ₹24,500 se ₹85,000+ | ₹10,999 se ₹22,450 |

*Pakiza Rugs me koi bhi rug machine-made nahi hota — har carpet 100% genuine karigari se banta hai!*`;
    } else {
      text = `### 🧵 **Hand-Knotted vs Hand-Tufted Comparison — Pakiza Rugs**

Understanding the two master Indian weaving traditions:

| Attribute | 🪢 Hand-Knotted (Heirloom) | 🔫 Hand-Tufted (Artisan Modern) |
|---|---|---|
| **Craft Technique** | Every single knot individually hand-tied onto warp & weft | Artisans shoot wool tufts into canvas backing, secured with natural latex |
| **Loom Duration** | 3 to 12 months per carpet | 2 to 4 weeks |
| **Lifespan** | **50 to 100+ years** (Generational heirloom) | **10 to 20 years** of vibrant luxury |
| **Aesthetic Depth** | Fine intricate arabesques, micro-knotting | Sculpted high-low relief, plush contours |
| **Pricing** | ₹24,500 to ₹85,000+ | ₹10,999 to ₹22,450 |

*Zero machine stamping. Every Pakiza creation is genuine handmade artistry in Bhadohi.*`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[0], FEATURED_RECOMMENDATIONS[2], FEATURED_RECOMMENDATIONS[1]];
    followUpChips = ['Shop Hand-Knotted Heirlooms', 'Shop Hand-Tufted Modern', 'Knot Density Guide'];
  }

  // ─── 17. MATERIALS & FIBER SPECIFICATIONS ───
  else if (p.includes('material') || p.includes('wool') || p.includes('silk') || p.includes('jute') || p.includes('viscose') || p.includes('bamboo') || p.includes('kapda') || p.includes('dhaga') || p.includes('fiber') || p.includes('fibre')) {
    if (isHindi) {
      text = `### 🧶 **Pure Materials & Loom Fibers — Pakiza Rugs**

Pakiza Rugs me sirf genuine, sustainably sourced fibers use hote hain:

* **🐑 New Zealand Wool:** Duniyabhar me sabse lambe aur majboot fibers. Isme natural lanolin hota hai jo stains aur dust ko repel karta hai.
* **🎋 Bamboo Silk:** Ek eco-friendly botanical silk jisme reshmi chamak (luster) hoti hai aur pairon ko behad narm lagti hai.
* **🦋 Pure Mulberry Silk:** 100% natural silk jo generation-to-generation heirloom pieces me use hoti hai.
* **🌿 Organic Golden Jute:** 100% natural, biodegradable fiber jo traditional charkha-spun technique se banta hai.
* **✨ Viscose Blend:** Soft, silk-like reflection jo budget me luxury appeal deta hai.
* **🎨 Eco-Friendly AZO-Free Dyes:** Chemical fumes-free, non-toxic organic colors.`;
    } else {
      text = `### 🧶 **Fiber Specifications & Loom Integrity — Pakiza Rugs**

We curate only ethical, master-grade natural fibers:

* **🐑 New Zealand Wool:** Renowned for extra-long staple fibers rich in natural lanolin wax, offering inherent stain resistance and springback resilience.
* **🎋 Bamboo Silk:** Sustainable cellulose silk providing high-sheen luster and featherweight softness underfoot.
* **🦋 Pure Mulberry Silk:** Unmatched hand-knotted density and heirloom durability for museum-grade collections.
* **🌿 Hand-Spun Golden Jute:** 100% biodegradable, sustainable, organic flatweave strength.
* **✨ Luxury Viscose:** High-chroma color absorption mimicking fine silk.
* **🎨 AZO-Free Mineral Dyes:** Non-toxic, hypoallergenic vegetable and mineral pigments.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[0], FEATURED_RECOMMENDATIONS[3], FEATURED_RECOMMENDATIONS[4]];
    followUpChips = ['Shop Wool & Silk', 'Shop Organic Jute', 'Custom Fiber Selection'];
  }

  // ─── 18. ALL 8 CATEGORIES & COLLECTIONS ───
  else if (p.includes('category') || p.includes('categories') || p.includes('collection') || p.includes('collections') || p.includes('types') || p.includes('catalog') || p.includes('catalogue') || p.includes('range') || p.includes('what do you sell') || p.includes('kya bechte')) {
    if (isHindi) {
      text = `### 🏪 **Pakiza Rugs — Sabhi 8 Categories**

Hamare 8 exclusive handcrafted collections:

1. 🧵 **[Hand Tufted](/collections/hand-tufted):** Plush modern sculpted wool & bamboo silk designs (from ₹10,999).
2. 🐻 **[Shaggy Carpet](/collections/shaggy-carpet):** Ultra-soft cloud fleece bedroom rugs (from ₹2,625, up to 50% OFF).
3. 🌿 **[Jute Carpets](/collections/jute-carpets):** 100% organic hand-braided eco rugs (from ₹3,199).
4. 🌊 **[Irregular Shaped](/collections/irregular-shaped):** Fluid, cloud aur wave organic shapes (up to 50% OFF).
5. 🏔️ **[Textured Rugs](/collections/textured-rugs):** 3D high-low architectural carved patterns.
6. 👑 **[Exclusive Carpets](/collections/exclusive-carpets):** Limited designer masterpieces.
7. 🕌 **[Traditional Persian](/collections/traditional-persian):** Timeless medallion heirlooms.
8. ✨ **[Silk & Wool](/collections/silk-wool):** Mulberry silk blend luxury carpets (up to 50% OFF).

[Sabhi Collections Ek Saath Dekhein](/collections)!`;
    } else {
      text = `### 🏪 **Pakiza Rugs & Co. — The 8 Core Collections**

Explore our complete handcrafted catalogue:

1. 🧵 **[Hand Tufted](/collections/hand-tufted):** Sculptural high-low wool & bamboo silk luxury (starting ₹10,999).
2. 🐻 **[Shaggy Carpet](/collections/shaggy-carpet):** Deep-pile microfiber comfort (starting ₹2,625, up to 50% OFF).
3. 🌿 **[Jute Carpets](/collections/jute-carpets):** 100% organic braided sustainability (starting ₹3,199).
4. 🌊 **[Irregular Shaped](/collections/irregular-shaped):** Free-form organic architectural contours (up to 50% OFF).
5. 🏔️ **[Textured Rugs](/collections/textured-rugs):** Dimensional carved tactile weaves.
6. 👑 **[Exclusive Carpets](/collections/exclusive-carpets):** Curated limited artisan editions.
7. 🕌 **[Traditional Persian](/collections/traditional-persian):** Heritage central medallions & floral arabesques.
8. ✨ **[Silk & Wool](/collections/silk-wool):** High-luster mulberry silk & NZ wool blends (up to 50% OFF).

Browse the complete gallery at [Shop Collections](/collections)!`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[0], FEATURED_RECOMMENDATIONS[2], FEATURED_RECOMMENDATIONS[4]];
    followUpChips = ['Explore All Collections', 'Shop 50% Off Sale', 'Bestsellers Only'];
  }

  // ─── 19. BESTSELLERS & TOP RATED ───
  else if (p.includes('bestseller') || p.includes('best seller') || p.includes('popular') || p.includes('trending') || p.includes('top rated') || p.includes('sabse accha') || p.includes('famous')) {
    if (isHindi) {
      text = `### 🏆 **Pakiza Top Bestsellers & Trending Carpets**

Hamare sabse zyada pasand kiye gaye carpets:

1. **Emerald Heritage Oushak Palmette (₹22,450):** Living room ka shaan — hand-spun high-loom wool botanical pattern.
2. **Modern Organic Contour Wave (₹12,999 - 50% OFF):** Sculptural bamboo silk contemporary art piece.
3. **Isfahan Imperial Garden Medallion (₹24,500):** 98% match heirloom Persian medallion piece.
4. **Round Indigo Coastal Jute (₹4,599 - 50% OFF):** Entryway aur dining ka favorite sustainable rug.
5. **Pink Beige Triangle Shaggy (₹2,625 - 50% OFF):** Bedroom aur kids room ka sabse affordable soft carpet.

Inhe [New Arrivals Section](#new) ya [Collections](/collections) me direct add to cart kar sakte hain!`;
    } else {
      text = `### 🏆 **Pakiza Most Celebrated Bestsellers**

Customer-acclaimed favorites across India:

1. **Emerald Heritage Oushak Palmette (₹22,450):** Masterpiece botanical palmette in hand-spun high-loom wool.
2. **Modern Organic Contour Wave (₹12,999 — 50% OFF):** High-low relief bamboo silk wave for contemporary living rooms.
3. **Isfahan Imperial Garden Medallion (₹24,500):** Heirloom Persian medallion weave with 98% client satisfaction.
4. **Round Indigo Coastal Jute (₹4,599 — 50% OFF):** Indigo hand-braided organic jute circle.
5. **Pink Beige Triangle Shaggy (₹2,625 — 50% OFF):** Ultra-soft budget plush shaggy for cozy bedroom perimeters.

Directly available in our [New Arrivals](#new) or [Shop Collections](/collections)!`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[1], FEATURED_RECOMMENDATIONS[2], FEATURED_RECOMMENDATIONS[0]];
    followUpChips = ['Order Emerald Oushak', 'View Modern Wave Rug', 'Shop All Bestsellers'];
  }

  // ─── 20. BUDGET & AFFORDABLE RUGS (UNDER 3000 / UNDER 5000) ───
  else if (p.includes('cheap') || p.includes('budget') || p.includes('affordable') || p.includes('sasta') || p.includes('kam daam') || p.includes('under 5000') || p.includes('under 3000') || p.includes('under 10000') || p.includes('low price')) {
    if (isHindi) {
      text = `### 💰 **Affordable & Budget Rugs — Under ₹3,000 & ₹5,000**

Loom-direct pricing ki wajah se aapko luxury carpets kam daam me milte hain:

* **Under ₹3,000:**
  * **Pink Beige Triangle Shaggy:** Sirf **₹2,625** (MRP ₹5,250 — 50% OFF)
  * **Aqua & Beige Block Shaggy:** Sirf **₹2,850** (MRP ₹5,700 — 50% OFF)
  * **Blush Pink Heart Shaggy:** Sirf **₹2,850** (MRP ₹5,700 — 50% OFF)
  * **Ivory Wave Textured Relief:** Sirf **₹2,850** (MRP ₹5,700 — 50% OFF)
* **Under ₹5,000:**
  * **Round Natural Braided Jute:** Sirf **₹3,199** (MRP ₹6,400 — 50% OFF)
  * **Round Indigo Coastal Jute:** Sirf **₹4,599** (MRP ₹9,199 — 50% OFF)
  * **Braided Natural Jute Runner:** Sirf **₹4,799** (MRP ₹9,600 — 50% OFF)

Plus, prepaid order par **extra 10% OFF** milta hai coupon code PREPAID10 se!`;
    } else {
      text = `### 💰 **Curated Budget Collection — Under ₹3,000 & ₹5,000**

Direct-from-loom pricing eliminates all retail showroom markups:

* **Rugs Under ₹3,000:**
  * **Pink Beige Triangle Shaggy:** Just **₹2,625** (Was ₹5,250 — 50% OFF)
  * **Aqua & Beige Block Shaggy:** Just **₹2,850** (Was ₹5,700 — 50% OFF)
  * **Blush Pink Heart Shaggy:** Just **₹2,850** (Was ₹5,700 — 50% OFF)
  * **Ivory Wave Textured Relief:** Just **₹2,850** (Was ₹5,700 — 50% OFF)
* **Rugs Under ₹5,000:**
  * **Round Natural Braided Jute:** Just **₹3,199** (Was ₹6,400 — 50% OFF)
  * **Round Indigo Coastal Jute:** Just **₹4,599** (Was ₹9,199 — 50% OFF)
  * **Braided Natural Jute Weave:** Just **₹4,799** (Was ₹9,600 — 50% OFF)

Apply code PREPAID10 at [Checkout](/checkout) for an additional 10% discount!`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[6], FEATURED_RECOMMENDATIONS[7], FEATURED_RECOMMENDATIONS[8]];
    followUpChips = ['Shop Under ₹3,000', 'Shop Jute Under ₹5,000', 'Go to Checkout'];
  }

  // ─── 21. LUXURY & HEIRLOOM CARPETS (ABOVE 20000) ───
  else if (p.includes('luxury') || p.includes('heirloom') || p.includes('royal') || p.includes('expensive') || p.includes('kashmiri') || p.includes('persian') || p.includes('silk rug') || p.includes('high end') || p.includes('collector')) {
    if (isHindi) {
      text = `### 👑 **Heirloom & Royal Luxury Collection — Pakiza Rugs**

Collector-grade handcrafted masterworks for grand residences:

* **Isfahan Imperial Garden Medallion (₹24,500):** Hand-knotted New Zealand wool aur mulberry silk blend with 220+ KPSI.
* **Emerald Heritage Oushak Palmette (₹22,450):** Hand-spun high-loom wool with timeless botanical grandeur.
* **Royal Blossom Botanical Silk (₹12,999):** Pure mulberry silk blend floral tapestry.
* **Custom Bespoke Loom Commissions (₹35,000 to ₹85,000+):** Hamare [AI Atelier](/ai-designer) me grand 10×14 ft ya 12×18 ft carpets order karein.
* Har heirloom piece ke saath **Signed Certificate of Authenticity** aur master weaver provenance aati hai.`;
    } else {
      text = `### 👑 **Heirloom & Royal Collector Editions — Pakiza Rugs**

Museum-caliber craftsmanship engineered for grand estates:

* **Isfahan Imperial Garden Medallion (₹24,500):** Hand-knotted NZ Wool & Pure Silk with 220+ KPSI knot density.
* **Emerald Heritage Oushak Palmette (₹22,450):** Hand-spun antique washed high-loom wool.
* **Royal Blossom Botanical Silk (₹12,999):** Lustrous mulberry silk with botanical court motifs.
* **Bespoke Loom Commissions (₹35,000 to ₹85,000+):** Commission grand 10×14 ft or 12×18 ft formats in the [AI Atelier](/ai-designer).
* Ships with a **Certificate of Authenticity & Provenance** signed by our master artisan.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[0], FEATURED_RECOMMENDATIONS[1], FEATURED_RECOMMENDATIONS[3]];
    followUpChips = ['View Isfahan Medallion', 'Design Bespoke Heirloom', 'WhatsApp Master Weaver'];
  }

  // ─── 22. SHIPPING, DELIVERY & TRACKING ───
  else if (p.includes('ship') || p.includes('deliver') || p.includes('dispatch') || p.includes('tracking') || p.includes('track') || p.includes('kitne din') || p.includes('kab milega') || p.includes('courier') || p.includes('pincode') || p.includes('bhej')) {
    if (isHindi) {
      text = `### 🚚 **Shipping & Delivery Policy — Pakiza Rugs**

Pakiza Rugs ki delivery details:

* **🆓 Free Insured Delivery:** Pure Bharat me **Free Doorstep Delivery** — koi hidden charges nahi!
* **⏱️ Delivery Time:** Standard in-stock rugs **5 se 10 business days** me deliver hote hain. Custom bespoke rugs me **3 se 6 weeks** lagte hain.
* **📦 Crease-Free Packaging:** Carpet ko roll karke (fold nahi) multi-layer waterproof protective wrap me pack kiya jata hai.
* **📍 Order Tracking:** Order status dekhne ke liye [My Account](/account) par jaayein ya **WhatsApp (+91 7007626680)** par apna Order ID bhejein.
* **🌍 International Shipping:** USA, UK, UAE, Europe, Canada me worldwide delivery available hai. WhatsApp par freight quote lein.`;
    } else {
      text = `### 🚚 **Shipping & Delivery Protocol — Pakiza Rugs & Co.**

Reliable, fully insured transport directly from our Bhadohi looms:

* **🆓 Free Insured Shipping:** Zero freight charges across all serviceable Indian pin codes.
* **⏱️ Delivery Timelines:** Ready catalog orders arrive in **5 to 10 business days**. Custom bespoke pieces require **3 to 6 weeks** of hand-weaving.
* **📦 Protective Packaging:** Carefully rolled (never creased or folded) within multi-layer moisture-resistant protective tubing.
* **📍 Real-Time Tracking:** Track your shipment in [My Account](/account) or message our dispatch team on WhatsApp: **+91 7007626680**.
* **🌍 International Delivery:** Worldwide door-to-door transit to USA, UK, UAE, Europe, and Australia. Inquire via WhatsApp.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[0], FEATURED_RECOMMENDATIONS[1]];
    followUpChips = ['Track in My Account', 'WhatsApp Tracking Support', 'Browse Collections'];
  }

  // ─── 23. RETURNS, REFUNDS & REPLACEMENT ───
  else if (p.includes('return') || p.includes('refund') || p.includes('exchange') || p.includes('replace') || p.includes('wapas') || p.includes('vapas') || p.includes('paisa wapas') || p.includes('cancel') || p.includes('cancellation')) {
    if (isHindi) {
      text = `### 🔄 **7-Day Return & Exchange Policy — Pakiza Rugs**

Aapka vishwas hamari pehli priority hai:

* **📅 7-Din Easy Return:** Delivery ke **7 din ke andar** aasaani se return ya exchange kar sakte hain.
* **📋 Conditions:** Carpet unused hona chahiye, sirf inspection ke liye unroll kiya ho, aur original packaging me ho.
* **💰 100% Full Refund:** Agar product pasand na aaye to bina kisi jhanjhat ke poora refund milega.
* **🚚 Free Reverse Pickup:** Return pickup hamari courier team aapke ghar se karegi.
* **🔄 Free Exchange:** Koi aur size ya design chahiye? Free exchange available hai.
* **📞 Kaise Karein:** WhatsApp par **+91 7007626680** par Order ID ke saath message karein.`;
    } else {
      text = `### 🔄 **7-Day Return & Replacement Policy — Pakiza Rugs**

Shop with absolute confidence:

* **📅 7-Day Window:** Initiate a return or exchange within **7 days** of delivery.
* **📋 Condition:** Carpet must be in unsoiled, unused condition (opened strictly for inspection) in original protective wrap.
* **💰 Complete Refund:** Full monetary refund credited to your source payment method within 3–5 business days of return receipt.
* **🚚 Free Doorstep Pickup:** Complimentary reverse pickup arranged directly from your residence.
* **🔄 Free Exchange:** Size or palette exchange at zero surcharge.
* **📞 How to Initiate:** Message our support desk on WhatsApp at **+91 7007626680**.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[1], FEATURED_RECOMMENDATIONS[3]];
    followUpChips = ['WhatsApp Return Desk', 'View Return Policy', 'Continue Shopping'];
  }

  // ─── 24. PAYMENT OPTIONS & CASH ON DELIVERY (COD) ───
  else if (p.includes('payment') || p.includes('pay') || p.includes('cod') || p.includes('cash on delivery') || p.includes('upi') || p.includes('gpay') || p.includes('phonepe') || p.includes('card') || p.includes('prepaid') || p.includes('emi')) {
    if (isHindi) {
      text = `### 💳 **Payment Methods & Cash on Delivery — Pakiza Rugs**

Hum sabhi major payment methods support karte hain:

* **💵 Cash on Delivery (COD):** Pure India me available! Pehle rug ghar aane dein, inspect karein, phir cash pay karein.
* **📱 Instant UPI:** Google Pay, PhonePe, Paytm, BHIM UPI se instant payment.
* **💳 Cards:** Visa, Mastercard, RuPay Credit & Debit cards accepted.
* **🏦 Net Banking:** Sabhi major Indian banks supported.
* **🎁 10% Extra Prepaid Discount:** Prepaid orders par **extra 10% OFF** milta hai code PREPAID10 use karne par!

Order dene ke liye [Checkout Page](/checkout) par jaayein ya WhatsApp par direct book karein!`;
    } else {
      text = `### 💳 **Payment Options & Cash on Delivery (COD)**

Flexible, secure payment mechanisms:

* **💵 Cash on Delivery (COD):** Available across India with zero advance payment. Inspect your carpet first, pay at doorstep.
* **📱 Instant UPI:** Seamless payments through Google Pay, PhonePe, Paytm, and BHIM.
* **💳 Credit & Debit Cards:** Visa, MasterCard, RuPay, and American Express.
* **🏦 Net Banking:** All premier banking institutions.
* **🎁 Extra 10% Prepaid Privilege:** Enjoy **10% OFF** on all prepaid orders using coupon PREPAID10 at checkout!

Proceed directly via [Checkout](/checkout) or message WhatsApp (+91 7007626680)!`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[4], FEATURED_RECOMMENDATIONS[6]];
    followUpChips = ['Go to Checkout', 'Apply PREPAID10', 'Order on WhatsApp'];
  }

  // ─── 25. WHOLESALE, B2B & INTERIOR DESIGNERS ───
  else if (p.includes('wholesale') || p.includes('bulk') || p.includes('b2b') || p.includes('interior designer') || p.includes('architect') || p.includes('hotel') || p.includes('project') || p.includes('trade discount') || p.includes('bulk order')) {
    if (isHindi) {
      text = `### 🏢 **B2B, Wholesale & Interior Designer Trade Program**

Interior designers, architects aur bulk buyers ke liye special trade privileges:

* **🏷️ Exclusive Trade Discounts:** Volume-based tiered pricing with up to 35% trade discount on bulk orders.
* **📦 Free Swatch Sample Box:** Wool, bamboo silk, aur jute yarn swatches aapke office/studio deliver kiye jaate hain.
* **✂️ Bespoke Hospitality Projects:** Hotels, luxury villas, banquets ke liye custom blueprints par rug manufacturing.
* **📋 GST Invoice:** Full B2B input tax credit ke saath valid GST invoice.
* **📞 Dedicated Loom Relationship Manager:** Direct WhatsApp line: **+91 7007626680** par apni requirement share karein.`;
    } else {
      text = `### 🏢 **Trade Program for Interior Designers & Architects**

Bespoke trade solutions for residential projects, hospitality, and corporate spaces:

* **🏷️ Exclusive Trade Margins:** Tiered volume pricing up to 35% discount for verified designers and architects.
* **📦 Complimentary Material Swatches:** Curated sample kits of New Zealand wool, bamboo silk, and jute fibers dispatched to your firm.
* **✂️ Custom Commercial Production:** Bespoke sizes up to 14×20 ft for hotels, boutique resorts, and estates.
* **📋 Valid GST Invoicing:** Complete B2B tax compliance and input credit documentation.
* **📞 Dedicated Trade Desk:** Message our loom director directly on WhatsApp: **+91 7007626680**.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[0], FEATURED_RECOMMENDATIONS[1], FEATURED_RECOMMENDATIONS[5]];
    followUpChips = ['WhatsApp Trade Desk', 'Request Swatch Box', 'Launch Custom Studio'];
  }

  // ─── 26. INTERNATIONAL SHIPPING & EXPORT ───
  else if (p.includes('international') || p.includes('usa') || p.includes('uk') || p.includes('dubai') || p.includes('uae') || p.includes('foreign') || p.includes('export') || p.includes('outside india') || p.includes('abroad')) {
    if (isHindi) {
      text = `### 🌍 **International Worldwide Shipping — Pakiza Rugs**

Hum Bhadohi se pure vishwa me carpets export karte hain:

* **✈️ Countries Served:** USA, UK, UAE (Dubai), Canada, Germany, France, Australia, Singapore aur 40+ countries.
* **⏱️ Delivery Time:** International air courier se **7 se 14 business days**.
* **📦 Customs & Export Documents:** Sabhi export documentation, Phytosanitary certificates aur Authenticity documentation hum handle karte hain.
* **💳 Global Payments:** International credit cards aur wire transfer accepted.
* **📞 International Quote:** WhatsApp par **+91 7007626680** par apna address aur carpet name bhejein freight quote ke liye.`;
    } else {
      text = `### 🌍 **International Worldwide Export — Pakiza Rugs & Co.**

We ship genuine Bhadohi handcrafted carpets across the globe:

* **✈️ Destinations:** USA, UK, UAE, Canada, Australia, European Union, and 40+ nations worldwide.
* **⏱️ Transit Time:** 7 to 14 business days via express international air cargo.
* **📦 Export Documentation:** We handle all customs compliance, export permits, and authentic provenance certificates.
* **💳 Global Currency:** Secure international transactions via credit cards and global bank transfers.
* **📞 Instant Freight Quote:** Share your international delivery address on WhatsApp: **+91 7007626680**.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[0], FEATURED_RECOMMENDATIONS[1]];
    followUpChips = ['WhatsApp Export Quote', 'Browse Masterpieces', 'Certificate of Provenance'];
  }

  // ─── 27. ABOUT PAKIZA RUGS, FOUNDER SAIF ALI & BHADOHI ───
  else if (p.includes('about') || p.includes('founder') || p.includes('saif ali') || p.includes('history') || p.includes('heritage') || p.includes('bhadohi') || p.includes('since 1987') || p.includes('owner') || p.includes('ceo') || p.includes('story') || p.includes('malik') || p.includes('kaun hai')) {
    if (isHindi) {
      text = `### 🏛️ **Pakiza Rugs & Co. — Hamara Itihas & Founder Story**

* **📅 Sthaapna (Est. 1987):** Bhadohi (Uttar Pradesh) me sthaapit — jo Bharat ki Carpet Capital ke roop me vishva-prasiddh hai.
* **👤 Founder & CEO:** **Saif Ali** — Bhadohi ke ek yuva durdarshi udyami jinhone apni family ki generational carpet parampara ko modern luxury direct-from-loom brand me badla.
* **🧵 500+ Karigar:** Hamare saikdon skilled master karigars traditional lakdi ke looms par kaam karte hain.
* **🌍 Direct From Loom Mission:** Showrooms ke 300% markups aur middlemen ko khatam karke genuine handcrafted rugs seedha aapke living room tak pahunchana.
* **📸 Instagram:** **@pakiza_rugs_co** par loom ka live behind-the-scenes video dekhein!`;
    } else {
      text = `### 🏛️ **The Heritage of Pakiza Rugs & Co. — Founder Saif Ali**

* **📅 Founded 1987:** Established in Bhadohi, Uttar Pradesh — the world-celebrated GI-tagged carpet capital.
* **👤 Founder & CEO:** **Saif Ali** — an entrepreneurial visionary from Bhadohi who transformed his family's generational hand-weaving heritage into a direct-to-consumer luxury house.
* **🧵 500+ Master Weavers:** Hundreds of artisan families working on vertical wooden looms, preserving centuries of Indian textile mastery.
* **🌍 Direct-From-Loom Promise:** Eradicating middlemen markups to deliver authentic heirloom rugs straight from the loom to contemporary living spaces.
* **📸 Instagram:** Follow **@pakiza_rugs_co** for behind-the-scenes loom craftsmanship and home setups.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[0], FEATURED_RECOMMENDATIONS[1], FEATURED_RECOMMENDATIONS[3]];
    followUpChips = ['View Founder Story', 'Instagram @pakiza_rugs_co', 'Explore Collections'];
  }

  // ─── 28. CONTACT, WHATSAPP & PHONE ───
  else if (p.includes('contact') || p.includes('phone') || p.includes('call') || p.includes('whatsapp') || p.includes('email') || p.includes('number') || p.includes('helpline') || p.includes('support') || p.includes('baat karni') || p.includes('sampark')) {
    if (isHindi) {
      text = `### 📞 **Hum Se Sampark Karein — Pakiza Rugs**

Hamari artisan customer support team har waqt aapki seva me hai:

* **📱 WhatsApp Master Weaver (Sabse Fast):** **+91 7007626680** (Minutes me instant reply)
* **📞 Helpline Number:** **+91 9129788793**
* **📸 Official Instagram:** **@pakiza_rugs_co**
* **📍 Head Atelier & Looms:** Bhadohi, Uttar Pradesh — 221401, India.
* **⏰ Working Hours:** Monday se Saturday, 10:00 AM se 8:00 PM IST.

Aap seedha WhatsApp par message karke kisi bhi rug ki inquiry ya custom order discuss kar sakte hain!`;
    } else {
      text = `### 📞 **Connect With Pakiza Rugs & Co.**

We are always delighted to assist your interior styling and rug acquisitions:

* **📱 WhatsApp Master Loom Direct (Fastest):** **+91 7007626680** (Instant concierge replies)
* **📞 Customer Helpline:** **+91 9129788793**
* **📸 Instagram:** **@pakiza_rugs_co**
* **📍 Loom Atelier:** Bhadohi, Uttar Pradesh — 221401, India.
* **⏰ Atelier Hours:** Monday through Saturday, 10:00 AM – 8:00 PM IST.

Click below to begin an artisan consultation on WhatsApp!`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[0], FEATURED_RECOMMENDATIONS[1]];
    followUpChips = ['Chat on WhatsApp Now', 'Call Helpline', 'Browse Collections'];
  }

  // ─── 29. SHOP BY COLOR (8 CURATED PALETTES) ───
  else if (p.includes('color') || p.includes('colour') || p.includes('green') || p.includes('purple') || p.includes('beige') || p.includes('orange') || p.includes('pink') || p.includes('red') || p.includes('grey') || p.includes('blue') || p.includes('rang')) {
    if (isHindi) {
      text = `### 🎨 **Shop By Color — Pakiza Rugs 8 Color Palettes**

Homepage par hamare **Shop by Color** section me 8 curated shades hain:

* **🟢 Green / Emerald:** [Emerald Oushak](/products/new-0) — botanical, rich wood floors ke liye perfect.
* **🟣 Purple / Lavender:** Royal accent rug for creative spaces.
* **🌾 Beige / Sand:** [Beige Cloud](/products/new-1) aur [Jute Rugs](/collections/jute-carpets) — warm neutral decor.
* **🟠 Orange / Terracotta:** Earthy warm Mediterranean tones.
* **🌸 Pink / Blush:** [Pink Shaggy](/products/new-4) aur [Blossom Silk](/products/lux-3) — soft bedroom aesthetic.
* **🔴 Red / Burgundy:** [Isfahan Medallion](/products/new-0) — traditional royal grandeur.
* **⚫ Grey / Monochrome:** [Modern Contour Wave](/products/lux-2) — modern minimalist.
* **🔵 Sky Blue / Indigo:** [Round Indigo Jute](/products/new-3) — coastal calming aesthetic.

Aap homepage par kisi bhi color circle par click karke direct filter kar sakte hain!`;
    } else {
      text = `### 🎨 **Shop By Color — 8 Architectural Palettes**

Explore our color-curated palettes on the homepage:

* **🟢 Green / Emerald:** [Emerald Oushak Palmette](/products/new-0) — rich botanical forest hues.
* **🟣 Purple / Royal Lilac:** Aristocratic statement rugs for bold interiors.
* **🌾 Beige / Warm Sand:** [Beige Architectural Cloud](/products/new-1) & [Jute Weaves](/collections/jute-carpets).
* **🟠 Terracotta / Sienna:** Warm earthy Southwestern & Mediterranean vibes.
* **🌸 Blush / Rose:** [Pink Triangle Shaggy](/products/new-4) & [Blossom Motif](/products/lux-3).
* **🔴 Crimson / Burgundy:** [Isfahan Imperial Medallion](/products/new-0) — traditional royalty.
* **⚫ Charcoal & Grey:** [Modern Organic Wave](/products/lux-2) — contemporary monochrome.
* **🔵 Sky Blue & Indigo:** [Round Indigo Coastal Jute](/products/new-3) — calming coastal accents.

Click any color badge on the homepage to filter all live designs!`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[1], FEATURED_RECOMMENDATIONS[0], FEATURED_RECOMMENDATIONS[4]];
    followUpChips = ['Shop Green Rugs', 'Shop Beige & Neutral', 'Shop Blue & Indigo'];
  }

  // ─── 30. RUG PAD & ANTI-SLIP UNDERLAY ───
  else if (p.includes('rug pad') || p.includes('anti slip') || p.includes('underlay') || p.includes('slip') || p.includes('fisle') || p.includes('phisle') || p.includes('grip')) {
    if (isHindi) {
      text = `### 🛡️ **Rug Pad & Anti-Slip Advisory — Pakiza Rugs**

Kyun rug pad lagana behad zaroori hai:

* **1. Suraksha (Anti-Slip):** Hardwood, marble, ya vitrified tile par carpet ko fisalne se rokta hai — bachon aur buzurgo ke liye safe.
* **2. Rug Ki Umar Badhata Hai:** Carpet aur hard floor ke beech friction ko kam karta hai, jisse knots aur backing damage nahi hoti.
* **3. Extra Cushioning & Softness:** Chalne me 30% zyada plush aur comfortable lagta hai.
* **4. Air Circulation:** Niche se hawa circulate hone deta hai taaki moisture jam na ho.`;
    } else {
      text = `### 🛡️ **Rug Pad & Anti-Slip Underlay Advisory — Pakiza Rugs**

Why an anti-slip underlay is an essential companion for every fine rug:

* **1. Non-Slip Stability:** Prevents sudden bunching and slipping on polished marble, vitrified tiles, and hardwood.
* **2. Multiplies Rug Longevity:** Absorbs shock from heavy foot traffic, protecting the backing and artisan knot integrity.
* **3. Enhanced Cushioning:** Adds a plush 30% sensory bounce underfoot.
* **4. Airflow & Breathability:** Prevents trapped condensation underneath the carpet.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[4], FEATURED_RECOMMENDATIONS[2]];
    followUpChips = ['Add Rug Pad Advice', 'Shop Dense Wool Rugs', 'Room Placement Tips'];
  }

  // ─── 31. SEARCH & WEBSITE NAVIGATION ───
  else if (p.includes('search') || p.includes('dhoondhna') || p.includes('kaise khoje') || p.includes('find product') || p.includes('menu') || p.includes('navigation') || p.includes('kahan milega')) {
    if (isHindi) {
      text = `### 🔍 **Website Par Rug Kaise Khojein — Navigation Guide**

Pakiza Rugs website par man-pasand carpet khojne ke aasan tarike:

1. **🔎 Top Search Bar:** Header me search icon par click karein aur koi bhi naam, rang ya material type karein (e.g. *"Jute"*, *"Green"*, *"Shaggy"*).
2. **🏪 Shop by Categories:** [Shop Collections](/collections) par jaakar categories choose karein.
3. **🎨 Shop by Color:** Homepage par **Shop by Color** row se apne interior match ka rang chunein.
4. **🛋️ Shop by Room:** Bedroom, Living Room, Dining Room ya Kids Room ke cards par click karein.
5. **📱 Mobile Menu:** Mobile me top left hamburger menu kholkar sabhi sections direct access karein.`;
    } else {
      text = `### 🔍 **Website Navigation & Product Search Guide**

Effortlessly discover your ideal carpet across our digital showroom:

1. **🔎 Search Bar:** Tap the magnifying glass in the header to search by keywords like *"Wool"*, *"Persian"*, *"Irregular"*, or *"Red"*.
2. **🏪 Shop Collections:** Visit [Shop Collections](/collections) for category filters.
3. **🎨 Shop by Color:** Tap the color swatches on the homepage to filter by palette.
4. **🛋️ Shop by Room:** Select Bedroom, Living Room, Dining Room, or Kids Room on the homepage.
5. **📱 Mobile Side Drawer:** Tap the mobile hamburger menu for direct navigation.`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[1], FEATURED_RECOMMENDATIONS[0]];
    followUpChips = ['Browse All Collections', 'Explore New Arrivals', 'Launch AI Designer'];
  }

  // ─── 32. GREETINGS & CASUAL HELLO ───
  else if (p.includes('hi') || p.includes('hello') || p.includes('hey') || p.includes('namaste') || p.includes('salaam') || p.includes('good morning') || p.includes('good evening') || p.includes('kaise ho') || p.includes('how are you')) {
    if (isHindi) {
      text = `Namaste! 🙏 Welcome to **Pakiza Rugs Co.**

Main aapki kya madad kar sakta hoon? Aap mujhse website ya rugs se jude ye sawaal pooch sakte hain:
* 🛍️ **[Collections](/collections)** — Hand-Tufted, Shaggy, Jute, Persian, Silk & Wool
* 📐 **Room Size Guide** — Living room, bedroom, dining table ke dimensions
* 🚚 **Delivery & COD** — Free Pan-India shipping aur Cash on Delivery
* ✂️ **[Custom Rug](/ai-designer)** — Apna manpasand carpet design karwana`;
    } else {
      text = `Hello and welcome to **Pakiza Rugs Co.** 👋

How can I assist you today? You can ask me anything about:
* 🛍️ Our [Rug Collections](/collections)
* 📐 Sizing and room styling recommendations
* 🚚 Free Pan-India shipping & Cash on Delivery (COD)
* ✂️ Custom bespoke rugs in our [AI Studio](/ai-designer)`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[1], FEATURED_RECOMMENDATIONS[0], FEATURED_RECOMMENDATIONS[2]];
    followUpChips = ['What Collections Do You Have?', 'Find Rug for My Living Room', 'How to Order with COD'];
  }

  // ─── 33. FALLBACK: SIMPLE WEBSITE-FOCUSED ANSWER ───
  else {
    if (isHindi) {
      text = `Main sirf **Pakiza Rugs Co.** aur hamari website se jude sawaalo me aapki madad kar sakta hoon.

Aap mujhse pooch sakte hain:
* 🛍️ [Collections](/collections) aur pricing
* 📐 Apne kamre ke liye rug size
* 🚚 Delivery, COD, aur [Orders](/account)
* ✂️ [Custom Rug Design](/ai-designer)
* 📞 WhatsApp helpline: +91 7007626680

Kripya apna sawaal rugs ya website se related poochein!`;
    } else {
      text = `I can only assist with questions related to **Pakiza Rugs Co.** and our website.

You can ask me about:
* 🛍️ [Rug Collections](/collections) & pricing
* 📐 Room sizing & placement guidelines
* 🚚 Shipping, Cash on Delivery (COD) & [Order Tracking](/account)
* ✂️ [Custom Bespoke Rugs](/ai-designer)
* 📞 WhatsApp Artisan Desk: +91 7007626680

Please ask any question regarding our handcrafted rugs or website!`;
    }
    matchedRugs = [FEATURED_RECOMMENDATIONS[1], FEATURED_RECOMMENDATIONS[0], FEATURED_RECOMMENDATIONS[4]];
    followUpChips = ['What Collections Do You Offer?', 'Shipping & Return Policy', 'AI Custom Rug Studio'];
  }

  return { text, recommendations: matchedRugs, followUpChips };
}

// Master Conversational Gemini Chat Function
export async function chatWithGeminiAssistant({ messages = [], userImage = null }) {
  const apiKey = getGeminiApiKey();
  const latestMessage = messages[messages.length - 1];
  const promptText = latestMessage?.text || 'Hello';

  // If Gemini API Key is available, call the real Gemini 1.5 Flash API
  if (apiKey) {
    try {
      const contents = messages.map((m) => {
        const parts = [];
        if (m.image) {
          const base64Data = m.image.includes('base64,') ? m.image.split('base64,')[1] : m.image;
          const mimeType = m.image.includes('data:image/png') ? 'image/png' : 'image/jpeg';
          parts.push({
            inline_data: {
              mime_type: mimeType,
              data: base64Data
            }
          });
        }
        parts.push({ text: m.text || '' });
        return {
          role: m.role === 'user' ? 'user' : 'model',
          parts
        };
      });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: SYSTEM_PROMPT }]
            },
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1200
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (responseText) {
          const p = (promptText + ' ' + responseText).toLowerCase();
          const matched = FEATURED_RECOMMENDATIONS.filter(rec =>
            rec.tags.some(tag => p.includes(tag)) ||
            p.includes(rec.style.toLowerCase()) ||
            p.includes(rec.name.toLowerCase().split(' ')[0])
          );

          // Generate dynamic follow-up chips based on context
          let chips = ['Explore Collections', 'Design Custom Rug', 'WhatsApp Concierge'];
          if (p.includes('clean') || p.includes('stain') || p.includes('wash')) {
            chips = ['Emergency Stain Guide', 'Pet Friendly Rugs', 'Rug Pad Advisory'];
          } else if (p.includes('size') || p.includes('room') || p.includes('living') || p.includes('bed')) {
            chips = ['Living Room Sizing', 'Bedroom Sizing', 'Dining Room 24" Rule'];
          } else if (p.includes('order') || p.includes('buy') || p.includes('pay') || p.includes('cod')) {
            chips = ['Go to Checkout', 'Apply Coupon PREPAID10', 'Order via WhatsApp'];
          }

          return {
            text: responseText,
            recommendations: matched.length > 0 ? matched.slice(0, 3) : FEATURED_RECOMMENDATIONS.slice(0, 2),
            followUpChips: chips,
            isGeminiLive: true
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, using intelligent local engine:', err);
    }
  }

  // Fallback: Smart Dynamic Natural Language Engine with full 37-domain coverage
  await new Promise(r => setTimeout(r, 450));
  const localResult = generateDynamicConversationalResponse(promptText, messages);
  return {
    ...localResult,
    isGeminiLive: false
  };
}

export async function generateRugWithGemini(userPrompt, options = {}) {
  const apiKey = getGeminiApiKey();
  const seed = options.seed || generateSeed();

  if (apiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are the Master Loom Designer for Pakiza Rugs & Co. in Bhadohi, India.
A client requested this custom rug: "${userPrompt}".

Analyze their prompt and return a valid JSON object (WITHOUT markdown formatting, no backticks, only pure JSON) with the following fields:
{
  "title": "A poetic luxury name (e.g. The Imperial Emerald Oushak Heirloom)",
  "style": "One of: Oushak Heirloom, Persian Imperial, Modern Minimal, Botanical Floral, Geometric Kilim, Vintage Distressed, Abstract Contour, Traditional Mughal",
  "primary": "Hex color code matching their primary color request (e.g. #0c3b2e)",
  "secondary": "Hex color code for accent/border (e.g. #fbf8f3)",
  "pattern": "Specific motif description",
  "border": "Border design description",
  "medallion": "Medallion description",
  "texture": "Texture specification (e.g. Antique Hand-Washed Matte Wool)",
  "pile": "Pile depth (e.g. Medium Luxury Pile 12mm)",
  "material": "Fiber specification (e.g. 100% Pure New Zealand Wool & Bamboo Silk)",
  "size": "Suggested size (e.g. 8x10 ft (240x300 cm))",
  "visualPrompt": "A detailed 25-word visual description of the rug for photorealistic image generation, focusing on colors, motifs, borders, and hand-knotted fibers"
}`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (textOutput) {
          const cleanJsonStr = textOutput.replace(/```json/gi, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJsonStr);
          const dynamicUrl = createDynamicRugImageUrl(parsed.visualPrompt || userPrompt, seed);

          return {
            ...parsed,
            image: dynamicUrl,
            prompt: userPrompt,
            isGeminiPowered: true
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local synthesis:', err);
    }
  }

  // Fallback: Intelligent Local Synthesis + Dynamic AI Generation
  const t = userPrompt.toLowerCase();
  let basePreset = STYLE_PRESETS_MAP.oushak;

  if (t.includes('geometric') || t.includes('kilim') || t.includes('diamond') || t.includes('tribal')) {
    basePreset = STYLE_PRESETS_MAP.geometric;
  } else if (t.includes('floral') || t.includes('botanical') || t.includes('flower') || t.includes('vine') || t.includes('lotus')) {
    basePreset = STYLE_PRESETS_MAP.floral;
  } else if (t.includes('vintage') || t.includes('distressed') || t.includes('washed') || t.includes('antique') || t.includes('patina')) {
    basePreset = STYLE_PRESETS_MAP.vintage;
  } else if (t.includes('traditional') || t.includes('mughal') || t.includes('court') || t.includes('royal')) {
    basePreset = STYLE_PRESETS_MAP.traditional;
  } else if (t.includes('persian') || t.includes('burgundy') || t.includes('red') || t.includes('wine')) {
    basePreset = STYLE_PRESETS_MAP.persian;
  } else if (t.includes('minimal') || t.includes('sculpted') || t.includes('contour') || t.includes('wave') || t.includes('abstract')) {
    basePreset = STYLE_PRESETS_MAP.minimal;
  }

  const dynamicImageUrl = createDynamicRugImageUrl(userPrompt, seed);

  return {
    ...basePreset,
    title: `Bespoke ${basePreset.style}: ${userPrompt.slice(0, 32)}...`,
    prompt: userPrompt,
    image: dynamicImageUrl,
    fallbackImage: basePreset.image,
    isGeminiPowered: false
  };
}

