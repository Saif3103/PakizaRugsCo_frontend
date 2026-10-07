import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from '../utils/toast';
import logoImg from '../assets/logo.png';
import wordmark3DImg from '../assets/pakiza-3d-wordmark.png';
import './aiDesigner.css';

// ── Color Swatches (Emerald, Burgundy, Ivory, Charcoal & Curated Tones - NO GOLD) ──
const PRIMARY_COLORS = [
  { id: 'emerald', label: 'Emerald Green', hex: '#0c3b2e', text: '#ffffff' },
  { id: 'burgundy', label: 'Deep Burgundy', hex: '#541424', text: '#ffffff' },
  { id: 'ivory', label: 'Warm Ivory', hex: '#f7f4ed', text: '#121614', border: '#d9d0c1' },
  { id: 'charcoal', label: 'Charcoal Black', hex: '#161c18', text: '#ffffff' },
  { id: 'forest', label: 'Forest Pine', hex: '#184737', text: '#ffffff' },
  { id: 'wine', label: 'Crimson Wine', hex: '#70192e', text: '#ffffff' },
  { id: 'oatmeal', label: 'Muted Oatmeal', hex: '#e8dfd1', text: '#121614', border: '#c7bcab' },
  { id: 'slate', label: 'Midnight Slate', hex: '#232b2b', text: '#ffffff' }
];

const SECONDARY_COLORS = [
  { id: 'cream', label: 'Cream Ivory', hex: '#fbf8f3', text: '#121614', border: '#ddd3c4' },
  { id: 'sage', label: 'Forest Sage', hex: '#2d5445', text: '#ffffff' },
  { id: 'plum', label: 'Velvet Plum', hex: '#481523', text: '#ffffff' },
  { id: 'sand', label: 'Dune Sand', hex: '#ded1bd', text: '#121614', border: '#c2b29c' },
  { id: 'anthracite', label: 'Dark Anthracite', hex: '#1d2320', text: '#ffffff' },
  { id: 'linen', label: 'Raw Linen', hex: '#f2eae0', text: '#121614', border: '#d8cbbe' },
  { id: 'moss', label: 'Deep Moss', hex: '#1e382b', text: '#ffffff' },
  { id: 'merlot', label: 'Aged Merlot', hex: '#631828', text: '#ffffff' }
];

const RUG_STYLES = [
  { id: 'oushak', label: 'Oushak Heirloom', desc: 'Large botanical palmettes, antique wash & soft distressed field' },
  { id: 'persian', label: 'Persian Imperial', desc: 'Dense arabesques, intricate Shah Abbas rosettes & layered borders' },
  { id: 'minimal', label: 'Modern Minimal', desc: 'Architectural line contours, sculptural organic relief & open breathing room' },
  { id: 'floral', label: 'Botanical Floral', desc: 'Natural vine scrolls, Mughal lotus leaves & refined florets' },
  { id: 'geometric', label: 'Geometric Kilim', desc: 'Bespoke diamond lozenges, stepped medallions & crisp tribal rhythm' },
  { id: 'vintage', label: 'Vintage Distressed', desc: 'Authentic stone-washed patina with intentional aged abrash shading' },
  { id: 'abstract', label: 'Abstract Contour', desc: 'Sculpted fluid river-wave curves with dynamic high-low pile depths' },
  { id: 'traditional', label: 'Traditional Mughal', desc: 'Royal Bhadohi atelier symmetry with courtly floral border guards' }
];

const PATTERNS = [
  'Floral Arabesque Medallion',
  'Organic Sculpted Waves',
  'Central Shah Abbas Rosette',
  'All-Over Botanical Field',
  'Geometric Stepped Lozenge',
  'Minimalist Linear Strata',
  'Distressed Abrash Shading'
];

const BORDER_DESIGNS = [
  'Intricate Tri-Band Guard Border',
  'Slender Minimalist Fillet (1.5")',
  'Distressed Vintage Fringed Edging',
  'Bold Solid Contrast Enclosure',
  'Flowing Lotus Vine Scroll'
];

const MEDALLIONS = [
  'Grand 16-Point Rosette',
  'Double Diamond Tribal Core',
  'Minimal Open Ground (No Medallion)',
  'Curved Organic Contour Center',
  'Subtle Botanical Star Crest'
];

const TEXTURES = [
  'Hand-Sculpted High-Low Cut Pile',
  'Silky Sheared Lustrous Sheen',
  'Organic Ribbed Loop Texture',
  'Antique Hand-Washed Matte Wool',
  'Dense Velvety Micro-Tufted Finish'
];

const PILE_TYPES = [
  'Low Pile Flatweave (6mm)',
  'Medium Luxury Pile (12mm)',
  'High Sculpted Plush (18mm)',
  'Dense Heritage Knot (8mm)'
];

const MATERIALS = [
  '100% Pure New Zealand Wool',
  'Hand-Spun Wool & Bamboo Silk Blend (70/30)',
  'Pure Mulberry Silk & Wool Core',
  'Organic Hand-Carded Natural Jute & Wool'
];

