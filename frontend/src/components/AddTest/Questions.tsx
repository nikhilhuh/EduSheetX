import React from "react";

interface QuestionProps {
  questions: any[];
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
}

const Questions: React.FC<QuestionProps> = ({ questions, setQuestions }) => {
  const handleQuestionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...questions];
    if (field === "questionText" || field === "correctAnswer") {
      updated[index][field] = value;
    } else {
      updated[index].options[field] = value;
    }
    setQuestions(updated);
  };
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        Questions
      </h2>

      <div className="space-y-5">
        {questions.map((q, idx) => (
          <div
            key={idx}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-800">Question {idx + 1}</h3>
              {idx > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setQuestions((prev) => prev.filter((_, i) => i !== idx))
                  }
                  className="text-red-600 font-semibold cursor-pointer"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-3">
              <input
                type="text"
                id={`question-${idx}`}
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionChange(idx, "questionText", e.target.value)
                }
                placeholder={`Enter question ${idx + 1}`}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["A", "B", "C", "D"].map((opt) => (
                  <div key={opt}>
                    <label htmlFor={`Option-${opt}-${idx}`} className="sr-only">
                      Option {opt}
                    </label>
                    <div className="flex items-center">
                      <span className="mr-2 font-medium text-gray-600">
                        {opt}.
                      </span>
                      <input
                        id={`Option-${opt}-${idx}`}
                        type="text"
                        value={q.options[opt]}
                        onChange={(e) =>
                          handleQuestionChange(idx, opt, e.target.value)
                        }
                        placeholder={`Option ${opt}`}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label
                  htmlFor={`correctanswer-${idx}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Correct Answer
                </label>
                <select
                  id={`correctanswer-${idx}`}
                  value={q.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(idx, "correctAnswer", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500 transition-all cursor-pointer"
                  required
                >
                  <option value="">Select correct option</option>
                  {["A", "B", "C", "D"].map((opt) => (
                    <option key={opt} value={opt}>
                      Option {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          setQuestions((prev) => [
            ...prev,
            {
              questionText: "",
              options: { A: "", B: "", C: "", D: "" },
              correctAnswer: "",
            },
          ])
        }
        className="mt-4 flex items-center justify-center w-full py-2 px-4 border border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-blue-600 font-medium cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Add Another Question
      </button>
    </div>
  );
};

export default Questions;
