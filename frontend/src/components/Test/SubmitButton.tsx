import React from "react";
import Cliploader from "../Loaders/Cliploader";

type SubmitButtonProps = {
  onSubmit: () => void;
  evaluating: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({
  onSubmit,
  evaluating,
}) => {
  return (
    <div className="mt-8 flex justify-center">
      <button
        title="Submit The Test"
        onClick={onSubmit}
        disabled={evaluating}
        className={`px-8 py-3 bg-green-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:scale-95 ${
          evaluating
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-green-700 hover:shadow-xl cursor-pointer"
        }`}
      >
        {evaluating ? <Cliploader size={20} /> : "Submit Test"}
      </button>
    </div>
  );
};

export default SubmitButton;
