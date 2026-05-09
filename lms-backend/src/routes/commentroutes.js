import express from "express"
import { protectRoute } from "../middleware/authmiddleware.js";
import { createComment, getCommentLecture } from "../controller/commentcontroller.js";
const CommentRoute=express.Router();
CommentRoute.post("/create_comment/:id",protectRoute,createComment)
CommentRoute.get("/get_comment/:id",protectRoute,getCommentLecture)
export default CommentRoute;
