// src/firebase/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from './config';

export { isFirebaseConfigured };

/**
 * Register a new user with Email, Password, and optional Display Name
 */
export const registerWithEmail = async (email, password, displayName = '') => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: displayName || userCredential.user.displayName || email.split('@')[0],
        photoURL: userCredential.user.photoURL || null
      }
    };
  } catch (error) {
    // If running in development without live project keys, provide friendly mock fallback
    if (!isFirebaseConfigured) {
      const mockUser = {
        uid: `user_${Date.now()}`,
        email,
        displayName: displayName || email.split('@')[0],
        photoURL: null
      };
      localStorage.setItem('aura_firebase_user_session', JSON.stringify(mockUser));
      return { success: true, user: mockUser };
    }
    return {
      success: false,
      error: getFriendlyErrorMessage(error.code || error.message)
    };
  }
};

/**
 * Sign in an existing user with Email and Password
 */
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || email.split('@')[0],
        photoURL: userCredential.user.photoURL || null
      }
    };
  } catch (error) {
    // If running in development without live project keys, provide friendly mock fallback
    if (!isFirebaseConfigured) {
      const mockUser = {
        uid: `user_${Date.now()}`,
        email,
        displayName: email.split('@')[0],
        photoURL: null
      };
      localStorage.setItem('aura_firebase_user_session', JSON.stringify(mockUser));
      return { success: true, user: mockUser };
    }
    return {
      success: false,
      error: getFriendlyErrorMessage(error.code || error.message)
    };
  }
};

/**
 * Sign in with Google Popup
 */
export const loginWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL
      }
    };
  } catch (error) {
    if (!isFirebaseConfigured) {
      const mockUser = {
        uid: `google_user_${Date.now()}`,
        email: 'google.client@example.com',
        displayName: 'Google Client',
        photoURL: null
      };
      localStorage.setItem('aura_firebase_user_session', JSON.stringify(mockUser));
      return { success: true, user: mockUser };
    }
    return {
      success: false,
      error: getFriendlyErrorMessage(error.code || error.message)
    };
  }
};

/**
 * Sign out current authenticated user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem('aura_firebase_user_session');
    return { success: true };
  } catch (error) {
    localStorage.removeItem('aura_firebase_user_session');
    return { success: true };
  }
};

/**
 * Send Password Reset Email
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    if (!isFirebaseConfigured) {
      return { success: true };
    }
    return {
      success: false,
      error: getFriendlyErrorMessage(error.code || error.message)
    };
  }
};

/**
 * Subscribe to Firebase Auth State Changes with persistence
 */
export const subscribeToAuthChanges = (callback) => {
  if (!auth) {
    try {
      const localSession = localStorage.getItem('aura_firebase_user_session');
      if (localSession) {
        callback(JSON.parse(localSession));
      } else {
        callback(null);
      }
    } catch {}
    return () => {};
  }

  try {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Client',
          photoURL: firebaseUser.photoURL || null
        };
        localStorage.setItem('aura_firebase_user_session', JSON.stringify(user));
        callback(user);
      } else {
        try {
          const localSession = localStorage.getItem('aura_firebase_user_session');
          if (localSession && !isFirebaseConfigured) {
            callback(JSON.parse(localSession));
            return;
          }
        } catch {}
        callback(null);
      }
    }, (error) => {
      console.warn('onAuthStateChanged error:', error);
      callback(null);
    });

    return unsubscribe;
  } catch (err) {
    console.warn('Failed to attach auth listener:', err);
    return () => {};
  }
};

/**
 * Map Firebase Auth Error codes to clear user-friendly messages
 */
function getFriendlyErrorMessage(code) {
  if (code.includes('auth/invalid-email')) return 'The email address entered is invalid.';
  if (code.includes('auth/user-disabled')) return 'This user account has been disabled.';
  if (code.includes('auth/user-not-found')) return 'No account found with this email address.';
  if (code.includes('auth/wrong-password') || code.includes('auth/invalid-credential')) {
    return 'Incorrect email or password. Please verify your credentials.';
  }
  if (code.includes('auth/email-already-in-use')) {
    return 'An account with this email address already exists. Please log in.';
  }
  if (code.includes('auth/weak-password')) {
    return 'Password is too weak. Please use at least 6 characters.';
  }
  if (code.includes('auth/popup-closed-by-user')) {
    return 'Google Sign-In popup was closed before completing.';
  }
  if (code.includes('auth/network-request-failed')) {
    return 'Network error. Please check your internet connection.';
  }
  return code || 'An authentication error occurred. Please try again.';
}
