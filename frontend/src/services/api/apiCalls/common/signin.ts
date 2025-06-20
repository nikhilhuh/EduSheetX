import { User } from "../../../../utils/constants";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const signin = async (email: User['email'], password: string, guestId?: string) => {
  try {
    const response = await axiosInstance.post("/signin", {
      email,
      password,
      guestId
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
