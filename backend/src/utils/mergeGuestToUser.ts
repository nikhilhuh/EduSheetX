import mongoose from "mongoose";
import { testResultModel } from "../models/dbmodels/testResultSchema";

export const mergeGuestToUser = async (guestId: string, userId: string) => {
  await testResultModel.updateMany(
    { user: guestId }, // only guest results
    { $set: { user: new mongoose.Types.ObjectId(userId) } }
  );
};
