import express, { Request, Response } from "express";
import { userModel } from "../../models/dbmodels/userModel";
import { subjectModel } from "../../models/dbmodels/subjectModel";

const router = express.Router();

router.delete("/", async (req: Request, res: Response) => {
  try {
    const { email, subjectId } = req.body;

    // Validate request body
    if (!email || !subjectId) {
      res
        .status(400)
        .json({ success: false, message: "Email and subject id are required." });
      return;
    }

    // Validate user
    const user = await userModel.findOne({ email });
    if (user.role === "student") {
      res.status(403).json({
        success: false,
        message: "Access denied. Only teachers can delete subjects.",
      });
      return;
    }

    // delete subject
    await subjectModel.findByIdAndDelete(subjectId);

    res
      .status(200)
      .json({ success: true, message: "Subject deleted successfully." });
    return;
  } catch (error) {
    console.error("Error deleting subject:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
    return;
  }
});

export { router };
