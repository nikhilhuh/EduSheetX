import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { userModel } from "../../models/dbmodels/userModel";
import { mergeGuestToUser } from "../../utils/mergeGuestToUser";
import { otpModel } from "../../models/dbmodels/otpModel";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password, otp, guestId } = req.body;

    // ✅ Case 1: Email + Password Login
    if (email && password) {
      const user = await userModel.findOne({ email });
      if (!user) {
        res.status(400).json({
          success: false,
          message: "User with this email does not exist.",
        });
        return;
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        res.status(400).json({
          success: false,
          message: "Incorrect password",
        });
        return;
      }

      await userModel.updateOne({ email }, { status: "active" });

      if (guestId) {
        mergeGuestToUser(guestId, user._id.toString());
      }

      res
        .status(200)
        .json({ success: true, message: "User signed in successfully." });
      return;
    }

    // ✅ Case 2: Email + OTP Login
    if (email && otp) {
      const user = await userModel.findOne({ email });
      if (!user) {
        res.status(400).json({
          success: false,
          message: "No user found with this email.",
        });
        return;
      }

      const otpRecord = await otpModel.findOne({ email });
      if (!otpRecord) {
        res.status(400).json({
          success: false,
          message:
            "Your authorization has been revoked , please generate another otp",
        });
        return;
      }

      if (otpRecord.otp !== otp) {
        res.status(400).json({
          success: false,
          message: "Incorrect OTP.",
        });
        return;
      }

      await otpModel.deleteOne({ email });

      await userModel.updateOne({ email }, { status: "active" });

      if (guestId) {
        mergeGuestToUser(guestId, user._id.toString());
      }

      res
        .status(200)
        .json({ success: true, message: "User signed in successfully." });
      return;
    }

    // ❌ If neither login method has valid fields
    res.status(400).json({
      success: false,
      message: "Please provide email/password or email/otp for login.",
    });
  } catch (error) {
    console.error("Error Signing in user:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

export { router };
