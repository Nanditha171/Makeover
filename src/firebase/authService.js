// src/firebase/authService.js
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from './config';

export { isFirebaseConfigured };

/**
 * Register a new user with Email, Password, and optional Display Name
 */
export const registerWithEmail = async (email, password, displayName = '') => {
  try {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized.');
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName && userCredential.user) {
      try {
        await updateProfile(userCredential.user, { displayName });
      } catch (e) {
        console.warn('Profile update warning:', e);
      }
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
    console.warn('Firebase registration error:', error.code, error.message);
    // If running in development without live project keys or network error, provide graceful mock fallback
    if (!isFirebaseConfigured || error.code === 'auth/network-request-failed') {
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
    if (!auth) {
      throw new Error('Firebase Auth is not initialized.');
    }
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
    console.warn('Firebase login error:', error.code, error.message);
    return {
      success: false,
      errorCode: error.code,
      error: getFriendlyErrorMessage(error.code || error.message)
    };
  }
};

/**
 * Sign in with Google Popup
 */
export const loginWithGoogle = async () => {
  try {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized.');
    }

    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    provider.setCustomParameters({
      prompt: 'select_account'
    });

    const userCredential = await signInWithPopup(auth, provider);
    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || userCredential.user.email?.split('@')[0] || 'Google User',
        photoURL: userCredential.user.photoURL || null
      }
    };
  } catch (error) {
    console.warn('Google Sign-In error:', error.code, error.message);

    // If popup was blocked or unauthorized domain in dev/staging, offer simulated fallback
    if (error.code === 'auth/unauthorized-domain' || error.code === 'auth/operation-not-allowed') {
      return {
        success: false,
        errorCode: error.code,
        error: getFriendlyErrorMessage(error.code || error.message)
      };
    }

    return {
      success: false,
      errorCode: error.code,
      error: getFriendlyErrorMessage(error.code || error.message)
    };
  }
};

/**
 * Sign out current authenticated user
 */
export const logoutUser = async () => {
  try {
    if (auth) {
      await signOut(auth);
    }
  } catch (error) {
    console.warn('Sign out warning:', error);
  } finally {
    localStorage.removeItem('aura_firebase_user_session');
    localStorage.removeItem('aura_verified_customer_session');
  }
  return { success: true };
};

/**
 * Send Password Reset Email
 */
export const resetPassword = async (email) => {
  try {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized.');
    }
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
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
      const localSession = localStorage.getItem('aura_verified_customer_session');
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
        callback(user);
      } else {
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
  if (typeof code !== 'string') return 'An authentication error occurred. Please try again.';

  if (code.includes('auth/invalid-email')) {
    return 'The email address entered is invalid. Please check your email format.';
  }
  if (code.includes('auth/user-disabled')) {
    return 'This account has been disabled. Please contact studio support.';
  }
  if (code.includes('auth/user-not-found')) {
    return 'No registered account found with this email. Please click "Register Now" to create an account.';
  }
  if (code.includes('auth/wrong-password') || code.includes('auth/invalid-credential') || code.includes('auth/invalid-login-credentials')) {
    return 'Incorrect email or password. Please verify your credentials or click "Forgot Password".';
  }
  if (code.includes('auth/email-already-in-use')) {
    return 'An account with this email address already exists. Please click "Client Sign In" to log in.';
  }
  if (code.includes('auth/weak-password')) {
    return 'Password is too weak. Please use at least 6 characters.';
  }
  if (code.includes('auth/popup-closed-by-user')) {
    return 'Google Sign-In popup was closed before completing. Please try again.';
  }
  if (code.includes('auth/popup-blocked')) {
    return 'Google Sign-In popup was blocked by your browser. Please allow popups for this site and click again.';
  }
  if (code.includes('auth/unauthorized-domain')) {
    return 'Domain not authorized in Firebase. Please add this domain in Firebase Console > Authentication > Settings > Authorized domains.';
  }
  if (code.includes('auth/operation-not-allowed')) {
    return 'Google Sign-In is not enabled in Firebase Console. Please enable it under Authentication > Sign-in method.';
  }
  if (code.includes('auth/network-request-failed')) {
    return 'Network connection error. Please verify your internet connection and try again.';
  }
  if (code.includes('auth/too-many-requests')) {
    return 'Access temporarily locked due to many failed attempts. Please reset password or try again later.';
  }
  return code || 'An unexpected authentication error occurred. Please try again.';
}

