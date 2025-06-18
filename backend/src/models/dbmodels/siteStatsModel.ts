import mongoose from "mongoose";

const siteStatsSchema = new mongoose.Schema(
  {
    totalStudents: { type: Number, default: 0 },
    totalTestsTaken: { type: Number, default: 0 },
    totalQuestionsAnswered: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const siteStatsModel = mongoose.model("SiteStats", siteStatsSchema, "SiteStats");

export { siteStatsModel };
