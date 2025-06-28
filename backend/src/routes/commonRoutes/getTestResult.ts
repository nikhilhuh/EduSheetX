import express, { Request, Response } from "express";
import { subjectModel } from "../../models/dbmodels/subjectModel";
import { testModel } from "../../models/dbmodels/testModel";
import { incrementSiteStats } from "../../utils/incrementSiteStats";
import { testResultModel } from "../../models/dbmodels/testResultSchema";
import mongoose from "mongoose";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const subjectId = req.query.subjectId as string;
    const topicName = req.query.topicName as string;
    const testName = req.query.testName as string;
    const answers = JSON.parse(req.query.answers as string);
    const userId = req.query.userId as string;

    if (!subjectId || !topicName || !testName || !answers || !userId) {
      res.status(400).json({
        success: false,
        message: "Cannot evaluate result based on non existent fields.",
      });
      return;
    }

    const subject = await subjectModel.findOne({ _id: subjectId });
    if (!subject) {
      res.status(404).json({ success: false, message: "Subject not found." });
      return;
    }
    if (!subject.topics.includes(topicName)) {
      res
        .status(404)
        .json({ success: false, message: "Topic is not part of Subject." });
      return;
    }

    const test = await testModel
      .findOne({
        name: testName,
        subject: subject._id,
        topic: topicName,
      })
      .populate("createdBy", "firstName lastName email");

    if (!test) {
      res.status(404).json({ success: false, message: "Test not found." });
      return;
    }

    // ✅ Check if user already submitted this test
    const existingResult = await testResultModel.findOne({
      test: test._id,
      $expr: {
        $eq: [{ $toString: "$user" }, userId.toString()],
      },
    });

    if (existingResult) {
      res.status(403).json({
        success: false,
        message: "You have already taken this test.",
      });
      return;
    }

    // evaluate result
    const totalQuestions = test.questions.length;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let unattempted = 0;

    const questionResults = test.questions.map(
      (question: any, index: number) => {
        const userAnswer = answers[index];

        let isCorrect = false;
        let status: "correct" | "wrong" | "unattempted";

        if (userAnswer === null || userAnswer === undefined) {
          unattempted++;
          status = "unattempted";
        } else if (userAnswer === question.correctAnswer) {
          correctAnswers++;
          isCorrect = true;
          status = "correct";
        } else {
          wrongAnswers++;
          status = "wrong";
        }

        const result: any = {
          questionType: question.questionType,
          questionCaption: question.questionCaption,
          selectedOption: userAnswer,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
          options: question.options,
          status,
          isCorrect,
        };

        if (question.questionType === "text") {
          result.questionText = question.questionText;
        } else if (question.questionType === "image") {
          result.questionImage = question.questionImage;
        }

        return result;
      }
    );

    const result = {
      totalQuestions,
      attemptedQuestions: totalQuestions - unattempted,
      correctAnswers,
      wrongAnswers,
      unattempted,
      marks: correctAnswers * 1,
      questions: questionResults,
    };

    // ✅ Save to testResultModel
    await testResultModel.create({
      user: mongoose.Types.ObjectId.isValid(userId)
        ? new mongoose.Types.ObjectId(userId)
        : userId,
      test: test._id,
      subject: subject._id,
      topic: topicName,
      attemptedAt: new Date(),
      totalQuestions,
      attemptedQuestions: totalQuestions - unattempted,
      correctAnswers,
      wrongAnswers,
      unattempted,
      marks: correctAnswers * 1,
      questions: questionResults,
    });

    // ✅ Increment Site Stats
    await incrementSiteStats({
      totalTestsTaken: 1,
      totalQuestionsAnswered: totalQuestions,
    });

    res.status(200).json({ success: true, data: result });
    return;
  } catch (error) {
    console.error("Error evaluating result:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
    return;
  }
});

export { router };
