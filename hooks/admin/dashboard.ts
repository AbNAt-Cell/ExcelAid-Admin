import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";

export const docStats = async () => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("Token is required");
  }
  const response = await axiosInstance.post("/api/stats/doctors", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
