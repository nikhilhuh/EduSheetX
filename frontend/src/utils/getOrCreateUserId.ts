import { axiosInstance } from "../services/axiosInstance";

export async function getOrCreateUserId(): Promise<string> {
  let userId = localStorage.getItem("userId");

  if (!userId) {
    try {
      const response = await axiosInstance.get("/generateguestid");
      if (response && response.data && response.data.success) {
        userId = response.data.guestId;
      } else {
        console.error("Failed to retrieve guest ID from server");
      }
    } catch (err: any) {
      console.error("Failed to retrieve guest ID from server:", err);
    } finally {
      if (!userId) {
        userId = crypto.randomUUID();
      }
    }

    localStorage.setItem("userId", userId);
  }

  return userId;
}
