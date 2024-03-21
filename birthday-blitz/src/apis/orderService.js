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
    const url = `orders?id=${id}`;
    const token = localStorage.getItem('AccessToken');
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Orders.find(x => x.Id.toString() === id));
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

const staffAssign = async (staffId, orderId) => {
    const url = 'orders/staff-assignment';
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const request = {
        staffId,
        orderId
    };
    const data = instance.post(url, request, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
}

const createOrderDetail = async (orderDetail) => {
    const url = 'orderdetails';
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const data = instance.post(url, orderDetail, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
}

const updateOrderDetail = async (orderDetail) => {
    const url = 'orderdetails';
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const data = instance.put(url, orderDetail, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
}

const deleteOrderDetail = async (id) => {
    const url = `orderdetails/${id}`;
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const data = instance.delete(url, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
}


export { getAllOrder, deleteOrder, getOrderById, staffAssign, createOrderDetail, updateOrderDetail, deleteOrderDetail };