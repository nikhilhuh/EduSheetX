import mongoose from "mongoose";

const questionResultSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  selectedOption: { type: String, default: null },
  correctAnswer: { type: String, required: true },
  options: {
    A: { type: String, required: true },
    B: { type: String, required: true },
    C: { type: String, required: true },
    D: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["correct", "wrong", "unattempted"],
    required: true,
  },
  isCorrect: { type: Boolean, required: true },
});

const testResultSchema = new mongoose.Schema({
  user: { type: String, required: true }, // anon user ID
  test: { type: mongoose.Schema.Types.ObjectId, ref: "Test", required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  topic: { type: String, required: true },
  totalQuestions: { type: Number, required: true },
  attemptedQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  wrongAnswers: { type: Number, required: true },
  unattempted: { type: Number, required: true },
  marks: { type: Number, required: true },
  questions: [questionResultSchema], // renamed from 'detailedResult'
  attemptedAt: { type: Date, default: Date.now },
});

// Unique constraint: one result per test per user
testResultSchema.index({ user: 1, test: 1 }, { unique: true });

const testResultModel = mongoose.model("TestResult", testResultSchema, "TestResult");

export { testResultModel };
