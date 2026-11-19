import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { isFirebaseConfigured } from "../firebase";
import {
  subscribeToAuthState,
  registerWithEmail,
  signInWithEmail,
  signInWithGoogle,
  logoutUser,
  formatAuthError,
} from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authActionLoading, setAuthActionLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((normalizedUser) => {
      setUser(normalizedUser);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  const signup = useCallback(async (email, password) => {
    setAuthActionLoading(true);
    setAuthError(null);
    try {
      const createdUser = await registerWithEmail(email, password);
      setUser(createdUser);
      return createdUser;
    } catch (err) {
      const message = formatAuthError(err);
      setAuthError(message);
      throw new Error(message);
    } finally {
      setAuthActionLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setAuthActionLoading(true);
    setAuthError(null);
    try {
      const signedInUser = await signInWithEmail(email, password);
      setUser(signedInUser);
      return signedInUser;
    } catch (err) {
      const message = formatAuthError(err);
      setAuthError(message);
      throw new Error(message);
    } finally {
      setAuthActionLoading(false);
    }
  }, []);

  const loginWithGoogle = useCallback(async () => {
    setAuthActionLoading(true);
    setAuthError(null);
    try {
      const signedInUser = await signInWithGoogle();
      setUser(signedInUser);
      return signedInUser;
    } catch (err) {
      const message = formatAuthError(err);
      setAuthError(message);
      throw new Error(message);
    } finally {
      setAuthActionLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setAuthActionLoading(true);
    setAuthError(null);
    try {
      await logoutUser();
      setUser(null);
    } catch (err) {
      const message = formatAuthError(err);
      setAuthError(message);
      throw new Error(message);
    } finally {
      setAuthActionLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      authLoading,
      loading: authLoading,
      authActionLoading,
      authError,
      error: authError,
      isFirebaseConfigured,
      signup,
      login,
      loginWithGoogle,
      logout,
      clearAuthError,
    }),
    [
      user,
      authLoading,
      authActionLoading,
      authError,
      signup,
      login,
      loginWithGoogle,
      logout,
      clearAuthError,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

