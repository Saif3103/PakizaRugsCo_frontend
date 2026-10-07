import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from '../utils/toast';
import { STYLE_PRESETS_MAP } from '../pages/AiRugDesignerPage';
import { generateRugWithGemini } from '../services/geminiRugService';
import './aiRugDesignerHomeSection.css';

const HOME_SUGGESTION_CHIPS = [
  'Oushak',
  'Persian',
  'Modern Minimal',
  'Floral',
  'Geometric',
  'Vintage',
  'Abstract',
  'Traditional'
];

export default function AiRugDesignerHomeSection() {
  const [prompt, setPrompt] = useState(
    'Create a beige and emerald green Oushak-style rug with traditional floral motifs, vintage distressed texture, and a cream border.'
  );
  const [activeRug, setActiveRug] = useState(STYLE_PRESETS_MAP.oushak);
  const [isWeaving, setIsWeaving] = useState(false);
  const [viewMode, setViewMode] = useState('studio'); // 'studio' | 'room'

  const handleChipClick = async (chip) => {
    const key = chip.toLowerCase().replace(/\s+/g, '');
    let matched = STYLE_PRESETS_MAP[key] || STYLE_PRESETS_MAP.oushak;
    if (chip === 'Modern Minimal') matched = STYLE_PRESETS_MAP.minimal;

    setPrompt(matched.defaultPrompt);
    setIsWeaving(true);

    try {
      const synthesized = await generateRugWithGemini(matched.defaultPrompt);
      setIsWeaving(false);
      setActiveRug(synthesized);
      toast(`✦ Loaded ${matched.style} concept!`, 'success');
    } catch {
      setIsWeaving(false);
      setActiveRug(matched);
    }
  };

  const handleCraft = async () => {
    if (!prompt.trim()) {
      toast('Please describe your desired rug design.', 'error');
      return;
    }

    setIsWeaving(true);
    try {
      const synthesized = await generateRugWithGemini(prompt);
      setIsWeaving(false);
      setActiveRug(synthesized);
      toast(synthesized.isGeminiPowered ? '✦ Gemini AI Crafted Your Custom Rug!' : '✦ Custom Rug Concept Crafted Successfully!', 'success');
    } catch {
      setIsWeaving(false);
      toast('Could not weave rug, using atelier specs.', 'info');
    }
  };

  return (
    <section className="home-ai-designer" id="ai-designer-section">
      <div className="wrap">
        {/* Section Editorial Header */}
        <div className="home-ai-header">
          <span className="home-ai-eyebrow">
            <span className="home-ai-dot" />
            PAKIZA BESPOKE ATELIER • HANDCRAFTED IN BHADOHI
          </span>
          <h2 className="home-ai-title">
            Design Your Custom Rug with Our <em>AI Atelier</em>
          </h2>
          <p className="home-ai-subtitle">
            Describe the carpet you envision for your room, or choose from our handcrafted master styles. Our master weavers in Bhadohi handcraft every design to your exact dimensions using pure New Zealand wool and bamboo silk.
          </p>
        </div>

        {/* Studio Interactive Card */}
        <div className="home-ai-card">
          {/* Top Prompt & Chips Bar */}
          <div className="home-ai-prompt-bar">
            <div className="home-ai-input-wrap">
              <input
                type="text"
                className="home-ai-input"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your dream rug... (e.g. A deep burgundy and warm ivory Persian heritage rug with dense arabesques)"
                disabled={isWeaving}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCraft();
                }}
              />
              <button
                type="button"
                className="home-ai-btn-craft"
                onClick={handleCraft}
                disabled={isWeaving}
              >
                {isWeaving ? (
                  <>
                    <span className="home-ai-spinner" />
                    <span>Weaving...</span>
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                    <span>Craft Custom Rug</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="home-ai-chips">
              <span className="home-ai-chips-label">Popular Styles:</span>
              <div className="home-ai-chips-list">
                {HOME_SUGGESTION_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className={`home-ai-chip ${activeRug.style.toLowerCase().includes(chip.toLowerCase()) ? 'active' : ''}`}
                    onClick={() => handleChipClick(chip)}
                    disabled={isWeaving}
                  >
                    + {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Workbench Grid: Left Visualizer, Right Specification Dossier */}
          <div className="home-ai-grid">
            {/* Left: Dual-mode Viewport */}
            <div className="home-ai-viewport-wrap">
              {/* Toolbar */}
              <div className="home-ai-toolbar">
                <div className="home-ai-view-toggle">
                  <button
                    type="button"
                    className={`home-ai-view-btn ${viewMode === 'studio' ? 'active' : ''}`}
                    onClick={() => setViewMode('studio')}
                  >
                    Studio Flatlay
                  </button>
                  <button
                    type="button"
                    className={`home-ai-view-btn ${viewMode === 'room' ? 'active' : ''}`}
                    onClick={() => setViewMode('room')}
                  >
                    See It In Room
                  </button>
                </div>

                <span className="home-ai-authenticity-tag">
                  ✦ 100% Hand-Spun Wool Texture
                </span>
              </div>

              {/* Visual Display Box */}
              <div className="home-ai-viewport">
                {isWeaving && (
                  <div className="home-ai-weaving-overlay">
                    <div className="home-ai-weaving-box">
                      <div className="home-ai-loom-shuttle" />
                      <h4>Weaving Design Preview</h4>
                      <p>Mapping Bhadohi knot geometry and wool luster...</p>
                    </div>
                  </div>
                )}

                {viewMode === 'studio' ? (
                  <div className="home-ai-flatlay-view">
                    <img
                      src={activeRug.image}
                      alt={activeRug.title}
                      className="home-ai-rug-img"
                    />
                  </div>
                ) : (
                  <div className="home-ai-room-view">
                    <img
                      src="/ai-designer/room-luxury-living.jpg"
                      alt="Luxury living room"
                      className="home-ai-room-bg"
                    />
                    <div className="home-ai-room-plane">
                      <img
                        src={activeRug.image}
                        alt={activeRug.title}
                        className="home-ai-room-rug"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Specifications & CTA Card */}
            <div className="home-ai-info-col">
              <div className="home-ai-spec-head">
                <span className="home-ai-spec-tag">ATELIER SPECIFICATION DOSSIER</span>
                <h3 className="home-ai-spec-title">{activeRug.title}</h3>
                <p className="home-ai-spec-desc">{activeRug.defaultPrompt || activeRug.prompt}</p>
              </div>

              <div className="home-ai-spec-details">
                <div className="home-ai-spec-row">
                  <span className="label">Craft Style</span>
                  <span className="val">{activeRug.style}</span>
                </div>
                <div className="home-ai-spec-row">
                  <span className="label">Loom Material</span>
                  <span className="val">{activeRug.material}</span>
                </div>
                <div className="home-ai-spec-row">
                  <span className="label">Recommended Dimensions</span>
                  <span className="val">{activeRug.size}</span>
                </div>
                <div className="home-ai-spec-row">
                  <span className="label">Pile &amp; Knot Depth</span>
                  <span className="val">{activeRug.pile}</span>
                </div>
                <div className="home-ai-spec-row">
                  <span className="label">Texture Architecture</span>
                  <span className="val">{activeRug.texture}</span>
                </div>
              </div>

              {/* Palette preview */}
              <div className="home-ai-palette-row">
                <span className="palette-label">Curated Palette:</span>
                <div className="palette-dots">
                  <span className="dot" style={{ backgroundColor: activeRug.primary }} title="Primary Field" />
                  <span className="dot" style={{ backgroundColor: activeRug.secondary }} title="Secondary Fillet" />
                  <span className="dot" style={{ backgroundColor: '#161c18' }} title="Charcoal Accent" />
                </div>
              </div>

              {/* CTAs */}
              <div className="home-ai-actions">
                <Link to="/ai-designer" className="home-ai-btn-studio">
                  Launch Full 3D Atelier Studio &rarr;
                </Link>
                <a
                  href={`https://wa.me/917007626680?text=Hello%20Pakiza%20Rugs,%20I%20would%20like%20to%20customize%20this%20design:%20${encodeURIComponent(activeRug.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="home-ai-btn-quote"
                >
                  Request Custom Quote on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
