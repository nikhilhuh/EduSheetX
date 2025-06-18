import React from "react";
import { Subject } from "../../utils/constants";
import SubjectData from "./SubjectData";

const MainContent: React.FC<{
  subjects: Subject[];
  handleSubjectClick: (subject: Subject) => void;
}> = ({ subjects, handleSubjectClick }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl laptop-sm:text-4xl font-extrabold text-center text-blue-800 mb-10">
        Choose a Subject to Begin
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {subjects.map((subject, idx) => (
          <div
            key={subject._id}
            className="fade-in-up"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <SubjectData
              subject={subject}
              onClick={() => handleSubjectClick(subject)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
