// src/firebase/userService.js
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
  updateDoc
} from 'firebase/firestore';
import app, { isFirebaseConfigured } from './config';

// Initialize Firestore
export const db = isFirebaseConfigured ? getFirestore(app) : null;

const STORAGE_USERS_KEY = 'aura_registered_users_db';
const STORAGE_OTP_KEY = 'aura_otp_store';

// Default initial client records for demonstration
const initialDemoUsers = [
  {
    uid: 'demo_user_1',
    fullName: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98765 43210',
    createdAt: '2026-03-15T10:30:00.000Z',
    isVerified: true,
    verifiedAt: '2026-03-15T10:32:15.000Z',
    lastLoginAt: '2026-03-22T14:20:00.000Z',
    authProvider: 'email',
    status: 'Active',
    role: 'client'
  },
  {
    uid: 'demo_user_2',
    fullName: 'Pooja Reddy',
    email: 'pooja.reddy@gmail.com',
    phone: '+91 91234 56780',
    createdAt: '2026-03-18T16:45:00.000Z',
    isVerified: true,
    verifiedAt: '2026-03-18T16:47:00.000Z',
    lastLoginAt: '2026-03-23T09:15:00.000Z',
    authProvider: 'google',
    status: 'Active',
    role: 'client'
  },
  {
    uid: 'demo_user_3',
    fullName: 'Sneha Patel',
    email: 'sneha.patel@outlook.com',
    phone: '+91 99887 76655',
    createdAt: '2026-03-20T11:10:00.000Z',
    isVerified: false,
    verifiedAt: null,
    lastLoginAt: '2026-03-20T11:10:00.000Z',
    authProvider: 'email',
    status: 'Pending Verification',
    role: 'client'
  }
];

/**
 * Get all registered users from Firestore or LocalStorage
 */
export const getAllUsers = async () => {
  let localUsers = [];
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (raw) {
      localUsers = JSON.parse(raw);
    } else {
      localUsers = initialDemoUsers;
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(localUsers));
    }
  } catch (err) {
    localUsers = initialDemoUsers;
  }

  // If live Firestore is available, attempt to fetch latest collection
  if (db) {
    try {
      const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const firestoreUsers = snapshot.docs.map(d => ({ uid: d.id, ...d.data() }));
        // Merge with local records
        const userMap = new Map();
        [...localUsers, ...firestoreUsers].forEach(u => userMap.set(u.uid || u.email, u));
        const merged = Array.from(userMap.values());
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(merged));
        return merged;
      }
    } catch (err) {
      console.warn('Firestore fetch fallback to local cache:', err.message);
    }
  }

  return localUsers;
};

/**
 * Save / Update User Profile in Firestore & Local Cache
 */
export const saveUserProfile = async (userData) => {
  const profile = {
    uid: userData.uid,
    fullName: userData.fullName || userData.displayName || 'Valued Client',
    email: userData.email,
    phone: userData.phone || '',
    createdAt: userData.createdAt || new Date().toISOString(),
    isVerified: Boolean(userData.isVerified),
    verifiedAt: userData.verifiedAt || (userData.isVerified ? new Date().toISOString() : null),
    lastLoginAt: new Date().toISOString(),
    authProvider: userData.authProvider || 'email',
    status: userData.status || (userData.isVerified ? 'Active' : 'Pending Verification'),
    role: userData.role || 'client'
  };

  // 1. Update local storage cache immediately
  try {
    const currentUsers = await getAllUsers();
    const index = currentUsers.findIndex(u => u.uid === profile.uid || u.email === profile.email);
    if (index >= 0) {
      currentUsers[index] = { ...currentUsers[index], ...profile };
    } else {
      currentUsers.unshift(profile);
    }
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(currentUsers));
  } catch (err) {
    console.error('Failed to update local user cache:', err);
  }

  // 2. Persist to Firestore if available
  if (db && profile.uid) {
    try {
      await setDoc(doc(db, 'users', profile.uid), profile, { merge: true });
    } catch (err) {
      console.warn('Firestore write warning:', err.message);
    }
  }

  return profile;
};

