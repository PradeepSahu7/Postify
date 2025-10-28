import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction } from "../../Redux/slices/users/userSlice";
import SuccessMsg from "../Alert/SuccessMsg";
import { Link, useNavigate } from "react-router-dom";

function PrivateNavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state.users);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    console.log("logout called");
    dispatch(logOutAction());
    window.location.reload(); // allow us to reload the page
  };

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
                to="/add-post"
                className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Create Post
              </Link>
              <Link
                to="/postlist"
                className="text-gray-700 hover:text-emerald-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                posts
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium">
                    {userAuth?.userInfo?.username
                      ? userAuth.userInfo.username[0].toUpperCase()
                      : "U"}
                  </div>
                </button>
              </div>

              {isMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <Link
                    to="/user-profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PrivateNavBar;
