import { PlusIcon, LogOut, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl  p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            Note.io
          </h1>
          <div className="flex items-center gap-4">
            <Link
              to={"/create"}
              className="btn btn-outline btn-primary rounded-full"
            >
              <PlusIcon className="h-4 w-4" />
              <span>New Note</span>
            </Link>

            {user && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-sm">
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-600" />
                  )}
                  <span className="hidden md:inline">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-sm rounded-full"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
