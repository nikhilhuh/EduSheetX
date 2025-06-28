import React from "react";
import TestImg from "../../assets/images/test.png";
import { useNavigate } from "react-router-dom";
import { Test } from "../../utils/constants";
import { getOldTestResult } from "../../services/api/apiCalls/common/getOldTestResult";
import Cliploader from "../Loaders/Cliploader";
import { Check } from "lucide-react";

interface TestDataProps {
  test: Test;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const TestData: React.FC<TestDataProps> = ({ test, setError }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleStartTest = () => {
    if (!test.isDone) {
      navigate(`${encodeURIComponent(test.name)}`, {
        state: { test },
      });
    }
  };

  const handleViewResult = async () => {
    if (!test.isDone) return;
    setLoading(true);
    try {
      const response = await getOldTestResult(test._id);
      if (response.success) {
        const result = response.data;
        navigate(`${encodeURIComponent(test.name)}/result`, {
          state: { result },
        });
      } else {
        setError(response.message || "Something went wrong");
        setTimeout(() => setError(""), 2000);
      }
    } catch (err: any) {
      setError("Something went wrong.");
      setTimeout(() => setError(""), 2000);
    } finally {
      setLoading(false);
    }
  };

  const isDone = test.isDone;

  return (
    <div
      className={`relative flex flex-col h-full items-center text-center gap-4 p-6 rounded-2xl border 
        ${
          isDone ? "border-green-500 bg-green-50" : "border-blue-100 bg-blue-50"
        } 
        shadow hover:shadow-xl transition-all hover:scale-[1.03]`}
    >
      {isDone && (
        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow flex gap-1 items justify-center">
          <Check className="h-4 w-4" /> Completed
        </span>
      )}
      <div className="bg-white p-4 rounded-full shadow-sm">
        <img
          src={TestImg}
          alt="Test"
          className="h-12 w-12 tablet:h-14 tablet:w-14 object-contain"
        />
      </div>

      <div className="flex flex-col gap-4 flex-1 w-full">
        <h3 className="text-xl font-bold capitalize text-blue-900">
          {test.name}
        </h3>

        <div
          className={`text-lg text-gray-700 flex items-center flex-wrap justify-center gap-4`}
        >
          <p>
            📝 Questions:{" "}
            <span className="font-semibold">{test.questions.length}</span>
          </p>
          <p>
            ⏱ Time: <span className="font-semibold">{test.timeLimit} mins</span>
          </p>
        </div>

        {isDone ? (
          <button
            title="View Test Result"
            onClick={handleViewResult}
            disabled={loading}
            className="mt-2 px-5 py-2 text-lg font-semibold rounded-xl text-white bg-green-600 hover:bg-green-700 transition-all cursor-pointer"
          >
            {loading ? <Cliploader size={20} /> : "View Result"}
          </button>
        ) : (
          <button
            title={`Start ${test.name}`}
            onClick={handleStartTest}
            className="mt-auto px-5 py-2 text-lg font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer"
          >
            Start Test
          </button>
        )}
      </div>
    </div>
  );
};

export default TestData;
