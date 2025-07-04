import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 300, 
    },
  },
  { timestamps: false } 
);

const otpModel = mongoose.model("OTPs", otpSchema, "OTPs");

export { otpModel };
