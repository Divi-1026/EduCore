// import { useParams } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { usegetPurchaseCourseHook } from "@/hooks/course.hook";
// import { usePayment } from "@/hooks/payment.hook";
// import { useCreateCommentHook, useGetCommentHook } from "@/hooks/comment.hook";
// import { useCreateQuizHook, useGetquizHook } from "@/hooks/quiz.hook";
// import { Play, BookOpen, Clock } from "lucide-react";

// const CourseDetails = () => {
//   const { id } = useParams();
//   const { data, isLoading } = usegetPurchaseCourseHook(id);
//   const { mutate: generateQuiz } = useCreateQuizHook();
//   const { mutate: purchaseCourse } = usePayment();

//   const [openModule, setOpenModule] = useState(null);
//   const [selectedLecture, setSelectedLecture] = useState(null);
//   const [commentText, setCommentText] = useState("");
//   const videoRef = useRef(null);

//   // Quiz Modal
//   const [showQuizModal, setShowQuizModal] = useState(false);
//   const [quizData, setQuizData] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [score, setScore] = useState(null);

//   const isPurchased = data?.isPurchased || false;

//   // Comments
//   const { data: comments = [], refetch: refetchComments } =
//     useGetCommentHook(selectedLecture?._id, { enabled: !!selectedLecture?._id });
//   const { mutate: createComment } = useCreateCommentHook(selectedLecture?._id);

//   // Quizzes
//   const { data: quizzesData = [], refetch: refetchQuizzes } =
//     useGetquizHook(selectedLecture?._id, { enabled: !!selectedLecture?._id });
//   const quizzes = quizzesData?.quizzes || [];

//   // Initialize first lecture
//   useEffect(() => {
//     if (isPurchased && data?.modules?.length > 0) {
//       setOpenModule(0);
//       const firstLecture = data.modules[0]?.lectures?.[0];
//       if (firstLecture) setSelectedLecture(firstLecture);
//     }
//   }, [data, isPurchased]);

//   useEffect(() => {
//     if (selectedLecture?._id) {
//       refetchComments();
//       refetchQuizzes();
//     }
//   }, [selectedLecture]);

//   // ---------------- QUIZ ----------------
//   const openQuizModal = async (quizId) => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/quiz/get_quiz/${quizId}`,
//         { withCredentials: true }
//       );
//       setQuizData(res.data.quiz);
//       setAnswers({});
//       setScore(null);
//       setShowQuizModal(true);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleCreateQuiz = () => {
//     if (!selectedLecture?._id) return;

//     generateQuiz(
//       {
//         lectureId: selectedLecture._id,
//         content: selectedLecture.lectureTitle,
//       },
//       {
//         onSuccess: (data) => {
//           if (data?.quizId) openQuizModal(data.quizId);
//         },
//       }
//     );
//   };

//   const handleSelect = (questionId, option) => {
//     setAnswers({ ...answers, [questionId]: option });
//   };

//   const handleSubmit = () => {
//     let correct = 0;
//     quizData.questions.forEach((q) => {
//       if (answers[q._id] === q.correctAnswer) correct++;
//     });
//     setScore(correct);
//   };

//   // ---------------- COMMENT ----------------
//   const handlePostComment = () => {
//     if (!commentText.trim()) return;
//     createComment(
//       { courseId: id, lectureId: selectedLecture._id, comment: commentText },
//       { onSuccess: () => { setCommentText(""); refetchComments(); } }
//     );
//   };

//   if (isLoading) return <div className="text-center mt-20">Loading...</div>;
//   if (!data) return <div className="text-center mt-20">Course not found.</div>;

//   const totalLectures = data.modules?.reduce(
//     (acc, m) => acc + (m.lectures?.length || 0), 0
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* HERO */}
//       <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
//         <div className="max-w-6xl mx-auto px-6">
//           <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
//           <p className="text-gray-300 max-w-2xl">{data.description}</p>
//           <div className="flex gap-6 mt-6 text-sm">
//             <span className="flex items-center gap-2"><BookOpen size={16} /> {data.modules?.length} Modules</span>
//             <span className="flex items-center gap-2"><Play size={16} /> {totalLectures} Lectures</span>
//             <span className="flex items-center gap-2"><Clock size={16} /> Lifetime Access</span>
//           </div>
//         </div>
//       </div>

