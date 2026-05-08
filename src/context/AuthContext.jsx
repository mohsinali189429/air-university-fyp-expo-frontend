import { createContext, useContext, useMemo, useState } from "react";
import {
  clearAuthSession,
  getAuthToken,
  getAuthUser,
  saveAuthSession,
} from "../utils/authStorage.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getAuthToken());
  const [user, setUser] = useState(() => getAuthUser());

  function login(nextToken, nextUser) {
    saveAuthSession(nextToken, nextUser);
    setToken(nextToken);
    setUser(nextUser);
  }

  function logout() {
    clearAuthSession();
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isAdmin: user?.role === "admin",
      login,
      logout,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
