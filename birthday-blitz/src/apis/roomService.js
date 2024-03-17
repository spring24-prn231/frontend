import { getAxiosInstance } from './axiosInstance';
import Rooms from '../data/room';

const getAllRoom = async (isMock = false) => {
    const url = 'rooms';
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Rooms);
            }, 1000);
        });
    }
    else {
        const data = instance.get(url).then(res => res.data);
        return data;
    }
}

const createRoom = async (room) =>  {
    const url = `rooms`;
    const request = {
        'price': room.price,
        'roomTypeId': room.roomTypeId,
        'capacity': room.capacity,
        'roomNo': parseInt(room.roomNo)
    }
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const data = instance.post(url, request, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    });
    return data;
}

const updateRoom = async (room) =>  {
    const url = `rooms`;
    const request = {
        'id': room.id,
        'price': room.price,
        'roomTypeId': room.roomTypeId,
        'capacity': room.capacity,
        'roomNo': parseInt(room.roomNo)
    }
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const data = instance.put(url, request, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    });
    return data;
}

const getRoomById = async (id, isMock = false) => {
    const url = `rooms?id=${id}`;
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Rooms.find(x => x.Id.toString() === id));
            }, 1000);
        });
    }
    else {
        const data = instance.get(url).then(res => res.data);
        return data;
    }
}

const deleteRoom = async (id, isMock = false) => {
    const url = '';
    const instance = await getAxiosInstance();
    if (isMock) {
        return true;
    }
    else {
        return true;
    }
}

export { getAllRoom, deleteRoom, getRoomById, updateRoom, createRoom };