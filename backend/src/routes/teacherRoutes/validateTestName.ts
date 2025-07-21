import express, { Request, Response } from "express";
import { userModel } from "../../models/dbmodels/userModel";
import { testModel } from "../../models/dbmodels/testModel";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, testName } = req.body;

    // Validate request body
    if (!email || !testName) {
      res
        .status(400)
        .json({ success: false, message: "Email and test data are required." });
      return;
    }

    // Validate user
    const user = await userModel.findOne({ email });
    if (!user || user.role !== "teacher") {
      res
        .status(403)
        .json({
          success: false,
          message: "Access denied. Only teachers can create tests.",
        });
      return;
    }

    // Prevent duplicate test names
    const existingTest = await testModel.findOne({ name: testName });
    if (existingTest) {
      res
        .status(409)
        .json({
          success: false,
          message: "Test with the same name already exists.",
        });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "Test Name available" });
    return;
  } catch (error) {
    console.error("Error adding test:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
    return;
  }
});

export { router };
