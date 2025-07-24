import React from "react";
import { Subject } from "../../utils/constants";
import SubjectData from "./SubjectData";

interface MainContentProps {
  subjects: Subject[];
  setAddSubject: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteClick: (subject: Subject) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  subjects,
  onDeleteClick,
}) => {
  return (
    <div>
      <h2
        className="text-3xl laptop-sm:text-4xl font-extrabold text-center text-blue-800 mb-10"
        data-aos="fade-down"
        data-aos-duration="800"
      >
        Choose a Subject to Begin
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {subjects.map((subject, idx) => (
          <div
            key={subject._id}
            data-aos="zoom-in"
            data-aos-delay={idx * 100}
            data-aos-duration="600"
          >
            <SubjectData subject={subject} onDeleteClick={onDeleteClick} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
