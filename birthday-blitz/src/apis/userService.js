import { getAxiosInstance } from './axiosInstance';
import Users from '../data/user';

const getAllUser = async (isMock = false) => {
    const url = '';
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Users);
            }, 1000);
        });
    }
    else {
        const data = instance.get(url).then(res => res.data);
        return data;
    }
}

const getUserById = async (id, isMock = false) => {
    const url = '';
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Users.find(x => x.Id === id));
            }, 1000);
        });
    }
    else {
        const data = instance.get(url).then(res => res.data);
        return data;
    }
}

const deleteUser = async (id, isMock = false) => {
    const url = '';
    const instance = await getAxiosInstance();
    if (isMock) {
        return true;
    }
    else {
        return true;
    }
}

export { getAllUser, deleteUser, getUserById };