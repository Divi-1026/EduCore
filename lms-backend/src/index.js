import express from "express"
import {connectDB}from './config/db.js'
import cors from "cors"
import {ENV} from './config/env.js'
import EducatoranalyticRoute from "./routes/educatorroutes.js"
import paymentRoute from "./routes/paymentroutes.js"
import CommentRoute from "./routes/commentroutes.js"
import cookieParser from 'cookie-parser'
import userRoute from "./routes/userroutes.js";
import moduleRouter from "./routes/moduleroutes.js";
import CourseRouter from "./routes/courseroutes.js";
import quizRouter from "./routes/quizrouter.js";
import analyticRoute from "./routes/analyticscontroller.js"
import router from "./routes/adminroutes.js"
import chatRouter from "./routes/chat.js"
const app=express();
app.listen(process.env.PORT,()=>{
    console.log("server Started")
    connectDB()
})
app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true                 
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/api',userRoute);
app.use('/api/course',CourseRouter);
app.use('/api/module',moduleRouter);
app.use('/api/quiz',quizRouter);
app.use('/api/comment',CommentRoute);
app.use('/api/payment',paymentRoute);
app.use('/api/analytics',analyticRoute);
app.use('/api/admin',router)
app.use('/api/chat',chatRouter)
app.use('/api/educator',EducatoranalyticRoute)