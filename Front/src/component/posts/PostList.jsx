import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPrivatePostAction,
  fetchPublicPostAction,
} from "../../Redux/slices/posts/postSlice";
import LoadingComponent from "../Alert/LoadingComponent";
import { Link } from "react-router-dom";

function PublicPost() {
  const { posts, error, success, loading } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPrivatePostAction());
  }, [dispatch]);

  // Function to truncate text
  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest Posts</h2>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <LoadingComponent />
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-medium">{error.message}</p>
        </div>
      ) : posts?.posts?.length <= 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-xl text-gray-500">No posts found</h3>
          <p className="text-gray-400 mt-2">Be the first to create a post!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.posts?.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image container with fixed height */}
              <div className="h-48 overflow-hidden">
                {post?.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-500 text-lg font-medium">
                      No Image
                    </span>
                  </div>
                )}
              </div>

              {/* Content section */}
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {post?.catagory?.name || "General Post"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(
                      post?.createdAt || Date.now()
                    ).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {truncateText(post.content, 150)}
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                      {post?.author?.username
                        ? post.author.username[0].toUpperCase()
                        : "U"}
                    </div>
                    <span className="text-sm font-medium text-gray-700 ml-2">
                      {post?.author?.username ||
                        post?.author?.email ||
                        "Unknown Author"}
                    </span>
                  </div>

                  <Link
                    className="text-emerald-600 hover:text-emerald-800 text-sm font-medium"
                    to={`/post/${post?._id}`}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PublicPost;
