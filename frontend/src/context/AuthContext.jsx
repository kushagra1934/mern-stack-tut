// src/context/AuthContext.jsx (CORRECTED)
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../lib/axios.js";

const AuthContext = createContext();

export const useAuth = () => {
  // ... (no changes here)
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Initialize token from localStorage. We'll check the URL next.
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    // First, check for a token in the URL from the OAuth redirect.
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      // If a token is in the URL, store it and clean the URL.
      localStorage.setItem("token", urlToken);
      setToken(urlToken); // Set the token state
      // Clean up the URL so the token isn't visible
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []); // Run this check only once when the app loads.

  useEffect(() => {
    // This effect runs whenever the 'token' state changes.
    const checkAuth = async () => {
      if (token) {
        try {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await api.get("/auth/me");
          setUser(response.data.user);
          // Optional: After successful authentication, navigate to home.
          if (window.location.pathname === "/login") {
            navigate("/");
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
          delete api.defaults.headers.common["Authorization"];
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token, navigate]);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  };

  const logout = () => {
    // ... (no changes here)
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
