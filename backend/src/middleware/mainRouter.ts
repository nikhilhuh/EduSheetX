import express from "express";

// common routes
import { router as incrementSiteVisitorsRoute } from "../routes/commonRoutes/incrementSiteVisitors";
import { router as generateGuestIdRoute } from "../routes/commonRoutes/generateGuestId";
import { router as getSiteStatsRoute } from "../routes/commonRoutes/getSiteStats";
import { router as getSubjectsRoute } from "../routes/commonRoutes/getSubjects";
import { router as getSubjectRoute } from "../routes/commonRoutes/getSubject";
import { router as getSubjectTopicTestsRoute } from "../routes/commonRoutes/getSubjectTopicTests";
import { router as getTestResultRoute } from "../routes/commonRoutes/getTestResult";
import { router as getOldTestResultRoute } from "../routes/commonRoutes/getOldTestResult";
import { router as generateSignUpOTPRoute } from "../routes/commonRoutes/generateSignUpOTP";
import { router as generateSignInOTPRoute } from "../routes/commonRoutes/generateSignInOTP";
import { router as verifyOTPRoute } from "../routes/commonRoutes/verifyOTP";
import { router as signURoute } from "../routes/commonRoutes/signUp";
import { router as signInRoute } from "../routes/commonRoutes/signIn";
import { router as fetchUserRoute } from "../routes/commonRoutes/fetchUser";
import { router as logOutRoute } from "../routes/commonRoutes/logOut";
import { router as updateUserRoute } from "../routes/commonRoutes/updateUser";

// student routes
import { router as getStudentDashboardRoute } from "../routes/studentRoutes/getStudentDashboard";

// teacher routes
import { router as validateTestNameRoute } from "../routes/teacherRoutes/validateTestName";
import { router as uploadQuestionImageRoute } from "../routes/teacherRoutes/uploadQuestionImage";
import { router as addTestRoute } from "../routes/teacherRoutes/addTest";
import { router as addSubjectRoute } from "../routes/teacherRoutes/addSubjects";
import { router as editSubjectRoute } from "../routes/teacherRoutes/editSubject";
import { router as deleteTestRoute } from "../routes/teacherRoutes/deleteTest";
import { router as deleteSubjectRoute } from "../routes/teacherRoutes/deleteSubject";
import { router as getTeacherDashboard } from "../routes/teacherRoutes/getTeacherDashboard";

const mainRouter = express.Router();

// Middleware to log requests

// common routes
mainRouter.use("/incrementsitevisitors", incrementSiteVisitorsRoute);
mainRouter.use("/generateguestid", generateGuestIdRoute);
mainRouter.use("/getsitestats", getSiteStatsRoute);
mainRouter.use("/getsubjects", getSubjectsRoute);
mainRouter.use("/getsubject", getSubjectRoute);
mainRouter.use("/getsubjecttopictests", getSubjectTopicTestsRoute);
mainRouter.use("/gettestresult", getTestResultRoute);
mainRouter.use("/getoldtestresult", getOldTestResultRoute);
mainRouter.use("/generatesignupotp", generateSignUpOTPRoute);
mainRouter.use("/generatesigninotp", generateSignInOTPRoute);
mainRouter.use("/verifyotp", verifyOTPRoute);
mainRouter.use("/signup", signURoute);
mainRouter.use("/signin", signInRoute);
mainRouter.use("/fetchuser", fetchUserRoute);
mainRouter.use("/logout", logOutRoute);
mainRouter.use("/updateuser", updateUserRoute);

// student routes
mainRouter.use("/getstudentdashboard", getStudentDashboardRoute);

// teacher routes
mainRouter.use("/validatetestname", validateTestNameRoute);
mainRouter.use("/uploadquestionimage", uploadQuestionImageRoute);
mainRouter.use("/addtest", addTestRoute);
mainRouter.use("/addsubject", addSubjectRoute);
mainRouter.use("/editsubject", editSubjectRoute);
mainRouter.use("/deletesubject", deleteSubjectRoute);
mainRouter.use("/deletetest", deleteTestRoute);
mainRouter.use("/getteacherdashboard" , getTeacherDashboard)

export { mainRouter };
