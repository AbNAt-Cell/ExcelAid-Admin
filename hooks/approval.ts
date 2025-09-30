import axiosInstance from "../lib/axios";
import { User } from "./auth";
import Cookies from "js-cookie";

export type SignupResponse = {
  message: string;
  user?: User;
  token?: string;
};

export const updateUserStatus = async (id: any, updatedStatus: any): Promise<SignupResponse> => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("Token is required");
  }

  try {
    const response = await axiosInstance.put(
      `/api/users/${id}/status`,
      { status: updatedStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || "Signup failed");
  }
};
