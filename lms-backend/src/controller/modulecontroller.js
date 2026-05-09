import { Modules } from "../model/modules.js";
import { Course } from "../model/Course.js";
import { Lecture } from "../model/Videos.js";
import fs from 'fs'
// import { createEmbedding,generateTranscript } from "../config/ai.js";
import mongoose from "mongoose";

export const createModule = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { modules } = req.body;
console.log("caleed",courseId)
    if (!courseId || !modules) {
      return res.status(400).json({
        success: false,
        message: "Provide courseId and modules"
      });
    }

    let modulesData;

    if (typeof modules === "string") {
      modulesData = JSON.parse(modules);
    } else if (Array.isArray(modules)) {
      modulesData = modules;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid modules format"
      });
    }

    let fileIndex = 0;
    const createdModuleIds = [];

    for (let module of modulesData) {

      const lectureIds = [];
      let lectureOrderCounter = 1; // 🔥 auto order

      for (let lecture of module.lectures) {

        if (!req.files || !req.files[fileIndex]) {
          return res.status(400).json({
            success: false,
            message: `Lecture video missing for ${lecture.lectureTitle}`
          });
        }

        const videoUrl = req.files[fileIndex].path.replace(
          "/upload/",
          "/upload/q_auto,f_auto/"
        );

        // 🔥 AUTO GENERATE MISSING FIELDS
        const newLecture = await Lecture.create({
          lectureId: new mongoose.Types.ObjectId().toString(), // auto unique
          lectureTitle: lecture.lectureTitle,
          lectureUrl: videoUrl,
          lectureOrder: lectureOrderCounter++, // auto increment
          lectureDuration: 0, // default 0 (update later if needed)
          isPreviewFree: false // default false
        });

        lectureIds.push(newLecture._id);
        fileIndex++;
      }

      const newModule = await Modules.create({
        courseId,
        title: module.moduleTitle,
        lectures: lectureIds
      });

      createdModuleIds.push(newModule._id);
    }

    await Course.findByIdAndUpdate(courseId, {
      $push: { modules: { $each: createdModuleIds } }
    });

    return res.status(201).json({
      success: true,
      message: "All modules created successfully"
    });

  } catch (error) {
    console.error("Create module error:", error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// export const createModule = async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const { modules } = req.body;

//     if (!courseId || !modules) {
//       return res.status(400).json({
//         success: false,
//         message: "Provide courseId and modules"
//       });
//     }

//     let modulesData;

//     if (typeof modules === "string") {
//       modulesData = JSON.parse(modules);
//     } else if (Array.isArray(modules)) {
//       modulesData = modules;
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid modules format"
//       });
//     }

//     let fileIndex = 0;
//     const createdModuleIds = [];

//     for (let module of modulesData) {

//       const lectureIds = [];
//       let lectureOrderCounter = 1;

//       for (let lecture of module.lectures) {

//         if (!req.files || !req.files[fileIndex]) {
//           return res.status(400).json({
//             success: false,
//             message: `Lecture video missing for ${lecture.lectureTitle}`
//           });
//         }

//         const videoPath = req.files[fileIndex].path;

//         const videoUrl = videoPath.replace(
//           "/upload/",
//           "/upload/q_auto,f_auto/"
//         );

//         // 1️⃣ Create Lecture First
//         const newLecture = await Lecture.create({
//           lectureId: new mongoose.Types.ObjectId().toString(),
//           lectureTitle: lecture.lectureTitle,
//           lectureUrl: videoUrl,
//           lectureOrder: lectureOrderCounter++,
//           lectureDuration: 0,
//           isPreviewFree: false,
//           transcript: "",
//           chunks: []
//         });

//         // ==========================
//         // 🔥 RAG PROCESS START
//         // ==========================

//         try {
//           // 2️⃣ Generate Transcript from Video
//           const transcript = await generateTranscript(videoPath);

//           // 3️⃣ Chunk Transcript
//           const chunks = chunkText(transcript);

//           let embeddedChunks = [];

//           // 4️⃣ Create Embeddings for Each Chunk
//           for (let chunk of chunks) {
//             const embedding = await createEmbedding(chunk);

//             embeddedChunks.push({
//               text: chunk,
//               embedding: embedding
//             });
//           }

//           // 5️⃣ Update Lecture with Transcript + Chunks
//           await Lecture.findByIdAndUpdate(newLecture._id, {
//             transcript: transcript,
//             chunks: embeddedChunks
//           });

//         } catch (aiError) {
//           console.error("AI Processing Error:", aiError);
//         }

//         // ==========================
//         // 🔥 RAG PROCESS END
//         // ==========================

//         lectureIds.push(newLecture._id);
//         fileIndex++;
//       }

//       const newModule = await Modules.create({
//         courseId,
//         title: module.moduleTitle,
//         lectures: lectureIds
//       });

//       createdModuleIds.push(newModule._id);
//     }

//     await Course.findByIdAndUpdate(courseId, {
//       $push: { modules: { $each: createdModuleIds } }
//     });

//     return res.status(201).json({
//       success: true,
//       message: "All modules created successfully with AI processing"
//     });

//   } catch (error) {
//     console.error("Create module error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
export const getSingleCourseModule=async(req ,res)=>{
    try{
       const moduleId=req.params.id;
       if(!moduleId){
        return res.status(201).json({
            message:"Please provide module id"
        })
       }
       const singleModule=await Modules.findById(moduleId);
       if(!singleModule){
         return res.status(201).json({
            message:"Module not found"
        })
       }
       return res.status(201).json(singleModule);
    }catch(error){
        console.log(`Error from get MOdules , ${error}`)
    }
}
export const getComment=async(req,res)=>{
    try{
      const moduleId=req.params.id;
      if(!moduleId){
         return res.status(201).json({
            message:"Please provide module id"
        })
      }
      const moduleComment=await Modules.findById(moduleId).populate({
        path:'comments',
        populate:{
            path:'userId',
            select:'fullName email'
        },
        options:{sort:{createdAt:-1}}
      })
      return res.status(200).json(moduleComment.comments)
    }catch(error){
        console.log(` error from get comment, ${error}`)
    }
}