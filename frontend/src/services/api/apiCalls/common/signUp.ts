import { User } from "../../../../utils/constants";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const signUp = async (
firstName: User['firstName'], lastName: User['lastName'], email: User['email'], password: string) => {
  try {
    const response = await axiosInstance.post("/signup", {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
