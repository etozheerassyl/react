import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim(),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim(),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim(),
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET?.trim(),
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID?.trim(),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim(),
};

function isConfiguredValue(val) {
  return Boolean(val && !val.startsWith("your_"));
}

export const isFirebaseConfigured =
  isConfiguredValue(firebaseConfig.apiKey) &&
  isConfiguredValue(firebaseConfig.authDomain) &&
  isConfiguredValue(firebaseConfig.projectId) &&
  isConfiguredValue(firebaseConfig.appId);

let app = null;
let auth = null;
let googleProvider = null;

if (isFirebaseConfigured) {
  app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: "select_account" });

  // Ensure Firebase Auth sessions persist across browser refreshes and restarts
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.warn("Failed to set Firebase browserLocalPersistence:", err);
  });
}

export { app, auth, googleProvider };

