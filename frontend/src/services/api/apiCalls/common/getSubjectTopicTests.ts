import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";
import { getOrCreateUserId } from "../../../../utils/getOrCreateUserId";

export const getSubjectTopicTests = async (subjectName: string, topicName: string) => {
  try {
    const userId = await getOrCreateUserId();
    const response = await axiosInstance.get("/getsubjecttopictests", {
      params: { subjectName, topicName, userId },
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
