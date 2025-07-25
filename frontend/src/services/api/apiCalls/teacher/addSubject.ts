import { Subject, User } from "../../../../utils/constants";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const addSubject = async (email: User["email"], subject: Subject) => {
  try {
    const response = await axiosInstance.post("/addsubject", {
      email,
      subject,
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};