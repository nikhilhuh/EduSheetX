import React from "react";
import { MdOutlineMenuBook } from "react-icons/md";
import { Subject } from "../../utils/constants";

interface SubjectDataProps {
  subject: Subject;
  onClick: (subject: Subject) => void;
}

const SubjectData: React.FC<SubjectDataProps> = ({ subject, onClick }) => {
  return (
    <div
      onClick={() => onClick(subject)}
      title={`Give Test of ${subject.name}`}
      className={`group px-4 py-6 rounded-2xl flex flex-col items-center border bg-white shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out gap-3 text-center border-blue-100 cursor-pointer`}
    >
      {/* Colorful circle background with icon */}
      <div className="p-6 rounded-full bg-blue-100 group-hover:bg-yellow-200 transition-colors">
        <MdOutlineMenuBook className="h-10 w-10 text-blue-600 group-hover:text-yellow-600" />
      </div>

      {/* Subject Name */}
      <div className="font-semibold capitalize text-lg text-gray-800 group-hover:text-blue-700">
        {subject.name}
      </div>
    </div>
  );
};

export default SubjectData;
