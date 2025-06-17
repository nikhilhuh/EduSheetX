import { User } from "../../../../utils/constants";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const addStudent = async (
firstName: User['firstName'], lastName: User['lastName'], studentClass: User['studentClass'], email: User['email'], password: string) => {
  try {
    const response = await axiosInstance.post("/addstudent", {
      firstName,
      lastName,
      studentClass,
      email,
      password,
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
