import { axiosInstance } from "../services/axiosInstance";

export async function getOrCreateUserId(): Promise<string> {
  let userId = localStorage.getItem("userId");

  if (!userId) {
    try {
      const response = await axiosInstance.get("/generateguestid");

      if (response?.data?.success && response.data.guestId) {
        userId = response.data.guestId;
      } else {
        console.warn("Failed to retrieve guest ID from server. Using fallback.");
      }
    } catch (err) {
      console.error("Error retrieving guest ID:", err);
    }

    // Fallback to UUID
    if (!userId) {
      userId = crypto.randomUUID();
    }

    localStorage.setItem("userId", userId);
  }

  return userId;
}
