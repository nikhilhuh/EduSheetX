import { User } from "../../../../utils/constants";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const generateOTP = async (email: User['email']) => {
  try {
    const response = await axiosInstance.post("/generateotp", {
      email
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
