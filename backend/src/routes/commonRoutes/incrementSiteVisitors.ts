import express, {Request, Response } from "express";
import { incrementSiteStats } from "../../utils/incrementSiteStats";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    await incrementSiteStats({ totalStudents: 1 });
    res.status(200).json({ success: true, message: "Total Students updated successfully"});
  } catch (err) {
    console.error("Error incrementing totalStudents:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export { router };
