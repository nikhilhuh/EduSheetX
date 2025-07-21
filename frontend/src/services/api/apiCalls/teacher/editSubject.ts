import { Subject, User } from "../../../../utils/constants";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const editSubject = async (email: User["email"], updates: Subject, subjectId: string) => {
  try {
    const response = await axiosInstance.put("/editsubject", {
      email,
      updates,
      subjectId,
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};