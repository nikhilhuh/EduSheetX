import { User } from "../../../../utils/constants";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const updateUser = async (id: User['_id'], updates: any) => {
  try {
    const response = await axiosInstance.patch("/updateuser", {
      id,
      updates,
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};