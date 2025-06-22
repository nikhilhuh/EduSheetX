import { Routes, Route } from "react-router-dom";

// Teacher pages
import AddTest from "../pages/teacher/AddTest";

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
import TestPage from "../pages/common/TestPage";
import TestResultPage from "../pages/common/TestResultPage";

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
      <Route path="/subjects/:subjectName/:topicName/:testName"  element={<TestPage />} />
      <Route path="/subjects/:subjectName/:topicName/:testName/result" element={<TestResultPage />} />

      {/* Teacher Routes - Protected */}
      <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
        <Route path="/addtest" element={<AddTest />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Error404 />} />

    </Routes>
  );
};

export default AppRoutes;
