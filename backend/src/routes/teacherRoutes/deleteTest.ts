import express, { Request, Response } from "express";
import { userModel } from "../../models/dbmodels/userModel";
import { testModel } from "../../models/dbmodels/testModel";

const router = express.Router();

router.delete("/", async (req: Request, res: Response) => {
  try {
    const { email, testId } = req.body;

    // Validate request body
    if (!email || !testId) {
      res
        .status(400)
        .json({ success: false, message: "Email and test id are required." });
      return;
    }

    // Validate user
    const user = await userModel.findOne({ email });
    if (user.role === "student") {
      res.status(403).json({
        success: false,
        message: "Access denied. Only teachers can delete tests.",
      });
      return;
    }

    // delete test
    await testModel.findByIdAndDelete(testId);

    res
      .status(200)
      .json({ success: true, message: "Test deleted successfully." });
    return;
  } catch (error) {
    console.error("Error deleting test:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
    return;
  }
});

export { router };
