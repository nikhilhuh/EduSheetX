import { randomUUID } from "crypto";
import { guestModel } from "../models/dbmodels/guestModel";

export const generateGuestId = async (): Promise<string> => {
  while (true) {
    const guestId = randomUUID();
    const guest = await guestModel.findOne({ guestId });
    if (!guest) return guestId;
  }
};

