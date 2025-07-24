import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";
import { getOrCreateUserId } from "../../../../utils/getOrCreateUserId";

export const getOldTestResult = async (
  testId: string
) => {
  try {
    const userId = await getOrCreateUserId();
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

