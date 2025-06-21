import express from "express";

// common routes
import { router as incrementSiteVisitorsRoute } from "../routes/commonRoutes/incrementSiteVisitors";
import { router as getSiteStatsRoute } from "../routes/commonRoutes/getSiteStats";
import { router as getSubjectsRoute } from "../routes/commonRoutes/getSubjects";
import { router as getSubjectTopicsRoute } from "../routes/commonRoutes/getSubjectTopics";
import { router as getSubjectTopicTestsRoute } from "../routes/commonRoutes/getSubjectTopicTests";
import { router as getTestResultRoute } from "../routes/commonRoutes/getTestResult";
import { router as getOldTestResultRoute } from "../routes/commonRoutes/getOldTestResult";
import { router as signURoute } from "../routes/commonRoutes/signUp";
import { router as signInRoute } from "../routes/commonRoutes/signIn";
import { router as fetchUserRoute } from "../routes/commonRoutes/fetchUser";
import { router as logOutRoute } from "../routes/commonRoutes/logOut";

// student routes
import { router as getStudentDashboardRoute } from "../routes/studentRoutes/getStudentDashboard";

// teacher routes
import { router as addTestRoute } from "../routes/teacherRoutes/addTest";
import { router as getTeacherDashboard } from "../routes/teacherRoutes/getTeacherDashboard";

const mainRouter = express.Router();

// Middleware to log requests

// common routes
mainRouter.use("/incrementsitevisitors", incrementSiteVisitorsRoute);
mainRouter.use("/getsitestats", getSiteStatsRoute);
mainRouter.use("/getsubjects", getSubjectsRoute);
mainRouter.use("/getsubjecttopics", getSubjectTopicsRoute);
mainRouter.use("/getsubjecttopictests", getSubjectTopicTestsRoute);
mainRouter.use("/gettestresult", getTestResultRoute);
mainRouter.use("/getoldtestresult", getOldTestResultRoute);
mainRouter.use("/signup", signURoute);
mainRouter.use("/signin", signInRoute);
mainRouter.use("/fetchuser", fetchUserRoute);
mainRouter.use("/logout", logOutRoute);

// student routes
mainRouter.use("/getstudentdashboard", getStudentDashboardRoute);

// teacher routes
mainRouter.use("/addtest", addTestRoute);
mainRouter.use("/getteacherdashboard" , getTeacherDashboard)

export { mainRouter };
