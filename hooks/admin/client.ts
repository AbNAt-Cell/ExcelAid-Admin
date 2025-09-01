import Cookies from "js-cookie";
import axiosInstance from "@/lib/axios";

export const getClients = async () => {
  const token = Cookies.get("token");
  //   const response = await axiosInstance.get('/api/patients');
  let response;
  try {
    response = await axiosInstance.get("/api/forms", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return response?.data;
};

export const createClient = async (data: any) => {
  const token = Cookies.get("token");

  let response;
  try {
    response = await axiosInstance.post("api/patients", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    });
  } catch (error) {
    console.log(error);
  }
  return response?.data;
};
