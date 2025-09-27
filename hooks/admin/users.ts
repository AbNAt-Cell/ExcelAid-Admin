import Cookies from "js-cookie";
import axiosInstance from "../../lib/axios";

export const getUsers = async () => {
  const token = Cookies.get("token");
  const response = await axiosInstance.get("/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