const STANDARD_SIZES = [
  '4x6 ft (120x180 cm)',
  '5x8 ft (150x240 cm)',
  '6x9 ft (180x270 cm)',
  '8x10 ft (240x300 cm)',
  '9x12 ft (270x360 cm)',
  '10x14 ft (300x420 cm)',
  'Runner 2.5x10 ft (75x300 cm)',
  'Circular 6ft Diameter (180 cm)'
];

// Curated Master Presets for Quick Inspiration
const PRESET_CONCEPTS = [
  {
    title: 'The Oushak Emerald & Ivory Masterpiece',
    prompt: 'Create a beige and emerald green Oushak-style rug with traditional floral motifs, vintage distressed texture, and a cream border.',
    style: 'Oushak Heirloom',
    primary: '#0c3b2e',
    secondary: '#fbf8f3',
    pattern: 'Floral Arabesque Medallion',
    border: 'Intricate Tri-Band Guard Border',
    medallion: 'Grand 16-Point Rosette',
    texture: 'Antique Hand-Washed Matte Wool',
    pile: 'Medium Luxury Pile (12mm)',
    material: '100% Pure New Zealand Wool',
    size: '8x10 ft (240x300 cm)',
    image: '/ai-designer/rug-emerald-oushak.jpg'
  },
  {
    title: 'The Imperial Burgundy & Cream Persian Medallion',
    prompt: 'A deep burgundy and warm ivory Persian heritage rug with dense arabesques, symmetrical Shah Abbas rosette, and fine fringe detailing.',
    style: 'Persian Imperial',
    primary: '#541424',
    secondary: '#f7f4ed',
    pattern: 'Central Shah Abbas Rosette',
    border: 'Flowing Lotus Vine Scroll',
    medallion: 'Grand 16-Point Rosette',
    texture: 'Silky Sheared Lustrous Sheen',
    pile: 'Dense Heritage Knot (8mm)',
    material: 'Hand-Spun Wool & Bamboo Silk Blend (70/30)',
    size: '9x12 ft (270x360 cm)',
    image: '/ai-designer/rug-burgundy-persian.jpg'
  },
  {
    title: 'The Modern Sculpted Ivory & Charcoal Contour',
    prompt: 'A modern minimalist ivory sculpted contour rug with charcoal organic relief lines, high-low cut wool pile, and architectural simplicity.',
    style: 'Modern Minimal',
    primary: '#f7f4ed',
    secondary: '#161c18',
    pattern: 'Organic Sculpted Waves',
    border: 'Slender Minimalist Fillet (1.5")',
    medallion: 'Minimal Open Ground (No Medallion)',
    texture: 'Hand-Sculpted High-Low Cut Pile',
    pile: 'High Sculpted Plush (18mm)',
    material: '100% Pure New Zealand Wool',
    size: '6x9 ft (180x270 cm)',
    image: '/ai-designer/rug-minimal-sculpted.jpg'
  }
];

