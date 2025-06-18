import { Home } from "lucide-react";
import React from "react";
import { ImLoop } from "react-icons/im";
import { Link, useParams } from "react-router-dom";

const NavigationButtons: React.FC = () => {
  const { subjectName, topicName } = useParams<{
    subjectName: string;
    topicName: string;
  }>();
  return (
    <div className="flex flex-wrap justify-between gap-4 items-center">
      <Link title="Go back to Home" to="/" className="inline-block">
        <button className="flex items-center gap-2 bg-blue-50 text-blue-600 cursor-pointer font-medium px-5 py-2 rounded-full shadow hover:bg-blue-200 transition">
          <Home className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
      </Link>
      <Link title="Give Another Test" to={`/subjects/${subjectName}/${topicName}`} className="inline-block">
        <button className="flex items-center gap-2 bg-blue-50 text-blue-600 cursor-pointer font-medium px-5 py-2 rounded-full shadow hover:bg-blue-200 transition">
          <ImLoop className="w-5 h-5" />
          <span>Give another test of <span className="capitalise">{topicName}</span></span>
        </button>
      </Link>
    </div>
  );
};

export default NavigationButtons;
