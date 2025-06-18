import React from "react";

type NavigationButtonsProps = {
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onPrev: () => void;
};

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentIndex,
  totalQuestions,
  onNext,
  onPrev,
}) => {
  return (
    <div className="flex justify-between items-center gap-4 mt-6 px-2">
      <button
        title={
          currentIndex === 0
            ? "It is the first question"
            : "Go Back to Previous Question"
        }
        onClick={onPrev}
        disabled={currentIndex === 0}
        className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md 
        ${
          currentIndex === 0
            ? "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300"
            : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-95 cursor-pointer"
        }`}
      >
        Previous
      </button>

      <button
        title={
          currentIndex === totalQuestions - 1
            ? "No more questions"
            : "Next Question"
        }
        onClick={onNext}
        disabled={currentIndex === totalQuestions - 1}
        className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md 
        ${
          currentIndex === totalQuestions - 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300"
            : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg active:scale-95 cursor-pointer"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default NavigationButtons;
