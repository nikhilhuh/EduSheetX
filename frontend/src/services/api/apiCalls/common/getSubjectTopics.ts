import { Subject } from "../../../../utils/constants";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const getSubjectTopics = async (subjectName: Subject['name']) => {
  try {
    const response = await axiosInstance.get("/getsubjecttopics", {
      params: { subjectName }
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
