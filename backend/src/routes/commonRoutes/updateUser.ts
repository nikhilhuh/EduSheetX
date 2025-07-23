import express, { Request, Response } from "express";
import { userModel } from "../../models/dbmodels/userModel";

const router = express.Router();

router.patch("", async (req: Request, res: Response) => {
  try {
    const { updates, id } = req.body;

    if ("email" in updates || "_id" in updates || "role" in updates || "password" in updates) {
      res.status(400).json({ success: false, message: "Cannot update email or ID or role or password" });
      return;
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedUser) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export { router };
