import express from 'express'
import { adminRoute, educatorRoute, protectRoute } from '../middleware/authmiddleware.js';
import { videoUpload } from '../middleware/videoupload.js';
import { createModule, getComment, getSingleCourseModule } from '../controller/modulecontroller.js';
const moduleRouter=express.Router();
console.log("Modue router")
moduleRouter.post(
  "/createModule/:courseId",
  protectRoute,
 
  videoUpload.array("lecturesVideo"),
  (req, res, next) => {
    console.log("Files received:", req.files);
    console.log("Body received:", req.body);
    next();
  },
  createModule
);

moduleRouter.get('/getModule/:id',protectRoute,getSingleCourseModule);
moduleRouter.get('/getModulecomment/:id',protectRoute,getComment);
export default moduleRouter;