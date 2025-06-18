import React from "react";
import { Subject } from "../../utils/constants";

const MainContent: React.FC<{
  subject: Subject;
  handleTopicClick: (topic: string) => void;
}> = ({ subject, handleTopicClick }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl laptop-sm:text-4xl font-extrabold text-center text-blue-800 mb-10 capitalize">
        Topics in {subject.name}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {subject.topics.map((topic, idx) => (
          <div
            key={idx}
            onClick={() => handleTopicClick(topic)}
            className="fade-in-up group rounded-2xl shadow-lg p-6 border border-blue-100 bg-blue-50 hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer flex flex-col items-center text-center hover:scale-[1.03]"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="bg-blue-100 text-blue-600 p-4 rounded-full mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
              📘
            </div>
            <div className="font-semibold text-blue-800 text-lg capitalize">
              {topic}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;
