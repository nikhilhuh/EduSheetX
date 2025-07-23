import express, { Request, Response } from "express";
import { userModel } from "../../models/dbmodels/userModel";
import { otpModel } from "../../models/dbmodels/otpModel";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      res.status(400).json({
        success: false,
        message: "Both email and otp is required to verify",
      });
      return;
    }

    //  check if email is taken by a user
    let user = await userModel.findOne({ email });
    if (user) {
      res.status(400).json({
        success: false,
        message: "You are already signed up, please login",
      });
      return;
    }

    //  verify the otp
    const userVerification = await otpModel.findOne({ email });
    if (!userVerification) {
      res.status(400).json({
        success: false,
        message:
          "Your authorization has been revoked , please generate another otp",
      });
      return;
    }

    if (userVerification.otp !== otp) {
      res.status(400).json({ success: false, message: "Incorrect otp" });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

export { router };
