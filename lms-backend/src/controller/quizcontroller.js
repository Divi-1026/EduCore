import { Quiz } from "../model/Quiz.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ENV } from "../config/env.js";
import { Questions } from "../model/question.js";
import { Modules } from "../model/modules.js";
import { Lecture } from "../model/Videos.js";
const genAi=new GoogleGenerativeAI(ENV.GEMINI_API_KEY);
const model=genAi.getGenerativeModel({model: "gemini-2.5-flash"});
export const checkQuiz=async(req,res)=>{
    try{
const lectureId=req.params.id;
const quiz=await Quiz.findOne({
    userId:req.user._id,
    lectureId
})
return res.status(201).json({
   success:"true",
   hasQuiz:quiz,
   quiz:quiz||null

})
    }catch(error){
        console.log(error,"from check quiz")
    }
} 
export const generateQuiz = async (req, res) => {
  try {
    const { lectureId, content } = req.body;
  console.log(content)
    const newQuiz = await Quiz.create({
      userId: req.user._id,
      lectureId,
      questions: []
    });

    const prompt = `Generate 5 technical questions for ${content}.
Return JSON:
{
 "questions":[
   {
     "question":"String",
     "options":["a","b","c","d"],
     "correctOption":"string",
     "explanation":"String"
   }
 ]
}`;

    const result = await model.generateContent(prompt);
    console.log(result);
    const text = result.response.text()
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(text);
   
    const createdQuestions = [];

    for (const q of parsed.questions) {
      const doc = await Questions.create({
        quizId: newQuiz._id,
        content: q.question,
        options: q.options,
        correctOption: q.correctOption,
        explanation: q.explanation
      });

      createdQuestions.push({
        questionId: doc._id
      });
    }

    newQuiz.questions = createdQuestions;
    await newQuiz.save();

    res.status(201).json({
      success: true,
      quizId: newQuiz._id
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getQuize = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findById(id)
      .populate("questions.questionId");

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const formattedQuestions = quiz.questions.map((q) => ({
      _id: q.questionId._id,
      question: q.questionId.content,
      options: q.questionId.options,
      correctOption: q.questionId.correctOption,
      explanation: q.questionId.explanation,
      selectedOption: q.selectedOption || null
    }));

    res.status(200).json({
      success: true,
      quiz: {
        _id: quiz._id,
        attempted: quiz.attempted,
        score: quiz.score,
        questions: formattedQuestions
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
// export const generateQuiz = async (req, res) => {
//     try {
//         console.log(req.body)
//         const { lectureId, content} = req.body;
//         console.log(lectureId,content,"frot quiz")
//         if (!lectureId || !content) {
//             return res.status(400).json({
//                 message: "Something is missing"
//             });
//         }

//         const quizzes = await Quiz.find({
//             userId: req.user._id,
//             lectureId
//         });

//         // if (quizzes.length > 0) {
//         //     return res.status(200).json({
//         //         message: "Quiz already exists. Do you want to generate a new quiz or see history?",
//         //         ask: true
//         //     });
//         // }

//         // if (history) {
//         //     return res.status(200).json({
//         //         message: "Quiz history fetched",
//         //         quizzes
//         //     });
//         // }

//         const newQuiz = await Quiz.create({
//             userId: req.user._id,
//             lectureId,
//             questions: []
//         });

//         const prompt = `Generate 10 technical questions for ${content}.
// Each question should be multiple choice with 4 options.
// Return response strictly in this JSON format:
// {
//  "questions":[
//    {
//      "question":"String",
//      "options":["string","string","string","string"],
//      "correctOption":"string",
//      "explanation":"String"
//    }
//  ]
// }`;

//         const result = await model.generateContent(prompt);
//         const text = result.response.text();
//         const cleanText = text.replace(/```json/gi, "").replace(/```/g, "").trim();
// console.log(cleanText)
//         let parsed;

//         try {
//             parsed = JSON.parse(cleanText);
//         } catch (error) {
//             await Quiz.findByIdAndDelete(newQuiz._id);
//             return res.status(500).json({ message: "Quiz can't be created" });
//         }

//         const generatedQuestions = parsed.questions;

//         if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
//             await Quiz.findByIdAndDelete(newQuiz._id);
//             return res.status(500).json({ message: "No questions generated" });
//         }

//         const createdQuestions = [];

//         for (const q of generatedQuestions) {
//             const doc = await Questions.create({
//                 quizId: newQuiz._id,
//                 content: q.question,
//                 options: q.options,
//                 correctOption: q.correctOption,
//                 explanation: q.explanation
//             });

//             createdQuestions.push(doc._id);
//         }

//         await Quiz.findByIdAndUpdate(
//             newQuiz._id,
//             { $push: { questions: { $each: createdQuestions } } },
//             { new: true }
//         );

//         await Lecture.findByIdAndUpdate(
//             lectureId,
//             { $push: { quiz: newQuiz._id } },
//             { new: true }
//         );

//         return res.status(201).json({
//             message: "Quiz generated successfully",
//             quizId: newQuiz._id
//         });

//     } catch (error) {
//         console.log(`error from generateQuiz: ${error}`);
//         return res.status(500).json({ message: "Server error" });
//     }
// };
// export const getQuize = async (req, res) => {
//   try {
//     const { id } = req.params;
//      console.log("from getQuizzee",id);
//     const quiz = await Quiz.findById(id)
//       .populate("questions.questionId");

//     if (!quiz) {
//       return res.status(404).json({
//         success: false,
//         message: "Quiz not found"
//       });
//     }
//   console.log(quiz)
//     const formattedQuiz = quiz.questions
//       .filter(q => q.questionId)
//       .map((q) => ({
//         questionId: q.questionId._id,
//         question: q.questionId.question,
//         options: q.questionId.options,
//         correctOption: q.questionId.correctOption,
//         selectedOption: q.selectedOption
//       }));

//     return res.status(200).json({
//       success: true,
//       quizId: quiz._id,
//       quiz:quiz
//     });

//   } catch (error) {
//     console.error("Get Quiz Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };
export const generateQuizAgain = async (req, res) => {
    try {
        const { lectureId, content} = req.body;
 console.log(lectureId,content);
        if (!lectureId || !content) {
            return res.status(400).json({
                message: "Something is missing"
            });
        }
        const newQuiz = await Quiz.create({
            userId: req.user._id,
            lectureId,
            questions: []
        });

        const prompt = `Generate 10 technical questions for ${content}.
Each question should be multiple choice with 4 options.
Return response strictly in this JSON format:
{
 "questions":[
   {
     "question":"String",
     "options":["string","string","string","string"],
     "correctOption":"string",
     "explanation":"String"
   }
 ]
}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const cleanText = text.replace(/```json/gi, "").replace(/```/g, "").trim();
console.log(cleanText)
        let parsed;

        try {
            parsed = JSON.parse(cleanText);
        } catch (error) {
            await Quiz.findByIdAndDelete(newQuiz._id);
            return res.status(500).json({ message: "Quiz can't be created" });
        }

        const generatedQuestions = parsed.questions;

        if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
            await Quiz.findByIdAndDelete(newQuiz._id);
            return res.status(500).json({ message: "No questions generated" });
        }

        const createdQuestions = [];

        for (const q of generatedQuestions) {
            const doc = await Questions.create({
                quizId: newQuiz._id,
                content: q.question,
                options: q.options,
                correctOption: q.correctOption,
                explanation: q.explanation
            });

            createdQuestions.push(doc._id);
        }

        await Quiz.findByIdAndUpdate(
            newQuiz._id,
            { $push: { questions: { $each: createdQuestions } } },
            { new: true }
        );

        await Lecture.findByIdAndUpdate(
            lectureId,
            { $push: { quiz: newQuiz._id } },
            { new: true }
        );

        return res.status(201).json({
            message: "Quiz generated successfully",
            quizId: newQuiz._id
        });

    } catch (error) {
        console.log(`error from generateQuiz: ${error}`);
        return res.status(500).json({ message: "Server error" });
    }
};
export const getQuizzesByLecture = async (req, res) => {
  try {
    console.log("o",req.params)
    const { id } = req.params;

    const lectureId=id;
   console.log("get quiz",lectureId)
    if (!lectureId) {
      return res.status(400).json({
        success: false,
        message: "Lecture id is required",
      });
    }

    const quizzes = await Quiz.find({ lectureId })
      .select("_id createdAt")   // 👈 only these fields
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      quizzes,
    });
  } catch (error) {
    console.log("Error from getQuizzesByLecture:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const submitQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body;

    const quiz = await Quiz.findById(id)
      .populate("questions.questionId");

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (quiz.attempted) {
      return res.status(400).json({ message: "Already attempted" });
    }

    let score = 0;

    quiz.questions = quiz.questions.map((q) => {
      const selected = answers[q.questionId._id];
      const correct = q.questionId.correctOption;

      const isCorrect = selected === correct;
      if (isCorrect) score++;

      return {
        questionId: q.questionId._id,
        selectedOption: selected,
        isCorrect
      };
    });

    quiz.score = score;
    quiz.attempted = true;

    await quiz.save();

    res.status(200).json({
      success: true,
      quiz
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
// export const submitQuiz = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { answers } = req.body; 
//     // answers = { questionId: selectedOption }
    
//     const quiz = await Quiz.findById(id);

//     if (!quiz) {
//       return res.status(404).json({ message: "Quiz not found" });
//     }

//     if (quiz.attempted) {
//       return res.status(400).json({ message: "Quiz already attempted" });
//     }

//     let totalScore = 0;

//     // populate questions to get correctOption
//     const populatedQuiz = await Quiz.findById(quizId)
//       .populate("questions.questionId");

//     const updatedQuestions = populatedQuiz.questions.map((q) => {
//       const selected = answers[q.questionId._id];
//       const correct = q.questionId.correctOption;

//       const isCorrect = selected === correct;

//       if (isCorrect) totalScore++;

//       return {
//         questionId: q.questionId._id,
//         selectedOption: selected,
//         isCorrect
//       };
//     });

//     quiz.questions = updatedQuestions;
//     quiz.score = totalScore;
//     quiz.attempted = true;

//     await quiz.save();

//     res.status(200).json({
//       message: "Quiz submitted",
//       quiz
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
