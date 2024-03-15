import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://event-blitz.azurewebsites.net/api/v1'
});

const getAxiosInstance = async() => {
    return axiosInstance;
}

export {getAxiosInstance};