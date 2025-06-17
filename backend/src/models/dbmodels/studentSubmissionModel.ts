import mongoose from "mongoose";

const studentSubmissionSchema = new mongoose.Schema(
  {
    testId: { type: mongoose.Schema.Types.ObjectId, ref: "Tests", required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
    answers: {
      type: Map,
      of: String, 
      required: true
    },
    score: { type: Number, required: true },
  },
  { timestamps: { createdAt: 'submittedAt', updatedAt: false } }
);

const studentSubmissionModel = mongoose.model("StudentSubmissions", studentSubmissionSchema);
export { studentSubmissionModel };
