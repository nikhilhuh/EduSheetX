import { User } from "../../../../utils/constants";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const verifyOTP = async (email: User['email'], otp: string) => {
  try {
    const response = await axiosInstance.post("verifyotp", {
      email,
      otp
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
