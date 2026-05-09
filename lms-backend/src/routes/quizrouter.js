import express from "express"
import {protectRoute} from "../middleware/authmiddleware.js"
import { checkQuiz, generateQuiz, generateQuizAgain, getQuize, getQuizzesByLecture, submitQuiz } from "../controller/quizcontroller.js";
const quizRouter=express.Router();
quizRouter.get('/check_quiz/:id',protectRoute,checkQuiz)
quizRouter.post('/create_quiz',protectRoute,generateQuiz)
quizRouter.post('/create_quiz_again',protectRoute,generateQuizAgain)
quizRouter.get('/get_quiz/:id',protectRoute,getQuize)
quizRouter.get('/getallquiz/:id',protectRoute,getQuizzesByLecture);
quizRouter.post('/submit/:id',protectRoute,submitQuiz);
export default quizRouter