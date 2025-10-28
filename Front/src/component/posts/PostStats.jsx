import React from "react";
import { useDispatch } from "react-redux";
import {
  clapPostAction,
  dislikePostAction,
  likePostAction,
} from "../../Redux/slices/posts/postSlice";
import { Heart, ThumbsDown, Eye, Zap, MessageCircle } from "lucide-react";

function PostStats({ views, likes, dislikes, totalComments, postId, claps }) {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likePostAction(postId));
  };

  const handleDislike = () => {
    dispatch(dislikePostAction(postId));
  };

  const handleClaps = () => {
    dispatch(clapPostAction(postId));
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {/* Views */}
      <div className="flex items-center gap-2 text-gray-600">
        <Eye className="w-5 h-5" />
        <span className="font-medium">{views || 0}</span>
        <span className="text-sm">views</span>
      </div>

      {/* Like Button */}
      <button
        type="button"
        onClick={handleLike}
        className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-red-50 border border-red-200 hover:border-red-300 rounded-full transition-all duration-200 group"
      >
        <Heart className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
        <span className="font-medium text-gray-700">{likes || 0}</span>
        <span className="text-sm text-gray-500">likes</span>
      </button>

      {/* Dislike Button */}
      <button
        type="button"
        onClick={handleDislike}
        className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-blue-50 border border-blue-200 hover:border-blue-300 rounded-full transition-all duration-200 group"
      >
        <ThumbsDown className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
        <span className="font-medium text-gray-700">{dislikes || 0}</span>
        <span className="text-sm text-gray-500">dislikes</span>
      </button>

      {/* Claps Button */}
      <button
        type="button"
        onClick={handleClaps}
        className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-yellow-50 border border-yellow-200 hover:border-yellow-300 rounded-full transition-all duration-200 group"
      >
        <Zap className="w-5 h-5 text-yellow-500 group-hover:scale-110 transition-transform" />
        <span className="font-medium text-gray-700">{claps || 0}</span>
        <span className="text-sm text-gray-500">claps</span>
      </button>

     
    </div>
  );
}

export default PostStats;
