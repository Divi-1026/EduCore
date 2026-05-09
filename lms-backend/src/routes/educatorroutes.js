import express from "express";
const EducatoranalyticRoute=express.Router();

import { adminRoute, educatorRoute, protectRoute } from "../middleware/authmiddleware.js";
import { getEducatorAnalytics } from "../controller/educatoranalytics.js";
EducatoranalyticRoute.get('/getEducatorAnalytics',protectRoute,educatorRoute,getEducatorAnalytics)
export default EducatoranalyticRoute;