import { getAxiosInstance } from './axiosInstance';

const login = async (username, password) => {
    const url = '/authentication/login';
    const instance = await getAxiosInstance();
    const data = instance.post(url, {
        username: username,
        password: password
    });
    return data;
}

const logout = () => {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
}

export { login, logout};