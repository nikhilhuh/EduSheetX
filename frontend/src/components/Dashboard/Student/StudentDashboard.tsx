import React from "react";
import { getStudentDashoard } from "../../../services/api/apiCalls/common/getStudentDashboard";
import StudentHero from "./StudentHero";
import LeaderBoard from "../Common/LeaderBoard";
import StudentRecentTests from "./StudentRecentTests";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import AnalyticsLoader from "../../Loaders/AnalyticsLoader";
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
  marks: number;
  attemptedAt: string;
}

interface DashboardData {
  totalTests: number;
  averageMarks: string;
  percentage: string;
  testStreak: number;
  leaderboard: LeaderboardEntry[];
  recentTests: RecentTest[];
}

const defaultData: DashboardData = {
  totalTests: 0,
  averageMarks: "0",
  percentage: "0",
  testStreak: 0,
  leaderboard: [],
  recentTests: [],
};

const StudentDashboard: React.FC<{ UserDetails: User }> = ({ UserDetails }) => {
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
      const response = await getStudentDashoard();
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || "Something went wrong.");
        setTimeout(() => setError(""), 2000);
      }
    } catch (err: any) {
      setError("Something went wrong.");
      setTimeout(() => setError(""), 2000);
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
      <StudentHero
        totalTests={data?.totalTests || defaultData.totalTests}
        averageMarks={data?.averageMarks || defaultData.averageMarks}
        percentage={data?.percentage || defaultData.percentage}
        testStreak={data?.testStreak || defaultData.testStreak}
        UserDetails={UserDetails}
      />
      <div className="w-[100vw] tablet:w-[90vw] mx-auto px-4 space-y-8">
        {/* Leaderboard */}
        <LeaderBoard leaderboard={data?.leaderboard || defaultData.leaderboard}
          UserDetails={UserDetails} />
        {/* Recent Tests */}
        <StudentRecentTests
          recentTests={data?.recentTests || defaultData.recentTests}
          setError={setError}
        />
      </div>
      <Footer />
    </div>
  );
};

export default StudentDashboard;
