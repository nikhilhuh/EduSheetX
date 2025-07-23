import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "teacher"],
      required: true,
      default: "student",
    },
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
    phoneNumber: { type: String },
    gaurdianName: { type: String },
    gaurdianPhoneNumber: { type: Number },
    class: { type: String }

  },
  { timestamps: true }
);
const userModel = mongoose.model("Users", userSchema, "Users");

export { userModel };
