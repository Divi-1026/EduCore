import express from "express";
const analyticRoute=express.Router();
import { adminRoute, educatorRoute, protectRoute } from "../middleware/authmiddleware.js";
import { getAnalyticsDataController, getDailyAnalytcController } from "../controller/analyticscontroller.js";
analyticRoute.get('/getAnalytic',protectRoute,educatorRoute,getAnalyticsDataController);
analyticRoute.get('/getdailydata',protectRoute,educatorRoute,getDailyAnalytcController)
export default analyticRoute;
