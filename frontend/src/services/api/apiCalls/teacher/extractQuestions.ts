import { User } from "../../../../utils/constants";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const extractQuestions = async (email: User["email"], formData: FormData) => {
  try {
    formData.append("email", email); 

    const response = await axiosInstance.post("/extractquestions", formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });

    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};

