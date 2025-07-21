import { User } from "../../../../utils/constants";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const generateSignUpOTP = async (email: User['email']) => {
  try {
    const response = await axiosInstance.post("/generatesignupotp", {
      email
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
