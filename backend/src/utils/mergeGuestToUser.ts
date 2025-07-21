import mongoose from "mongoose";
import { testResultModel } from "../models/dbmodels/testResultSchema";

export const mergeGuestToUser = async (guestId: string, userId: string) => {
  try {
    if (!guestId || !userId) return;

    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Fetch all guest test results
    const guestResults = await testResultModel.find({
      $expr: {
        $eq: [{ $toString: "$user" }, guestId],
      },
    });

    for (const result of guestResults) {
      const existing = await testResultModel.findOne({
        test: result.test,
        $expr: {
          $eq: [{ $toString: "$user" }, userId],
        },
      });

      // If the user hasn't already attempted this test
      if (!existing) {
        await testResultModel.updateOne(
          { _id: result._id },
          { $set: { user: userObjectId } }
        );
      }
    }
  } catch (error) {
    console.error("Error merging guest test results to user:", error);
  }
};
