import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";
import { getOrCreateUserId } from "../../../../utils/getOrCreateUserId";

export const getTestResult = async (
  subjectId: string,
  topicName: string,
  testName: string,
  answers: (string | null)[]
) => {
  try {
    const userId = await getOrCreateUserId();
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

