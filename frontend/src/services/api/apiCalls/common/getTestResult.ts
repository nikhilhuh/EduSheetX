import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";
import { getOrCreateUserId } from "../../../../utils/getOrCreateUserId";

const userId = getOrCreateUserId();

export const getTestResult = async (
  subjectId: string,
  topicName: string,
  testName: string,
  answers: (string | null)[]
) => {
  try {
    const response = await axiosInstance.get("/gettestresult", {
      params: {
        subjectId,
        topicName,
        testName,
        answers: JSON.stringify(answers), // array like ["A", null, "C"],
        userId
      },
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};

