import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { User } from "../../../utils/constants";

interface LeaderboardEntry {
  _id: string;
  rank: number;
  name: string;
  percentage: number;
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  UserDetails: User;
}

const LeaderBoard: React.FC<LeaderboardProps> = ({ leaderboard, UserDetails }) => {
  const userId = UserDetails._id;

  return (
    <div className="rounded shadow p-2 tablet:p-6">
      <h2 data-aos="zoom-in" data-aos-duration="800" className="text-2xl laptop-lg:text-4xl font-semibold mb-6 text-center">
        🏆 Leaderboard (Top Performers)
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={leaderboard}
          margin={{ top: 10, right: 0, left: 0, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            className="hidden tablet:block"
            dataKey="name"
            tick={{ fontSize: 8 }}
            angle={-45}
            interval={0}
            textAnchor="end"
          />
          <YAxis
            width={32}
            domain={[0, 100]}
            tick={{ fontSize: 8 }}
            tickFormatter={(tick) => `${tick}%`}
          />
          <Tooltip formatter={(value: number) => `${value}%`} />
          <Bar dataKey="percentage" barSize={35} radius={[10, 10, 0, 0]}>
            {leaderboard.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={userId === entry._id ? "#22c55e" : "#6366f1"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-2 tablet:mt-6">
        {leaderboard.map((entry, idx: number) => {
          const rankColors = [
            "from-yellow-400 to-yellow-600", // 1st - Gold
            "from-gray-400 to-gray-600", // 2nd - Silver
            "from-orange-300 to-orange-700", // 3rd - Bronze
          ];
          const gradient = rankColors[idx] || "from-indigo-400 to-indigo-600";

          return (
            <div
            data-aos="zoom-in-up"
              data-aos-delay={idx * 100}
              title={`${entry.name}`}
              key={entry._id}
              className={`bg-gradient-to-br  p-5 rounded-xl shadow-lg transition-transform transform hover:scale-105  text-white ${
                userId === entry._id ? "bg-green-500 relative" : gradient
              }`}
            >
              {userId === entry._id && (
                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                  You
                </span>
              )}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xl font-bold">
                    <span className="text-3xl font-extrabold">#{entry.rank}</span>
                    <br /> {entry.name}
                  </p>
                  <p className="text-sm opacity-90">
                    Score: {entry.percentage}%
                  </p>
                </div>
                <div className="text-3xl">
                  {entry.rank === 0
                    ? "🥇"
                    : idx === 1
                    ? "🥈"
                    : idx === 2
                    ? "🥉"
                    : "🎯"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderBoard;
