import express, { Request, Response } from "express";
import { testResultModel } from "../../models/dbmodels/testResultSchema";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const testId = req.query.testId;
    const userId = req.query.userId;

    if (!testId || !userId) {
      res.status(400).json({
        success: false,
        message: "Both testId and userId are required.",
      });
      return;
    }

    const testResult = await testResultModel.findOne({
      test: testId,
      $expr: {
        $eq: [{ $toString: "$user" }, userId.toString()],
      },
    });

    if (!testResult) {
      res.status(404).json({
        success: false,
        message: "Result not found.",
      });
      return;
    }
    const result = {
      totalQuestions: testResult.totalQuestions,
      attemptedQuestions: testResult.attemptedQuestions,
      correctAnswers: testResult.correctAnswers,
      wrongAnswers: testResult.wrongAnswers,
      unattempted: testResult.unattempted,
      marks: testResult.marks,
      questions: testResult.questions,
    };

     res.status(200).json({
      success: true,
      data: result,
    });
    return;
  } catch (error) {
    console.error("Error fetching test result:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
    return;
  }
});

export { router };
