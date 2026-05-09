import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  UserCircleIcon,
  EnvelopeIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/requests`,
        { withCredentials: true }
      );

      setRequests(res?.data?.requests || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setLoading(false);
    }
  };

  const approveRequest = async (requestId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/admin/requests/approve/${requestId}`,
        {},
        { withCredentials: true }
      );

      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/admin/requests/reject/${requestId}`,
        {},
        { withCredentials: true }
      );

      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">

      {/* Heading */}
      <div className="max-w-6xl mx-auto mt-18 mb-10">
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-blue-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
              <AcademicCapIcon className="w-9 h-9 text-white" />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Educator Requests
              </h1>

              <p className="text-gray-500 mt-1">
                Approve or reject educator access requests
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Empty */}
      {requests.length === 0 ? (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-md p-12 text-center">
          <ClockIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />

          <h2 className="text-2xl font-bold text-gray-800">
            No Pending Requests
          </h2>

          <p className="text-gray-500 mt-2">
            All educator requests are reviewed.
          </p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Top */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <UserCircleIcon className="w-12 h-12 text-white" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold">
                      {r.user.fullName}
                    </h2>

                    <p className="text-blue-100 text-sm mt-1">
                      Educator Access Request
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5">

                {/* Email */}
                <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <EnvelopeIcon className="w-6 h-6 text-blue-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>

                    <h3 className="font-semibold text-gray-800">
                      {r.user.email}
                    </h3>
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <AcademicCapIcon className="w-6 h-6 text-indigo-600" />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Current Role</p>

                    <span className="inline-flex px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm mt-1">
                      {r.user.role}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-4 pt-2">

                  {/* Approve */}
                  <button
                    onClick={() => approveRequest(r._id)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    <CheckCircleIcon className="w-5 h-5" />
                    Approve
                  </button>

                  {/* Reject */}
                  <button
                    onClick={() => rejectRequest(r._id)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 text-white py-3 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    <XCircleIcon className="w-5 h-5" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRequests;