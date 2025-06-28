import express, { Request, Response } from "express";
import { testResultModel } from "../../models/dbmodels/testResultSchema";
import { userModel } from "../../models/dbmodels/userModel";
import { SubjectType } from "../../models/type models/types";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) {
      res.status(400).json({ success: false, message: "User id is required." });
      return;
    }
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    // 1. Student's Test Results
    const studentResults = await testResultModel
      .find({ user: new mongoose.Types.ObjectId(userId) })
      .populate("subject")
      .populate("test");

    const totalTests = studentResults.length;

    const totalMarks = studentResults.reduce(
      (acc, curr) => acc + curr.marks,
      0
    );
    const totalPossibleMarks = studentResults.reduce(
      (acc, curr) => acc + curr.totalQuestions,
      0
    );

    const averageMarks = totalTests ? (totalMarks / totalTests).toFixed(2) : 0;
    const percentage = totalPossibleMarks
      ? ((totalMarks / totalPossibleMarks) * 100).toFixed(2)
      : 0;

    // 2. Test Streak
    const testDates = studentResults.map((res) => {
      const date = new Date(res.attemptedAt);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    });

    const uniqueSortedDates = [...new Set(testDates)].sort((a, b) => b - a); // latest first

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayTime = today.getTime();
    const yesterdayTime = yesterday.getTime();

    const lastTestDate = uniqueSortedDates[0];

    let testStreak = 0;

    // Only calculate streak if last test was today or yesterday
    if (lastTestDate === todayTime || lastTestDate === yesterdayTime) {
      let streak = 1;
      for (let i = 1; i < uniqueSortedDates.length; i++) {
        const prevDate = uniqueSortedDates[i - 1];
        const currentDate = uniqueSortedDates[i];

        const diffInDays = (prevDate - currentDate) / (1000 * 60 * 60 * 24);

        if (diffInDays === 1) {
          streak++;
        } else {
          break; // break the streak
        }
      }

      testStreak = streak;
    }

    // 3. Leaderboard (top 10 users by average %)
    const leaderboardAgg = await testResultModel.aggregate([
      {
        $group: {
          _id: "$user", // ObjectId of user
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
      {
        $unwind: "$userInfo",
      },
      {
        $match: {
          "userInfo.role": "student", // ✅ only students
        },
      },
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
      { $sort: { percentage: -1 } },
      { $limit: 10 },
    ]);
    // Add rank to the top 10
    let leaderboard = leaderboardAgg.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

    // Check if current user is already in leaderboard
    const isInLeaderboard = leaderboard.some(
      (entry) => String(entry._id) === String(userId)
    );

    if (!isInLeaderboard) {
      // Get full sorted leaderboard to find the current user's rank
      const fullLeaderboard = await testResultModel.aggregate([
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
        { $match: { "userInfo.role": "student" } },
        {
          $project: {
            _id: 1,
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
        { $sort: { percentage: -1 } },
      ]);

      const userIndex = fullLeaderboard.findIndex(
        (entry) => String(entry._id) === String(userId)
      );

      if (userIndex !== -1) {
        const userEntry = {
          ...fullLeaderboard[userIndex],
          rank: userIndex + 1,
        };

        // Add user entry to the bottom of the top leaderboard
        leaderboard.push(userEntry);
      }
    }

    // 4. Recent 5 Tests
    const recentTests = studentResults
      .sort(
        (a, b) =>
          new Date(b.attemptedAt).getTime() - new Date(a.attemptedAt).getTime()
      )
      .slice(0, 5)
      .map((test) => {
        const subject = test.subject as unknown as SubjectType;
        const testObj = test.test as unknown as { _id: string; name: string };

        return {
          testId: testObj?._id || test.test,
          testName: testObj?.name || "Untitled Test",
          subject: subject?.name || "Unknown",
          topic: test.topic,
          marks: test.marks,
          attemptedAt: test.attemptedAt,
        };
      });
    res.status(201).json({
      success: true,
      data: {
        totalTests,
        averageMarks,
        percentage,
        testStreak,
        leaderboard,
        recentTests,
      },
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export { router };
