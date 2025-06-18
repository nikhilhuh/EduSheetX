import React from "react";
import TestData from "./TestData";
import { Test } from "../../utils/constants";

const MainContent: React.FC<{ tests: Test[], setError: React.Dispatch<React.SetStateAction<string>>
 }> = ({ tests , setError }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl laptop-sm:text-4xl font-extrabold text-center text-blue-800 mb-10">
        Assess Your Knowledge — One Test at a Time
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-stretch">
        {tests.map((test, idx) => (
          <div
            key={idx}
            className="fade-in-up h-full"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <TestData test={test} setError={setError}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
