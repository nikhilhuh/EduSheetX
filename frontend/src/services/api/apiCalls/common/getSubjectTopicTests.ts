import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";
import { getOrCreateUserId } from "../../../../utils/getOrCreateUserId";

const userId = getOrCreateUserId();

export const getSubjectTopicTests = async (subjectName: string, topicName: string) => {
  try {
    const response = await axiosInstance.get("/getsubjecttopictests", {
      params: { subjectName, topicName, userId },
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
