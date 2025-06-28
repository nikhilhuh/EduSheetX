import React from "react";

const QuestionStatusGrid: React.FC<{
  answers: Record<number, string>;
  totalQuestions: number;
  currentIndex: number;
  setCurrentIndex: (idx: number) => void;
}> = ({ answers, totalQuestions, currentIndex, setCurrentIndex }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6 justify-center">
      {Array.from({ length: totalQuestions }).map((_, i) => {
        const isAnswered = answers[i];
        const isActive = i === currentIndex;
        return (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-9 h-9 rounded-full text-sm font-medium border cursor-pointer 
              ${
                isAnswered
                  ? "bg-green-100 text-green-700 border-green-400"
                  : "bg-gray-100 text-gray-600 border-gray-300"
              } 
              ${isActive ? "ring-2 ring-blue-500" : ""}
              hover:ring-2 hover:ring-blue-300 transition`}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionStatusGrid;
