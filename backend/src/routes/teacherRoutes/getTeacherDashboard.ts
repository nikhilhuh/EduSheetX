import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { testResultModel } from "../../models/dbmodels/testResultSchema";
import { userModel } from "../../models/dbmodels/userModel";
import { testModel } from "../../models/dbmodels/testModel";
import { SubjectType } from "../../models/type models/types";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) {
      res
        .status(400)
        .json({ success: false, message: "Teacher ID is required." });
      return;
    }

    const teacher = await userModel.findById(userId);
    if (!teacher || teacher.role !== "teacher") {
      res.status(404).json({ success: false, message: "Teacher not found." });
      return;
    }

    // 1. Get all tests created by this teacher
    const teacherTests = await testModel
      .find({ createdBy: new mongoose.Types.ObjectId(userId) })
      .populate("subject");

    const testIds = teacherTests.map((test) => test._id);

    // 2. Get all results from those tests
    const relatedResults = await testResultModel
      .find({ test: { $in: testIds } })
      .populate("subject")
      .populate("test")
      .populate("user");

    // Total unique students
    const uniqueStudentIds = new Set(
      relatedResults.map((res) => String(res.user))
    );
    const totalStudents = uniqueStudentIds.size;

    // Total tests created
    const totalTests = teacherTests.length;

    // Average marks
    const totalMarks = relatedResults.reduce(
      (acc, curr) => acc + curr.marks,
      0
    );
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

    // 3. Leaderboard (Top 10 Students in this teacher's tests)
    const leaderboardAgg = await testResultModel.aggregate([
      // 1. Match test results in the given testIds and ensure user is ObjectId
      {
        $match: {
          test: { $in: testIds },
          user: { $exists: true, $type: "objectId" }, // Only ObjectId users
        },
      },

      // 2. Group by user
      {
        $group: {
          _id: "$user",
          totalMarks: { $sum: "$marks" },
          totalQuestions: { $sum: "$totalQuestions" },
        },
      },

      // 3. Lookup user details (from "Users" collection)
      {
        $lookup: {
          from: "Users", // Ensure this matches your collection name
          localField: "_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },

      // 4. Unwind userInfo (discard if no match)
      { $unwind: "$userInfo" },

      // 5. Filter to only include students (role: "student")
      {
        $match: {
          "userInfo.role": "student", // Only keep users with role = "student"
        },
      },

      // 6. Calculate percentage & format name
      {
        $project: {
          percentage: {
            $cond: [
              { $eq: ["$totalQuestions", 0] },
              0,
              {
                $multiply: [
                  { $divide: ["$totalMarks", "$totalQuestions"] },
                  100,
                ],
              },
            ],
          },
          name: {
            $concat: ["$userInfo.firstName", " ", "$userInfo.lastName"],
          },
        },
      },

      // 7. Sort by percentage (highest first) and limit to top 10
      { $sort: { percentage: -1 } },
      { $limit: 10 },
    ]);
    // Assign rank to top 10 leaderboard
    const leaderboard = leaderboardAgg.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

    // 4. Recent Tests Created by Teacher (sorted by _id timestamp) + Average Marks
    const recentTests = await Promise.all(
      teacherTests
        .sort(
          (a, b) =>
            b._id.getTimestamp().getTime() - a._id.getTimestamp().getTime()
        )
        .slice(0, 5)
        .map(async (test) => {
          // Get all test results for this test
          const results = await testResultModel.find({ test: test._id }).lean();

          // Calculate metrics
          const studentsAttempted = results.length;
          const avgMarks =
            studentsAttempted > 0
              ? results.reduce((sum, result) => sum + result.marks, 0) /
                studentsAttempted
              : 0;

          return {
            testId: test._id,
            testName: test.name,
            subject:
              (test.subject as unknown as SubjectType)?.name || "Unknown",
            topic: (test.topic as string) || "Unknown",
            createdAt: test._id.getTimestamp(),
            avgMarks: Math.round(avgMarks * 100) / 100,
            studentsAttempted: studentsAttempted,
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
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong" });
    return;
  }
});

export { router };
