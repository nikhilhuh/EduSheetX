import { User } from "../../../../utils/constants";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const logout = async (userId: User['_id']) => {
  try {
    const response = await axiosInstance.post("/logout", {
      userId
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
