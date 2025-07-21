import { Subject } from "../../../../utils/constants";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const getSubject = async (subjectName: Subject['name']) => {
  try {
    const response = await axiosInstance.get("/getsubject", {
      params: { subjectName }
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
