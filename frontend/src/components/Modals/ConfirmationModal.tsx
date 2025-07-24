import React from "react";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-md border border-white/30 rounded-xl shadow-2xl p-8 flex flex-col items-center max-w-lg w-[90vw] font-inter">
        
        <div className="text-black text-center text-[4vw] tablet:text-[3vw] laptop-sm:text-[2vw] laptop-l:text-[1.7vw] mb-6 font-semibold">
          {message}
        </div>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-lg text-[3vw] tablet:text-[2vw] laptop-sm:text-[1.2vw] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg text-[3vw] tablet:text-[2vw] laptop-sm:text-[1.2vw] cursor-pointer"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
