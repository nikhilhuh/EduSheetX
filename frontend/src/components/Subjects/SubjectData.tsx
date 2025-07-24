import React from "react";
import { MdOutlineMenuBook } from "react-icons/md";
import { Subject } from "../../utils/constants";
import { useUser } from "../../context/UserContext";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SubjectDataProps {
  subject: Subject;
  onDeleteClick: (subject: Subject) => void;
}

const SubjectData: React.FC<SubjectDataProps> = ({
  subject,
  onDeleteClick,
}) => {
  const { UserDetails } = useUser();
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`${encodeURIComponent(subject.name)}`)}
      title={`Give Test of ${subject.name}`}
      className={`group px-4 py-6 rounded-2xl flex flex-col items-center border border-blue-100 bg-blue-50 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out gap-3 text-center cursor-pointer relative h-full`}
    >
      {/* delete button for teachers */}
      {UserDetails && UserDetails.role === "teacher" && (
        <div title="Delete Subject" className="absolute top-2 right-2">
          <Trash
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(subject);
            }}
            className="text-red-400 cursor-pointer"
          />
        </div>
      )}

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
