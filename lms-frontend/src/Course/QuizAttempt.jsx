import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const QuizAttempt = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/quiz/get_quiz/${quizId}`,
      { withCredentials: true }
    );

    setQuizData(res.data.quiz);
  };

  const handleSelect = (questionId, option) => {
    if (quizData.attempted) return;

    setAnswers((prev) => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleSubmit = async () => {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/quiz/submit/${quizId}`,
      { answers },
      { withCredentials: true }
    );

    fetchQuiz();
  };

  if (!quizData) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-6">Quiz</h2>

      {quizData.questions.map((q, idx) => (
        <div key={q._id} className="mb-6">
          <h4 className="font-semibold mb-3">
            Q{idx + 1}. {q.question}
          </h4>

          {q.options.map((opt, i) => {
            const isSelected = answers[q._id] === opt;
            const isCorrect = q.correctOption === opt;

            return (
              <div
                key={i}
                onClick={() => handleSelect(q._id, opt)}
                className={`p-3 border rounded-lg mb-2 cursor-pointer
                  ${
                    quizData.attempted
                      ? isCorrect
                        ? "bg-green-200"
                        : q.selectedOption === opt
                        ? "bg-red-200"
                        : ""
                      : isSelected
                      ? "bg-blue-200"
                      : ""
                  }`}
              >
                {opt}
              </div>
            );
          })}

          {quizData.attempted && (
            <p className="text-sm mt-2 text-gray-600">
              Explanation: {q.explanation}
            </p>
          )}
        </div>
      ))}

      {!quizData.attempted && (
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-6 py-2 rounded-lg"
        >
          Submit Quiz
        </button>
      )}

      {quizData.attempted && (
        <div className="mt-6 font-bold text-lg">
          Final Score: {quizData.score} / {quizData.questions.length}
        </div>
      )}
    </div>
  );
};

export default QuizAttempt;