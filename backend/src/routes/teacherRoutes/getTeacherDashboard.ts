import express, { Request, Response } from "express";
import { testResultModel } from "../../models/dbmodels/testResultSchema";
import { userModel } from "../../models/dbmodels/userModel";
import { testModel } from "../../models/dbmodels/testModel";
import { SubjectType } from "../../models/type models/types";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ success: false, message: "Valid Teacher ID is required." });
      return;
    }

    const teacher = await userModel.findById(userId);
    if (!teacher || teacher.role !== "teacher") {
      res.status(404).json({ success: false, message: "Teacher not found." });
      return;
    }

    // 1. Fetch all tests created by this teacher
    const teacherTests = await testModel
      .find({ createdBy: userId })
      .populate("subject");

    const testIds = teacherTests.map((test) => test._id);

    // 2. Fetch all test results for these tests, filter only registered users (skip guests)
    const relatedResults = await testResultModel
      .find({ test: { $in: testIds }, user: { $exists: true, $ne: null } })
      .populate("subject")
      .populate("test")
      .populate("user");

    const uniqueStudentIds = new Set(
      relatedResults.map((res) => String(res.user))
    );

    const totalStudents = uniqueStudentIds.size;
    const totalTests = teacherTests.length;

    const totalMarks = relatedResults.reduce((acc, curr) => acc + curr.marks, 0);
    const totalPossibleMarks = relatedResults.reduce(
      (acc, curr) => acc + curr.totalQuestions,
      0
    );

    const averageMarks = relatedResults.length
      ? (totalMarks / relatedResults.length).toFixed(2)
      : "0.00";

    const percentage = totalPossibleMarks
      ? ((totalMarks / totalPossibleMarks) * 100).toFixed(2)
      : "0.00";

    // 3. Leaderboard: Top 10 students across this teacher's tests
    const leaderboardAgg = await testResultModel.aggregate([
      {
        $match: {
          test: { $in: testIds },
          user: { $exists: true, $type: "objectId" },
        },
      },
      {
        $group: {
          _id: "$user",
          totalMarks: { $sum: "$marks" },
          totalQuestions: { $sum: "$totalQuestions" },
        },
      },
      {
        $lookup: {
          from: "Users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $match: {
          "userInfo.role": "student",
        },
      },
      {
        $project: {
          percentage: {
            $cond: [
              { $eq: ["$totalQuestions", 0] },
              0,
              { $multiply: [{ $divide: ["$totalMarks", "$totalQuestions"] }, 100] },
            ],
          },
          name: {
            $concat: ["$userInfo.firstName", " ", "$userInfo.lastName"],
          },
        },
      },
      { $sort: { percentage: -1 } },
      { $limit: 10 },
    ]);

    const leaderboard = leaderboardAgg.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

    // 4. Recent Tests (Top 5 by creation date) with avg marks
    const recentTests = await Promise.all(
      teacherTests
        .sort((a, b) => b._id.getTimestamp().getTime() - a._id.getTimestamp().getTime())
        .slice(0, 5)
        .map(async (test) => {
          const results = await testResultModel
            .find({ test: test._id, user: { $exists: true, $ne: null } })
            .lean();

          const studentsAttempted = results.length;
          const avgMarks = studentsAttempted
            ? results.reduce((sum, result) => sum + result.marks, 0) / studentsAttempted
            : 0;

          return {
            testId: test._id,
            testName: test.name,
            subject: (test.subject as unknown as SubjectType)?.name || "Unknown",
            topic: test.topic || "Unknown",
            createdAt: test._id.getTimestamp(),
            avgMarks: Math.round(avgMarks * 100) / 100,
            studentsAttempted,
          };
        })
    );

    res.status(200).json({
      success: true,
      data: {
        totalTests,
        totalStudents,
        averageMarks,
        percentage,
        leaderboard,
        recentTests,
      },
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong while loading the dashboard.",
    });
  }
});

export { router };
