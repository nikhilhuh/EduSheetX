import React from "react";

interface ErrorModalProps {
  error: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ error }) => {
  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-md border border-white/30 rounded-xl shadow-2xl p-8 flex flex-col items-center max-w-md w-[90%]">
        <div className="flex flex-col items-center">
          {/* Animated Cross Icon */}
          <svg
            className="w-[12vw] h-[12vw] tablet:w-[8vw] tablet:h-[8vw] laptop-sm:w-[5vw] laptop-sm:h-[5vw] laptop-l:w-[4vw] laptop-l:h-[4vw]"
            viewBox="0 0 52 52"
          >
            <circle
              className="stroke-current text-red-500"
              cx="26"
              cy="26"
              r="25"
              fill="none"
              strokeWidth="2"
            />
            <path
              className="stroke-current text-red-500 cross cross-1"
              fill="none"
              strokeWidth="4"
              d="M16 16 36 36"
            />
            <path
              className="stroke-current text-red-500 cross cross-2"
              fill="none"
              strokeWidth="4"
              d="M36 16 16 36"
            />
          </svg>
          <p className="text-red-600 font-bold text-center text-base tablet:text-[2.5vw] laptop-sm:text-[1.7vw] laptop-lg:text-[1.5vw] tracking-wide">
            Something went wrong
          </p>
        </div>

        {/* Error Message */}
        <div className="text-gray-800 text-sm tablet:text-[2.2vw] laptop-sm:text-[1.4vw] laptop-lg:text-[1.2vw] leading-snug px-2 break-words text-center mt-2 font-inter">
          {error}
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
