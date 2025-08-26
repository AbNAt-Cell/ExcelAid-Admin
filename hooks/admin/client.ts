import Cookies from 'js-cookie';
import axiosInstance from '../../lib/axios';

export const getClients = async () => {
  const token = Cookies.get('token');
//   const response = await axiosInstance.get('/api/patients');
  const response = await axiosInstance.get('/api/users?role=CLIENT', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createClient = async (data: any) => {
  const token = Cookies.get('token');
  const response = await axiosInstance.post('api/patients', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
  return response.data;
};
