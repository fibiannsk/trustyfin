import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "../hooks/use-toast";

// Create the context
const AuthContext = createContext();

// Hook for consuming it easily
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { toast } = useToast();

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null); // minimal user info after login
  const [loading, setLoading] = useState(false);

  // Save token to localStorage when changed
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      setToken(data.token); // store JWT
      setUser(data.user);   // optional: store user info
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.user?.name || "User"}!`,
      });
    } catch (err) {
      toast({
        title: "Login failed",
        description: err.message || "Unable to log in",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Logout function (with redirect)
  const logout = () => {
    setToken(null);
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been signed out successfully.",
    });

    // ✅ Redirect to login page
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
