import React, { useEffect, useState } from "react";
import Logo1 from "../../assets/images/pen.svg";
import Logo2 from "../../assets/images/book.svg";
import Logo3 from "../../assets/images/brain.svg";

const logos = [Logo1, Logo2, Logo3];

const PageLoader: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrev(current);
      setCurrent((prev) => (prev + 1) % logos.length);
    }, 600);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white z-50 fixed top-0 left-0">
      <div className="relative h-16 w-16 tablet:h-28 tablet:w-28 overflow-hidden">
        {/* Previous image (fading out and sliding down) */}
        {prev !== null && (
          <img
            key={`prev-${prev}`}
            src={logos[prev]}
            alt="prev"
            className="absolute top-0 left-0 h-16 w-16 tablet:h-28 tablet:w-28 object-contain transition-all duration-400 ease-in-out opacity-0 translate-y-10"
          />
        )}
        {/* Current image (fading in and sliding up) */}
        <img
          key={`current-${current}`}
          src={logos[current]}
          alt="current"
          className="absolute top-0 left-0 h-16 w-16 tablet:h-28 tablet:w-28 object-contain transition-all duration-400 ease-in-out opacity-100 translate-y-0"
        />
      </div>

      <p className="text-gray-600 text-sm tablet:text-lg font-medium mt-6 animate-pulse text-center">
        Get ready to explore the world of knowledge!
      </p>
    </div>
  );
};

export default PageLoader;
