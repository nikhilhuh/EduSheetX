import React from "react";
import { Link } from "react-router-dom";

const subjects = [
  {
    name: "Mathematics",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12h18M12 3v18M6 6l12 12M18 6L6 18"
        />
      </svg>
    ),
    color: "bg-blue-50",
  },
  {
    name: "Science",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v4M6.4 5.6l2.8 2.8M3 12h4m1.6 6.4l2.8-2.8m6.4 1.6l-2.8-2.8M21 12h-4m-1.6-6.4l-2.8 2.8M12 21v-4"
        />
      </svg>
    ),
    color: "bg-green-50",
  },
  {
    name: "Social Science",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 text-yellow-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m8.66-12.34l-.71.71M4.05 4.05l-.71.71M21 12h-1M4 12H3m16.95 7.95l-.71-.71M4.05 19.95l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    color: "bg-yellow-50",
  },
];

const PopularSubjects: React.FC = () => {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl mobile-l:text-3xl font-semibold mb-6">📚 Popular Subjects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject.name}
              to={`/subjects/${encodeURIComponent(subject.name)}`}
              className={`rounded-xl p-5 shadow hover:shadow-md transition-all duration-200 hover:scale-105 flex items-center gap-4 ${subject.color}`}
            >
              <div>{subject.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{subject.name}</h3>
                <p className="text-sm text-gray-600">Explore Tests</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularSubjects;
