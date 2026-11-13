import { useState, useEffect, useRef } from 'react';
import AdminLayout from './AdminLayout';
import { getWhatsAppNumber, setWhatsAppNumber } from '../../utils/whatsappOrder';
import { toast } from '../../utils/toast';
import {
  saveHeroVideoBlob,
  saveHeroVideoUrl,
  getHeroVideoSource,
  getHeroVideoMeta,
  resetHeroVideo
} from '../../utils/heroVideoStorage';

const PRESET_VIDEOS = [
  {
    id: 'default',
    title: 'Artisan Loom & Handcraft',
    subtitle: 'Original factory preset video',
    url: '/hero.mp4',
    badge: 'Original'
  },
  {
    id: 'persian-art',
    title: 'Persian Weaving Heritage',
    subtitle: 'High definition textile showcase',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-weaving-on-a-loom-42861-large.mp4',
    badge: 'Artisan'
  },
  {
    id: 'luxury-interior',
    title: 'Modern Architecture & Living Room',
    subtitle: 'Luxury interior aesthetics',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-living-room-with-cozy-furniture-43093-large.mp4',
    badge: 'Interior'
  }
];

export default function AdminSettings() {
  const [currentSrc, setCurrentSrc] = useState('/hero.mp4');
  const [videoMeta, setVideoMeta] = useState({ name: 'hero.mp4', size: '2.13 MB', updatedAt: 'Default' });
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url' | 'presets'
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [waNumber, setWaNumber] = useState(() => getWhatsAppNumber());
  const [waSaved, setWaSaved] = useState(false);
  const fileInputRef = useRef(null);
  const previewPlayerRef = useRef(null);

  const handleSaveWhatsApp = (e) => {
    e.preventDefault();
    const clean = setWhatsAppNumber(waNumber);
    setWaNumber(clean);
    setWaSaved(true);
    toast('✓ WhatsApp order receiver updated successfully!', 'success');
    setTimeout(() => setWaSaved(false), 3000);
  };

  const handleTestWhatsApp = () => {
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent('Hello Pakiza Rugs! This is a test message to verify order routing.')}`, '_blank');
  };

  useEffect(() => {
    loadCurrentVideo();
  }, []);

  const loadCurrentVideo = async () => {
    try {
      const src = await getHeroVideoSource();
      setCurrentSrc(src);
      setVideoMeta(getHeroVideoMeta());
    } catch (e) {
      console.error(e);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setMessage({ type: 'error', text: 'Please select a valid video file (.mp4, .webm).' });
      return;
    }

    setSelectedFile(file);
    const objUrl = URL.createObjectURL(file);
    setFilePreview(objUrl);
    setMessage(null);
  };

  const handleSaveUpload = async () => {
    if (!selectedFile) {
      setMessage({ type: 'error', text: 'Please select a video file first.' });
      return;
    }

    try {
      setSaving(true);
      await saveHeroVideoBlob(selectedFile);
      await loadCurrentVideo();
      setSelectedFile(null);
      setFilePreview('');
      setMessage({ type: 'success', text: 'Hero video updated successfully! Live on website now.' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save video: ' + err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveUrl = async (e) => {
    e.preventDefault();
    const trimmed = urlInput.trim();
    if (!trimmed) {
      setMessage({ type: 'error', text: 'Please enter a valid video URL.' });
      return;
    }

    try {
      setSaving(true);
      saveHeroVideoUrl(trimmed);
      await loadCurrentVideo();
      setUrlInput('');
      setMessage({ type: 'success', text: 'Hero video URL saved and updated on homepage!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to save video URL: ' + err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleApplyPreset = async (presetUrl, presetTitle) => {
    try {
      setSaving(true);
      if (presetUrl === '/hero.mp4') {
        await resetHeroVideo();
      } else {
        saveHeroVideoUrl(presetUrl);
      }
      await loadCurrentVideo();
      setMessage({ type: 'success', text: `Preset "${presetTitle}" applied successfully!` });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed applying preset: ' + err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('Reset hero background video to default factory video (hero.mp4)?')) return;
    try {
      setSaving(true);
      await resetHeroVideo();
      await loadCurrentVideo();
      setSelectedFile(null);
      setFilePreview('');
      setUrlInput('');
      setMessage({ type: 'success', text: 'Hero video restored to original default (/hero.mp4).' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed resetting video.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="adm-settings-page">
        {/* Header */}
        <div className="adm-dash-header">
          <div>
            <h1 className="adm-dash-title">Website Settings ⚙️</h1>
            <p className="adm-dash-subtitle">
              Manage your storefront hero background video, branding, and assets.
            </p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="adm-date-pill"
            style={{ textDecoration: 'none' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            <span>View Live Site</span>
          </a>
        </div>

        {/* Status Message */}
        {message && (
          <div
            style={{
              padding: '14px 18px',
              borderRadius: '12px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
              border: `1px solid ${message.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
              color: message.type === 'success' ? '#166534' : '#991b1b',
              fontSize: '13.5px',
              fontWeight: '500'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{message.type === 'success' ? '✓' : '⚠️'}</span>
              <span>{message.text}</span>
            </div>
            <button
              onClick={() => setMessage(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: 'inherit' }}
            >
              ×
            </button>
          </div>
        )}

        {/* ── WhatsApp Business Order Receiver Configuration ── */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #ede7df',
            padding: '24px',
            marginBottom: '28px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.77 14.16c-.24.68-1.2 1.25-1.68 1.3-.47.05-1.07.07-3.46-.92-2.88-1.19-4.73-4.14-4.87-4.33-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.66.5.24.58.82 2.01.9 2.16.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.79 1.3 1.7 2.11 1.17 1.04 2.15 1.36 2.46 1.51.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.84.87 2.16 1.03.32.16.53.24.61.37.08.13.08.77-.16 1.45z" />
                </svg>
              </div>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#2b0b14', margin: 0, fontFamily: 'Playfair Display, serif' }}>
                  WhatsApp Order Routing Number
                </h2>
                <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Active WhatsApp Order Gateway
                </div>
              </div>
            </div>

            <span style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '100px' }}>
              ● Ready to receive customer orders
            </span>
          </div>

          <p style={{ fontSize: '13px', color: '#786e64', margin: '0 0 18px 0', lineHeight: '1.5' }}>
            Whenever customers order via <strong>"Order on WhatsApp"</strong>, <strong>"Checkout via WhatsApp"</strong>, or <strong>"Bespoke Rug Studio"</strong>, their complete order slip, carpet size, price, and delivery address will be sent directly to this WhatsApp number.
          </p>

          <form onSubmit={handleSaveWhatsApp} style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d9d2c5', borderRadius: '10px', overflow: 'hidden', width: '320px', background: '#fff' }}>
              <span style={{ padding: '10px 14px', background: '#f5f0ea', color: '#666', fontSize: '13px', fontWeight: '600', borderRight: '1px solid #d9d2c5' }}>
                WhatsApp ID
              </span>
              <input
                type="text"
                value={waNumber}
                onChange={(e) => setWaNumber(e.target.value)}
                placeholder="e.g. 917007626680"
                style={{
                  border: 'none',
                  padding: '10px 14px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#2b0b14',
                  outline: 'none',
                  flex: 1
                }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#25d366',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '11px 22px',
                fontSize: '13.5px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
              }}
            >
              <span>{waSaved ? '✓ Saved!' : 'Save WhatsApp Number'}</span>
            </button>

            <button
              type="button"
              onClick={handleTestWhatsApp}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #d9d2c5',
                color: '#2b0b14',
                borderRadius: '10px',
                padding: '11px 18px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Test WhatsApp Ping
            </button>
          </form>
        </div>

        {/* Video Management Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', alignItems: 'start' }}>
          {/* Left Column: Manager & Controls */}
          <div className="adm-card">
            <div className="adm-card__header">
              <h2 className="adm-card__title">Hero Background Video</h2>
              <button
                onClick={handleReset}
                disabled={saving}
                style={{
                  background: 'transparent',
                  border: '1px solid #e5e0d8',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#736d66',
                  cursor: 'pointer'
                }}
              >
                Reset to Default
              </button>
            </div>

            {/* Current Video Info Banner */}
            <div
              style={{
                background: '#fbf9f6',
                border: '1px solid #ede8e0',
                borderRadius: '12px',
                padding: '14px 18px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '12px', color: '#8a8277', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Current Active Video
                </div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#1b1b1b', marginTop: '2px' }}>
                  {videoMeta.name}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="adm-status-badge adm-status-badge--delivered">
                  Active
                </span>
                <span style={{ fontSize: '12px', color: '#736d66' }}>{videoMeta.size}</span>
              </div>
            </div>

            {/* Tab Selector */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                borderBottom: '1px solid #ede8e0',
                paddingBottom: '12px',
                marginBottom: '20px'
              }}
            >
              {[
                { id: 'upload', label: 'Upload Video File' },
                { id: 'url', label: 'Direct Video URL' },
                { id: 'presets', label: 'Curated Presets' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setMessage(null); }}
                  style={{
                    background: activeTab === tab.id ? '#9d6e3f' : 'transparent',
                    color: activeTab === tab.id ? '#ffffff' : '#55504a',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Upload File */}
            {activeTab === 'upload' && (
              <div>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: '2px dashed #d6cfc5',
                    borderRadius: '14px',
                    padding: '36px 20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: '#faf8f5',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎬</div>
                  <div style={{ fontSize: '14.5px', fontWeight: '700', color: '#1b1b1b', marginBottom: '4px' }}>
                    {selectedFile ? selectedFile.name : 'Click or Drag Video to Upload'}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#8a8277' }}>
                    Supports MP4, WebM format (recommended 1080p, under 50MB)
                  </div>
                  {selectedFile && (
                    <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: '600', color: '#9d6e3f' }}>
                      Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB — Ready to apply
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                  <button
                    onClick={handleSaveUpload}
                    disabled={!selectedFile || saving}
                    style={{
                      backgroundColor: selectedFile ? '#9d6e3f' : '#d5cebe',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '11px 22px',
                      fontSize: '13.5px',
                      fontWeight: '600',
                      cursor: selectedFile && !saving ? 'pointer' : 'not-allowed',
                      boxShadow: selectedFile ? '0 4px 12px rgba(157, 110, 63, 0.3)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {saving ? 'Saving...' : 'Set as Hero Background'}
                  </button>
                  {selectedFile && (
                    <button
                      onClick={() => { setSelectedFile(null); setFilePreview(''); }}
                      style={{
                        background: 'transparent',
                        border: '1px solid #dcd7ce',
                        borderRadius: '10px',
                        padding: '11px 18px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        color: '#666'
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: URL Input */}
            {activeTab === 'url' && (
              <form onSubmit={handleSaveUrl}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                    Video URL (.mp4 / .webm link)
                  </label>
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/videos/luxury-rug-hero.mp4"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '10px',
                      border: '1px solid #ded8cf',
                      fontSize: '13.5px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <span style={{ fontSize: '11.5px', color: '#888', marginTop: '4px', display: 'block' }}>
                    You can paste direct MP4 links from Cloudinary, AWS S3, or any CDN.
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={saving || !urlInput.trim()}
                  style={{
                    backgroundColor: urlInput.trim() ? '#9d6e3f' : '#d5cebe',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '11px 22px',
                    fontSize: '13.5px',
                    fontWeight: '600',
                    cursor: urlInput.trim() && !saving ? 'pointer' : 'not-allowed',
                    boxShadow: '0 4px 12px rgba(157, 110, 63, 0.25)'
                  }}
                >
                  {saving ? 'Saving...' : 'Apply Video URL'}
                </button>
              </form>
            )}

            {/* Tab 3: Curated Presets */}
            {activeTab === 'presets' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {PRESET_VIDEOS.map((preset) => (
                  <div
                    key={preset.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '1px solid #ede8df',
                      backgroundColor: '#fbf9f6'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: '700', fontSize: '13.5px', color: '#1b1b1b' }}>
                          {preset.title}
                        </span>
                        <span style={{ fontSize: '10.5px', padding: '2px 8px', borderRadius: '12px', background: '#ece5db', color: '#685e52', fontWeight: '600' }}>
                          {preset.badge}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                        {preset.subtitle}
                      </div>
                    </div>
                    <button
                      onClick={() => handleApplyPreset(preset.url, preset.title)}
                      disabled={saving}
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #9d6e3f',
                        color: '#9d6e3f',
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '12.5px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Live Video Preview */}
          <div className="adm-card">
            <div className="adm-card__header">
              <h2 className="adm-card__title">Video Live Preview</h2>
              <span className="adm-status-badge adm-status-badge--processing">
                {filePreview ? 'Staged Preview' : 'Active on Storefront'}
              </span>
            </div>

            <div
              style={{
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                backgroundColor: '#000000',
                aspectRatio: '16/9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
              }}
            >
              <video
                ref={previewPlayerRef}
                key={filePreview || currentSrc}
                src={filePreview || currentSrc}
                controls
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Watermark badge on video */}
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(61, 12, 24, 0.75)',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '10.5px',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}
              >
                PAKIZA RUGS &amp; CO
              </div>
            </div>

            <div style={{ marginTop: '16px', fontSize: '12.5px', color: '#736d66', lineHeight: '1.5' }}>
              💡 <strong>Tip:</strong> The hero background automatically runs full-bleed with muted audio and infinite loop on the homepage, creating a cinematic luxury entrance.
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
