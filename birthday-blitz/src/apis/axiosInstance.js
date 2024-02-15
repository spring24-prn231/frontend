import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: ''
});

const getAxiosInstance = async() => {
    return axiosInstance;
}

export {getAxiosInstance};