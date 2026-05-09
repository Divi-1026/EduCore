import cloudinary from "../config/cloudinary.js";
// import { globalTitles } from "../config/globalTitles.js";
import { ENV } from "../config/env.js";
import GlobalTitles from "../model/GlobalTitles.js";
import { User } from "../model/user.js";
import {Modules} from '../model/modules.js'
import { Course } from "../model/Course.js";
import { Lecture } from "../model/Videos.js";
import { videoUpload } from "../middleware/videoupload.js";
import {GoogleGenerativeAI}from '@google/generative-ai'
// import { globalTitles } from "../config/globalTitles.js";
const genAI=new GoogleGenerativeAI(ENV.GEMINI_API_KEY)
const model=genAI.getGenerativeModel({model: "gemini-3-flash-preview"})
export const createCourse=async(req,res)=>{
try{
   const {title,description,amount}=req.body;
   console.log("called")
   const thumbnail=req.file;
   console.log("tiele",title)
   if(!title||!description ||!amount){
    return res.status(401).json({
        message:"Error provide all fields"
    })
   }
    let global = await GlobalTitles.findOne();
    if (!global) {
      global = await GlobalTitles.create({ titles: [] });
    }

    // Check and push if not present
    if (!global.titles.includes(title)) {
      global.titles.push(title);
      await global.save();
    }
    console.log("Titlssss ",global)
   let imageUrl="";
   const base64=`data:${req.file.mimetype};base64,${thumbnail.buffer.toString("base64")}`
   const uploadRes=await cloudinary.uploader.upload(base64,{
    folder:"lms"
   })
   imageUrl=uploadRes.secure_url
   const newCourse=await Course.create({
     userId:req.user._id,
     title,
     description,
     thumbnail:imageUrl,
     amount
   })
   console.log(imageUrl)
   await newCourse.save();
   console.log(newCourse)
   await User.findByIdAndUpdate(
  req.user._id,
  {
    $addToSet: {
      purchasedCourse: newCourse._id
    }
  }
);
   return res.status(201).json({
    message:"Course Created Successfully",
    newCourse
   })
}catch(error){
   console.log("Error from create course:", error);
}
}
// }
// export const createCourse = async (req, res) => {
//   try {
//     const {  title, description, amount, modules } = JSON(req.body);
//     console.log(req.body)
//     console.log(title,description,amount,modules)
//     if(!title||!description||!amount||!modules){
//         return res.status(401).json({
//             message:"Provide all details"
//         })
//     }
//     let imageUrl = "";
//     if (req.file) {
//       const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
//       const uploadRes = await cloudinary.uploader.upload(base64, { folder: "lms" });
//       imageUrl = uploadRes.secure_url;
//     }
//     const course = await Course.create({
//   userId:req.user._id,
//   title,
//   description,
//   amount,
//   thumbnail: imageUrl,
//   modules: [] 
// });
    
  

  



// if(course){return
//     res.status(201).json({ success: true, course });

//   } }catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }

export const getCourse=async(req,res)=>{
    try{
        const { search = "" } = req.query;  // default empty string
    console.log("req.query:", req.query);
    console.log("search:", search);
        if(!search|| search.trim()===""){
            console.log("s1")
            const allCourses=await Course.find({});
            console.log(allCourses)
            return res.status(201).json(allCourses);
        }
        let globalTitles=[];
        const global=await GlobalTitles.findOne();
        if(global) globalTitles=global.titles;
        console.log("Titles from search",globalTitles)
       
        //get courses specific course
        const prompt = `You are an intelligent AI assistant for a Learning Management System (LMS).
A user is searching for courses. 
if you find the correct word dsa then along with dsa data structure and agorithms return means related technologis or full name other name of technologies also return so that if dsa is not titl data structure is ittl then also get answer
Analyze the user query carefully and return ONLY ONE most relevant category name from the list below.
Available Categories:
${JSON.stringify(globalTitles)}
Rules:
- Return ONLY one category name exactly as written above.
- Do NOT explain.
- Do NOT add extra words.
- If no category matches, return "General Programming".
User Query:${search}
`;
const result=await model.generateContent(prompt);
const aiText=result?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
.replace(/[`"\n]/g, "") ||""


console.log("search",search)
console.log("AI text",aiText)
 console.log("Called")
const searchTerm=aiText||search;
const mongoquery={
    $or:[
        {title:{$regex:searchTerm,$options:"i"}},
        {description :{$regex:searchTerm,$options:"i"}}
    ]
}
const courses=await Course.find(mongoquery).lean()
console.log(courses)
console.log(`found, ${courses.length}, courses ${search}`)
return res.status(200).json({
    success:true,
    courses,

    count:courses.length,
    searchTerm:search
})

    }
    catch(error){
        console.log(`Error from get course, ${error}`)
    }
}
// export const getSingleCourse=async(req,res)=>{
// try{
// const courseId=req.params.id;
// const course=await Course.findById(courseId).populate("userId");
// if(!course){
//   return  res.status(401).json({
//         message:" Course not found"
//     })
// }
// return res.status(201).json(course)

// }catch(error){
//     console.log(`error from single corse ,${error}`)
// }
// }
export const getSingleCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId)
      .populate("userId")
      .populate({
        path: "modules",
        populate: {
          path: "lectures",
          model: "Lecture"
        }
      });

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    return res.status(200).json(course);

  } catch (error) {
    console.log(`Error from single course: ${error}`);
    return res.status(500).json({
      message: "Server Error"
    });
  }
};
export const getPurchasedCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const course = await Course.findById(courseId)
      .populate({
        path: "modules",
        populate: {
          path: "lectures"
        }
      });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    const isPurchased = user.purchasedCourse.includes(courseId);

    // Filter modules based on purchase
    const filteredModules = course.modules
      

    return res.status(200).json({
      success: true,
      isPurchased,
      _id: course._id,
      title: course.title,
      description: course.description,
      thumbnail: course.thumbnail,
      price: course.price,
      modules: filteredModules
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const getallpurchasedCourse=async(req,res)=>{
    try{
  const userId=req.user._id;
  const user=await User.findById(userId).populate("purchasedCourse");
  if(!user){
    return res.status(401).json({
        message:"Courses-User not found "
    })
  }
  return res.status(201).json(user)

    }catch(error){
console.log(`Error from get all purchased course ${error}`)
    }
}
// import Course from "../models/courseModel.js";

export const getCreatedCourse = async (req, res) => {
  try {
    const userId = req.user._id; // logged-in user

    const courses = await Course.find({ userId: userId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalCourses: courses.length,
      courses
    });

  } catch (error) {
    console.error("Get created courses error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
export const getPopularCourses = async (req, res) => {
  try {

    const courses = await Course.find({})
      .sort({ totalstudent: -1 }) // highest first
      .limit(4); // max 4 courses

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        message: "No courses found",
      });
    }

    return res.status(200).json({
      success: true,
      courses,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};