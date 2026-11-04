import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "aegis_auth_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (userData) => {
    const userProfile = {
      username: userData.username || "Cmdr. Yerassyl",
      role: userData.role || "Lead Systems Architect",
      clearance: userData.clearance || "Class 5 - Restricted",
      token: "jwt_simulated_token_" + Date.now(),
      loginTime: new Date().toLocaleTimeString(),
    };
    setUser(userProfile);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userProfile));
    return userProfile;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

