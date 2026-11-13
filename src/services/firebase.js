import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

function getStoredConfig() {
  try {
    const raw = localStorage.getItem('pakiza_firebase_config');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    }
  } catch {}
  return null;
}

export function resolveFirebaseConfig() {
  const stored = getStoredConfig();
  if (stored && stored.apiKey && stored.projectId) {
    return stored;
  }
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
  };
}

let activeApp = null;
let activeDb = null;

export function getFirebaseDb() {
  const cfg = resolveFirebaseConfig();
  if (!cfg.apiKey || !cfg.projectId || cfg.apiKey === "YOUR_API_KEY") {
    return null;
  }
  try {
    if (!getApps().length) {
      activeApp = initializeApp(cfg);
    } else {
      activeApp = getApp();
    }
    activeDb = getFirestore(activeApp);
    return activeDb;
  } catch (err) {
    console.error('Failed to get Firestore instance:', err);
    return null;
  }
}

export function saveFirebaseConfig(cfg) {
  try {
    localStorage.setItem('pakiza_firebase_config', JSON.stringify(cfg));
    if (cfg.apiKey && cfg.projectId) {
      try {
        if (!getApps().length) {
          activeApp = initializeApp(cfg);
        } else {
          activeApp = initializeApp(cfg, `pakiza_${Date.now()}`);
        }
        activeDb = getFirestore(activeApp);
      } catch (e) {
        console.warn("App re-init:", e);
      }
    }
    return true;
  } catch (err) {
    console.error('Error saving firebase config:', err);
    return false;
  }
}

export function clearFirebaseConfig() {
  try {
    localStorage.removeItem('pakiza_firebase_config');
    activeDb = null;
    return true;
  } catch {
    return false;
  }
}

export function isFirebaseReady() {
  const cfg = resolveFirebaseConfig();
  return Boolean(cfg.apiKey && cfg.projectId && cfg.apiKey.length > 5 && cfg.apiKey !== "YOUR_API_KEY");
}
