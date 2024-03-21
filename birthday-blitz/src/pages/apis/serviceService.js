import { getAxiosInstance } from '../../apis/axiosInstance';

const getRooms = async (isMock = false) => {
    const url = '/rooms/anonymous?pageSize=1000';
    const instance = await getAxiosInstance();
    const data = instance.get(url).then(res => res.data.data);
    return data;

}
const getDishes = async (isMock = false) => {
    const url = '/dishes?pageSize=1000';
    const instance = await getAxiosInstance();
    const data = instance.get(url).then(res => res.data.data);
    return data;
   
}

const getDecorationShow = async (isMock = false) => {
    const url = '/elementtypes?name=Trang%20trí&pageSize=1000';
    const instance = await getAxiosInstance();
    const data = instance.get(url).then(res => res.data.data);
    return data;

}

const getStageCus = async (isMock = false) => {
    const url = '/elementtypes?name=chương%20trình&pageSize=1000';
    const instance = await getAxiosInstance();
    const data = instance.get(url).then(res => res.data.data);
    return data;

}

const getMusicShow = async (isMock = false) => {
    const url = '/elementtypes?name=dịch%20vụ%20khác&pageSize=1000';
    const instance = await getAxiosInstance();
    const data = instance.get(url).then(res => res.data.data);
    return data;

}
export {getRooms, getDishes, getMusicShow, getStageCus, getDecorationShow};