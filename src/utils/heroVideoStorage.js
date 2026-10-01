/* ════════════════════════════════════════════════════════════════════════════
   HERO VIDEO STORAGE UTILITY (IndexedDB + LocalStorage)
   Handles uploaded video files (large blobs) safely without localStorage quota issues,
   as well as direct video URLs and default fallbacks.
   ════════════════════════════════════════════════════════════════════════════ */

const DB_NAME = 'PakizaRugsDB';
const DB_VERSION = 1;
const STORE_NAME = 'media_store';
const KEY_HERO = 'hero_video_blob';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveHeroVideoBlob(file) {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(file, KEY_HERO);
    await new Promise((resolve, reject) => {
      tx.oncomplete = resolve;
      tx.onerror = reject;
    });

    localStorage.setItem('pakiza_hero_video_mode', 'blob');
    localStorage.setItem('pakiza_hero_video_meta', JSON.stringify({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      updatedAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    }));

    window.dispatchEvent(new CustomEvent('pakiza_hero_video_changed'));
    return true;
  } catch (err) {
    console.error('Failed to save hero video blob:', err);
    throw err;
  }
}

export function saveHeroVideoUrl(url) {
  localStorage.setItem('pakiza_hero_video_mode', 'url');
  localStorage.setItem('pakiza_hero_video_url', url);
  localStorage.setItem('pakiza_hero_video_meta', JSON.stringify({
    name: url.split('/').pop() || 'External Video URL',
    size: 'Stream URL',
    updatedAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
  }));

  window.dispatchEvent(new CustomEvent('pakiza_hero_video_changed'));
}

export async function getHeroVideoSource() {
  const mode = localStorage.getItem('pakiza_hero_video_mode');

  if (mode === 'url') {
    const url = localStorage.getItem('pakiza_hero_video_url');
    if (url) return url;
  }

  if (mode === 'blob') {
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(KEY_HERO);
      const blob = await new Promise((resolve, reject) => {
        req.onsuccess = () => resolve(req.result);
        req.onerror = reject;
      });
      if (blob) {
        return URL.createObjectURL(blob);
      }
    } catch (e) {
      console.warn('Error reading video from IndexedDB, falling back to default:', e);
    }
  }

  return '/hero.mp4';
}

export async function resetHeroVideo() {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(KEY_HERO);
    await new Promise(r => { tx.oncomplete = r; });
  } catch (e) {
    console.warn('Error clearing IndexedDB:', e);
  }

  localStorage.removeItem('pakiza_hero_video_mode');
  localStorage.removeItem('pakiza_hero_video_url');
  localStorage.removeItem('pakiza_hero_video_meta');

  window.dispatchEvent(new CustomEvent('pakiza_hero_video_changed'));
  return '/hero.mp4';
}

export function getHeroVideoMeta() {
  const meta = localStorage.getItem('pakiza_hero_video_meta');
  if (meta) {
    try { return JSON.parse(meta); } catch (e) {}
  }
  return {
    name: 'hero.mp4 (Default Artisan Rug Weaving)',
    size: '2.13 MB',
    updatedAt: 'Factory Preset'
  };
}
