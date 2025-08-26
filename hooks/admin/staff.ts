import Cookies from 'js-cookie';
import axiosInstance from '../../lib/axios';

export const getStaffs = async () => {
    const token = Cookies.get('token');
    const response = await axiosInstance.get('/api/users?role=STAFF', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
}