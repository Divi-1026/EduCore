import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  UserIcon,
  EnvelopeIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ArrowRightOnRectangleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getUser`,
        {
          withCredentials: true,
        }
      );

      setUser(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Header */}
      <div className="h-48 bg-gradient-to-r from-emerald-600 to-green-600 relative">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 rounded-2xl bg-white shadow-xl flex items-center justify-center border-4 border-white">
            <AcademicCapIcon className="w-16 h-16 text-emerald-600" />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-12">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mt-20">
          
          {/* Top */}
          <div className="p-8 border-b">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Student Profile
            </h1>

            <p className="text-center text-gray-500 mt-2">
              Manage your account and purchased courses
            </p>
          </div>

          {/* Profile Details */}
          <div className="p-8 space-y-5">

            {/* Name */}
            <div className="bg-emerald-50 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm text-emerald-600 font-medium">
                  Full Name
                </p>

                <h2 className="text-lg font-semibold text-gray-800">
                  {user?.fullName}
                </h2>
              </div>
            </div>

            {/* Email */}
            <div className="bg-emerald-50 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <EnvelopeIcon className="w-6 h-6 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm text-emerald-600 font-medium">
                  Email Address
                </p>

                <h2 className="text-lg font-semibold text-gray-800">
                  {user?.email}
                </h2>
              </div>
            </div>

            {/* Role */}
            <div className="bg-emerald-50 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <AcademicCapIcon className="w-6 h-6 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm text-emerald-600 font-medium">
                  Account Type
                </p>

                <h2 className="text-lg font-semibold text-gray-800 capitalize">
                  {user?.role}
                </h2>
              </div>
            </div>

            {/* Purchased Courses Count */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              
              <div className="bg-white border rounded-2xl p-5 text-center shadow-sm">
                <BookOpenIcon className="w-7 h-7 text-emerald-600 mx-auto mb-2" />

                <h2 className="text-2xl font-bold text-gray-800">
                  {user?.purchasedCourse?.length || 0}
                </h2>

                <p className="text-sm text-gray-500">
                  Purchased Courses
                </p>
              </div>

              <div className="bg-white border rounded-2xl p-5 text-center shadow-sm">
                <ShoppingBagIcon className="w-7 h-7 text-emerald-600 mx-auto mb-2" />

                <h2 className="text-2xl font-bold text-gray-800">
                  Active
                </h2>

                <p className="text-sm text-gray-500">
                  Learning Status
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-4 mt-8">

              {/* Purchased Course Button */}
              <button
                onClick={() => navigate("/your_courses")}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:opacity-95 transition"
              >
                <BookOpenIcon className="w-5 h-5" />

                View Purchased Courses

                <ArrowRightOnRectangleIcon className="w-5 h-5" />
              </button>

              {/* Home */}
              <button
                onClick={() => navigate("/")}
                className="w-full border-2 border-emerald-600 text-emerald-600 py-4 rounded-2xl font-semibold hover:bg-emerald-50 transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default UserProfile;