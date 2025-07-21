import express, { Request, Response } from "express";
import { userModel } from "../../models/dbmodels/userModel";
import { generateOTP } from "../../utils/generateOTP";
import { sendOTP } from "../../utils/sendOTP";
import { otpModel } from "../../models/dbmodels/otpModel";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required to generate OTP",
      });
      return;
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "You are already signed up, please login",
      });
      return;
    }

    // Generate a new OTP
    const otp = generateOTP();

    sendOTP(email, otp);

    // Check if an OTP already exists for the email
    const existingOTP = await otpModel.findOne({ email });

    if (existingOTP) {
      // Update existing OTP and reset createdAt
      existingOTP.otp = otp;
      existingOTP.createdAt = new Date(); // important if using TTL index
      await existingOTP.save();
    } else {
      // Create a new OTP document
      await otpModel.create({ email, otp });
    }

    res
      .status(200)
      .json({ success: true, message: "OTP generated successfully" });
    return;
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

export { router };
