import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const incrementSiteVisitors = async () => {
  try {
    const response = await axiosInstance.post("/incrementsitevisitors",);
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};