export default function AiRugDesignerPage() {
  const { user } = useAuth();
  const roomFileInputRef = useRef(null);

  // Prompt input
  const [prompt, setPrompt] = useState(
    'Create a beige and emerald green Oushak-style rug with traditional floral motifs, vintage distressed texture, and a cream border.'
  );

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  // Active rug configuration
  const [activeRug, setActiveRug] = useState(PRESET_CONCEPTS[0]);

  // Variations (3 alternatives)
  const [variations, setVariations] = useState([
    {
      id: 'var-1',
      label: 'Variation A • Emerald Palette',
      diffTag: 'Emerald & Ivory Harmony',
      image: '/ai-designer/rug-emerald-oushak.jpg',
      primary: '#0c3b2e',
      secondary: '#fbf8f3',
      border: 'Intricate Tri-Band Guard Border',
      pattern: 'Floral Arabesque Medallion'
    },
    {
      id: 'var-2',
      label: 'Variation B • Deep Burgundy Field',
      diffTag: 'Burgundy Imperial Inversion',
      image: '/ai-designer/rug-burgundy-persian.jpg',
      primary: '#541424',
      secondary: '#f7f4ed',
      border: 'Flowing Lotus Vine Scroll',
      pattern: 'Central Shah Abbas Rosette'
    },
    {
      id: 'var-3',
      label: 'Variation C • Sculpted Contour',
      diffTag: 'Architectural Minimal Relief',
      image: '/ai-designer/rug-minimal-sculpted.jpg',
      primary: '#f7f4ed',
      secondary: '#161c18',
      border: 'Slender Minimalist Fillet (1.5")',
      pattern: 'Organic Sculpted Waves'
    }
  ]);
  const [selectedVariationId, setSelectedVariationId] = useState('var-1');

  // View mode: 'studio' | 'room'
  const [viewMode, setViewMode] = useState('studio');

  // Room visualizer state
  const [roomImage, setRoomImage] = useState('/ai-designer/room-luxury-living.jpg');
  const [roomScale, setRoomScale] = useState(1);
  const [roomPerspective, setRoomPerspective] = useState(48); // tilt angle in degrees

  // Custom Dimensions Mode
  const [useCustomDim, setUseCustomDim] = useState(false);
  const [customWidthFt, setCustomWidthFt] = useState('8');
  const [customLengthFt, setCustomLengthFt] = useState('11');

  // Saved Designs drawer
  const [savedDesigns, setSavedDesigns] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pakiza_saved_ai_designs') || '[]');
    } catch {
      return [];
    }
  });
  const [showSavedDrawer, setShowSavedDrawer] = useState(false);

  // Custom Quote Request Modal
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: 'Mumbai',
    roomType: 'Living Room',
    deliveryTimeline: 'Standard Hand-Weaving (6-8 Weeks)',
    notes: ''
  });
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  // Generation Steps simulator
  const GENERATION_PHASES = [
    'Analyzing chromatic balance & raw natural fiber tensile specs...',
    'Mapping Bhadohi knot matrix & heirloom botanical symmetry...',
    'Simulating hand-spun New Zealand wool & bamboo silk sheen...',
    'Rendering high-definition loom finish & authentic contact shadows...'
  ];

  // Quick prompt suggestions
  const SUGGESTION_CHIPS = [
    'Oushak',
    'Persian',
    'Modern Minimal',
    'Floral',
    'Geometric',
    'Vintage',
    'Abstract',
    'Traditional'
  ];

  // Handle Generate with AI
  const handleGenerate = (customPromptText = prompt) => {
    if (!customPromptText.trim()) {
      toast('Please describe your dream rug design.', 'error');
      return;
    }

    setIsGenerating(true);
    setGenerationStep(0);

    const stepInterval = setInterval(() => {
      setGenerationStep((prev) => {
        if (prev < GENERATION_PHASES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 700);

    setTimeout(() => {
      clearInterval(stepInterval);
      setIsGenerating(false);

      // Determine matching preset or dynamic tailored configuration based on keywords
      const pLower = customPromptText.toLowerCase();
      let matched = PRESET_CONCEPTS[0];

      if (pLower.includes('burgundy') || pLower.includes('red') || pLower.includes('persian') || pLower.includes('imperial')) {
        matched = PRESET_CONCEPTS[1];
      } else if (pLower.includes('minimal') || pLower.includes('sculpted') || pLower.includes('contour') || pLower.includes('wave') || pLower.includes('abstract')) {
        matched = PRESET_CONCEPTS[2];
      } else {
        matched = {
          ...PRESET_CONCEPTS[0],
          prompt: customPromptText,
          title: `Bespoke Heirloom Rug: ${customPromptText.slice(0, 36)}...`
        };
      }

      setActiveRug({
        ...matched,
        prompt: customPromptText,
        size: useCustomDim ? `${customWidthFt}' x ${customLengthFt}' Bespoke Dimensions` : matched.size
      });

      toast('✦ AI Custom Rug Concept Generated Successfully!', 'success');
    }, 3000);
  };

  // Handle Quick Chip click
  const handleChipClick = (chip) => {
    let newPrompt = `Create a bespoke ${chip.toLowerCase()}-style luxury rug with handcrafted wool texture, rich heritage symmetry, and refined contrast borders.`;
    if (chip === 'Oushak') {
      newPrompt = 'Create a beige and emerald green Oushak-style rug with traditional floral motifs, vintage distressed texture, and a cream border.';
    } else if (chip === 'Persian') {
      newPrompt = 'A deep burgundy and warm ivory Persian heritage rug with dense arabesques, symmetrical Shah Abbas rosette, and fine fringe detailing.';
    } else if (chip === 'Modern Minimal') {
      newPrompt = 'A modern minimalist ivory sculpted contour rug with charcoal organic relief lines, high-low cut wool pile, and architectural simplicity.';
    }
    setPrompt(newPrompt);
    handleGenerate(newPrompt);
  };

  // Handle "Create Variations"
  const handleCreateVariations = () => {
    setIsGenerating(true);
    setGenerationStep(1);

    setTimeout(() => {
      setIsGenerating(false);

      // Re-order and enrich variations based on current active colors
      const newVars = [
        {
          id: 'var-1',
          label: 'Variation 1 • Emerald Harmony',
          diffTag: 'Distressed Oushak Antique Field',
          image: '/ai-designer/rug-emerald-oushak.jpg',
          primary: '#0c3b2e',
          secondary: '#fbf8f3',
          border: 'Intricate Tri-Band Guard Border',
          pattern: 'Floral Arabesque Medallion'
        },
        {
          id: 'var-2',
          label: 'Variation 2 • Burgundy Inversion',
          diffTag: 'Imperial Shah Abbas Core',
          image: '/ai-designer/rug-burgundy-persian.jpg',
          primary: '#541424',
          secondary: '#f7f4ed',
          border: 'Flowing Lotus Vine Scroll',
          pattern: 'Central Shah Abbas Rosette'
        },
        {
          id: 'var-3',
          label: 'Variation 3 • Minimalist Relief',
          diffTag: 'Architectural High-Low Sculpting',
          image: '/ai-designer/rug-minimal-sculpted.jpg',
          primary: '#f7f4ed',
          secondary: '#161c18',
          border: 'Slender Minimalist Fillet (1.5")',
          pattern: 'Organic Sculpted Waves'
        }
      ];

      setVariations(newVars);
      toast('✦ 3 Alternative Design Variations Ready for Review!', 'info');
    }, 1800);
  };

  // Select Variation
  const handleSelectVariation = (v) => {
    setSelectedVariationId(v.id);
    setActiveRug((prev) => ({
      ...prev,
      title: `${prev.title.split(' • ')[0]} • ${v.diffTag}`,
      image: v.image,
      primary: v.primary,
      secondary: v.secondary,
      border: v.border,
      pattern: v.pattern
    }));
    toast(`✦ Applied ${v.label}`, 'success');
  };

  // Handle Room Photo Upload
  const handleRoomUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      toast('Please upload a room image under 8MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        setRoomImage(result);
        setViewMode('room');
        toast('✦ Custom room photograph loaded! Rug placed on floor.', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Design
  const handleSaveDesign = () => {
    const newDesign = {
      id: 'design-' + Date.now(),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      ...activeRug,
      size: useCustomDim ? `${customWidthFt}' x ${customLengthFt}' Custom` : activeRug.size
    };

    const updated = [newDesign, ...savedDesigns];
    setSavedDesigns(updated);
    try {
      localStorage.setItem('pakiza_saved_ai_designs', JSON.stringify(updated));
    } catch (err) {
      console.warn('Storage limit', err);
    }

    toast('✦ Bespoke rug concept saved to your Atelier Portfolio!', 'success');
  };

  // Submit Custom Quote Request
  const handleSubmitQuote = (e) => {
    e.preventDefault();
    if (!quoteForm.name || !quoteForm.email || !quoteForm.phone) {
      toast('Please enter your name, email and contact number.', 'error');
      return;
    }

    setQuoteSubmitting(true);
    setTimeout(() => {
      setQuoteSubmitting(false);
      setQuoteSuccess(true);

      // Save order to custom orders in localStorage so admin can see it
      const customQuotePayload = {
        id: 'QUOTE-AI-' + Math.floor(1000 + Math.random() * 9000),
        timestamp: new Date().toISOString(),
        customer: quoteForm,
        rugSpecs: {
          ...activeRug,
          dimensions: useCustomDim ? `${customWidthFt}' x ${customLengthFt}'` : activeRug.size
        },
        status: 'pending_review'
      };

      try {
        const existing = JSON.parse(localStorage.getItem('pakiza_ai_quote_requests') || '[]');
        existing.unshift(customQuotePayload);
        localStorage.setItem('pakiza_ai_quote_requests', JSON.stringify(existing));
      } catch (err) {
        console.warn('Error saving quote', err);
      }

      toast('✦ Custom Rug Quote Dispatched to Bhadohi Atelier!', 'success');
    }, 1200);
  };

  return (
    <div className="aid-app">
      {/* ── Studio Header (Ivory, Emerald, Charcoal, Burgundy - NO GOLD) ── */}
      <header className="aid-header">
        <div className="aid-header__inner wrap">
          <Link to="/" className="aid-header__brand" title="Pakiza Rugs & Co. Boutique">
            <img src={logoImg} alt="Pakiza Monogram" className="aid-header__logo-monogram" />
            <img src={wordmark3DImg} alt="Pakiza Rugs Co." className="aid-header__logo-wordmark" />
            <span className="aid-header__badge">AI ATELIER STUDIO</span>
          </Link>

          <div className="aid-header__right">
            {savedDesigns.length > 0 && (
              <button
                type="button"
                className="aid-btn-saved-toggle"
                onClick={() => setShowSavedDrawer(true)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                <span>Portfolio ({savedDesigns.length})</span>
              </button>
            )}

            <button
              type="button"
              className="aid-btn-quote-top"
              onClick={() => {
                setQuoteSuccess(false);
                setShowQuoteModal(true);
              }}
            >
              Request Custom Quote
            </button>

            <Link to="/" className="aid-header__exit-btn" title="Back to Boutique Store">
              Boutique Store &rarr;
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main Studio Grid ── */}
      <div className="aid-main wrap">
        {/* ── TOP HERO: AI Prompt Input & Quick Suggestion Chips ── */}
        <section className="aid-prompt-card">
          <div className="aid-prompt-eyebrow">
            <span className="aid-dot-pulse" />
            <span>BESPOKE RUG INTELLIGENCE • DIRECT FROM BHADOHI MASTER LOOMS</span>
          </div>

          <h1 className="aid-prompt-title">Describe Your Dream Rug</h1>
          <p className="aid-prompt-subtitle">
            Enter your aesthetic vision in natural language. Our atelier AI crafts photorealistic handmade wool &amp; silk rug concepts with authentic weaving geometry.
          </p>

          {/* Large Prompt Input Box */}
          <div className="aid-input-wrapper">
            <textarea
              className="aid-prompt-textarea"
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your dream rug... (e.g. Create a beige and emerald green Oushak-style rug with traditional floral motifs, vintage distressed texture, and a cream border.)"
              disabled={isGenerating}
            />

            <div className="aid-input-actions">
              <span className="aid-char-counter">
                {prompt.length} characters • Authentic hand-knotted simulation
              </span>

              <button
                type="button"
                className="aid-btn-generate"
                onClick={() => handleGenerate()}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="aid-spinner" />
                    <span>Weaving Concept...</span>
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    <span>Generate With AI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="aid-chips-row">
            <span className="aid-chips-label">Aesthetic Inspirations:</span>
            <div className="aid-chips-list">
              {SUGGESTION_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="aid-chip-btn"
                  onClick={() => handleChipClick(chip)}
                  disabled={isGenerating}
                >
                  + {chip}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── 2-COLUMN STUDIO WORKBENCH: Left Visualizer, Right Customization Panel ── */}
        <div className="aid-workbench-grid">
          {/* ════ LEFT COLUMN: Visualizer Canvas + Variations + Actions ════ */}
          <div className="aid-visualizer-col">
            {/* Canvas Header Toolbar */}
            <div className="aid-canvas-toolbar">
              <div className="aid-view-toggle-pill">
                <button
                  type="button"
                  className={`aid-view-btn ${viewMode === 'studio' ? 'active' : ''}`}
                  onClick={() => setViewMode('studio')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                  <span>Studio Flatlay</span>
                </button>

                <button
                  type="button"
                  className={`aid-view-btn ${viewMode === 'room' ? 'active' : ''}`}
                  onClick={() => setViewMode('room')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <span>See It In My Room</span>
                </button>
              </div>

              {viewMode === 'room' && (
                <div className="aid-room-upload-wrap">
                  <input
                    type="file"
                    ref={roomFileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleRoomUpload}
                  />
                  <button
                    type="button"
                    className="aid-btn-upload-room"
                    onClick={() => roomFileInputRef.current?.click()}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span>Upload My Room Photo</span>
                  </button>
                </div>
              )}
            </div>

            {/* Visualizer Display Box */}
            <div className="aid-viewport-box">
              {/* Generating Loader Animation Overlay */}
              {isGenerating && (
                <div className="aid-generating-overlay">
                  <div className="aid-generating-card">
                    <div className="aid-loom-animation">
                      <div className="aid-warp-line" />
                      <div className="aid-warp-line" />
                      <div className="aid-warp-line" />
                      <div className="aid-warp-line" />
                      <div className="aid-shuttle-beam" />
                    </div>
                    <h3 className="aid-generating-heading">Weaving AI Concept</h3>
                    <p className="aid-generating-phase">{GENERATION_PHASES[generationStep]}</p>
                    <div className="aid-progress-bar">
                      <div
                        className="aid-progress-fill"
                        style={{ width: `${((generationStep + 1) / GENERATION_PHASES.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* View 1: Studio Flatlay */}
              {viewMode === 'studio' && (
                <div className="aid-studio-flatlay-wrap">
                  <div className="aid-rug-frame">
                    <img
                      src={activeRug.image}
                      alt={activeRug.title}
                      className="aid-rug-flatlay-img"
                    />

                    {/* Realistic Spec Stamp */}
                    <div className="aid-rug-authentic-badge">
                      <span className="dot" />
                      <span>Pakiza Bhadohi Guild Weave • 100% Fiber Authentic</span>
                    </div>
                  </div>
                </div>
              )}

              {/* View 2: See It In My Room (3D Floor Perspective Projection) */}
              {viewMode === 'room' && (
                <div className="aid-room-perspective-wrap">
                  {/* Background Room Photo */}
                  <img
                    src={roomImage}
                    alt="Interior Room Setup"
                    className="aid-room-bg-img"
                  />

                  {/* Projected Realistic Rug on Floor Plane */}
                  <div
                    className="aid-room-rug-plane"
                    style={{
                      transform: `scale(${roomScale}) perspective(700px) rotateX(${roomPerspective}deg) rotateZ(-3deg)`,
                      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.45), 0 10px 20px rgba(0, 0, 0, 0.25)'
                    }}
                  >
                    <img
                      src={activeRug.image}
                      alt={activeRug.title}
                      className="aid-room-projected-img"
                    />
                    <div className="aid-room-rug-ambient-shadow" />
                  </div>

                  {/* Room Visualizer Interactive Sliders Overlay */}
                  <div className="aid-room-controls-bar">
                    <div className="aid-room-control-item">
                      <label>Scale:</label>
                      <input
                        type="range"
                        min="0.7"
                        max="1.3"
                        step="0.05"
                        value={roomScale}
                        onChange={(e) => setRoomScale(parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="aid-room-control-item">
                      <label>Floor Tilt:</label>
                      <input
                        type="range"
                        min="30"
                        max="65"
                        step="1"
                        value={roomPerspective}
                        onChange={(e) => setRoomPerspective(parseInt(e.target.value, 10))}
                      />
                    </div>
                    <button
                      type="button"
                      className="aid-btn-reset-room"
                      onClick={() => {
                        setRoomScale(1);
                        setRoomPerspective(48);
                      }}
                    >
                      Reset View
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── DESIGN VARIATIONS ROW ("Create Variations") ── */}
            <div className="aid-variations-section">
              <div className="aid-variations-header">
                <div>
                  <h3 className="aid-variations-title">Design Variations</h3>
                  <p className="aid-variations-subtitle">
                    Alternative colorways, borders, and medallion structures generated for your concept.
                  </p>
                </div>

                <button
                  type="button"
                  className="aid-btn-create-variations"
                  onClick={handleCreateVariations}
                  disabled={isGenerating}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 4 23 10 17 10" />
                    <polyline points="1 20 1 14 7 14" />
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                  </svg>
                  <span>Generate Variations</span>
                </button>
              </div>

              <div className="aid-variations-grid">
                {variations.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    className={`aid-variation-card ${selectedVariationId === v.id ? 'active' : ''}`}
                    onClick={() => handleSelectVariation(v)}
                  >
                    <div className="aid-variation-img-wrap">
                      <img src={v.image} alt={v.label} />
                      <div className="aid-variation-swatches">
                        <span style={{ backgroundColor: v.primary }} />
                        <span style={{ backgroundColor: v.secondary }} />
                      </div>
                    </div>
                    <div className="aid-variation-info">
                      <span className="aid-variation-label">{v.label}</span>
                      <span className="aid-variation-diff">{v.diffTag}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ── PRODUCT INFORMATION & SPECIFICATIONS ── */}
            <div className="aid-spec-card">
              <div className="aid-spec-head">
                <span className="aid-spec-eyebrow">ATELIER SPECIFICATION DOSSIER</span>
                <h2 className="aid-spec-title">{activeRug.title}</h2>
              </div>

              <div className="aid-spec-grid">
                <div className="aid-spec-item">
                  <span className="label">Rug Style</span>
                  <span className="value">{activeRug.style}</span>
                </div>
                <div className="aid-spec-item">
                  <span className="label">Suggested Material</span>
                  <span className="value">{activeRug.material}</span>
                </div>
                <div className="aid-spec-item">
                  <span className="label">Suggested Dimensions</span>
                  <span className="value">
                    {useCustomDim ? `${customWidthFt}' x ${customLengthFt}' (Bespoke)` : activeRug.size}
                  </span>
                </div>
                <div className="aid-spec-item">
                  <span className="label">Pile &amp; Knot Depth</span>
                  <span className="value">{activeRug.pile}</span>
                </div>
                <div className="aid-spec-item">
                  <span className="label">Texture Architecture</span>
                  <span className="value">{activeRug.texture}</span>
                </div>
                <div className="aid-spec-item">
                  <span className="label">Central Pattern</span>
                  <span className="value">{activeRug.pattern}</span>
                </div>
                <div className="aid-spec-item">
                  <span className="label">Border Guard Framing</span>
                  <span className="value">{activeRug.border}</span>
                </div>
                <div className="aid-spec-item">
                  <span className="label">Estimated Craft Time</span>
                  <span className="value">6–8 Weeks by Master Weavers in Bhadohi</span>
                </div>
              </div>

              {/* Color Palette Display */}
              <div className="aid-palette-display">
                <span className="label">Chromatics:</span>
                <div className="swatch-chips">
                  <div className="swatch-item">
                    <span className="circle" style={{ backgroundColor: activeRug.primary }} />
                    <span className="name">Primary Field</span>
                  </div>
                  <div className="swatch-item">
                    <span className="circle" style={{ backgroundColor: activeRug.secondary }} />
                    <span className="name">Secondary Fillet</span>
                  </div>
                  <div className="swatch-item">
                    <span className="circle" style={{ backgroundColor: '#121614' }} />
                    <span className="name">Charcoal Accent</span>
                  </div>
                </div>
              </div>

              {/* Primary Action Buttons */}
              <div className="aid-action-buttons-row">
                <button
                  type="button"
                  className="aid-btn-save-design"
                  onClick={handleSaveDesign}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  <span>Save Design</span>
                </button>

                <button
                  type="button"
                  className="aid-btn-request-quote"
                  onClick={() => {
                    setQuoteSuccess(false);
                    setShowQuoteModal(true);
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Request Custom Quote</span>
                </button>
              </div>
            </div>
          </div>

          {/* ════ RIGHT COLUMN: Deep Customization Control Panel ════ */}
          <aside className="aid-customization-panel">
            <div className="aid-panel-header">
              <h2 className="aid-panel-title">Customization Studio</h2>
              <span className="aid-panel-subtitle">Fine-tune all atelier parameters in real-time</span>
            </div>

            <div className="aid-panel-scroll">
              {/* 1. Rug Style */}
              <div className="aid-ctrl-group">
                <label className="aid-ctrl-label">1. Rug Style</label>
                <div className="aid-style-selector">
                  {RUG_STYLES.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      className={`aid-style-btn ${activeRug.style.includes(st.label.split(' ')[0]) ? 'active' : ''}`}
                      onClick={() => {
                        setActiveRug((prev) => ({ ...prev, style: st.label }));
                        toast(`Style set to ${st.label}`, 'info');
                      }}
                    >
                      <span className="name">{st.label}</span>
                      <span className="desc">{st.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Primary Color Swatches */}
              <div className="aid-ctrl-group">
                <label className="aid-ctrl-label">2. Primary Color Field</label>
                <div className="aid-swatch-grid">
                  {PRIMARY_COLORS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`aid-swatch-btn ${activeRug.primary === c.hex ? 'active' : ''}`}
                      style={{ backgroundColor: c.hex, color: c.text, borderColor: c.border || c.hex }}
                      onClick={() => {
                        setActiveRug((prev) => ({ ...prev, primary: c.hex }));
                        toast(`Primary color updated to ${c.label}`, 'info');
                      }}
                      title={c.label}
                    >
                      {activeRug.primary === c.hex && <span>✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Secondary Color Swatches */}
              <div className="aid-ctrl-group">
                <label className="aid-ctrl-label">3. Secondary Accent / Fillet</label>
                <div className="aid-swatch-grid">
                  {SECONDARY_COLORS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`aid-swatch-btn ${activeRug.secondary === c.hex ? 'active' : ''}`}
                      style={{ backgroundColor: c.hex, color: c.text, borderColor: c.border || c.hex }}
                      onClick={() => {
                        setActiveRug((prev) => ({ ...prev, secondary: c.hex }));
                        toast(`Secondary color updated to ${c.label}`, 'info');
                      }}
                      title={c.label}
                    >
                      {activeRug.secondary === c.hex && <span>✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Pattern Architecture */}
              <div className="aid-ctrl-group">
                <label className="aid-ctrl-label">4. Pattern Architecture</label>
                <select
                  className="aid-ctrl-select"
                  value={activeRug.pattern}
                  onChange={(e) => setActiveRug((prev) => ({ ...prev, pattern: e.target.value }))}
                >
                  {PATTERNS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* 5. Border Design */}
              <div className="aid-ctrl-group">
                <label className="aid-ctrl-label">5. Border Design</label>
                <select
                  className="aid-ctrl-select"
                  value={activeRug.border}
                  onChange={(e) => setActiveRug((prev) => ({ ...prev, border: e.target.value }))}
                >
                  {BORDER_DESIGNS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* 6. Center Medallion */}
              <div className="aid-ctrl-group">
                <label className="aid-ctrl-label">6. Center Medallion Focus</label>
                <select
                  className="aid-ctrl-select"
                  value={activeRug.medallion}
                  onChange={(e) => setActiveRug((prev) => ({ ...prev, medallion: e.target.value }))}
                >
                  {MEDALLIONS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* 7. Texture */}
              <div className="aid-ctrl-group">
                <label className="aid-ctrl-label">7. Surface Texture</label>
                <select
                  className="aid-ctrl-select"
                  value={activeRug.texture}
                  onChange={(e) => setActiveRug((prev) => ({ ...prev, texture: e.target.value }))}
                >
                  {TEXTURES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* 8. Pile Type */}
              <div className="aid-ctrl-group">
                <label className="aid-ctrl-label">8. Pile Height &amp; Density</label>
                <select
                  className="aid-ctrl-select"
                  value={activeRug.pile}
                  onChange={(e) => setActiveRug((prev) => ({ ...prev, pile: e.target.value }))}
                >
                  {PILE_TYPES.map((pt) => (
                    <option key={pt} value={pt}>{pt}</option>
                  ))}
                </select>
              </div>

              {/* 9. Material Selection */}
              <div className="aid-ctrl-group">
                <label className="aid-ctrl-label">9. Loom Fiber Material</label>
                <select
                  className="aid-ctrl-select"
                  value={activeRug.material}
                  onChange={(e) => setActiveRug((prev) => ({ ...prev, material: e.target.value }))}
                >
                  {MATERIALS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              {/* 10. Dimensions & Custom Sizing */}
              <div className="aid-ctrl-group">
                <div className="aid-dim-header">
                  <label className="aid-ctrl-label">10. Rug Sizing</label>
                  <button
                    type="button"
                    className="aid-toggle-dim-btn"
                    onClick={() => setUseCustomDim(!useCustomDim)}
                  >
                    {useCustomDim ? 'Use Standard Sizes' : '+ Custom Feet/Inches'}
                  </button>
                </div>

                {!useCustomDim ? (
                  <select
                    className="aid-ctrl-select"
                    value={activeRug.size}
                    onChange={(e) => setActiveRug((prev) => ({ ...prev, size: e.target.value }))}
                  >
                    {STANDARD_SIZES.map((sz) => (
                      <option key={sz} value={sz}>{sz}</option>
                    ))}
                  </select>
                ) : (
                  <div className="aid-custom-dim-grid">
                    <div>
                      <span className="dim-tag">Width (Feet):</span>
                      <input
                        type="number"
                        min="2"
                        max="25"
                        step="0.5"
                        value={customWidthFt}
                        onChange={(e) => setCustomWidthFt(e.target.value)}
                        className="aid-ctrl-input"
                      />
                    </div>
                    <div>
                      <span className="dim-tag">Length (Feet):</span>
                      <input
                        type="number"
                        min="3"
                        max="35"
                        step="0.5"
                        value={customLengthFt}
                        onChange={(e) => setCustomLengthFt(e.target.value)}
                        className="aid-ctrl-input"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Re-Generate with modified parameters */}
              <button
                type="button"
                className="aid-btn-reapply-all"
                onClick={() => {
                  toast('✦ Specifications applied to your active bespoke rug!', 'success');
                }}
              >
                Apply Custom Specifications
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* ════ SAVED DESIGNS DRAWER ════ */}
      {showSavedDrawer && (
        <div className="aid-modal-backdrop" onClick={() => setShowSavedDrawer(false)}>
          <div className="aid-saved-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="aid-saved-drawer__head">
              <h3>Saved Atelier Concepts ({savedDesigns.length})</h3>
              <button
                type="button"
                className="aid-close-btn"
                onClick={() => setShowSavedDrawer(false)}
              >
                ✕
              </button>
            </div>

            <div className="aid-saved-drawer__body">
              {savedDesigns.length === 0 ? (
                <p className="aid-empty-text">No custom concepts saved yet.</p>
              ) : (
                <div className="aid-saved-grid">
                  {savedDesigns.map((item) => (
                    <div key={item.id} className="aid-saved-card">
                      <img src={item.image} alt={item.title} className="aid-saved-thumb" />
                      <div className="aid-saved-meta">
                        <h4>{item.title}</h4>
                        <span className="date">{item.date} • {item.size}</span>
                        <div className="aid-saved-actions">
                          <button
                            type="button"
                            className="aid-btn-load"
                            onClick={() => {
                              setActiveRug(item);
                              setShowSavedDrawer(false);
                              toast(`Loaded "${item.title}"`, 'success');
                            }}
                          >
                            Load in Studio
                          </button>
                          <button
                            type="button"
                            className="aid-btn-del"
                            onClick={() => {
                              const updated = savedDesigns.filter((d) => d.id !== item.id);
                              setSavedDesigns(updated);
                              localStorage.setItem('pakiza_saved_ai_designs', JSON.stringify(updated));
                              toast('Design removed from portfolio.', 'info');
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ════ CUSTOM QUOTE REQUEST MODAL ════ */}
      {showQuoteModal && (
        <div className="aid-modal-backdrop" onClick={() => setShowQuoteModal(false)}>
          <div className="aid-quote-modal" onClick={(e) => e.stopPropagation()}>
            <div className="aid-quote-modal__head">
              <div>
                <span className="eyebrow">BHADOHI WEAVER GUILD COMMISSIONS</span>
                <h3>Request Custom Quote</h3>
              </div>
              <button
                type="button"
                className="aid-close-btn"
                onClick={() => setShowQuoteModal(false)}
              >
                ✕
              </button>
            </div>

            {quoteSuccess ? (
              <div className="aid-quote-success">
                <div className="icon">✓</div>
                <h3>Bespoke Inquiry Received</h3>
                <p>
                  Our Master Atelier Loom Director will review your AI concept ({activeRug.title}) and contact you via WhatsApp / Phone with precise yarn sourcing details, CAD knot graph, and formal commission quotation within 24 hours.
                </p>
                <button
                  type="button"
                  className="aid-btn-done"
                  onClick={() => setShowQuoteModal(false)}
                >
                  Return to AI Studio
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuote} className="aid-quote-form">
                {/* Selected Rug Summary Pill */}
                <div className="aid-quote-preview-pill">
                  <img src={activeRug.image} alt="Commission Concept" />
                  <div>
                    <strong>{activeRug.title}</strong>
                    <span>{activeRug.style} • {activeRug.material} • {useCustomDim ? `${customWidthFt}'x${customLengthFt}' Custom` : activeRug.size}</span>
                  </div>
                </div>

                <div className="aid-quote-fields-grid">
                  <div className="aid-field">
                    <label>Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Saif Ali"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                    />
                  </div>

                  <div className="aid-field">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="client@example.com"
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                    />
                  </div>

                  <div className="aid-field">
                    <label>Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="aid-field">
                    <label>Destination City &amp; State</label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai, Maharashtra"
                      value={quoteForm.city}
                      onChange={(e) => setQuoteForm({ ...quoteForm, city: e.target.value })}
                    />
                  </div>

                  <div className="aid-field">
                    <label>Target Room Space</label>
                    <select
                      value={quoteForm.roomType}
                      onChange={(e) => setQuoteForm({ ...quoteForm, roomType: e.target.value })}
                    >
                      <option value="Living Room">Living Room</option>
                      <option value="Master Bedroom">Master Bedroom</option>
                      <option value="Formal Dining Salon">Formal Dining Salon</option>
                      <option value="Entry Foyer / Hallway">Entry Foyer / Hallway</option>
                      <option value="Executive Office">Executive Office</option>
                    </select>
                  </div>

                  <div className="aid-field">
                    <label>Production Preference</label>
                    <select
                      value={quoteForm.deliveryTimeline}
                      onChange={(e) => setQuoteForm({ ...quoteForm, deliveryTimeline: e.target.value })}
                    >
                      <option value="Standard Hand-Weaving (6-8 Weeks)">Standard Hand-Weaving (6–8 Weeks)</option>
                      <option value="Priority Loom Rush (4 Weeks)">Priority Loom Rush (4 Weeks)</option>
                      <option value="Master Heirloom Fine Knot (10-12 Weeks)">Master Heirloom Fine Knot (10–12 Weeks)</option>
                    </select>
                  </div>

                  <div className="aid-field full">
                    <label>Special Instructions / Architectural Notes (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="Add any specific color matching requests, sofa layout measurements or custom border requirements..."
                      value={quoteForm.notes}
                      onChange={(e) => setQuoteForm({ ...quoteForm, notes: e.target.value })}
                    />
                  </div>
                </div>

                <div className="aid-quote-modal__footer">
                  <button
                    type="button"
                    className="aid-btn-cancel-modal"
                    onClick={() => setShowQuoteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="aid-btn-submit-quote"
                    disabled={quoteSubmitting}
                  >
                    {quoteSubmitting ? 'Transmitting to Atelier...' : 'Submit Quote Request &rarr;'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
