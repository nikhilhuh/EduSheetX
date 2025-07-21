import { User } from "../../../../utils/constants";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const deleteSubject = async (email: User["email"], subjectId: string) => {
  try {
    const response = await axiosInstance.delete("/deletesubject", {
      data: {
        email,
        subjectId,
      },
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
