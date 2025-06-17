import { Routes, Route } from "react-router-dom";

// Teacher pages
import TeacherDashboard from "../pages/teacher/Dashboard";
import AddTests from "../pages/teacher/AddTests";


//  Common pages
import Unauthorized from "../pages/common/Unauthorized";
import ProtectedRoute from "./ProtectedRoutes";
import Error404 from "../pages/common/Error404";
import SignIn from "../pages/common/SignIn";
import SignUp from "../pages/common/SignUp";
import HomePage from "../pages/common/HomePage";
import Subjects from "../pages/common/Subjects";
import Topics from "../pages/common/Topics";
import Tests from "../pages/common/Tests";
import Dashboard from "../pages/common/Dashboard";


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Common */}
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/subjects/:subjectName" element={<Topics />} />
      <Route path="/subjects/:subjectName/:topicName"  element={<Tests />} />
      {/* Fallback */}
      <Route path="*" element={<Error404 />} />

      {/* Teacher Routes - Protected */}
      <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="addtests" element={<AddTests />} />
        <Route path="*" element={<Error404 />} />
      </Route>

    </Routes>
  );
};

export default AppRoutes;
