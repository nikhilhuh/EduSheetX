import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const PopularTopics: React.FC<{ popularTopics: { subjectName: string; topicName: string }[] }> = ({ popularTopics }) => {
  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl mobile-l:text-3xl font-semibold mb-6">📚 Popular Topics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {popularTopics.map((topic, idx) => (
            <Link
              key={idx}
              to={`/subjects/${encodeURIComponent(topic.subjectName)}/${encodeURIComponent(topic.topicName)}`}
              className="rounded-xl p-5 shadow hover:shadow-md transition-all duration-200 hover:scale-105 flex items-center gap-4 group border border-blue-200 bg-blue-50"
            >
              <div>
                <h3 className="text-lg font-semibold">{topic.topicName}</h3>
                <h3 className="text-sm">{topic.subjectName}</h3>
                <button className="text-sm mt-2 bg-blue-500 group-hover:bg-blue-600 px-4 py-2 rounded text-white flex items-center justify-center gap-2 cursor-pointer">Explore Tests <ArrowRight className="group-hover:translate-x-1 h-3 w-3"/></button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularTopics;
