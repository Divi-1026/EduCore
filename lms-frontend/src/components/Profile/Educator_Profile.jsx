import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  UserIcon, 
  EnvelopeIcon, 
  IdentificationIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  ArrowRightOnRectangleIcon,
  PencilSquareIcon
} from "@heroicons/react/24/outline";

function EducatorProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getUser`,
        {
          withCredentials: true
        }
      );
      setUser(res.data);
      setLoading(false);
    } catch(err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  // Greenish Theme Colors
  const THEME = {
    primary: '#059669',
    secondary: '#10b981',
    light: '#d1fae5',
    gradient: 'from-emerald-600 to-green-600',
    lightBg: 'from-emerald-50 to-green-50'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserIcon className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">User Not Found</h2>
          <p className="text-gray-500 mb-6">Unable to load profile information</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Decorative Header */}
      <div className="h-48 bg-gradient-to-r from-emerald-600 to-green-600 relative">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-white">
            <AcademicCapIcon className="w-16 h-16 text-emerald-600" />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-20">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 text-center">
              Educator Profile
            </h1>
            <p className="text-gray-500 text-sm text-center mt-1">
              Manage your account and courses
            </p>
          </div>

          {/* Profile Info */}
          <div className="p-8">
            <div className="grid gap-6">
              {/* Name */}
              <div className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                  <UserIcon className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider">Full Name</p>
                  <p className="text-lg font-semibold text-gray-800">{user.fullName}</p>
                </div>
                <button className="p-2 hover:bg-white rounded-lg transition" title="Edit name">
                  <PencilSquareIcon className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Email */}
              <div className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                  <EnvelopeIcon className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider">Email Address</p>
                  <p className="text-lg font-semibold text-gray-800">{user.email}</p>
                </div>
                <button className="p-2 hover:bg-white rounded-lg transition" title="Edit email">
                  <PencilSquareIcon className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Role */}
              <div className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                  <IdentificationIcon className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider">Account Type</p>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold text-gray-800 capitalize mr-2">{user.role}</p>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                      Educator
                    </span>
                  </div>
                </div>
              </div>

              {/* Account Status - Optional */}
              <div className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider">Account Status</p>
                  <p className="text-lg font-semibold text-gray-800">Active</p>
                </div>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Verified</span>
              </div>
            </div>

            {/* Stats Preview */}
            {/* <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition">
                <BookOpenIcon className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">12</p>
                <p className="text-xs text-gray-500">Total Courses</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition">
                <ChartBarIcon className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">1.2k</p>
                <p className="text-xs text-gray-500">Total Students</p>
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <button
                onClick={() => navigate("/created-courses")}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 rounded-xl font-medium hover:from-emerald-700 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
              >
                <BookOpenIcon className="w-5 h-5" />
                <span>View Created Courses</span>
                <ArrowRightOnRectangleIcon className="w-4 h-4 ml-2" />
              </button>

              <button
                onClick={() => navigate("/educator_analytics")}
                className="w-full bg-white border-2 border-emerald-600 text-emerald-600 py-4 rounded-xl font-medium hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <ChartBarIcon className="w-5 h-5" />
                <span>View Analytics Dashboard</span>
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full bg-gray-50 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 text-sm"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default EducatorProfile;