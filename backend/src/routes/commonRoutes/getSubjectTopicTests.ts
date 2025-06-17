import express, { Request, Response } from "express";
import { subjectModel } from "../../models/dbmodels/subjectModel";
import { testModel } from "../../models/dbmodels/testModel";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const subjectName = req.query.subjectName as string;
    const topicName = req.query.topicName as string;
    if (!subjectName || !topicName) {
      res.status(400).json({
        success: false,
        message: "Subject and Topic name are required",
      });
      return;
    }

    const subject = await subjectModel.findOne({ name: subjectName });
    if (!subject) {
      res.status(404).json({ success: false, message: "Subject not found." });
      return;
    }

    const tests = await testModel
      .find({
        subject: subject._id,
        topic: topicName,
      })
      .populate("createdBy", "firstName lastName email");

    res.status(200).json({ success: true, data: tests });
    return;
  } catch (error) {
    console.error("Error retrieving subjects:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
    return;
  }
});

export { router };
