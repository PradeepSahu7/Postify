import { Heading3, MessageCircle, User } from "lucide-react";
import React from "react";

function ShowCommentsLIst({ comments }) {
  // Helper function to safely format date
  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "Date not available";
    }
  };

  // Helper function to get time ago
  const getTimeAgo = (dateString) => {
    if (!dateString) return "Unknown";

    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);

      if (diffInSeconds < 60) return "Just now";
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400)
        return `${Math.floor(diffInSeconds / 3600)}h ago`;
      if (diffInSeconds < 2592000)
        return `${Math.floor(diffInSeconds / 86400)}d ago`;
      return formatDate(dateString);
    } catch (error) {
      return "Unknown";
    }
  };

  return (
    <div className="mt-8">
      {/* Comments Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {comments?.length || 0}{" "}
              {comments?.length === 1 ? "Comment" : "Comments"}
            </h3>
            <p className="text-sm text-gray-600">Join the discussion below</p>
          </div>
        </div>

        {comments?.length > 0 && (
          <div className="text-sm text-gray-500">
            Latest discussions from our community
          </div>
        )}
      </div>

      {comments?.length <= 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No comments yet
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Start the conversation! Be the first to share your thoughts on this
            post.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments?.map((item, index) => {
            const isRecent =
              new Date() - new Date(item?.createdAt) < 24 * 60 * 60 * 1000; // 24 hours

            return (
              <div
                key={item._id || index}
                className={`bg-white rounded-xl border-2 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg ${
                  isRecent
                    ? "border-emerald-100 bg-emerald-50/30"
                    : "border-gray-100"
                }`}
              >
                <div className="p-6">
                  {/* Author Info Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        {item?.author?.profilePicture ? (
                          <img
                            src={item?.author?.profilePicture}
                            alt="Author"
                            className="w-12 h-12 rounded-full border-3 border-white shadow-lg"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center border-3 border-white shadow-lg">
                            {item?.author?.username ? (
                              <span className="text-white text-lg font-bold">
                                {item.author.username[0].toUpperCase()}
                              </span>
                            ) : (
                              <User className="w-6 h-6 text-white" />
                            )}
                          </div>
                        )}
                        {isRecent && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 text-lg">
                            {item?.author?.username || "Anonymous User"}
                          </h4>
                          {isRecent && (
                            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
                              New
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{getTimeAgo(item?.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comment Message */}
                  <div className="ml-16">
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <p className="text-gray-800 leading-relaxed">
                        {item?.message}
                      </p>
                    </div>

                    {/* Comment Actions */}
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <button className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                        Like
                      </button>
                      <button className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ShowCommentsLIst;
