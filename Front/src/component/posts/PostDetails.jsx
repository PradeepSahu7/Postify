import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeletePostAction,
  getSinglePostAction,
  viewPostAction,
} from "../../Redux/slices/posts/postSlice";
import {
  DeleteIcon,
  Edit2Icon,
  Edit3,
  LoaderCircle,
  LucideDelete,
  PenBoxIcon,
  PenIcon,
  Trash,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SuccessMsg from "../Alert/SuccessMsg";
import PostStats from "./PostStats";
import { calculateReadingTime } from "../../utils/readingTime";
import AddComments from "../comments/AddComments";

function PostDetails() {
  const { comment } = useSelector((state) => state.comments);
  const { postId } = useParams();
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const { post, success, error, loading } = useSelector(
    (state) => state?.posts
  );
  const { userAuth } = useSelector((state) => state?.users);
  //get the post author id

  const postAuthorid = post?.post?.author?._id?.toString();
  //current user logged in id
  const currentuserId = userAuth?.userInfo?.id?.toString();

  const isCreator = postAuthorid == currentuserId;

  useEffect(() => {
    dispatch(getSinglePostAction(postId));
  }, [
    dispatch,
    postId,
    post?.post?.likes?.length,
    post?.post?.disLikes?.length,
    post?.post?.claps,
    post?.post?.comments?.length,
    comment?.post,
  ]);

  useEffect(() => {
    dispatch(viewPostAction(postId));
  }, []);

  // Only calculate reading time if post content exists
  const time = post?.post?.content
    ? calculateReadingTime(post?.post?.content)
    : 0;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {error ? (
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-8 rounded-xl text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Oops! Something went wrong
            </h3>
            <p className="font-medium">
              Error loading post. Please try again later.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            {/* Main Content Layout - Two Column */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
              {/* Left Column - Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Category Badge */}
                {post?.post?.catagory?.name && (
                  <div>
                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-full">
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
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      {post?.post?.catagory?.name}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {post?.post?.title}
                </h1>

                {/* Author Info */}
                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    {post?.post?.author?.profilePicture ? (
                      <img
                        src={post?.post?.author?.profilePicture}
                        alt="Author"
                        className="w-12 h-12 rounded-full mr-4 border-3 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center mr-4 border-3 border-white shadow-md">
                        <span className="text-sm font-bold">
                          {post?.post?.author?.username
                            ? post?.post?.author?.username[0].toUpperCase()
                            : "U"}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">
                        {post?.post?.author?.username}
                      </p>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>
                            {new Date(post?.post?.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-1"
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
                          <span>{time} min read</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-800 leading-relaxed text-lg whitespace-pre-line font-light">
                    {post?.post?.content}
                  </div>
                </div>

                {/* Engagement Stats */}
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-xl">
                  <PostStats
                    views={post?.post?.PostViews?.length}
                    likes={post?.post?.likes?.length}
                    dislikes={post?.post?.disLikes?.length}
                    claps={post?.post?.claps}
                    postId={postId}
                  />
                </div>
              </div>

              {/* Right Column - Image and Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Featured Image */}
                {post?.post?.image && (
                  <div className="sticky top-8">
                    <div className="rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={post?.post?.image}
                        alt={post?.post?.title || "Post image"}
                        className="w-full h-64 lg:h-80 object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    {/* Additional Author Info Card */}
                    <Link 
                          to={`/user-public-profile/${post?.post?.author?._id}`}
                          
                    className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        About the Author
                      </h3>
                      <div className="flex items-center mb-3">
                        {post?.post?.author?.profilePicture ? (
                          <img
                            src={post?.post?.author?.profilePicture}
                            alt="Author"
                            className="w-16 h-16 rounded-full mr-4 border-4 border-white shadow-lg"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white flex items-center justify-center mr-4 border-4 border-white shadow-lg">
                            <span className="text-lg font-bold">
                              {post?.post?.author?.username
                                ? post?.post?.author?.username[0].toUpperCase()
                                : "U"}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-900">
                            {post?.post?.author?.username}
                          </p>
                          <p className="text-sm text-gray-600">
                            {post?.post?.author?.email}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Content creator sharing insights and stories through
                        thoughtful writing.
                      </p>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Author Actions (Edit/Delete) */}
          {currentuserId == postAuthorid && (
            <div className="mt-12 flex gap-4 justify-center py-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
              <button
                onClick={() => {
                  dispatch(DeletePostAction(postId));
                  if (success) {
                    naviagte("/postlist");
                  }
                }}
                className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Trash2Icon size={20} />
                Delete Post
              </button>

              <Link
                to={`/updatePost/${postId}`}
                className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <PenBoxIcon size={20} />
                Edit Post
              </Link>
            </div>
          )}

          {/* Divider */}
          <div className="mt-16 mb-8">
            <div className="flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              <div className="px-6 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                <span className="text-sm font-medium text-gray-500">
                  Reader Engagement
                </span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <AddComments postId={postId} commentsData={post?.post?.comments} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
