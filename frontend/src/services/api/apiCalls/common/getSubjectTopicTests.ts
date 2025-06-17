import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const getSubjectTopicTests = async (subjectName: string, topicName: string) => {
  try {
    const response = await axiosInstance.get("/getsubjecttopictests", {
      params: { subjectName, topicName },
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
