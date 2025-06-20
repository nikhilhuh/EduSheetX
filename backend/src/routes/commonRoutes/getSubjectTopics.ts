import express, { Request, Response } from "express";
import { subjectModel } from "../../models/dbmodels/subjectModel";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const subjectName = req.query.subjectName as string;
    if (!subjectName) {
      res
        .status(400)
        .json({
          success: false,
          message: "Subject name is required to fetch topics",
        });
      return;
    }
    const subject = await subjectModel.findOne({name: { $regex: new RegExp(`^${subjectName}$`, "i") }});
    if(!subject){
        res.status(404).json({ success: false, message: "Subject not found"});
        return;
    }
    const topics = subject.topics;

    res.status(200).json({ success: true, data: topics });
    return;
  } catch (error) {
    console.error("Error retrieving subjects:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
    return;
  }
});

export { router };
