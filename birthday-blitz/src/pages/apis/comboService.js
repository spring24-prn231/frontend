import { getAxiosInstance } from '../../apis/axiosInstance';
const getServices = async (isMock = false) => {
    const url = 'services/anonymous';
    const instance = await getAxiosInstance();
    const data = instance.get(url).then(res => res.data.data);
    return data;
}

const getRoom = async (isMock = false, id = null) => {
    const url = 'rooms/anonymous?roomTypeId=10430275-2d9f-45a5-adfc-31736e1e3cbf';
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

const getDish = async (isMock = false, id) => {
    
    const url = 'dishes?id='+id;
    const instance = await getAxiosInstance();
    const data = instance.get(url).then(res => res.data.data);
    return data;
   
}

export {getServices, getRoom, getDish, getServiceElement};