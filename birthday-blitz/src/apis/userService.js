import { getAxiosInstance } from './axiosInstance';
import Users from '../data/user';

const getAllUser = async (isMock = false) => {
    const url = 'users';
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');

    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Users);
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

const blockUser = async (id) => {
    const url = `users/${id}`;
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const data = instance.delete(url, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
}

const unBlockUser = async (id) => {
    const url = `users/${id}`;
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const data = instance.put(url, '', {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
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

export { getAllUser, deleteUser, getUserById, blockUser,unBlockUser };