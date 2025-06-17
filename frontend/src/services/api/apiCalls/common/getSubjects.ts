import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const getSubjects = async () => {
  try {
    const response = await axiosInstance.get("/getsubjects");
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
