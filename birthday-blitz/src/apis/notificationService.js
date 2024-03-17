import { getAxiosInstance } from './axiosInstance';

const getAllNotification = async (role) => {
    const url = `notifications?role=${role}&pageSize=100000`;
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const data = instance.get(url, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
}

export { getAllNotification };