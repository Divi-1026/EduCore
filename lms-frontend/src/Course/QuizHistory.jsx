import { useState, useEffect } from "react";
import axios from "axios";

const QuizHistory = ({ quizId, onClose }) => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ================= Fetch Quiz =================
  useEffect(() => {
    if (!quizId) return;

    const fetchQuizHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/quiz/get_quiz/${quizId}`,
          { withCredentials: true }
        );

        setQuizData(res?.data?.quiz || null);
      } catch (err) {
        console.error(err);
        setError("Failed to load quiz history");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizHistory();
  }, [quizId]);

  const handleClose = () => {
    setQuizData(null);
    onClose();
  };

  // ================= Loading =================
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          Loading quiz history...
        </div>
      </div>
    );
  }

  // ================= Error =================
  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p className="text-red-500 mb-4">{error}</p>
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

  if (!quizData) return null;

  const totalQuestions = quizData?.questions?.length || 0;
  const score = quizData?.score || 0;
  const percentage =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[700px] max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">

        {/* ================= Header ================= */}
        <div className="p-5 border-b flex justify-between items-center">
          <div>
            <h2 className="font-bold text-xl">Quiz History</h2>
            <p className="text-sm text-gray-500">
              Attempted: {quizData.attempted ? "Yes" : "No"}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="hover:bg-gray-100 p-2 rounded-full"
          >
            ✕
          </button>
        </div>

        {/* ================= Score Summary ================= */}
        <div className="p-5 border-b bg-gray-50">
          <div className="flex justify-between mb-2">
            <span className="font-medium">
              Score: {score} / {totalQuestions}
            </span>
            <span className="font-semibold">{percentage}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-black h-3 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* ================= Questions ================= */}
        <div className="p-5 overflow-y-auto space-y-6">
          {totalQuestions > 0 ? (
            quizData.questions.map((q, idx) => (
              <div key={q._id} className="border-b pb-6">

                <h4 className="font-semibold mb-4">
                  Q{idx + 1}. {q.question}
                </h4>

                <div className="space-y-2">
                  {q.options?.map((opt, i) => {
                    const isSelected = q.selectedOption === opt;
                    const isCorrect = q.correctOption === opt;

                    return (
                      <div
                        key={i}
                        className={`p-3 rounded-xl border text-sm
                          ${
                            isCorrect
                              ? "bg-green-100 border-green-500"
                              : isSelected
                              ? "bg-red-100 border-red-500"
                              : "border-gray-200"
                          }`}
                      >
                        {opt}
                      </div>
                    );
                  })}
                </div>

                {/* Answer Details */}
                <div className="mt-4 p-3 bg-gray-100 rounded-xl text-sm space-y-1">
                  <p>
                    <strong>Selected Answer:</strong>{" "}
                    {q.selectedOption || "Not Answered"}
                  </p>
                  <p>
                    <strong>Correct Answer:</strong>{" "}
                    {q.correctOption}
                  </p>
                  <p>
                    <strong>Explanation:</strong>{" "}
                    {q.explanation || "No explanation available"}
                  </p>
                </div>

              </div>
            ))
          ) : (
            <p>No quiz history available</p>
          )}
        </div>

        {/* ================= Footer ================= */}
        <div className="p-5 border-t bg-gray-50 text-center font-semibold text-lg">
          🎉 Final Score: {score} / {totalQuestions} ({percentage}%)
        </div>

      </div>
    </div>
  );
};

export default QuizHistory;