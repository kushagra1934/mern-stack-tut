// src/context/AuthContext.jsx (CORRECTED)

import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  // Effect 1: THIS IS THE NEW LOGIC TO FIX THE RACE CONDITION
  // It runs ONCE on app load to check for a token in the URL.
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      console.log("Found token in URL, setting it now.");
      // Set the token in state and local storage
      setToken(urlToken);
      localStorage.setItem("token", urlToken);
      // Clean the token from the URL for security
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []); // Empty array ensures this runs only once.

  // Effect 2: This validates the token whenever it changes.
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true); // Start loading when we check auth
      if (token) {
        try {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await api.get("/auth/me");
          setUser(response.data.user);
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
          delete api.defaults.headers.common["Authorization"];
        }
      }
      setLoading(false); // Stop loading after the check is complete
    };

    checkAuth();
  }, [token]); // This effect now correctly depends on the token.

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
