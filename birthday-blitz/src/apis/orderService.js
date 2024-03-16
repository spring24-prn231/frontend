import { getAxiosInstance } from './axiosInstance';
import Orders from '../data/order';

const getAllOrder = async (isMock = false) => {
    const url = 'orders';
    const token = localStorage.getItem('AccessToken');
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Orders);
            }, 1000);
        });
    }
    else {
        const data = instance.get(url, {
            'headers': {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.data);
        return data;
    }
}

const getOrderById = async (id, isMock = false) => {
    const url = '';
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Orders.find(x => x.Id.toString() === id));
            }, 1000);
        });
    }
    else {
        const data = instance.get(url).then(res => res.data);
        return data;
    }
}

const deleteOrder = async (id, isMock = false) => {
    const url = '';
    const instance = await getAxiosInstance();
    if (isMock) {
        return true;
    }
    else {
        return true;
    }
}

export { getAllOrder, deleteOrder, getOrderById };