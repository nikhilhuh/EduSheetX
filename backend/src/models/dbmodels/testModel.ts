import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questionType: {
      type: String,
      enum: ["text", "image"],
      required: true,
      default: "text",
    },
    questionText: {
      type: String,
      required: function () {
        return this.questionType === "text";
      },
    },
    questionImage: {
      type: String, // URL or Base64 string
      required: function () {
        return this.questionType === "image";
      },
    },
    questionCaption : {
      type: String,
      required: false, 
    },
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
    explanation: {
      type: String,
      required: false,
    }
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
