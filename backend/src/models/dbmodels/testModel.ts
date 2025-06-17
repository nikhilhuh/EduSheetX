import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: true },
    options: {
      A: { type: String, required: true },
      B: { type: String, required: true },
      C: { type: String, required: true },
      D: { type: String, required: true },
    },
    correctAnswer: {
      type: String,
      enum: ["A", "B", "C", "D"],
      required: true,
    },
  },
  { _id: false }
);

const testSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Subjects",
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      default: null,
    },

    questions: {
      type: [questionSchema],
      required: true,
      validate: (v: any[]) => Array.isArray(v) && v.length > 0,
    },

    timeLimit: {
      type: Number, //minutes
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

const testModel = mongoose.model("Tests", testSchema, "Tests");
export { testModel };
