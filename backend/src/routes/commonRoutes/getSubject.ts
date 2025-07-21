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
          message: "Subject name is required to fetch subject",
        });
      return;
    }
    const subject = await subjectModel.findOne({name: subjectName});
    if(!subject){
        res.status(404).json({ success: false, message: "Subject not found"});
        return;
    }

    res.status(200).json({ success: true, data: subject });
    return;
  } catch (error) {
    console.error("Error retrieving subjects:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
    return;
  }
});

export { router };
