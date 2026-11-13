import { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { toast } from '../../utils/toast';

export default function FirebaseModal({ isOpen, onClose }) {
  const {
    cloudConnected,
    isCloudSyncing,
    connectFirebase,
    disconnectFirebase,
    syncLocalToCloud,
    resolveFirebaseConfig,
    products
  } = useProducts();

  const currentCfg = resolveFirebaseConfig() || {};
  const [configInput, setConfigInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('connect'); // 'connect' | 'guide'

  if (!isOpen) return null;

  // Helper to intelligently parse loose JS or JSON pasted from Firebase console
  const parseConfigString = (raw) => {
    const text = raw.trim();
    if (!text) return null;

    // Try JSON parse first
    try {
      const parsed = JSON.parse(text);
      if (parsed && (parsed.apiKey || parsed.projectId)) return parsed;
    } catch {
      // Fallback: regex extraction from JS code snippet
      const extract = (key) => {
        const regex = new RegExp(`${key}\\s*:\\s*["']([^"']+)["']`, 'i');
        const match = text.match(regex);
        return match ? match[1].trim() : '';
      };

      const apiKey = extract('apiKey');
      const projectId = extract('projectId');
      if (apiKey && projectId) {
        return {
          apiKey,
          authDomain: extract('authDomain'),
          projectId,
          storageBucket: extract('storageBucket'),
          messagingSenderId: extract('messagingSenderId'),
          appId: extract('appId'),
        };
      }
    }
    return null;
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    const cfg = parseConfigString(configInput);
    if (!cfg || !cfg.apiKey || !cfg.projectId) {
      toast('Invalid Firebase config! Please ensure apiKey and projectId are present.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = connectFirebase(cfg);
      if (success) {
        toast('Firebase connected successfully! Real-time all-device sync active.', 'success');
        // If there are existing local products, automatically offer/prompt upload
        if (products.length > 0) {
          syncLocalToCloud();
          toast(`Uploaded ${products.length} existing products to Firestore cloud!`, 'success');
        }
        onClose();
      } else {
        toast('Failed to save Firebase configuration.', 'error');
      }
    } catch (err) {
      toast('Connection error: ' + (err.message || 'Unknown error'), 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleManualUpload = async () => {
    setIsSubmitting(true);
    try {
      const res = await syncLocalToCloud();
      if (res.success) {
        toast(`Synced ${res.count} product(s) to Firestore cloud database!`, 'success');
      } else {
        toast(res.error || 'Sync failed', 'error');
      }
    } catch (err) {
      toast('Upload failed: ' + err.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDisconnect = () => {
    if (window.confirm('Are you sure you want to disconnect Firebase from this browser?')) {
      disconnectFirebase();
      toast('Firebase disconnected. Operating in offline/local mode.', 'info');
    }
  };

  return (
    <div className="adm-modal-overlay" style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(12, 19, 15, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        maxWidth: '580px',
        width: '100%',
        boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
        border: '1px solid #e7ded0',
        overflow: 'hidden',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 28px',
          background: 'linear-gradient(135deg, #172820 0%, #0d1712 100%)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontSize: '20px' }}>🔥</span>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em', color: '#f3eedf' }}>
                Firebase Cloud Database
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '13px', color: '#a2b3a9' }}>
              Real-time synchronization for Laptop, Phone & All Customers
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#ffffff',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>

        {/* Status Bar */}
        <div style={{
          padding: '12px 28px',
          background: cloudConnected ? '#ecfdf5' : '#fffbeb',
          borderBottom: `1px solid ${cloudConnected ? '#a7f3d0' : '#fde68a'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: cloudConnected ? '#10b981' : '#f59e0b',
              boxShadow: cloudConnected ? '0 0 10px #10b981' : 'none'
            }} />
            <span style={{
              fontSize: '13px',
              fontWeight: 600,
              color: cloudConnected ? '#065f46' : '#92400e'
            }}>
              {cloudConnected
                ? (isCloudSyncing ? 'Connecting & Syncing...' : `Connected: ${currentCfg.projectId || 'Live Firestore'}`)
                : 'Status: Setup Required (Not Connected)'}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('connect')}
              style={{
                background: activeTab === 'connect' ? '#ffffff' : 'transparent',
                border: '1px solid #dcd3c4',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Config
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              style={{
                background: activeTab === 'guide' ? '#ffffff' : 'transparent',
                border: '1px solid #dcd3c4',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              How to setup (1 min)
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px 28px', maxHeight: '65vh', overflowY: 'auto' }}>
          {activeTab === 'guide' ? (
            <div style={{ fontSize: '13px', lineHeight: '1.6', color: '#374151' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '15px', color: '#172820' }}>
                Quick 3-Step Setup (100% Free):
              </h4>
              <ol style={{ paddingLeft: '20px', margin: '0 0 16px' }}>
                <li style={{ marginBottom: '8px' }}>
                  Open{' '}
                  <a
                    href="https://console.firebase.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#9d6e3f', fontWeight: 600, textDecoration: 'underline' }}
                  >
                    console.firebase.google.com ↗
                  </a>{' '}
                  and click <strong>"Create a project"</strong> (Name it <em>Pakiza Rugs</em>).
                </li>
                <li style={{ marginBottom: '8px' }}>
                  Under <strong>Build → Firestore Database</strong>, click <strong>"Create database"</strong> and select <strong>"Start in test mode"</strong>.
                </li>
                <li style={{ marginBottom: '8px' }}>
                  In Project Settings (Gear icon ⚙️), scroll down to <strong>"Your apps"</strong>, click the <strong>Web (&lt;/&gt;)</strong> icon, and copy the <strong>firebaseConfig</strong> code snippet.
                </li>
              </ol>
              <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
                💡 <strong>Tip:</strong> You can copy the entire code box from Firebase and directly paste it into the Config tab. Our system automatically extracts the keys!
              </div>
            </div>
          ) : (
            <form onSubmit={handleConnect}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1f2937', marginBottom: '6px' }}>
                  Paste Firebase Config Code or JSON:
                </label>
                <textarea
                  value={configInput}
                  onChange={(e) => setConfigInput(e.target.value)}
                  placeholder={`const firebaseConfig = {\n  apiKey: "AIzaSy...",\n  authDomain: "pakiza-rugs.firebaseapp.com",\n  projectId: "pakiza-rugs",\n  storageBucket: "pakiza-rugs.appspot.com",\n  messagingSenderId: "...",\n  appId: "..."\n};`}
                  rows={7}
                  style={{
                    width: '100%',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    outline: 'none',
                    resize: 'vertical',
                    background: '#fafaf9',
                    boxSizing: 'border-box'
                  }}
                />
                <span style={{ fontSize: '11px', color: '#6b7280', display: 'block', marginTop: '4px' }}>
                  You can paste either the full JavaScript snippet from Firebase or plain JSON.
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
                <button
                  type="submit"
                  disabled={isSubmitting || !configInput.trim()}
                  style={{
                    flex: 1,
                    background: '#172820',
                    color: '#e5be7a',
                    border: '1px solid #c5a059',
                    padding: '11px 18px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: (!configInput.trim() || isSubmitting) ? 'not-allowed' : 'pointer',
                    opacity: (!configInput.trim() || isSubmitting) ? 0.6 : 1
                  }}
                >
                  {isSubmitting ? 'Connecting...' : '🔥 Save & Connect Firebase'}
                </button>

                {cloudConnected && (
                  <>
                    <button
                      type="button"
                      onClick={handleManualUpload}
                      disabled={isSubmitting}
                      style={{
                        background: '#fbf5eb',
                        color: '#9d6e3f',
                        border: '1px solid #ebdcc4',
                        padding: '11px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                      title="Upload local products to Firebase"
                    >
                      ☁️ Upload Local ({products.length})
                    </button>
                    <button
                      type="button"
                      onClick={handleDisconnect}
                      style={{
                        background: '#fef2f2',
                        color: '#b91c1c',
                        border: '1px solid #fecaca',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Disconnect
                    </button>
                  </>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div style={{
          padding: '14px 28px',
          background: '#f9fafb',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#6b7280'
        }}>
          <span>📱 Once connected, any product added anywhere reflects on all phones instantly.</span>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#374151',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
