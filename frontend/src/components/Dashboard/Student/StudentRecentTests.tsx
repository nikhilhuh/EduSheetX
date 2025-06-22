import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { CalendarDays } from "lucide-react";
import { getOldTestResult } from "../../../services/api/apiCalls/common/getOldTestResult";
import { useNavigate } from "react-router-dom";
import Cliploader from "../../Loaders/Cliploader";

interface RecentTest {
  testId: string;
  testName: string;
  subject: string;
  topic: string;
  marks: number;
  attemptedAt: string;
}

interface RecentTestsProps {
  recentTests: RecentTest[];
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const StudentRecentTests: React.FC<RecentTestsProps> = ({ recentTests, setError }) => {
  const navigate = useNavigate();
  const [loadingTestId, setLoadingTestId] = React.useState<string | null>(null);

  const handleViewResult = async (
    testId: string,
    testName: string,
    subjectName: string,
    topicName: string
  ) => {
    setLoadingTestId(testId);
    try {
      const response = await getOldTestResult(testId);
      if (response.success) {
        const result = response.data;
        navigate(
          `/subjects/${encodeURIComponent(subjectName)}/${encodeURIComponent(
            topicName
          )}/${encodeURIComponent(testName)}/result`,
          {
            state: { result },
          }
        );
      } else {
        setError(response.message || "Something went wrong");
        setTimeout(() => setError(""), 2000);
      }
    } catch (err: any) {
      setError("Something went wrong.");
      setTimeout(() => setError(""), 2000);
    } finally {
      setLoadingTestId(null); // Clear loading after action
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl tablet:text-2xl laptop-sm:text-3xl font-semibold mb-6 text-center">
        📝 Recent Tests
      </h2>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={[...recentTests].reverse()}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          {/* Gradient for Line Fill */}
          <defs>
            <linearGradient id="colorMarks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />

          {/* X Axis */}
          <XAxis
          className="hidden"
            dataKey="testName"
            tick={{ fontSize: 12 }}
          />

          {/* Y Axis */}
          <YAxis
            width={22}
            tick={{ fontSize: 8 }}
            tickFormatter={(tick) => `${tick}`}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{ fontSize: "14px" }}
            formatter={(value: number) => [`${value} Marks`, "Score"]}
          />

          {/* Line */}
          <Line
            type="monotone"
            dataKey="marks"
            stroke="url(#colorMarks)"
            strokeWidth={3}
            activeDot={{
              r: 6,
              fill: "#10b981",
              stroke: "#065f46",
              strokeWidth: 2,
            }}
            dot={{
              r: 4,
              stroke: "#10b981",
              strokeWidth: 2,
              fill: "#ffffff",
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Test list */}
      <div className="mt-6 grid gap-4">
        {recentTests.map((test) => (
          <div
            key={test.testId}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-wrap gap-4 justify-between items-start"
          >
            <div className="space-y-1">
              <p className="font-semibold">{test.testName}</p>
              <p className="text-sm text-gray-700">
                {test.subject} - {test.topic}
              </p>
              <p className="text-sm text-gray-500">Marks: {test.marks}</p>
              <button
                title="View Test Result"
                onClick={() =>
                  handleViewResult(
                    test.testId,
                    test.testName,
                    test.subject,
                    test.topic
                  )
                }
                disabled={loadingTestId !== null}
                className="mt-2 px-5 py-2 text-lg font-semibold rounded-xl text-white bg-green-600 hover:bg-green-700 transition-all cursor-pointer"
              >
                {loadingTestId === test.testId ? (
                  <Cliploader size={20} />
                ) : (
                  "View Result"
                )}
              </button>
            </div>
            <div className="flex items-center text-sm text-gray-400 gap-2">
              <CalendarDays className="w-4 h-4" />
              {new Date(test.attemptedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentRecentTests;
