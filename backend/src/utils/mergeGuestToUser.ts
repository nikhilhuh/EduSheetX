import { testResultModel } from "../models/dbmodels/testResultSchema";
import { guestModel } from "../models/dbmodels/guestModel";

export const mergeGuestToUser = async (guestId: string, userId: string) => {
  try {
    if (!guestId || !userId) return;

    // Fetch all guest test results
    const guestResults = await testResultModel.find({ guestId });

    await guestModel.deleteOne({ guestId });

    for (const result of guestResults) {
      const existing = await testResultModel.findOne({
        test: result.test,
        user: userId,
      });

      // If the user hasn't already attempted this test
      if (!existing) {
        await testResultModel.updateOne(
          { _id: result._id },
          { $set: { user: userId } }
        );
      }
    }
  } catch (error) {
    console.error("Error merging guest test results to user:", error);
  }
};
