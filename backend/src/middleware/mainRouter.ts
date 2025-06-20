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
import { router as getDashboardRoute } from "../routes/commonRoutes/getStudentDashboard";
import { router as logOutRoute } from "../routes/commonRoutes/logOut";

// teacher routes
import { router as addTestRoute } from "../routes/teacherRoutes/addTest";

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
mainRouter.use("/getstudentdashboard", getDashboardRoute);
mainRouter.use("/logout", logOutRoute);

// teacher routes
mainRouter.use("/addtest", addTestRoute);

export { mainRouter };
