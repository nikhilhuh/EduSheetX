import React from "react";
import { useUser } from "../../context/UserContext";
import StudentDashboard from "../../components/Dashboard/Student/StudentDashboard";
import TeacherDashboard from "../../components/Dashboard/Teacher/TeacherDashboard";
import PlaceholderComponent from "../../components/Layout/PlaceholderComponent";

const Dashboard: React.FC = () => {
  const { UserDetails } = useUser();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {UserDetails ? (
        <>
          {UserDetails.role === "student" ? (
            <StudentDashboard />
          ) : (
            <TeacherDashboard />
          )}
        </>
      ) : (
        <PlaceholderComponent
          title="Your Dashboard is Locked"
          message="Please sign in to access your performance insights and track
                your progress."
        />
      )}
    </>
  );
};

export default Dashboard;
