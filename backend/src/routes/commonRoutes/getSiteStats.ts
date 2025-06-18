import express, { Request, Response } from "express";
import { siteStatsModel } from "../../models/dbmodels/siteStatsModel";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const stats = await siteStatsModel.findOne({});
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error("Error retreiving stats: ", error);
    res.status(500).json({ success: false, message: "Internal server error." });
    return;
  }
});

export { router };
