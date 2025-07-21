import { User } from "../../../../utils/constants";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

type SignInParams =
  | { email: User["email"]; password: string; guestId?: string }
  | { email: User["email"]; otp: string; guestId?: string };

export const signin = async (data: SignInParams) => {
  try {
    const response = await axiosInstance.post("/signin", data);
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
