import { getAxiosInstance } from './axiosInstance';
import Staffs from '../data/staff';

const getAllStaff = async (isMock = false, isHostStaff = true, isImplementStaff = true) => {
    const url = `staffs?getHostStaff=${isHostStaff}&getImplementStaff=${isImplementStaff}`;
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Staffs);
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

const createStaff = async (staff) => {
    const url = `staffs`;
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const data = instance.post(url, staff, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
}


const updateStaff = async (staff) => {
    const url = `staffs`;
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const request = {
        'id': staff.id,
        'fullname': staff.fullname,
        'phoneNumber': staff.phoneNumber,
        'email': staff.email
    }
    const data = instance.put(url, request, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
}


const getStaffById = async (id, isMock = false) => {
    const url = `staffs?id=${id}`;
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');

    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Staffs.find(x => x.Id === id));
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

const deleteStaff = async (id) => {
    const url = '';
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const data = instance.get(url, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
}

export { getAllStaff, deleteStaff, getStaffById, updateStaff, createStaff };