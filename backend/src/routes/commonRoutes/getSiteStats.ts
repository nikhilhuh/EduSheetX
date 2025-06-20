import express, { Request, Response } from "express";
import { siteStatsModel } from "../../models/dbmodels/siteStatsModel";
import { testModel } from "../../models/dbmodels/testModel";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const stats = await siteStatsModel.findOne({});
    const testsAvailable = await testModel.countDocuments();
    const statsWithTests = {
      ...stats?.toObject(), // convert Mongoose document to plain object
      testsAvailable,
    };
    res.status(200).json({ success: true, data: statsWithTests });
  } catch (error) {
    console.error("Error retreiving stats: ", error);
    res.status(500).json({ success: false, message: "Internal server error." });
    return;
  }
});

export { router };
