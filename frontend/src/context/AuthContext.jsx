// context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ Safe parse helper
  const getStoredUser = () => {
    try {
      const item = localStorage.getItem("user");
      if (!item || item === "undefined") return null;
      return JSON.parse(item);
    } catch {
      return null;
    }
  };

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => getStoredUser());
  const [role, setRole] = useState(() => getStoredUser()?.role || null);

  useEffect(() => {
    if (token) {
      const storedUser = getStoredUser();
      setUser(storedUser);
      setRole(storedUser?.role || null);
    } else {
      // clear state if token is missing
      setUser(null);
      setRole(null);
    }
  }, [token]);

  // 🟢 Login now expects: login(token, { role, ...otherUserData })
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(token);
    setUser(userData);
    setRole(userData?.role || null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setRole(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        role, // 🎯 Now exposed
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming AuthContext
export const useAuth = () => useContext(AuthContext);
