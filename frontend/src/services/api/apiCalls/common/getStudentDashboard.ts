import { getOrCreateUserId } from "../../../../utils/getOrCreateUserId";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const getStudentDashoard = async () => {
  try {
    const userId = await getOrCreateUserId();
    const response = await axiosInstance.get("/getstudentdashboard", {
      params: { userId },
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