//       {/* CONTENT */}
//       <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-4 gap-6">
//         {/* MODULES + LECTURES LIST */}
//         <div className="lg:col-span-1 space-y-6">
//           <h3 className="font-semibold text-lg mb-2">Modules</h3>
//           <div className="space-y-3">
//             {data.modules?.map((mod, mi) => (
//               <div key={mod._id} className="bg-white p-4 rounded-xl shadow-sm">
//                 <h4 className="font-semibold">{mod.title}</h4>
//                 <div className="mt-2 space-y-1">
//                   {mod.lectures?.map((lec, li) => (
//                     <button
//                       key={lec._id}
//                       onClick={() => { setSelectedLecture(lec); setOpenModule(mi); }}
//                       className={`block text-left w-full px-3 py-1 rounded-lg ${
//                         selectedLecture?._id === lec._id ? "bg-black text-white" : "hover:bg-gray-100"
//                       }`}
//                     >
//                       {lec.lectureTitle}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* LECTURE VIDEO + QUIZ + COMMENTS */}
//         <div className="lg:col-span-3 space-y-6">
//           {selectedLecture && (
//             <>
//               <div className="bg-white p-6 rounded-2xl shadow-md">
//                 <h2 className="text-xl font-semibold mb-2">{selectedLecture.lectureTitle}</h2>
//                 <p className="text-gray-600 mb-4">{selectedLecture.lectureDescription}</p>
//                 <div className="aspect-video bg-black rounded-xl overflow-hidden">
//                   <video
//                     ref={videoRef}
//                     key={selectedLecture.lectureUrl}
//                     src={selectedLecture.lectureUrl}
//                     controls
//                     className="w-full h-full"
//                   />
//                 </div>
//               </div>

//               {/* QUIZZES */}
//               <div className="bg-white p-6 rounded-2xl shadow-md">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-xl font-semibold">Lecture Quiz</h3>
//                   <button
//                     onClick={handleCreateQuiz}
//                     className="bg-black text-white px-4 py-2 rounded-xl"
//                   >
//                     + Create Quiz
//                   </button>
//                 </div>
//                 {quizzes.length > 0 ? quizzes.map((qz) => (
//                   <div key={qz._id} className="border p-3 rounded-xl mb-2 flex justify-between items-center bg-gray-50">
//                     <span>{new Date(qz.createdAt).toLocaleString()}</span>
//                     <button
//                       onClick={() => openQuizModal(qz._id)}
//                       className="bg-black text-white px-3 py-1 rounded-lg text-sm"
//                     >
//                       Start
//                     </button>
//                   </div>
//                 )) : <p className="text-gray-500 text-sm">No quizzes available</p>}
//               </div>

