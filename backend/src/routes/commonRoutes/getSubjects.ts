import express, { Request, Response } from "express";
import { subjectModel } from "../../models/dbmodels/subjectModel";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const subjects = await subjectModel
      .find({})
      .select("-createdAt -updatedAt -__v")
      .sort({ name: 1 });

    res.status(200).json({ success: true, data: subjects });
    return;
  } catch (error) {
    console.error("Error retrieving subjects:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
    return;
  }
});

export { router };
