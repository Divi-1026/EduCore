import { useState } from "react";
import { useGetquizHook, useCreateQuizHook } from "@/hooks/quiz.hook";
import QuizHistory from "./QuizHistory";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuizSection = ({ lectureId,lecturetitle,coursetitle }) => {
  const { mutate: generateQuiz } = useCreateQuizHook();
  const navigate=useNavigate();
  const { 
    data: quizzesData = [], 
    refetch: refetchQuizzes 
  } = useGetquizHook(lectureId, { enabled: !!lectureId });
  console.log(coursetitle,"tit")
  const quizzes = quizzesData?.quizzes || [];

  const [selectedQuizId, setSelectedQuizId] = useState(null);

//   const handleCreateQuiz = () => {
//   if (!lectureId) return;

//   generateQuiz(
//     {
//       lectureId,
//       content: "Quiz for this lecture",
//     },
//     {
//       onSuccess: async (data) => {
//         if (data?.quizId) {

//           // 🔥 Fetch full quiz
//           const res = await axios.get(
//             `${import.meta.env.VITE_BASE_URL}/quiz/get_quiz/${data.quizId}`,
//             { withCredentials: true }
//           );

//           const fullQuiz = res?.data?.quiz;
//            console.log("full",fullQuiz)
//           refetchQuizzes();

//           // 🔥 Redirect to attempt page
//           navigate(`/attempt_quiz/${data.quizId}`, {
//             state: { quizData: fullQuiz }
//           });
//         }
//       },
//     }
//   );
// };
const handleCreateQuiz = () => {
  generateQuiz(
    { lectureId, content: `Quiz for this lecture ${lecturetitle} whih is a lecture of course ${coursetitle}` },
    {
      onSuccess: (data) => {
        navigate(`/attempt_quiz/${data.quizId}`);
      }
    }
  );
};
  const handleViewQuiz = (quizId) => {
    setSelectedQuizId(quizId); // open history modal
  };

  const handleCloseHistory = () => {
    setSelectedQuizId(null);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Lecture Quiz</h3>
          <button
            onClick={handleCreateQuiz}
            className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
          >
            + Create Quiz
          </button>
        </div>

        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="border p-3 rounded-xl mb-2 flex justify-between items-center bg-gray-50"
            >
              <span>
                {new Date(quiz.createdAt).toLocaleString()}
              </span>
              <button >Delete</button>
              <button
                onClick={() => handleViewQuiz(quiz._id)}
                className="bg-black text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-800 transition"
              >
                View
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">
            No quizzes available for this lecture
          </p>
        )}
      </div>

      {/* Quiz History Modal */}
      {selectedQuizId && (
        <QuizHistory
          quizId={selectedQuizId}
          onClose={handleCloseHistory}
        />
      )}
    </>
  );
};

export default QuizSection;