import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Register from "../Users/Register";
import PublicPost from "../posts/PublicPost";

function Home() {
  const { userAuth } = useSelector((state) => state.users);
  const isLoggedIn = userAuth?.userInfo?.token;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="pt-16 pb-20 md:pt-24 md:pb-28 flex flex-col-reverse md:flex-row items-center">
            {/* Left Column - Text Content */}
            <div className="md:w-1/2 mt-10 md:mt-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                <span className="block">Share your thoughts</span>
                <span className="block text-emerald-600">with the world</span>
              </h1>
              <p className="mt-5 text-lg text-gray-500 max-w-3xl">
                Join our community and start sharing your stories, ideas, and
                insights with people around the globe. Connect, engage, and grow
                with like-minded individuals.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {!isLoggedIn && (
                  <>
                    <Link
                      to="/register"
                      className="bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-3 rounded-md text-base font-medium shadow-sm transition-colors duration-200"
                    >
                      Get Started
                    </Link>
                    <Link
                      to="/login"
                      className="text-emerald-600 bg-white border border-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-md text-base font-medium transition-colors duration-200"
                    >
                      Sign In
                    </Link>
                  </>
                )}
                {isLoggedIn && (
                  <Link
                    to="/add-post"
                    className="bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-3 rounded-md text-base font-medium shadow-sm transition-colors duration-200"
                  >
                    Create a Post
                  </Link>
                )}
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Blog illustration"
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-gray-50 px-4 text-sm text-gray-500">
            Explore Posts
          </span>
        </div>
      </div>

      {/* Posts Section */}
      <section className="py-8">
        <PublicPost />
      </section>
    </div>
  );
}

export default Home;
