// src/pages/LoginPage.jsx (CORRECTED)

import React from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";
const LoginPage = () => {

  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  // This is now the only function needed here.
  const handleGoogleLogin = () => {
    window.location.href = "https://note-io.onrender.com/api/auth/google";
  };

  // THE useEffect LOGIC HAS BEEN COMPLETELY REMOVED FROM THIS FILE.

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <button
              onClick={handleGoogleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {/* Your SVG Icon */}
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
