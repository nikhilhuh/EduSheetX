import React from "react";
import LeaderBoard from "../Common/LeaderBoard";
import TeacherRecentTests from "./TeacherRecentTests";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import AnalyticsLoader from "../../Loaders/AnalyticsLoader";
import { getTeacherDashboard } from "../../../services/api/apiCalls/teacher/getTeacherDashboard";
import TeacherHero from "./TeacherHero";
import { User } from "../../../utils/constants";

interface LeaderboardEntry {
  _id: string;
  rank: number;
  name: string;
  percentage: number;
}

interface RecentTest {
  testId: string;
  testName: string;
  subject: string;
  topic: string;
  avgMarks: string;
  createdAt: string;
  studentsAttempted: number;
}

interface DashboardData {
  totalTests: number;
  totalStudents: number;
  averageMarks: string;
  percentage: string;
  leaderboard: LeaderboardEntry[];
  recentTests: RecentTest[];
}

const defaultData: DashboardData = {
  totalTests: 0,
  totalStudents: 0,
  averageMarks: "0",
  percentage: "0",
  leaderboard: [],
  recentTests: [],
};

const TeacherDashboard: React.FC<{ UserDetails: User }> = ({ UserDetails }) => {
  const [data, setData] = React.useState<DashboardData | null>(null);
  const [error, setError] = React.useState<string>("");
  const [loadingData, setLoadingData] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchDashboard();
  }, [UserDetails]);

  const fetchDashboard = async () => {
    setLoadingData(true);
    try {
      const response = await getTeacherDashboard();
      if (response.success) {
        setData(response.data);
      } else {
        setError(
          "There was an error loading your dashboard data, try reloading the page."
        );
      }
    } catch (err: any) {
      setError(
        "There was an error loading your dashboard data, try reloading the page."
      );
    } finally {
      setLoadingData(false);
    }
  };

  if (loadingData)
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <div className="flex flex-col flex-1 w-full mt-4 justify-center items-center gap-4">
          <AnalyticsLoader />
          <p className="text-gray-400 animate-pulse">
            Personalising your Dashboard
          </p>
        </div>
        <Footer />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {error && (
        <div className="text-white text-center px-4 py-1 w-full bg-red-400/80 font-inter font-bold text-sm tablet:text-base">
          {error}
        </div>
      )}
      <Navbar />
      <TeacherHero
        totalTests={data?.totalTests || defaultData.totalTests}
        totalStudents={data?.totalStudents || defaultData.totalStudents}
        averageMarks={data?.averageMarks || defaultData.averageMarks}
        percentage={data?.percentage || defaultData.percentage}
        UserDetails={UserDetails}
      />
      <div className="w-[100vw] tablet:w-[90vw] mx-auto px-4 space-y-8">
        {/* Leaderboard */}
        <LeaderBoard
          leaderboard={data?.leaderboard || defaultData.leaderboard}
          UserDetails={UserDetails}
        />
        {/* Recent Tests */}
        <TeacherRecentTests
          recentTests={data?.recentTests || defaultData.recentTests}
        />
      </div>
      <Footer />
    </div>
  );
};

export default TeacherDashboard;
