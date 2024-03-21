import { getAxiosInstance } from './axiosInstance';
import Menus from '../data/menu';

const getAllService = async (isMock = false) => {
    const url = 'services';
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Menus);
            }, 1000);
        });
    }
    else {
        const data = instance.get(url,  {
            'headers': {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.data);
        return data;
    }
}

const getServiceById = async (id) => {
    const url = `services?id=${id}`;
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const data = instance.get(url, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
}

const updateService = async (service) => {
    const url = 'services';
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const request = {
        id: service.id,
        name: service.name,
        description: service.description,
        serviceElementIds: service.serviceElementDetails.filter(x => x.status === true).map(x => x.serviceElementId),
        dishIds: service.menus.filter(x => x.status === true).map(x => x.dishId)
    }
    const data = instance.put(url, request, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
}

const getAllServiceElements = async (isMock = false) => {
    const url = 'serviceelements';
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Menus);
            }, 1000);
        });
    }
    else {
        const data = instance.get(url,  {
            'headers': {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.data);
        return data;
    }
}


export { getAllService, getServiceById, updateService, getAllServiceElements };