// controller/admin.controller.js

import { Course } from "../model/Course.js";
import { User } from "../model/user.js";

export const getAdminAnalytics = async (req, res) => {
  try {

    // Total Users
    const totalUsers = await User.countDocuments();

    // Total Students
    const totalStudents = await User.countDocuments({
      role: "student",
    });

    // Total Educators
    const totalEducators = await User.countDocuments({
      role: "educator",
    });

    // Total Courses
    const totalCourses = await Course.countDocuments();

    // Get All Courses with creator details
    const courses = await Course.find({})
      .populate("userId", "fullName email");

    // Revenue + Students
    let totalRevenue = 0;
    let totalEnrollments = 0;

    courses.forEach((course) => {
      totalRevenue += (course.totalstudent || 0) * course.amount;
      totalEnrollments += course.totalstudent || 0;
    });

    res.status(200).json({
      success: true,
      analytics: {
        totalUsers,
        totalStudents,
        totalEducators,
        totalCourses,
        totalRevenue,
        totalEnrollments,
      },
      courses,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};