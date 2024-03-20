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

export {getRoom, getMenu, getServiceElement};