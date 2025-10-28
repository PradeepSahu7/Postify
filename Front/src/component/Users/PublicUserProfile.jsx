import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { publicProfileAction } from "../../Redux/slices/users/userSlice";
import {
  User,
  Mail,
  Calendar,
  Award,
  Users,
  UserPlus,
  Shield,
  CheckCircle,
  XCircle,
  Eye,
  UserX,
  Clock,
  MessageCircle,
} from "lucide-react";

function PublicUserProfile() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { loading, error, profile } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(publicProfileAction(userId));
  }, [dispatch, userId]);

  console.log(profile);

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Not available";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Not available";
    }
  };

  // Helper function to get account level color
  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case "bronze":
        return "from-amber-600 to-amber-700";
      case "silver":
        return "from-gray-400 to-gray-500";
      case "gold":
        return "from-yellow-400 to-yellow-600";
      case "platinum":
        return "from-cyan-400 to-cyan-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Error Loading Profile
          </h3>
          <p className="text-gray-600">
            {error || "Unable to load user profile"}
          </p>
        </div>
      </div>
    );
  }

  const userData = profile?.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Cover Image Section */}
        <div className="relative mb-8">
          <div className="h-64 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
            {userData?.coverImage ? (
              <img
                src={userData.coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-white/30 text-6xl font-bold">
                  {userData?.username?.[0]?.toUpperCase() || "U"}
                </div>
              </div>
            )}
          </div>

          {/* Profile Picture - Overlapping */}
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              {userData?.profilePicture ? (
                <img
                  src={userData.profilePicture}
                  alt={userData.username}
                  className="w-32 h-32 rounded-full border-8 border-white shadow-2xl object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-8 border-white shadow-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {userData?.username?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
              )}

              {/* Verification Badge */}
              {userData?.isVerified && (
                <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-lg">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-20">
          {/* Left Column - User Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Username and Basic Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {userData?.username || "Anonymous User"}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-5 h-5" />
                    <span className="text-lg">
                      {userData?.email || "No email provided"}
                    </span>
                  </div>
                </div>

                {/* Account Level Badge */}
                {userData?.accountLevel && (
                  <div
                    className={`bg-gradient-to-r ${getLevelColor(
                      userData.accountLevel
                    )} text-white px-6 py-3 rounded-xl shadow-lg`}
                  >
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      <span className="font-bold uppercase">
                        {userData.accountLevel}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Role Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4" />
                  <span className="font-semibold capitalize">
                    {userData?.role || "user"}
                  </span>
                </div>

                {userData?.isVerified ? (
                  <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-semibold">Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-full">
                    <XCircle className="w-4 h-4" />
                    <span className="font-semibold">Not Verified</span>
                  </div>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl text-center border border-emerald-200">
                  <Users className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {userData?.followers?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center border border-blue-200">
                  <UserPlus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {userData?.following?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Following</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center border border-purple-200">
                  <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {userData?.profileViewer?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Profile Views</div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl text-center border border-red-200">
                  <UserX className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {userData?.blockUsers?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Blocked</div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <User className="w-6 h-6 text-emerald-600" />
                Account Information
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-emerald-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      Member Since
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatDate(userData?.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <Clock className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Last Login</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatDate(userData?.lastlogin)}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <Shield className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <div className="text-sm text-gray-600 mb-1">User ID</div>
                    <div className="text-sm font-mono text-gray-900 break-all">
                      {userData?.id || "Not available"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Additional Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats Card */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-6">Activity Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Notifications
                  </span>
                  <span className="font-bold text-2xl">
                    {userData?.notification?.length || 0}
                  </span>
                </div>
                <div className="h-px bg-white/20"></div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Account Level
                  </span>
                  <span className="font-bold text-lg uppercase">
                    {userData?.accountLevel || "Bronze"}
                  </span>
                </div>
                <div className="h-px bg-white/20"></div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Status
                  </span>
                  <span className="font-bold">
                    {userData?.isVerified ? "Verified" : "Unverified"}
                  </span>
                </div>
              </div>
            </div>

            {/* Engagement Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Engagement
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Followers</span>
                    <span className="font-semibold text-gray-900">
                      {userData?.followers?.length || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (userData?.followers?.length || 0) * 10,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Following</span>
                    <span className="font-semibold text-gray-900">
                      {userData?.following?.length || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (userData?.following?.length || 0) * 10,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Profile Views</span>
                    <span className="font-semibold text-gray-900">
                      {userData?.profileViewer?.length || 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (userData?.profileViewer?.length || 0) * 5,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Status Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Profile Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Account Type</span>
                  <span className="font-semibold text-gray-900 capitalize">
                    {userData?.role || "User"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Verified</span>
                  {userData?.isVerified ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Level</span>
                  <span
                    className={`font-bold uppercase bg-gradient-to-r ${getLevelColor(
                      userData?.accountLevel
                    )} text-transparent bg-clip-text`}
                  >
                    {userData?.accountLevel || "Bronze"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicUserProfile;
