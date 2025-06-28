import React from "react";
import { QuestionResult, ResultType } from "../../utils/constants";

const Explanation: React.FC<{ result: ResultType }> = ({ result }) => {
    const [panelState, setPanelState] = React.useState<Record<number, "answer" | "explanation">>(
    {}
  );

  const togglePanel = (index: number, panel: "answer" | "explanation") => {
    setPanelState((prev) => ({ ...prev, [index]: panel }));
  };

  return (
    <div className="space-y-10">
      {result.questions.map((q: QuestionResult, index: number) => {
        const activePanel = panelState[index] || "answer";
        return (
        <div key={index} className="mb-10 space-y-4">
          {/* Question */}
          <div>
            {q.questionType === "image" && q.questionImage ? (
              <>
                <span className="font-semibold text-xl tablet:text-2xl">
                  Q{index + 1}.
                </span>
                <div className="flex flex-col gap-2 items-center justify-center text-center mt-2">
                  <img
                    src={q.questionImage}
                    alt={`Question ${index + 1}`}
                    className="max-w-full max-h-72 rounded border"
                  />
                  {q.questionCaption && (
                    <p className="font-medium text-lg text-gray-700">
                      {q.questionCaption}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <p className="font-semibold text-xl tablet:text-2xl text-gray-800">
                Q{index + 1}. {q.questionText}
              </p>
            )}
          </div>
          <div>
            {/* Toggle Panel */}
            <div className="flex items-center">
              <button
                onClick={() => togglePanel(index, "answer")}
                className={`px-4 py-1 font-medium transition cursor-pointer rounded-tl-2xl rounded-tr-2xl ${
                  activePanel === "answer"
                    ? "bg-gray-200 text-black text-lg"
                    : "text-gray-500 text-sm"
                }`}
              >
                Answer
              </button>
              <button
                onClick={() => togglePanel(index, "explanation")}
                className={`px-4 py-1 font-medium transition cursor-pointer rounded-tl-2xl rounded-tr-2xl ${
                  activePanel === "explanation"
                    ? "bg-gray-200 text-black text-lg"
                    : "text-gray-500 text-sm"
                }`}
              >
                Explanation
              </button>
            </div>

            {/* Content */}
            <div className="px-2 mobile-l:px-4 tablet:px-6 py-4 rounded-br-2xl rounded-bl-2xl rounded-tr-2xl bg-gray-200 text-gray-800 text-base tablet:text-lg">
              {activePanel === "answer" ? (
                <div className="flex flex-col gap-2">
                  <strong>Correct Answer</strong>
                  <span className="text-gray-700 text-left">
                    {q.options[q.correctAnswer as keyof typeof q.options]}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <strong>Explanation</strong>
                  <p className="text-gray-700 text-left">
                    {q.explanation || "No explanation provided."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) })}
    </div>
  );
};

export default Explanation;
