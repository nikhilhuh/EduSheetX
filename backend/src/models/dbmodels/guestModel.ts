import mongoose from "mongoose";

const guestSchema = new mongoose.Schema(
  {
    guestId: { type: String, required: true, unique: true },
  },
  { timestamps: false }
);
const guestModel = mongoose.model("Guests", guestSchema, "Guests");

export { guestModel };
