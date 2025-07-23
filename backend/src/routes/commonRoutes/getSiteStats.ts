import express, { Request, Response } from "express";
import { siteStatsModel } from "../../models/dbmodels/siteStatsModel";
import { testModel } from "../../models/dbmodels/testModel";
import { testResultModel } from "../../models/dbmodels/testResultSchema";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const stats = await siteStatsModel.findOne({});
    const testsAvailable = await testModel.countDocuments();

    // 🔥 Get top 5 most attempted (subject, topic) pairs
    const popularTopicsAggregation = await testResultModel.aggregate([
      {
        $group: {
          _id: { subject: "$subject", topic: "$topic" },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "Subjects", // Make sure this matches your collection name
          localField: "_id.subject",
          foreignField: "_id",
          as: "subjectInfo",
        },
      },
      { $unwind: "$subjectInfo" },
      {
        $project: {
          _id: 0,
          subjectName: "$subjectInfo.name",
          topicName: "$_id.topic",
        },
      },
    ]);

    const siteStats = {
      ...(stats?.toObject() || {}),
      testsAvailable,
      popularTopics: popularTopicsAggregation,
    };

    res.status(200).json({ success: true, data: siteStats });
  } catch (error) {
    console.error("Error retrieving stats: ", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

export { router };
