import React from "react";
import FileSearchingGif from "../../assets/images/File searching.gif";

const LoadingData: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div
      className="flex flex-col flex-1 w-full mt-4 justify-center items-center gap-4"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <img
        src={FileSearchingGif}
        alt={text}
        className="h-[50vh] w-auto"
        data-aos="zoom-in"
        data-aos-delay="200"
      />
      <p
        className="text-gray-400 animate-pulse"
        data-aos="fade-in"
        data-aos-delay="400"
      >
        {text}
      </p>
    </div>
  );
};

export default LoadingData;
