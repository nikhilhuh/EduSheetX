import { getOrCreateUserId } from "../../../../utils/getOrCreateUserId";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

const userId = getOrCreateUserId();

export const getTeacherDashoard = async () => {
  try {
    const response = await axiosInstance.get("/getteacherdashboard", {
      params: { userId },
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
