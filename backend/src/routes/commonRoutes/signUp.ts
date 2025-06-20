import express, { Request, Response } from "express";
import { userModel } from "../../models/dbmodels/userModel";
import bcrypt from "bcryptjs";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
      return;
    }

    // check if student already exists
    const existingStudent = await userModel.findOne({ email: email });
    if (existingStudent) {
      res
        .status(400)
        .json({ success: false, message: "Student already exists." });
      return;
    }

    // ✅ HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user -> student
    await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "student",
      status: "inactive",
    });

    res
      .status(201)
      .json({ success: true, message: "Student signed up successfully" });
    return;
  } catch (err) {
    console.log(`Error Signing Up User: ${err}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
    return;
  }
});

export { router };
