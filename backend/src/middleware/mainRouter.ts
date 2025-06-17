import express from "express";

// common routes
import { router as singInRoute } from "../routes/commonRoutes/signIn";
import { router as fetchUserRoute } from "../routes/commonRoutes/fetchUser";
import { router as logOutRoute } from "../routes/commonRoutes/logOut";
import { router as getSubjectsRoute } from "../routes/commonRoutes/getSubjects";
import { router as getSubjectTopicTestsRoute } from "../routes/commonRoutes/getSubjectTopicTests";

// student routes
import { router as addStudentRoute } from "../routes/studentRoutes/addStudent";

// teacher routes
import { router as addTestRoute } from "../routes/teacherRoutes/addTest";

const mainRouter = express.Router();

// Middleware to log requests

// common routes
mainRouter.use("/signin", singInRoute);
mainRouter.use("/fetchuser", fetchUserRoute);
mainRouter.use("/logout", logOutRoute);
mainRouter.use("/getsubjects", getSubjectsRoute);
mainRouter.use("/getsubjecttopictests", getSubjectTopicTestsRoute);

// student routes
mainRouter.use("/addstudent", addStudentRoute);

// teacher routes
mainRouter.use("/addtest", addTestRoute);

export { mainRouter };