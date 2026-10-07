import { useEffect, useState } from 'react';

let toastQueue = [];
let listeners = [];

function notify(listeners, toasts) {
  listeners.forEach(fn => fn([...toasts]));
}

export function toast(message, type = 'success', duration = 3500) {
  const id = Date.now() + Math.random();
  toastQueue = [...toastQueue, { id, message, type }];
  notify(listeners, toastQueue);
  setTimeout(() => {
    toastQueue = toastQueue.filter(t => t.id !== id);
    notify(listeners, toastQueue);
  }, duration);
}

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (t) => setToasts(t);
    listeners.push(handler);
    return () => { listeners = listeners.filter(fn => fn !== handler); };
  }, []);

  if (!toasts.length) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '24px', right: '24px',
      display: 'flex', flexDirection: 'column', gap: '10px',
      zIndex: 9999, maxWidth: '360px',
    }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '14px 18px', borderRadius: '12px', fontSize: '13.5px',
          fontWeight: '500', fontFamily: 'Inter, sans-serif',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          animation: 'slideInToast 0.3s ease',
          background: t.type === 'success' ? '#ffffff' : t.type === 'error' ? '#ffffff' : '#ffffff',
          border: `1px solid ${t.type === 'success' ? '#c9a84c' : t.type === 'error' ? '#fca5a5' : '#e5e7eb'}`,
          color: '#1b1b1b',
        }}>
          <span style={{ fontSize: '16px' }}>
            {t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'}
          </span>
          <span style={{ flex: 1 }}>{t.message}</span>
        </div>
      ))}
      <style>{`
        @keyframes slideInToast {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
