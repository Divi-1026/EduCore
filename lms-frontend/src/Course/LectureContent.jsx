import { useState, useRef, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import QuizSection from "./QuizSection";
import CommentSection from "./CommentSection";
import { ChevronDown, ChevronUp, HelpCircle, MessageSquare } from "lucide-react";

const LectureContent = ({ lecture, courseId, onOpenQuiz, totalLectures,coursetitle }) => {
  const videoRef = useRef(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showComments, setShowComments] = useState(true);
 console.log("lec",lecture)
  // Update video source when lecture changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
    // Reset sections when lecture changes
    setShowQuiz(false);
    setShowComments(true);
  }, [lecture.lectureUrl]);

  return (
    <div className="space-y-4">
      {/* Video Player Section */}
      <div className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
        <div className="p-4 border-b border-green-100 bg-gradient-to-r from-green-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{lecture.lectureTitle}</h2>
              <p className="text-sm text-gray-600 mt-1">{lecture.lectureDescription}</p>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              Lecture {lecture.order || 1} of {totalLectures}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <VideoPlayer 
            ref={videoRef}
            videoUrl={lecture.lectureUrl}
          />
        </div>
      </div>

      {/* Quiz Section - Collapsible */}
      <div className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
        <button
          onClick={() => setShowQuiz(!showQuiz)}
          className="w-full p-4 flex items-center justify-between hover:bg-green-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <HelpCircle size={18} className="text-orange-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Practice Quiz</h3>
              <p className="text-xs text-gray-500">Test your understanding of this lecture</p>
            </div>
          </div>
          {showQuiz ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
        </button>
        
        {showQuiz && (
          <div className="p-4 border-t border-green-100 bg-orange-50/30">
            <QuizSection 
              lectureId={lecture._id}
              onOpenQuiz={onOpenQuiz}
              lecturetitle={lecture.lectureTitle}
              coursetitle={coursetitle}
            />
          </div>
        )}
      </div>

      {/* Comments Section - Collapsible */}
      <div className="bg-white rounded-xl shadow-sm border border-green-100 overflow-hidden">
        <button
          onClick={() => setShowComments(!showComments)}
          className="w-full p-4 flex items-center justify-between hover:bg-green-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare size={18} className="text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800">Discussion & Comments</h3>
              <p className="text-xs text-gray-500">Ask doubts and interact with other learners</p>
            </div>
          </div>
          {showComments ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
        </button>
        
        {showComments && (
          <div className="p-4 border-t border-green-100">
            <CommentSection 
              lectureId={lecture._id}
              courseId={courseId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureContent;