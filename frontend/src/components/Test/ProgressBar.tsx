import React from "react";

type ProgressBarProps = {
  currentIndex: number;
  totalQuestions: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ currentIndex, totalQuestions }) => {
  const progressPercent = (currentIndex / totalQuestions) * 100;

  return (
    <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden mb-4">
      <div
        className="h-full bg-green-500 transition-all duration-500"
        style={{ width: `${progressPercent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
