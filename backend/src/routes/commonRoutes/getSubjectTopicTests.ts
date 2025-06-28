import express, { Request, Response } from "express";
import { subjectModel } from "../../models/dbmodels/subjectModel";
import { testModel } from "../../models/dbmodels/testModel";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const subjectName = req.query.subjectName as string;
    const topicName = req.query.topicName as string;
    const userId = req.query.userId as string;
    if (!subjectName || !topicName || !userId) {
      res.status(400).json({
        success: false,
        message: "Subject and Topic name and User ID are required",
      });
      return;
    }

    const subject = await subjectModel.findOne({
      name: { $regex: new RegExp(`^${subjectName}$`, "i") },
    });
    if (!subject) {
      res.status(404).json({ success: false, message: "Subject not found." });
      return;
    }

    const tests = await testModel.aggregate([
      {
        $match: {
          subject: subject._id,
          topic: topicName,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },
      {
        $unwind: {
          path: "$createdBy",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "TestResult",
          let: { testId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$test", "$$testId"] },
                    { $eq: [{ $toString: "$user" }, userId.toString()] },
                  ],
                },
              },
            },
          ],
          as: "userResult",
        },
      },
      {
        $addFields: {
          isDone: { $gt: [{ $size: "$userResult" }, 0] },
        },
      },
      {
        $project: {
          name: 1,
          subject: 1,
          topic: 1,
          timeLimit: 1,
          isDone: 1,
          "createdBy.firstName": 1,
          "createdBy.lastName": 1,
          "createdBy.email": 1,
          questions: {
            $map: {
              input: "$questions",
              as: "q",
              in: {
                questionText: "$$q.questionText",
                questionImage: "$$q.questionImage",
                questionCaption: "$$q.questionCaption",
                questionType: "$$q.questionType",
                options: "$$q.options",
              },
            },
          },
        },
      },
      { $sort: { name: -1 } },
    ]);

    res.status(200).json({ success: true, data: tests });
    return;
  } catch (error) {
    console.error("Error retrieving subjects:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
    return;
  }
});

export { router };
