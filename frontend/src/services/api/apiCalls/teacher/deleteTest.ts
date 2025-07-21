import { User } from "../../../../utils/constants";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const deleteTest = async (email: User["email"], testId: string) => {
  try {
    const response = await axiosInstance.delete("/deletetest", {
      data: {
        email,
        testId,
      },
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
