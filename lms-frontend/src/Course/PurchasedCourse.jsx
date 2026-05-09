import { useNavigate } from "react-router-dom";
import { usegetAllPurchasedCourse } from "@/hooks/course.hook";

export const PurchaseCourse = () => {
  const { data, isLoading } = usegetAllPurchasedCourse();
  const navigate = useNavigate();
   
  const courses = data?.purchasedCourse || [];
  console.log(data?.purchasedCourse?.length)
 console.log(data?.PurchasedCourse);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-semibold">
          Loading purchased courses...
        </p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh]">
        <h2 className="text-2xl font-bold mb-3">
          You haven't purchased any courses yet
        </h2>
        <button
          onClick={() => navigate("/courses")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Browse Courses
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        My Purchased Courses
      </h1>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden bg-white"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                {course.title}
              </h2>

              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {course.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-600">
                  ₹{course.price}
                </span>

                <button
                  onClick={() =>
                    navigate(`/courses/${course._id}`)
                  }
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};