import { User } from "../../../../utils/constants";
import { axiosInstance } from "../../../axiosInstance";
import { apiErrorHandler } from "../../apiErrorHandling";

export const validateTestName = async (email: User['email'], testName: string) => {
  try {
    const response = await axiosInstance.post("/validatetestname", {
      email,
      testName,
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};

export const addTest = async (email: User["email"], test: any) => {
  try {
    const response = await axiosInstance.post("/addtest", {
      email,
      test,
    });
    return response.data;
  } catch (err: any) {
    return apiErrorHandler(err);
  }
};
