import React from "react";
import TestImg from "../../assets/images/test.png";
import { useNavigate } from "react-router-dom";

interface TestDataProps {
  subjectName: string;
  topicName: string;
  test: any;
}

const TestData: React.FC<TestDataProps> = ({ subjectName, topicName, test }) => {
  const navigate = useNavigate();
  const handleStartTest = () => {
    navigate(`/student/subjects/${encodeURIComponent(subjectName)}/${encodeURIComponent(topicName)}/${encodeURIComponent(test.name)}`, { state: { test } });
  };
  return (
    <div
      className={`px-2 py-4 rounded-lg laptop-sm:rounded-xl flex flex-col items-center border bg-[var(--color-secondary)] shadow-md hover:cursor-pointer gap-2 relative text-center border-[var(--color-primary)]`}
    >
      <img
        src={TestImg}
        alt="Test image"
        className="h-10 w-10 tablet:h-12 tablet:w-12"
      />

      <div className="font-semibold capitalize">{test.name}</div>
      <div>Questions- {test.questions.length}</div>
      <div>Time: {test.timeLimit} mins</div>
      <button
        onClick={handleStartTest}
        title={`Give Test of ${test.name}`}
        className="outline-none px-4 py-2 border border-[var(--color-primary)] bg-[var(--color-primary)] rounded font-semibold cursor-pointer hover:scale-110 hover:bg-[var(--color-primaryHover)]"
      >
        Start Test
      </button>
    </div>
  );
};

export default TestData;
