import { getAxiosInstance } from './axiosInstance';

const login = async (isMock = false) => {
    const url = '/authentication/login';
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Menus);
            }, 1000);
        });
    }
    else {
        const data = instance.get(url).then(res => res.data);
        return data;
    }
}

export { login };