/**
 * Retrieve User Profile by UID or Email
 */
export const getUserProfile = async (uidOrEmail) => {
  if (!uidOrEmail) return null;

  // Check Firestore first if available
  if (db && !uidOrEmail.includes('@')) {
    try {
      const snap = await getDoc(doc(db, 'users', uidOrEmail));
      if (snap.exists()) {
        return { uid: snap.id, ...snap.data() };
      }
    } catch (err) {
      console.warn('Firestore getDoc warning:', err.message);
    }
  }

  // Lookup in local cache
  const users = await getAllUsers();
  return users.find(u => u.uid === uidOrEmail || u.email?.toLowerCase() === uidOrEmail.toLowerCase()) || null;
};

/**
 * Mark User Account as Verified
 */
export const markUserAsVerified = async (uidOrEmail) => {
  const users = await getAllUsers();
  const user = users.find(u => u.uid === uidOrEmail || u.email?.toLowerCase() === uidOrEmail?.toLowerCase());

  if (user) {
    user.isVerified = true;
    user.verifiedAt = new Date().toISOString();
    user.status = 'Active';
    await saveUserProfile(user);
    return user;
  }
  return null;
};

/**
 * Generate and Dispatch a 6-digit OTP for Email / Mobile
 * Expiration duration: 60 seconds
 */
export const generateOTP = (identifier) => {
  if (!identifier) return null;
  const key = identifier.trim().toLowerCase();

  // Generate 6-digit numerical OTP code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 60 * 1000; // 60 seconds validity

  const otpRecord = {
    code,
    identifier: key,
    expiresAt,
    attempts: 0
  };

  try {
    const raw = localStorage.getItem(STORAGE_OTP_KEY) || '{}';
    const store = JSON.parse(raw);
    store[key] = otpRecord;
    localStorage.setItem(STORAGE_OTP_KEY, JSON.stringify(store));
  } catch (err) {
    console.error('Error storing OTP:', err);
  }

  // In a live production backend, this would trigger an SMS / Email gateway
  console.log(`[AURA OTP SERVICE] Generated OTP for ${key}: ${code} (Expires in 60s)`);

  return {
    code,
    expiresAt,
    validitySeconds: 60
  };
};

/**
 * Verify Entered OTP
 */
export const verifyEnteredOTP = (identifier, enteredCode) => {
  if (!identifier || !enteredCode) {
    return { success: false, message: 'Please enter the 6-digit verification code.' };
  }

  const key = identifier.trim().toLowerCase();
  const cleanCode = enteredCode.toString().trim();

  try {
    const raw = localStorage.getItem(STORAGE_OTP_KEY) || '{}';
    const store = JSON.parse(raw);
    const record = store[key];

    // Check if test master OTP is used for convenience (e.g. 123456)
    if (cleanCode === '123456') {
      return { success: true, message: 'OTP verified successfully.' };
    }

    if (!record) {
      return { success: false, message: 'No active OTP found. Please request a new code.' };
    }

    if (Date.now() > record.expiresAt) {
      return { success: false, isExpired: true, message: 'Verification code has expired. Please click "Resend Code".' };
    }

    if (record.code !== cleanCode) {
      record.attempts = (record.attempts || 0) + 1;
      store[key] = record;
      localStorage.setItem(STORAGE_OTP_KEY, JSON.stringify(store));
      return { success: false, message: 'Incorrect OTP code. Please check and try again.' };
    }

    // Success: Remove used OTP
    delete store[key];
    localStorage.setItem(STORAGE_OTP_KEY, JSON.stringify(store));

    return { success: true, message: 'OTP verified successfully.' };
  } catch (err) {
    return { success: false, message: 'Failed to verify OTP. Please try again.' };
  }
};
