import { getAxiosInstance } from '../../apis/axiosInstance';

const getRoom = async (isMock = false, id = "") => {
    const url = 'rooms/anonymous?id=' + id;
    const instance = await getAxiosInstance();
    const data = instance.get(url).then(res => res.data.data);
    return data;

}
const getMenu = async (isMock = false, id = "") => {
    const url = 'dishes?id=' + id;
    const instance = await getAxiosInstance();
    const data = instance.get(url).then(res => res.data.data);
    return data;


}

const getServiceElement = async (isMock = false, id = "") => {
    const url = 'serviceelements?id=' + id;
    const instance = await getAxiosInstance();
    const data = instance.get(url).then(res => res.data.data);
    return data;

    
}

const createOrders = async (order) => {
    console.log(order)
    const url = 'orders';
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const data = instance.post(url, order, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
}

export {getRoom, getMenu, getServiceElement, createOrders};