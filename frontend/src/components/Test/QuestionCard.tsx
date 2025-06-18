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
      <p className="font-semibold mb-3 text-xl tablet:text-2xl">
        {question.questionText}
      </p>
      <ul className="space-y-3 text-lg tablet:text-xl">
        {(["A", "B", "C", "D"] as Array<keyof typeof question.options>).map(
          (opt) => {
            const isSelected = selectedAnswer === opt;
            return (
              <li
                key={opt}
                onClick={() => onOptionChange(currentIndex, opt)}
                className={`px-4 py-3 rounded-xl flex items-center gap-3 cursor-pointer transition-all duration-300 border 
            ${
              isSelected
                ? "bg-green-200/20 border-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.3)] backdrop-blur-md text-green-700"
                : "hover:bg-gray-100 hover:border-gray-300 border-gray-300"
            }`}
              >
                <span className="font-medium text-gray-800">Option {opt}:</span>
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
