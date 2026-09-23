// src/firebase/config.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

/**
 * Firebase Configuration Object
 * Reads configuration from Vite environment variables (VITE_FIREBASE_*)
 * with safe fallbacks for development.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForDevelopmentAuraMakeup",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "aura-beauty-makeup.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "aura-beauty-makeup",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "aura-beauty-makeup.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef123456",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ""
};

// Check if user has supplied custom production environment credentials
export const isFirebaseConfigured = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  !import.meta.env.VITE_FIREBASE_API_KEY.includes('Dummy')
);

// Initialize Firebase App (singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firebase Analytics if supported in this environment
let analytics = null;
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
  isSupported().then(yes => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export { analytics };

// Google Auth Provider for social login
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;
