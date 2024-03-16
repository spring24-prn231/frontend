import { getAxiosInstance } from './axiosInstance';
import RoomTypes from '../data/roomType';

const getAllRoomType = async (isMock = false, size = null) => {
    const url = '';
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(size === null? RoomTypes : RoomTypes.slice(0, size));
            }, 1000);
        });
    }
    else {
        const data = instance.get(url).then(res => res.data);
        return data;
    }
}

const getRoomTypeById = async (id, isMock = false) => {
    const url = '';
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(RoomTypes.find(x => x.Id.toString() === id));
            }, 1000);
        });
    }
    else {
        const data = instance.get(url).then(res => res.data);
        return data;
    }
}

const deleteRoomType = async (id, isMock = false) => {
    const url = '';
    const instance = await getAxiosInstance();
    if (isMock) {
        return true;
    }
    else {
        return true;
    }
}

export { getAllRoomType, deleteRoomType, getRoomTypeById };