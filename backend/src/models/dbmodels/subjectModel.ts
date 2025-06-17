import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    topics: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const subjectModel = mongoose.model("Subjects", subjectSchema, "Subjects");
export { subjectModel };
