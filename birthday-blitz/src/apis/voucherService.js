import { getAxiosInstance } from './axiosInstance';
import Vouchers from '../data/voucher';

const getAllVoucher = async (isMock = false) => {
    const url = 'vouchers';
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Vouchers);
            }, 1000);
        });
    }
    else {
        const data = instance.get(url).then(res => res.data);
        return data;
    }
}

const getVoucherById = async (id, isMock = false) => {
    const url = `vouchers?id=${id}`;
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Vouchers.find(x => x.Id.toString() === id));
            }, 1000);
        });
    }
    else {
        const data = instance.get(url).then(res => res.data);
        return data;
    }
}

const updateVoucher = async (voucher) => {
    const url = `vouchers`;
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const data = instance.put(url, voucher, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
}

const deleteVoucher = async (id, isMock = false) => {
    const url = `vouchers/${id}`;
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const data = instance.delete(url, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;

}

export { getAllVoucher, deleteVoucher, getVoucherById, updateVoucher };