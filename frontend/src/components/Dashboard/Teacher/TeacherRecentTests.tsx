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

interface RecentTest {
  testId: string;
  testName: string;
  subject: string;
  topic: string;
  avgMarks: string;
  createdAt: string;
  studentsAttempted: number;
}

interface RecentTestsProps {
  recentTests: RecentTest[];
}

const StudentRecentTests: React.FC<RecentTestsProps> = ({ recentTests }) => {
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
            formatter={(value: number) => [`${value} Average Marks`, "Score"]}
          />

          {/* Line */}
          <Line
            type="monotone"
            dataKey="avgMarks"
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
              {test.studentsAttempted > 0 ? (
                <>
                <p className="text-sm text-gray-500">Students Attempted: {test.studentsAttempted}</p>
                <p className="text-sm text-gray-500">Average Marks: {test.avgMarks}</p>
                </>
              ) : (
                <p className="text-sm text-gray-500">No Student has attempted this test.</p>
              )}
              
              
            </div>
            <div className="flex items-center text-sm text-gray-400 gap-2">
              <CalendarDays className="w-4 h-4" />
              {new Date(test.createdAt).toLocaleDateString("en-IN", {
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
