import React from "react";
import { Question } from "../../utils/constants";

type QuestionCardProps = {
  question: Question;
  currentIndex: number;
  selectedAnswer: string | undefined;
  onOptionChange: (qIndex: number, opt: string) => void;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  selectedAnswer,
  onOptionChange,
}) => {
  return (
    <div className="px-2">
      <div className="mb-4">
        {question.questionType === "image" && question.questionImage ? (
          <div className="flex flex-col gap-2 items-center justify-center text-center">
            <img
              src={question.questionImage}
              alt={`Question ${currentIndex + 1}`}
              className="max-w-full max-h-72 rounded border"
            />
            <p className="font-semibold text-lg tablet:text-xl">
            {question.questionCaption}
          </p>
          </div>
        ) : (
          <p className="font-semibold text-xl tablet:text-2xl">
            {question.questionText}
          </p>
        )}
      </div>

      <ul className="space-y-3 text-lg tablet:text-xl">
        {(["A", "B", "C", "D"] as Array<keyof typeof question.options>).map(
          (opt) => {
            const isSelected = selectedAnswer === opt;
            return (
              <li
                key={opt}
                onClick={() => onOptionChange(currentIndex, opt)}
                className={`px-4 py-3 rounded-xl flex flex-wrap items-center gap-2 tablet:gap-4 cursor-pointer transition-all duration-300 border 
            ${
              isSelected
                ? "bg-green-200/20 border-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.3)] backdrop-blur-md text-green-700"
                : "hover:bg-gray-100 hover:border-gray-300 border-gray-300"
            }`}
              >
                <span className="font-medium text-gray-800 px-3 py-1 border border-gray-600 rounded-full">{opt}</span>
                <span className="text-gray-700">{question.options[opt]}</span>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default QuestionCard;
