import React from "react";

interface EvaluationModalProps {
  message?: string;
}

const EvaluationModal: React.FC<EvaluationModalProps> = ({
  message = "Evaluating Your Test…",
}) => {
  React.useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-md border border-white/30 rounded-xl shadow-2xl p-8 flex flex-col items-center max-w-md w-[90%]"
      >
        {/* Cartoonish SVG: teacher flipping through papers */}
        <svg
          className="w-40 h-40"
          viewBox="0 0 120 120"
          stroke="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Body */}
          <rect x="40" y="40" width="40" height="50" rx="8" fill="#FFD9B3" />
          {/* Head */}
          <circle cx="60" cy="25" r="15" fill="#FFD9B3" />
          {/* Eyes */}
          <circle cx="53" cy="23" r="2" fill="#333" />
          <circle cx="67" cy="23" r="2" fill="#333" />
          {/* Papers */}
          <rect
            x="35"
            y="80"
            width="12"
            height="8"
            rx="1"
            fill="#FFF"
            stroke="#333"
            className="animate-paper-flip"
          />
          <rect
            x="50"
            y="75"
            width="12"
            height="8"
            rx="1"
            fill="#FFF"
            stroke="#333"
            className="animate-paper-flip delay-100"
          />
          <rect
            x="65"
            y="80"
            width="12"
            height="8"
            rx="1"
            fill="#FFF"
            stroke="#333"
            className="animate-paper-flip delay-200"
          />

          <style>
            {`
              @keyframes flip {
                0% { transform: translateY(0px); opacity: 1 }
                50% { transform: translateY(-10px); opacity: 0.7 }
                100% { transform: translateY(0px); opacity: 1 }
              }
              .animate-paper-flip {
                animation: flip 1s ease-in-out infinite;
              }
              .delay-100 {
                animation-delay: 0.1s;
              }
              .delay-200 {
                animation-delay: 0.2s;
              }
            `}
          </style>
        </svg>
        <p className="text-2xl font-semibold text-red-600 text-center">
          {message}
        </p>
      </div>
    </div>
  );
};

export default EvaluationModal;
