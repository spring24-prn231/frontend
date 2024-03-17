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

const register = async (user) => {
    const url = 'authentication/register';
    const instance = await getAxiosInstance();
    const data = instance.post(url, user);
    return data;
}

const logout = () => {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
}

export { login, logout, register};