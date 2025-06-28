import React from "react";
import { QuestionResult, ResultType } from "../../utils/constants";

const Review: React.FC<{ result: ResultType }> = ({ result }) => {
  return (
    <div className="space-y-10">
      {result.questions.map((q: QuestionResult, index: number) => (
        <div key={index} className="mb-10">
          <div className="mb-4">
            {q.questionType === "image" && q.questionImage ? (
              <>
              <span className="font-semibold text-xl tablet:text-2xl">Q{index + 1}.</span>
              <div className="flex flex-col gap-2 items-center justify-center text-center">
                <img
                  src={q.questionImage}
                  alt={`Question ${index + 1}`}
                  className="max-w-full max-h-72 rounded border"
                />
                <p className="font-semibold text-lg tablet:text-xl">
                  {q.questionCaption}
                </p>
              </div>
              </>
            ) : (
              <p className="font-semibold text-xl tablet:text-2xl">
                Q{index + 1}. {q.questionText}
              </p>
            )}
            {q.status === "unattempted" && (
              <>
                <br />
                <span className="text-sm text-red-500 ml-2 italic">
                  {" "}
                  (Not Attempted)
                </span>
              </>
            )}
          </div>

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

export default Review;
