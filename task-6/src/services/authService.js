import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "../firebase";

const FIREBASE_ERROR_MESSAGES = {
  "auth/invalid-credential": "Invalid email or password. Please verify your credentials.",
  "auth/user-not-found": "No operator account found for this email address.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/email-already-in-use": "An account with this email address already exists.",
  "auth/weak-password": "Password must be at least 6 characters long.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/too-many-requests": "Too many failed attempts. Please wait a moment and try again.",
  "auth/popup-closed-by-user": "Google sign-in popup was closed before completing.",
  "auth/cancelled-popup-request": "Google sign-in request was superseded by a newer request.",
  "auth/popup-blocked": "Popup was blocked by the browser. Allow popups for this site and retry.",
  "auth/operation-not-allowed": "This sign-in provider is not enabled in Firebase Authentication.",
  "auth/unauthorized-domain": "This domain is not authorized in Firebase Console -> Authentication -> Settings -> Authorized domains.",
  "auth/network-request-failed": "Network error while contacting Firebase Authentication.",
  "auth/invalid-api-key": "Invalid Firebase API key. Check your VITE_FIREBASE_* environment variables.",
};

export function formatAuthError(error) {
  if (!error) return "An unknown authentication error occurred.";
  if (error.code && FIREBASE_ERROR_MESSAGES[error.code]) {
    return FIREBASE_ERROR_MESSAGES[error.code];
  }
  return error.message || "Authentication failed. Please try again.";
}

export function normalizeFirebaseUser(firebaseUser) {
  if (!firebaseUser) return null;

  const primaryProvider =
    firebaseUser.providerData?.[0]?.providerId || "password";

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email || "No email provided",
    displayName: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Operator",
    photoURL: firebaseUser.photoURL || null,
    emailVerified: Boolean(firebaseUser.emailVerified),
    providerId: primaryProvider,
    creationTime: firebaseUser.metadata?.creationTime || null,
    lastSignInTime: firebaseUser.metadata?.lastSignInTime || null,
  };
}

function assertFirebaseReady() {
  if (!isFirebaseConfigured || !auth) {
    const err = new Error(
      "Firebase is not configured. Populate VITE_FIREBASE_* variables in .env.local (see .env.example)."
    );
    err.code = "auth/not-configured";
    throw err;
  }
}

export function subscribeToAuthState(callback) {
  if (!isFirebaseConfigured || !auth) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(auth, (firebaseUser) => {
    callback(normalizeFirebaseUser(firebaseUser));
  });
}

export async function registerWithEmail(email, password) {
  assertFirebaseReady();
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  return normalizeFirebaseUser(credential.user);
}

export async function signInWithEmail(email, password) {
  assertFirebaseReady();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return normalizeFirebaseUser(credential.user);
}

export async function signInWithGoogle() {
  assertFirebaseReady();
  const credential = await signInWithPopup(auth, googleProvider);
  return normalizeFirebaseUser(credential.user);
}

export async function logoutUser() {
  if (!isFirebaseConfigured || !auth) return;
  await signOut(auth);
}

