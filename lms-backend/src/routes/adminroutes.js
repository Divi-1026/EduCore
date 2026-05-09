import express from "express";
import { 
  createEducatorRequest,
  getAllRequests,
  approveRequest,
  rejectRequest
} from "../controller/roleupdation.js";

import { getAdminAnalytics } from "../controller/admin.controller.js";

import {
  adminRoute,
  protectRoute
} from "../middleware/authmiddleware.js";

const router = express.Router();

// User sends educator request
router.post(
  "/request/educator",
  protectRoute,
  createEducatorRequest
);

// Admin views requests
router.get(
  "/requests",
  protectRoute,
  adminRoute,
  getAllRequests
);

// Admin approve request
router.patch(
  "/requests/approve/:requestId",
  protectRoute,
  adminRoute,
  approveRequest
);

// Admin reject request
router.patch(
  "/requests/reject/:requestId",
  protectRoute,
  adminRoute,
  rejectRequest
);

// ADMIN ANALYTICS
router.get(
  "/admin-analytics",
  protectRoute,
  adminRoute,
  getAdminAnalytics
);

export default router;