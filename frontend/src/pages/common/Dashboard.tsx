import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Layout/Navbar";
import Footer from "../../components/Layout/Footer";
import { useUser } from "../../context/UserContext";
import { Lock } from "lucide-react";
import StudentDashboard from "../../components/Dashboard/StudentDashboard";

const Dashboard: React.FC = () => {
  const { UserDetails } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Placeholder Component
  const PlaceholderDashboard = () => (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="relative p-4 bg-white">
        {/* Centered overlay text */}
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white/90 p-6 rounded-xl shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] text-center pointer-events-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex flex-col items-center gap-2">
              <Lock className="text-red-500 w-10 h-10" />
              Your Dashboard is Locked
            </h2>
            <p className="text-gray-500 mb-4">
              Please sign in to access your performance insights and track your
              progress.
            </p>
            <button
              onClick={() => navigate("/signin")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-transform hover:scale-105 cursor-pointer"
            >
              Sign In to Continue
            </button>
          </div>
        </div>

        {/* Blurred placeholder cards behind */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop-lg:grid-cols-3 gap-4 filter blur-sm pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 p-4 rounded-xl shadow animate-pulse flex items-start gap-4"
            >
              {/* Circle avatar */}
              <div className="w-[10vh] h-[10vh] rounded-full bg-gray-300 flex-shrink-0"></div>

              {/* Placeholder lines */}
              <div className="flex flex-col gap-2 w-full">
                <div className="h-[5vh] bg-gray-300 rounded w-3/4"></div>
                <div className="h-[3vh] bg-gray-200 rounded w-5/6"></div>
                <div className="h-[2vh] bg-gray-200 rounded w-2/3"></div>
                <div className="h-[2vh] bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <>
      {UserDetails ? (
        <>{UserDetails.role === "student" ? <StudentDashboard /> : null}</>
      ) : (
        <PlaceholderDashboard />
      )}
    </>
  );
};

export default Dashboard;
