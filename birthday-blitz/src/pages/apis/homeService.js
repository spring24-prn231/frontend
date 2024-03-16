import { getAxiosInstance } from '../../apis/axiosInstance';
import countOrders from '../data/countOrders';
import countRooms from '../data/countRooms';
import countCapacities from '../data/countCapacities';

const getCountOrders = async (isMock = false) => {
    const url = '/orders/count';
    const instance = await getAxiosInstance();
  
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(countOrders);
            }, 1000);
        });
    }
    else {
        const data = instance.get(url).then(res => res.data.data);
        return data;
    }
}

const getCountRooms = async (isMock = false) => {
    const url = '/rooms?pagesize=10000&isEager=false';
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(countRooms);
            }, 1000);
        });
    }
    else {
        const data = instance.get(url).then(res => res.data.data.length);
        return data;
    }
}

const getCountCapacities = async (isMock = false) => {
    const url = '/rooms?pagesize=1000&sortBy=1&sort=Capacity&isEager=false';
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(countCapacities);
            }, 1000);
        });
    }
    else {
        const data = instance.get(url).then(res => res.data.data[0].capacity);
        return data;
    }
}
export { getCountOrders, getCountRooms, getCountCapacities };