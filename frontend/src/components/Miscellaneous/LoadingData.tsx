import React from "react";
import FileSearchingGif from "../../assets/images/File searching.gif";

const LoadingData: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex flex-col flex-1 w-full mt-4 justify-center items-center gap-4">
      <img
        src={FileSearchingGif}
        alt={text}
        className="h-[50vh] w-auto"
      />
      <p className="text-gray-400 animate-pulse">{text}</p>
    </div>
  );
};

export default LoadingData;
