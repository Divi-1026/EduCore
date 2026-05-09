import { useState, useEffect } from "react";
import axios from "axios";

const QuizModal = ({ quizId, onClose }) => {
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (quizId) fetchQuiz();
  }, [quizId]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/quiz/get_quiz/${quizId}`,
        { withCredentials: true }
      );
      console.log("hello",res?.data)
      setQuizData(res?.data?.quiz || null);
      setAnswers({});
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (questionId, option) => {
    if (quizData?.attempted) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/quiz/submit/${quizId}`,
        { answers },
        { withCredentials: true }
      );

      setQuizData(res?.data?.quiz);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setQuizData(null);
    setAnswers({});
    onClose();
  };

  // ================= Loading =================
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl">
          Loading quiz...
        </div>
      </div>
    );
  }

  // ================= Error =================
  if (error || !quizData) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl">
          <p className="text-red-500 mb-4">
            {error || "Quiz not found"}
          </p>
          <button
            onClick={handleClose}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const isAttempted = quizData?.attempted;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="font-bold text-lg">Quiz</h2>
          <button
            onClick={handleClose}
            className="hover:bg-gray-100 p-1 rounded-full"
          >
            ✕
          </button>
        </div>

        {/* Questions */}
        <div className="p-5 overflow-y-auto space-y-6">
          {quizData?.questions?.length > 0 ? (
            quizData.questions.map((q, idx) => {

              const question = q?.questionId;
              if (!question) return null;

              return (
                <div key={question._id} className="border-b pb-4">
                  <h4 className="font-semibold mb-3">
                    Q{idx + 1}. {question.content}
                  </h4>

                  <div className="space-y-2">
                    {question?.options?.map((opt, i) => {

                      const isSelected = isAttempted
                        ? q.selectedOption === opt
                        : answers[question._id] === opt;

                      const isCorrect =
                        question.correctOption === opt;

                      return (
                        <div
                          key={i}
                          onClick={() =>
                            handleSelect(
                              question._id.toString(),
                              opt
                            )
                          }
                          className={`p-3 rounded-xl border transition cursor-pointer
                            ${
                              isAttempted
                                ? isCorrect
                                  ? "bg-green-200 border-green-500"
                                  : isSelected
                                  ? "bg-red-200 border-red-500"
                                  : "border-gray-200"
                                : isSelected
                                ? "bg-black text-white border-black"
                                : "hover:bg-gray-50 border-gray-200"
                            }
                          `}
                        >
                          {opt}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {isAttempted && (
                    <div className="mt-3 p-3 bg-gray-100 rounded-xl text-sm">
                      <p>
                        <strong>Correct Answer:</strong>{" "}
                        {question.correctOption}
                      </p>
                      <p>
                        <strong>Explanation:</strong>{" "}
                        {question.explanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p>No questions available</p>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t bg-gray-50">
          {!isAttempted ? (
            <button
              onClick={handleSubmit}
              disabled={
                Object.keys(answers).length !==
                quizData.questions.length
              }
              className="w-full bg-black text-white py-3 rounded-xl disabled:bg-gray-400"
            >
              Submit Quiz
            </button>
          ) : (
            <div className="text-center font-semibold text-lg">
              🎉 Your Score: {quizData.score} /{" "}
              {quizData.questions.length}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default QuizModal;