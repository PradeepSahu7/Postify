import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../../Redux/slices/Comments/commentsSlices";
import ShowCommentsLIst from "./ShowCommentsLIst";
import { SendHorizontal, MessageCircle, Loader2 } from "lucide-react";

function AddComments({ postId, commentsData }) {
  const dispatch = useDispatch();
  const { success, loading } = useSelector((state) => state.comments);
  const { comment } = useSelector((state) => state.comments);
  const [formData, setFormData] = useState({
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    dispatch(createCommentAction({ ...formData, postId }));
    setFormData({ message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4">
      {/* Comments Section Header */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <MessageCircle className="w-8 h-8 text-emerald-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            Join the Conversation
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Share your thoughts, ask questions, and engage with other readers.
          Your perspective matters!
        </p>
      </div>

      {/* Add Comment Section */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200 p-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Write a Comment</h3>
            <p className="text-sm text-gray-600">
              Share your thoughts on this post
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="What did you think about this post? Share your insights, questions, or experiences..."
              rows={5}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 resize-none transition-all duration-200 placeholder-gray-400 text-gray-800 bg-white shadow-sm"
              disabled={loading}
              maxLength={500}
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <span
                className={`text-xs font-medium ${
                  formData.message.length > 450
                    ? "text-red-500"
                    : formData.message.length > 400
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              >
                {formData.message.length}/500
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-start gap-2">
              <svg
                className="w-5 h-5 text-emerald-500 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Community Guidelines
                </p>
                <p className="text-xs text-gray-500">
                  Be respectful, constructive, and helpful in your comments.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !formData.message.trim()}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-200 transform hover:scale-105 disabled:transform-none shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <SendHorizontal className="w-5 h-5" />
                  Publish Comment
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <ShowCommentsLIst comments={commentsData} />
    </div>
  );
}

export default AddComments;
