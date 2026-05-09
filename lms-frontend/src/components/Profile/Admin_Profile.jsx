import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  UserIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  AcademicCapIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

function AdminProfile() {
  const [user, setUser] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch User
  const getProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getUser`,
        {
          withCredentials: true,
        }
      );

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch Analytics
  const getAnalytics = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/admin-analytics`,
        {
          withCredentials: true,
        }
      );

      setAnalytics(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      await Promise.all([
        getProfile(),
        getAnalytics(),
      ]);

      setLoading(false);
    };

    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">

      {/* Header */}
      <div className="h-64 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 relative overflow-hidden">

        <div className="absolute inset-0 bg-black/10"></div>

        {/* Decorative Circles */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-20 w-52 h-52 bg-white/10 rounded-full blur-3xl"></div>

        {/* Profile Icon */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="w-36 h-36 rounded-[2rem] bg-white shadow-2xl flex items-center justify-center border-[6px] border-white">
            <ShieldCheckIcon className="w-16 h-16 text-emerald-600" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-[2rem] shadow-2xl overflow-hidden mt-24 border border-gray-100">

          {/* Title */}
          <div className="p-10 border-b bg-gradient-to-r from-white to-emerald-50">
            <h1 className="text-4xl font-bold text-center text-gray-800">
              Admin Dashboard
            </h1>

            <p className="text-center text-gray-500 mt-3 text-lg">
              Manage platform analytics, educators and users
            </p>
          </div>

          {/* Profile Section */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-all duration-300">

              <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm text-emerald-600 font-semibold uppercase tracking-wide">
                  Full Name
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-1">
                  {user?.fullName}
                </h2>
              </div>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-all duration-300">

              <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center">
                <EnvelopeIcon className="w-8 h-8 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm text-emerald-600 font-semibold uppercase tracking-wide">
                  Email Address
                </p>

                <h2 className="text-xl font-bold text-gray-800 mt-1 break-all">
                  {user?.email}
                </h2>
              </div>
            </div>

            {/* Role */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-6 flex items-center gap-5 shadow-sm hover:shadow-md transition-all duration-300 md:col-span-2">

              <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center">
                <ShieldCheckIcon className="w-8 h-8 text-emerald-600" />
              </div>

              <div>
                <p className="text-sm text-emerald-600 font-semibold uppercase tracking-wide">
                  Account Type
                </p>

                <div className="flex items-center gap-3 mt-1">
                  <h2 className="text-2xl font-bold text-gray-800 capitalize">
                    {user?.role}
                  </h2>

                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Verified Admin
                  </span>
                </div>
              </div>
            </div>
          </div>


          {/* Requests Section */}
          <div className="px-8 pb-10">

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-[2rem] p-8 shadow-sm hover:shadow-lg transition-all duration-300">

              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

                {/* Left */}
                <div className="flex items-center gap-5">

                  <div className="w-20 h-20 rounded-3xl bg-white shadow-md flex items-center justify-center">
                    <AcademicCapIcon className="w-10 h-10 text-blue-600" />
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                      Educator Requests
                    </h2>

                    <p className="text-gray-500 mt-2 text-lg">
                      Approve or reject educator access requests
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                      Manage Requests
                    </div>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => navigate("/requests")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"
                >
                  <AcademicCapIcon className="w-5 h-5" />

                  Open Requests

                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                </button>

              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="px-8 pb-10 space-y-4">

            <button
              onClick={() => navigate("/admin_analytics")}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-5 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:opacity-95 hover:shadow-xl transition-all duration-300 text-lg"
            >
              <ChartBarIcon className="w-6 h-6" />

              Open Analytics Dashboard

              <ArrowRightOnRectangleIcon className="w-6 h-6" />
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full border-2 border-emerald-600 text-emerald-600 py-5 rounded-2xl font-semibold hover:bg-emerald-50 transition-all duration-300 text-lg"
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default AdminProfile;