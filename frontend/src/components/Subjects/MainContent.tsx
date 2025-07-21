import React from "react";
import { Subject } from "../../utils/constants";
import SubjectData from "./SubjectData";
import { useUser } from "../../context/UserContext";

interface MainContentProps {
  subjects: Subject[];
  handleSubjectClick: (subject: Subject) => void;
  setAddSubject: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteClick: (subject: Subject) => void;
}
const MainContent: React.FC<MainContentProps> = ({
  subjects,
  handleSubjectClick,
  setAddSubject,
  onDeleteClick,
}) => {
  const { UserDetails } = useUser();
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
              onDeleteClick={onDeleteClick}
            />
          </div>
        ))}
      </div>

      {UserDetails && UserDetails.role === "teacher" && (
        <div className="mt-10 flex justify-end">
          <button
            onClick={() => setAddSubject(true)}
            className="max-w-max bg-blue-500 hover:bg-blue-600 cursor-pointer px-4 py-2 rounded text-center text-white font-semibold"
          >
            Add Subject
          </button>
        </div>
      )}
    </div>
  );
};

export default MainContent;
