import React from "react";
import { Link } from "react-router-dom";

function PublicNavBar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-emerald-600">
              Posted
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
             
              <Link
                to="/contact"
                className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-emerald-600 hover:text-emerald-800 px-4 py-2 rounded-md text-sm font-medium"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition-colors duration-200"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PublicNavBar;
