import express, { Request, Response } from "express";
import { generateGuestId } from "../../utils/generateGuestId";
import { guestModel } from "../../models/dbmodels/guestModel";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const guestId = await generateGuestId();

    await guestModel.create({ guestId });
    res.status(200).json({ success: true, guestId });
  } catch (err) {
    console.error("Error in getGuestId route:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export { router };