//               {/* COMMENTS */}
//               <div className="bg-white p-6 rounded-2xl shadow-md">
//                 <h3 className="text-xl font-semibold mb-4">Comments</h3>
//                 <div className="flex gap-2 mb-3">
//                   <input
//                     value={commentText}
//                     onChange={(e) => setCommentText(e.target.value)}
//                     placeholder="Write a comment..."
//                     className="flex-1 border rounded-xl px-3 py-2"
//                   />
//                   <button
//                     onClick={handlePostComment}
//                     className="bg-black text-white px-4 py-2 rounded-xl"
//                   >
//                     Post
//                   </button>
//                 </div>
//                 <div className="space-y-2">
//                   {comments.map((c) => (
//                     <div key={c._id} className="border p-2 rounded-xl bg-gray-50 text-sm">{c.comment}</div>
//                   ))}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {/* QUIZ MODAL */}
//       {showQuizModal && quizData && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white w-[380px] max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
//             <div className="p-5 border-b flex justify-between">
//               <h2 className="font-bold">{quizData.title}</h2>
//               <button onClick={() => setShowQuizModal(false)}>✕</button>
//             </div>
//             <div className="p-5 overflow-y-auto space-y-6">
//               {quizData.questions.map((q, idx) => (
//                 <div key={q._id}>
//                   <h4 className="font-semibold mb-2">Q{idx+1}. {q.question}</h4>
//                   {q.options.map((opt, i) => (
//                     <div
//                       key={i}
//                       onClick={() => handleSelect(q._id, opt)}
//                       className={`border p-3 rounded-xl cursor-pointer mb-2 ${
//                         answers[q._id] === opt ? "bg-black text-white" : "hover:bg-gray-100"
//                       }`}
//                     >
//                       {opt}
//                     </div>
//                   ))}
//                 </div>
//               ))}
//             </div>
//             <div className="p-5 border-t">
//               {score === null ? (
//                 <button
//                   onClick={handleSubmit}
//                   className="w-full bg-black text-white py-3 rounded-xl"
//                 >
//                   Submit Quiz
//                 </button>
//               ) : (
//                 <div className="text-center font-semibold text-lg">
//                   🎉 Score: {score} / {quizData.questions.length}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseDetails;
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { usePayment } from "@/hooks/payment.hook";
import {
  BookOpen,
  Clock,
  MessageCircle,
  X,
  Send,
  Sparkles,
  Menu,
  ChevronRight,
  Bot,
  Zap,
  CheckCircle,
  PlayCircle,
  FileText,
  Maximize2,
  Minimize2,
  Copy,
  RefreshCw,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import ModuleList from "./ModuleList";
import LectureContent from "./LectureContent";
import QuizModal from "./QuizModal";
import CourseHero from "./CourseHero";

// API function
export const getSingleCourseApi = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/course/getSingleCourse/${id}`,
    {
      headers: {
        "Content-Type": "application/json"
      },
      withCredentials: true
    }
  );
  return res.data;
};

// New API to check purchase status
export const getPurchasedCourseApi = async (id) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/course/purchasedCourse/${id}`,
      {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
    );
    console.log("data",res.data)
    return res.data;
  } catch (error) {
    console.error("Error checking purchase status:", error);
    return null;
  }
};

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchased, setIsPurchased] = useState(false);
  
  // Payment hook with onSuccess callback
  const { mutate: purchaseCourse } = usePayment({
    onSuccess: (data) => {
      console.log("Payment successful, refreshing course data...", data);
      // Refetch course data after successful payment
      fetchCourseData();
      
      // Also check purchase status
      checkPurchaseStatus();

      
      // Show success message in chat if needed
      setChatMessages([
        {
          id: Date.now(),
          type: "bot",
          message: "🎉 Congratulations! You've successfully purchased this course. All lectures are now unlocked!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    },
    onError: (error) => {
      console.error("Payment failed:", error);
      
      // Check if error is "already purchased"
      if (error?.response?.data?.message === "You already have this course") {
        console.log("Course already purchased, unlocking...");
        setIsPurchased(true);
        fetchCourseData();
      }
    }
  });

  const [openModule, setOpenModule] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const [chatMinimized, setChatMinimized] = useState(false);
  const [copied, setCopied] = useState(false);
  const [suggestedQuestions] = useState([
    "Explain this concept in simple terms",
    "Give me an example",
    "What are the key takeaways?",
    "How is this used in real projects?"
  ]);

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "bot",
      message: "Hi! I'm your AI learning assistant. Ask me anything about this lecture!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const bottomRef = useRef(null);
  const chatInputRef = useRef(null);

  // Check purchase status function
  const checkPurchaseStatus = async () => {
    try {
      const result = await getPurchasedCourseApi(id);
      if (result && result.success) {
        setIsPurchased(result.isPurchased);
        
        if (result.isPurchased && result.modules?.length > 0) {
          setOpenModule(0);
          const firstLecture = result.modules[0]?.lectures?.[0];
          if (firstLecture) setSelectedLecture(firstLecture);
        }
      }
    } catch (error) {
      console.error("Error checking purchase status:", error);
    }
  };

  // Fetch course data function
  const fetchCourseData = async () => {
    try {
      setIsLoading(true);
      const data = await getPurchasedCourseApi(id);
      console.log("Course data fetched:", data);
      setCourseData(data);
      setIsPurchased(data?.isPurchased || false);
      
      // Agar purchased hai to pehla lecture auto-select karo
      if (data?.isPurchased && data?.modules?.length > 0) {
        setOpenModule(0);
        const firstLecture = data.modules[0]?.lectures?.[0];
        if (firstLecture) setSelectedLecture(firstLecture);
      }
    } catch (error) {
      console.error("Error fetching course:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (id) {
      fetchCourseData();
    }
  }, [id]);

  // Check URL for session_id after Stripe redirect
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sessionId = queryParams.get('session_id');
    
    if (sessionId && id) {
      console.log("Session ID found, checking purchase status...");
      checkPurchaseStatus();
      
      // Clean up URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [id]);

  const modules = courseData?.modules || [];

  const totalLectures = useMemo(() => {
    return modules.reduce(
      (acc, m) => acc + (m?.lectures?.length || 0),
      0
    );
  }, [modules]);

  const completedLectures = useMemo(() => {
    // This would come from your actual progress tracking
    return isPurchased ? Math.floor(totalLectures * 0.3) : 0;
  }, [totalLectures, isPurchased]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    if (showChat && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [showChat]);

  const handleSelectLecture = (lecture, moduleIndex) => {
    // Agar purchased nahi hai to lecture open mat karo
    if (!isPurchased) {
      return;
    }
    setSelectedLecture(lecture);
    setOpenModule(moduleIndex);

    // Reset chat when lecture changes
    setChatMessages([
      {
        id: Date.now(),
        type: "bot",
        message: `Now discussing: **${lecture.title}**\n\nI'm here to help you understand this lecture better. Feel free to ask any questions!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendMessage = async () => {
    if (!chatMessage.trim() || !selectedLecture || !isPurchased) return;

    const userMsg = {
      id: Date.now(),
      type: "user",
      message: chatMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatMessage("");
    setLoadingChat(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/chat/lectures/chat`,
        {
          lectureId: selectedLecture._id,
          question: chatMessage
        },
        {
          withCredentials: true
        }
      );

      const botMsg = {
        id: Date.now() + 1,
        type: "bot",
        message: res.data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, botMsg]);

    } catch (error) {
      const errorMsg = {
        id: Date.now() + 2,
        type: "bot",
        message: "⚠️ Sorry, I'm having trouble connecting. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, errorMsg]);
    }

    setLoadingChat(false);
  };

  const handleSuggestedQuestion = (question) => {
    setChatMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearChat = () => {
    setChatMessages([
      {
        id: Date.now(),
        type: "bot",
        message: `Chat cleared. How can I help you with this lecture?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleOpenQuiz = (quizId) => {
    // Agar purchased nahi hai to quiz mat kholo
    if (!isPurchased) {
      return;
    }
    setSelectedQuizId(quizId);
    setShowQuizModal(true);
  };

  const handlePurchase = () => {
    purchaseCourse(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full"
        />
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white p-10 rounded-2xl shadow-xl border border-green-100 text-center max-w-md"
        >
          <BookOpen size={60} className="mx-auto text-green-500 mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h3>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-25 w-full bg-gradient-to-b from-green-50 to-white">
      {/* Course Hero */}
      <CourseHero
        title={courseData?.title}
        description={courseData?.description}
        modulesCount={modules.length}
        totalLectures={totalLectures}
        isPurchased={isPurchased}
        onPurchase={handlePurchase}
      />

      {/* Progress Bar (if purchased) */}
      {isPurchased && (
        <div className="sticky top-[75px] z-40 bg-white/80 backdrop-blur-sm border-b border-green-100">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center gap-2">
                <CheckCircle size={16} className="text-green-600" />
                Your Progress
              </span>
              <span className="text-green-600 font-semibold">{completedLectures}/{totalLectures} lectures</span>
            </div>
            <div className="w-full h-2 bg-green-100 rounded-full mt-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(completedLectures / totalLectures) * 100}%` }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full relative max-w-7xl mx-auto">
        {/* Sidebar Toggle (Mobile) */}
        {isPurchased && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed bottom-20 left-4 z-50 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-3 rounded-full shadow-lg"
          >
            <Menu size={20} />
          </motion.button>
        )}

        {/* Sidebar */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: isSidebarOpen || !isPurchased ? 0 : -320 }}
            transition={{ duration: 0.3 }}
            className={`fixed lg:static mt-25 top-0 left-0 h-full z-40
              w-80 min-w-[320px]
              bg-white/95 backdrop-blur-sm border-r border-green-100
              shadow-xl lg:shadow-none
              ${(isSidebarOpen || !isPurchased) ? 'block' : 'hidden lg:block'}`}
          >
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="p-5 border-b border-green-100 bg-gradient-to-r from-green-50 to-emerald-50/50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                      <BookOpen size={18} className="text-green-600" />
                      Course Content
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                      <span>{modules.length} Modules</span>
                      <span>•</span>
                      <span>{totalLectures} Lectures</span>
                    </p>
                  </div>
                  {isPurchased && (
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="lg:hidden w-8 h-8 rounded-full hover:bg-white/50 flex items-center justify-center"
                    >
                      <X size={18} className="text-gray-500" />
                    </button>
                  )}
                </div>
                
                {/* Agar purchased nahi hai to preview message */}
                {!isPurchased && (
                  <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-xs text-amber-700 flex items-center gap-1">
                      <Lock size={12} />
                      Purchase course to unlock all lectures
                    </p>
                  </div>
                )}

                {/* Success message when purchased */}
                {isPurchased && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <p className="text-xs text-green-700 flex items-center gap-1">
                      <CheckCircle size={12} />
                      Course unlocked! Start learning now.
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Module List */}
              <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-green-200">
                <ModuleList
                  modules={modules}
                  selectedLecture={selectedLecture}
                  onSelectLecture={handleSelectLecture}
                  isPurchased={isPurchased}
                  openModule={openModule}
                  setOpenModule={setOpenModule}
                />
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-green-100 bg-green-50/50">
                <div className="flex justify-between items-center text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-green-600" />
                    {isPurchased ? 'Lifetime Access' : 'Preview Available'}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText size={14} className="text-green-600" />
                    {totalLectures} Lectures
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 min-w-0 p-6"
        >
          {!isPurchased ? (
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-12 shadow-xl border border-green-100 text-center max-w-2xl mx-auto"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen size={48} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Unlock This Course
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Purchase this course to get full access to all lectures, quizzes, and the AI learning assistant.
              </p>
              
              {/* Preview Info */}
              <div className="mb-8 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Sparkles size={16} className="text-green-600" />
                  This course includes:
                </h4>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-500" />
                    {modules.length} Modules • {totalLectures} Video Lectures
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-500" />
                    Interactive Quizzes & Assignments
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-500" />
                    AI-Powered Learning Assistant
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-green-500" />
                    Lifetime Access & Certificate
                  </li>
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePurchase}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-green-500/30 flex items-center gap-2 mx-auto"
              >
                Purchase Course
                <ChevronRight size={20} />
              </motion.button>
            </motion.div>
          ) : selectedLecture ? (
            <LectureContent
              lecture={selectedLecture}
              courseId={id}
              totalLectures={totalLectures}
              coursetitle={courseData?.title}
              onOpenQuiz={handleOpenQuiz}
              isPurchased={isPurchased}
            />
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-16 shadow-xl border border-green-100 text-center"
            >
              <PlayCircle size={64} className="mx-auto text-green-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Select a Lecture
              </h3>
              <p className="text-gray-500">
                Choose a lecture from the sidebar to start learning
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuizModal && selectedQuizId && isPurchased && (
          <QuizModal
            quizId={selectedQuizId}
            onClose={() => setShowQuizModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Chat Assistant */}
      {isPurchased && (
        <>
          {/* Chat Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowChat(!showChat)}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
          >
            {showChat ? <X size={22} /> : <MessageCircle size={22} />}
          </motion.button>

          {/* Chat Window */}
          <AnimatePresence>
            {showChat && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  height: chatMinimized ? 'auto' : '500px'
                }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={`fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-green-200 overflow-hidden z-50
                  ${chatMinimized ? 'h-auto' : 'h-[500px]'}`}
              >
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Bot size={20} />
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                    </div>
                    <div>
                      <span className="font-semibold">Lecture Assistant</span>
                      <p className="text-xs text-green-100">AI-powered • Online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setChatMinimized(!chatMinimized)}
                      className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center"
                    >
                      {chatMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                    </button>
                    <button
                      onClick={() => setShowChat(false)}
                      className="w-8 h-8 rounded-lg hover:bg-white/20 flex items-center justify-center"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {!chatMinimized && (
                  <>
                    {/* Chat Messages */}
                    <div className="h-80 overflow-y-auto p-4 bg-gray-50/50 scrollbar-thin scrollbar-thumb-green-200">
                      {chatMessages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, x: msg.type === 'user' ? 20 : -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`mb-4 ${msg.type === "user" ? "text-right" : "text-left"}`}
                        >
                          {msg.type === 'bot' && (
                            <div className="flex items-center gap-2 mb-1 text-xs text-gray-500">
                              <Bot size={12} className="text-green-600" />
                              <span>AI Assistant</span>
                              <span>•</span>
                              <span>{msg.timestamp}</span>
                            </div>
                          )}
                          <div
                            className={`inline-block px-4 py-3 rounded-2xl text-sm max-w-[85%] ${
                              msg.type === "user"
                                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-tr-none"
                                : "bg-white border border-green-100 rounded-tl-none shadow-sm"
                            }`}
                          >
                            <div className="whitespace-pre-wrap">{msg.message}</div>
                            
                            {/* Copy button for bot messages */}
                            {msg.type === 'bot' && (
                              <button
                                onClick={() => copyToClipboard(msg.message)}
                                className="mt-2 text-xs text-gray-400 hover:text-green-600 flex items-center gap-1"
                              >
                                {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
                                {copied ? 'Copied!' : 'Copy'}
                              </button>
                            )}
                          </div>
                          {msg.type === 'user' && (
                            <p className="text-xs text-gray-400 mt-1">{msg.timestamp}</p>
                          )}
                        </motion.div>
                      ))}
                      
                      {loadingChat && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2 text-gray-500 text-sm mb-4"
                        >
                          <Bot size={16} className="text-green-600 animate-pulse" />
                          <span>AI is thinking</span>
                          <div className="flex gap-1">
                            <span className="w-1 h-1 bg-green-600 rounded-full animate-bounce" />
                            <span className="w-1 h-1 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <span className="w-1 h-1 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                          </div>
                        </motion.div>
                      )}
                      <div ref={bottomRef} />
                    </div>

                    {/* Suggested Questions */}
                    {chatMessages.length < 3 && (
                      <div className="px-4 py-2 border-t border-green-100 bg-green-50/30">
                        <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                          <Zap size={12} className="text-green-600" />
                          Suggested questions:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {suggestedQuestions.map((q, i) => (
                            <button
                              key={i}
                              onClick={() => handleSuggestedQuestion(q)}
                              className="text-xs bg-white border border-green-200 px-3 py-1.5 rounded-full hover:bg-green-50 hover:border-green-300 transition-colors"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Chat Input */}
                    <div className="p-3 border-t border-green-100 bg-white">
                      <div className="flex gap-2">
                        <input
                          ref={chatInputRef}
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                          placeholder="Ask anything about this lecture..."
                          className="flex-1 border border-green-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSendMessage}
                          disabled={!chatMessage.trim()}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                        >
                          <Send size={18} />
                        </motion.button>
                      </div>
                      
                      {/* Clear chat option */}
                      {chatMessages.length > 2 && (
                        <button
                          onClick={clearChat}
                          className="mt-2 text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 mx-auto"
                        >
                          <RefreshCw size={10} />
                          Clear conversation
                        </button>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default CourseDetails;