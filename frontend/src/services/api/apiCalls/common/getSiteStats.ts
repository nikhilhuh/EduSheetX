import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const getSiteStats = async () => {
  try {
    const response = await axiosInstance.get("/getsitestats",);
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};