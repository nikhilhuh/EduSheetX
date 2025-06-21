import mongoose from "mongoose";
import { testResultModel } from "../models/dbmodels/testResultSchema";

export const mergeGuestToUser = async (guestId: string, userId: string) => {
  const guestResults = await testResultModel.find({
    $expr: {
      $eq: [{ $toString: "$user" }, guestId.toString()],
    },
  });
  const userObjectId = new mongoose.Types.ObjectId(userId);

  for (const result of guestResults) {
    const existingUserTest = await testResultModel.findOne({
      $expr: {
        $eq: [{ $toString: "$user" }, userId.toString()],
      },
      test: result.test,
    });    

    // Only update if the user doesn't already have a result for this test
    if (!existingUserTest) {
      await testResultModel.updateOne(
        { _id: result._id },
        { $set: { user: userObjectId } }
      );
    }
  }
};
