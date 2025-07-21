import express, { Request, Response } from "express";
import { subjectModel } from "../../models/dbmodels/subjectModel";
import { userModel } from "../../models/dbmodels/userModel";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, subject } = req.body;

    // validate req body
    if (!email || !subject) {
      res.status(404).json({
        success: false,
        message: "Email of user and Subject to be added is required",
      });
      return;
    }

    // find user and check if it a teacher
    const user = await userModel.findOne({ email });
    if (user.role !== "teacher") {
      res.status(400).json({ success: false, message: "Access denied" });
      return;
    }

    // check if the subject is already there
    const alreadyExists = await subjectModel.findOne({ name: subject.name });

    if (alreadyExists) {
      res
        .status(404)
        .json({ success: false, message: "Subject already exists" });
      return;
    }

    // create new subject
    await subjectModel.create({
      name: subject.name,
      topics: subject.topics,
    });

    res
      .status(200)
      .json({ success: true, message: "Subject added successfully" });
  } catch (err) {
    console.log("Error editing subject: ", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export { router };
