import React from "react";
import { useGetCreatedCourses } from "@/hooks/course.hook";
import { useNavigate } from "react-router-dom";

const CreatedCourse = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetCreatedCourses();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold animate-pulse">
          Loading Courses...
        </h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-red-500 text-xl">
          {error?.message || "Something went wrong"}
        </h2>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          My Created Courses
          <span className="text-blue-600 ml-2">
            ({data?.totalCourses || 0})
          </span>
        </h1>

        <button
          onClick={() => navigate("/create_course")}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Create Course
        </button>
      </div>

      {/* Empty State */}
      {data?.courses?.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <p className="text-gray-500 text-lg">
            You haven't created any courses yet
          </p>

          <button
            onClick={() => navigate("/create_course")}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Your First Course
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {data?.courses?.map((course) => (
            <div
              key={course._id}
              onClick={() => navigate(`/courses/${course._id}`)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer overflow-hidden"
            >
              
              {/* Thumbnail */}
              <img
                src={course.thumbnail || "https://via.placeholder.com/400"}
                alt={course.title}
                className="w-full h-40 object-cover"
              />

              {/* Content */}
              <div className="p-4">

                <h2 className="text-lg font-semibold mb-2 line-clamp-1">
                  {course.title}
                </h2>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="flex justify-between items-center text-sm mb-4">
                  <span className="text-blue-600 font-semibold">
                    ₹ {course.amount}
                  </span>

                  <span className="text-gray-500">
                    👨‍🎓 {course.totalstudent || 0} students
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex justify-between gap-2">

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit_course/${course._id}`);
                    }}
                    className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/educator_analytics`);
                    }}
                    className="flex-1 bg-purple-500 text-white py-1 rounded hover:bg-purple-600"
                  >
                    Analytics
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

export default CreatedCourse;