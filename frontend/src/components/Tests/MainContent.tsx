import React from "react";
import TestData from "./TestData";
import { Test } from "../../utils/constants";

const MainContent: React.FC<{ tests: Test[] }> = ({ tests }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 data-aos="fade-down"
        data-aos-duration="800" className="text-3xl laptop-sm:text-4xl font-extrabold text-center text-blue-800 mb-10">
        Assess Your Knowledge — One Test at a Time
      </h2>

      <div className="grid grid-cols-1 tablet:grid-cols-2 laptop-sm:grid-cols-3 gap-4">
        {tests.map((test, idx) => (
          <div
            key={idx}
            className="h-full"
            data-aos="zoom-in"
            data-aos-delay={idx * 100}
            data-aos-duration="600"
          >
            <TestData test={test}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
