import { useEffect, useState } from "react";
import axios from "axios";
import {
  UsersIcon,
  AcademicCapIcon,
  BookOpenIcon,
  CurrencyRupeeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

function AdminAnalytics() {

  const [data, setData] = useState(null);

  const getAnalytics = async () => {
    try {

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/admin-analytics`,
        {
          withCredentials: true,
        }
      );

      setData(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="text-2xl font-semibold text-emerald-600">
          Loading Analytics...
        </div>
      </div>
    );
  }

  const analytics = data.analytics;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 p-6">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Complete LMS platform analytics and management
          </p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Total Users */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Total Users</p>

                <h2 className="text-4xl font-bold mt-2 text-gray-800">
                  {analytics.totalUsers}
                </h2>
              </div>

              <div className="bg-blue-100 p-4 rounded-2xl">
                <UsersIcon className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Students */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Students</p>

                <h2 className="text-4xl font-bold mt-2 text-gray-800">
                  {analytics.totalStudents}
                </h2>
              </div>

              <div className="bg-green-100 p-4 rounded-2xl">
                <AcademicCapIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Educators */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Educators</p>

                <h2 className="text-4xl font-bold mt-2 text-gray-800">
                  {analytics.totalEducators}
                </h2>
              </div>

              <div className="bg-purple-100 p-4 rounded-2xl">
                <UserGroupIcon className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Courses</p>

                <h2 className="text-4xl font-bold mt-2 text-gray-800">
                  {analytics.totalCourses}
                </h2>
              </div>

              <div className="bg-orange-100 p-4 rounded-2xl">
                <BookOpenIcon className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Enrollments */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Enrollments</p>

                <h2 className="text-4xl font-bold mt-2 text-gray-800">
                  {analytics.totalEnrollments}
                </h2>
              </div>

              <div className="bg-pink-100 p-4 rounded-2xl">
                <AcademicCapIcon className="w-8 h-8 text-pink-600" />
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Revenue</p>

                <h2 className="text-4xl font-bold mt-2 text-gray-800">
                  ₹{analytics.totalRevenue}
                </h2>
              </div>

              <div className="bg-emerald-100 p-4 rounded-2xl">
                <CurrencyRupeeIcon className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-3xl shadow-lg mt-10 p-6 overflow-x-auto">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              All Courses
            </h2>

            <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-xl text-sm font-medium">
              {data.courses.length} Courses
            </div>
          </div>

          <table className="w-full">

            <thead>
              <tr className="border-b text-left">

                <th className="py-4 px-2">Course</th>

                <th className="py-4 px-2">Teacher</th>

                <th className="py-4 px-2">Email</th>

                <th className="py-4 px-2">Students</th>

                <th className="py-4 px-2">Price</th>

                <th className="py-4 px-2">Revenue</th>

              </tr>
            </thead>

            <tbody>

              {data.courses.map((course) => (

                <tr
                  key={course._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="py-4 px-2 font-medium text-gray-800">
                    {course.title}
                  </td>

                  <td className="py-4 px-2">
                    {course.userId?.fullName}
                  </td>

                  <td className="py-4 px-2 text-gray-500">
                    {course.userId?.email}
                  </td>

                  <td className="py-4 px-2">
                    {course.totalstudent || 0}
                  </td>

                  <td className="py-4 px-2">
                    ₹{course.amount}
                  </td>

                  <td className="py-4 px-2 text-emerald-600 font-semibold">
                    ₹{(course.totalstudent || 0) * course.amount}
                  </td>

                </tr>

              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;