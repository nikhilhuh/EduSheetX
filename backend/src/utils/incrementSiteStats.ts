import { siteStatsModel } from "../models/dbmodels/siteStatsModel";

export const incrementSiteStats = async (fields: {
  totalStudents?: number;
  totalTestsTaken?: number;
  totalQuestionsAnswered?: number;
}) => {
  try {
    await siteStatsModel.findOneAndUpdate(
      {},
      { $inc: fields },
      { upsert: true, new: true }
    );
  } catch (err) {
    console.error("Failed to increment site stats:", err);
  }
};
