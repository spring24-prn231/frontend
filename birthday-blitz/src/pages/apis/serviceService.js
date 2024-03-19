import { getAxiosInstance } from '../../apis/axiosInstance';

const getRooms = async (isMock = false) => {
    const url = '/rooms';
    const instance = await getAxiosInstance();
    const data = instance.get(url).then(res => res.data.data);
    return data;
    // if (isMock) {
    //     return new Promise(resolve => {
    //         setTimeout(() => {
    //             resolve(countOrders);
    //         }, 1000);
    //     });
    // }
    // else {
    //     const data = instance.get(url).then(res => res.data.data);
    //     return data;
    // }
}
const getDishes = async (isMock = false) => {
    const url = '/dishes';
    const instance = await getAxiosInstance();
    const data = instance.get(url).then(res => res.data.data);
    return data;
    // if (isMock) {
    //     return new Promise(resolve => {
    //         setTimeout(() => {
    //             resolve(countOrders);
    //         }, 1000);
    //     });
    // }
    // else {
    //     const data = instance.get(url).then(res => res.data.data);
    //     return data;
    // }
}

const getDecorationShow = async (isMock = false) => {
    const url = '/elementtypes?name=chiếu%20sáng';
    const instance = await getAxiosInstance();
    const data = instance.get(url).then(res => res.data.data);
    return data;

}

const getStageCus = async (isMock = false) => {
    const url = '/elementtypes?name=chương%20trình';
    const instance = await getAxiosInstance();
    const data = instance.get(url).then(res => res.data.data);
    return data;

}

const getMusicShow = async (isMock = false) => {
    const url = '/elementtypes?name=âm%20thanh';
    const instance = await getAxiosInstance();
    const data = instance.get(url).then(res => res.data.data);
    return data;

}
export {getRooms, getDishes, getMusicShow, getStageCus, getDecorationShow};