import express, { Request, Response } from "express";
import { subjectModel } from "../../models/dbmodels/subjectModel";
import { userModel } from "../../models/dbmodels/userModel";

const router = express.Router();

router.put("/", async (req: Request, res: Response) => {
  try {
    const { email, updates, subjectId } = req.body;

    // validate req body
    if (!email || !updates || !subjectId) {
      res.status(404).json({
        success: false,
        message: "Request body is incomplete",
      });
      return;
    }

    // find user and check if it a teacher
    const user = await userModel.findOne({ email });
    if (user.role !== "teacher") {
      res.status(400).json({ success: false, message: "Access denied" });
      return;
    }

    const updatedSubject = await subjectModel.findByIdAndUpdate(
      subjectId,
      updates,
      { new: true }
    );

    if (!updatedSubject) {
      res.status(404).json({ success: false, message: "Subject not found" });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "Subject updated successfully" });
  } catch (err) {
    console.log("Error editing subject: ", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export { router };
