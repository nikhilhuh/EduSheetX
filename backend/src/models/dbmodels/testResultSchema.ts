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
  user: { type: mongoose.Schema.Types.Mixed, required: true },
  test: { type: mongoose.Schema.Types.ObjectId, ref: "Tests", required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subjects", required: true },
  topic: { type: String, required: true },
  totalQuestions: { type: Number, required: true },
  attemptedQuestions: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  wrongAnswers: { type: Number, required: true },
  unattempted: { type: Number, required: true },
  marks: { type: Number, required: true },
  questions: [questionResultSchema], 
  attemptedAt: { type: Date, default: Date.now },
});

testResultSchema.index({ user: 1 });
testResultSchema.index({ user: 1, test: 1 }, { unique: true });

const testResultModel = mongoose.model("TestResult", testResultSchema, "TestResult");

export { testResultModel };
