import { getAxiosInstance } from './axiosInstance';
import Feedbacks from '../data/feedback';

const getAllFeedback = async (isMock = false) => {
    const url = '';
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Feedbacks);
            }, 1000);
        });
    }
    else {
        const data = instance.get(url).then(res => res.data);
        return data;
    }
}

const getFeedbackById = async (id, isMock = false) => {
    const url = '';
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Feedbacks.find(x => x.Id.toString() === id));
            }, 1000);
        });
    }
    else {
        const data = instance.get(url).then(res => res.data);
        return data;
    }
}

const deleteFeedback = async (id, isMock = false) => {
    const url = '';
    const instance = await getAxiosInstance();
    if (isMock) {
        return true;
    }
    else {
        return true;
    }
}

export { getAllFeedback, deleteFeedback, getFeedbackById };