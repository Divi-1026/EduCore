import { Course } from "../model/Course.js";
import { User } from "../model/user.js";

export const getEducatorAnalytics = async (req, res) => {
  try {

    const educatorId = req.user._id;

    const courses = await Course.find({ userId: educatorId });

    const totalCourses = courses.length;

    let totalStudents = 0;
    let totalRevenue = 0;

    courses.forEach(course => {
      totalStudents += course.totalstudent || 0;
      totalRevenue += (course.totalstudent || 0) * course.amount;
    });

    // total users on platform
    const totalUsers = await User.countDocuments();

    res.json({
      totalCourses,
      totalStudents,
      totalRevenue,
      totalUsers,
      courses
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};