import express from "express";
import { videoUpload } from "../middleware/videoupload.js";
import { createCourse, getallpurchasedCourse, getCourse, getCreatedCourse, getPopularCourses, getPurchasedCourse, getSingleCourse } from "../controller/coursecontroller.js";
import { adminRoute, educatorRoute, protectRoute } from "../middleware/authmiddleware.js";
import { upload } from "../middleware/upload.js";
import { Course } from "../model/Course.js";
const CourseRouter=express.Router();
CourseRouter.post(
  "/createCourse",
  protectRoute,
  educatorRoute,
  upload.single("thumbnail"), // only for image
  createCourse
);

CourseRouter.get("/getCourse",getCourse);
CourseRouter.get('/getSingleCourse/:id',getSingleCourse);
CourseRouter.get('/purchasedCourse/:id',protectRoute,getPurchasedCourse);
CourseRouter.get('/getAllPurchasedCourse',protectRoute,getallpurchasedCourse);
CourseRouter.get('/getCreatedcourse',protectRoute,educatorRoute,getCreatedCourse);
CourseRouter.get('/popular-courses',getPopularCourses);
export default CourseRouter;