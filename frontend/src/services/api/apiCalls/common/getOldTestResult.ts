import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";
import { getOrCreateUserId } from "../../../../utils/getOrCreateUserId";

const userId = getOrCreateUserId();

export const getOldTestResult = async (
  testId: string
) => {
  try {
    const response = await axiosInstance.get("/getoldtestresult", {
      params: {
        testId,
        userId
      },
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};

