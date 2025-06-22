import React from "react";
import ErrorModal from "../../Modals/ErrorModal";
import NotFound from "../../Miscellaneous/NotFound";
import { useUser } from "../../../context/UserContext";
import LeaderBoard from "../Common/LeaderBoard";
import TeacherRecentTests from "./TeacherRecentTests";
import Navbar from "../../Layout/Navbar";
import Footer from "../../Layout/Footer";
import AnalyticsLoader from "../../Loaders/AnalyticsLoader";
import { getTeacherDashoard } from "../../../services/api/apiCalls/teacher/getTeacherDashboard";
import TeacherHero from "./TeacherHero";

interface LeaderboardEntry {
  _id: string;
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

const TeacherDashboard: React.FC = () => {
  const { UserDetails } = useUser();
  const [data, setData] = React.useState<DashboardData | null>(null);
  const [error, setError] = React.useState<string>("");
  const [loadingData, setLoadingData] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDashboard = async () => {
      setLoadingData(true);
      try {
        const response = await getTeacherDashoard();
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

    fetchDashboard();
  }, [UserDetails]);  

  if (loadingData)
    return (
      <>
        {UserDetails && (
          <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <TeacherHero
              totalTests={0}
              totalStudents={0}
              averageMarks={"0"}
              percentage={"0"}
              UserDetails={UserDetails}
            />
            <div className="flex flex-col flex-1 w-full mt-4 justify-center items-center gap-4">
              <AnalyticsLoader />
              <p className="text-gray-400 animate-pulse">
                Personalising your Dashboard
              </p>
            </div>
            <Footer />
          </div>
        )}
      </>
    );

  if (!UserDetails)
    return <NotFound text="You must be logged in to view this." />;
  if (!data) return <NotFound text="Failed to load your dashboard data." />;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {error && <ErrorModal error={error} />}
      <Navbar />
      <TeacherHero
        totalTests={data.totalTests}
        totalStudents={data.totalStudents}
        averageMarks={data.averageMarks}
        percentage={data.percentage}
        UserDetails={UserDetails}
      />
      <div className="w-[100vw] tablet:w-[90vw] mx-auto px-4 space-y-8">
        {/* Leaderboard */}
        <LeaderBoard leaderboard={data.leaderboard} />
        {/* Recent Tests */}
        <TeacherRecentTests recentTests={data.recentTests} />
      </div>
      <Footer />
    </div>
  );
};

export default TeacherDashboard;
