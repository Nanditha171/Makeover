// src/firebase/config.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

/**
 * Firebase Configuration Object
 * Reads configuration from Vite environment variables (VITE_FIREBASE_*)
 * with project defaults for live deployment fallback.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCmHc384j73D7GwV6PLipaDt1_gauHDeDs",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "makeup-90bc3.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "makeup-90bc3",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "makeup-90bc3.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1011857524421",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1011857524421:web:9ddad7815fd06ac86012ac",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-ESWKPSMBTL"
};

export const isFirebaseConfigured = true;

// Initialize Firebase App safely
let app = null;
try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
} catch (e) {
  console.warn('Firebase initializeApp warning:', e);
}

// Initialize Firebase Authentication safely
let auth = null;
try {
  if (app) {
    auth = getAuth(app);
  }
} catch (e) {
  console.warn('Firebase getAuth warning:', e);
}

export { auth };

// Initialize Firebase Analytics if supported
let analytics = null;
if (typeof window !== 'undefined' && app && firebaseConfig.measurementId) {
  try {
    isSupported().then(yes => {
      if (yes) {
        analytics = getAnalytics(app);
      }
    }).catch(() => {});
  } catch (e) {}
}

export { analytics };

// Google Auth Provider for social login
let googleProvider = null;
try {
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
} catch (e) {}

export { googleProvider };

export default app;
