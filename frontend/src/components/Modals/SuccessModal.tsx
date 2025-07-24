import React from "react";

interface SuccessModalProps {
  success: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ success }) => {
  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-md border border-white/30 rounded-xl shadow-2xl p-8 flex flex-col items-center max-w-md w-[90%]"
      >
        {/* Animated Tick */}
        <div className="flex flex-col items-center">
          <svg
            className="w-[12vw] h-[12vw] tablet:w-[8vw] tablet:h-[8vw] laptop-sm:w-[5vw] laptop-sm:h-[5vw] laptop-l:w-[4vw] laptop-l:h-[4vw]"
            viewBox="0 0 52 52"
          >
            <circle
              className="stroke-current text-green-700"
              cx="26"
              cy="26"
              r="25"
              fill="none"
              strokeWidth="2"
            />
            <path
              className="stroke-current text-green-700 checkmark"
              fill="none"
              strokeWidth="4"
              d="M14 27l7 7 16-16"
            />
          </svg>
        </div>

        <div className="text-gray-800 text-sm tablet:text-[2.2vw] laptop-sm:text-[1.4vw] laptop-lg:text-[1.2vw] leading-snug px-2 break-words text-center mt-2 font-inter">
          {success}
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
