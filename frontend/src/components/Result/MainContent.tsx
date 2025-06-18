import React from "react";
import { QuestionResult, ResultType } from "../../utils/constants";

const MainContent: React.FC<{ result: ResultType }> = ({ result }) => {
  return (
    <div className="space-y-10">
      {result.questions.map((q: QuestionResult, index: number) => (
        <div key={index} className="mb-10">
          <p className="font-semibold mb-4 text-xl tablet:text-2xl text-gray-800">
            Q{index + 1}. {q.questionText}
            {q.status === "unattempted" && (
              <>
                <br />
                <span className="text-sm text-red-500 ml-2 italic">
                  {" "}
                  (Not Attempted)
                </span>
              </>
            )}
          </p>

          <ul className="space-y-3 text-base tablet:text-lg">
            {["A", "B", "C", "D"].map((opt) => {
              const isCorrect = q.correctAnswer === opt;
              const isSelected = q.selectedOption === opt;

              const bgColor = isCorrect
                ? "bg-green-100"
                : isSelected
                ? "bg-yellow-100"
                : "bg-gray-100";

              const textColor = isCorrect
                ? "text-green-800"
                : isSelected
                ? "text-yellow-800"
                : "text-gray-700";

              return (
                <li
                  key={opt}
                  className={`rounded-lg px-4 py-2 ${bgColor} ${textColor} transition-all duration-200`}
                >
                  <span className="font-semibold">Option {opt}:</span>{" "}
                  <span>
                    {(q as any).options?.[opt] ?? "[Missing option text]"}
                  </span>
                  {isCorrect && (
                    <span className="ml-2 text-sm text-green-700 font-medium">
                      (Correct)
                    </span>
                  )}
                  {isSelected && !isCorrect && (
                    <span className="ml-2 text-sm text-yellow-700 font-medium">
                      (Your Answer)
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MainContent;
