import express from "express";

// common routes
import { router as incrementSiteVisitorsRoute } from "../routes/commonRoutes/incrementSiteVisitors";
import { router as getSiteStatsRoute } from "../routes/commonRoutes/getSiteStats";
import { router as getSubjectsRoute } from "../routes/commonRoutes/getSubjects";
import { router as getSubjectTopicTestsRoute } from "../routes/commonRoutes/getSubjectTopicTests";
import { router as getTestResultRoute } from "../routes/commonRoutes/getTestResult";
import { router as getOldTestResultRoute } from "../routes/commonRoutes/getOldTestResult";
import { router as signInRoute } from "../routes/commonRoutes/signIn";
import { router as fetchUserRoute } from "../routes/commonRoutes/fetchUser";
import { router as logOutRoute } from "../routes/commonRoutes/logOut";

// student routes
import { router as addStudentRoute } from "../routes/studentRoutes/addStudent";

// teacher routes
import { router as addTestRoute } from "../routes/teacherRoutes/addTest";

const mainRouter = express.Router();

// Middleware to log requests

// common routes
mainRouter.use("/incrementsitevisitors", incrementSiteVisitorsRoute)
mainRouter.use("/getsitestats" , getSiteStatsRoute);
mainRouter.use("/getsubjects", getSubjectsRoute);
mainRouter.use("/getsubjecttopictests", getSubjectTopicTestsRoute);
mainRouter.use("/gettestresult", getTestResultRoute);
mainRouter.use("/getoldtestresult", getOldTestResultRoute);
mainRouter.use("/signin", signInRoute);
mainRouter.use("/fetchuser", fetchUserRoute);
mainRouter.use("/logout", logOutRoute);

// student routes
mainRouter.use("/addstudent", addStudentRoute);

// teacher routes
mainRouter.use("/addtest", addTestRoute);

export { mainRouter };