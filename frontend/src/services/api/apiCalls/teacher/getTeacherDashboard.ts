import { getOrCreateUserId } from "../../../../utils/getOrCreateUserId";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

const userId = await getOrCreateUserId();

export const getTeacherDashboard = async () => {
  try {
    const response = await axiosInstance.get("/getteacherdashboard", {
      params: { userId },
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
