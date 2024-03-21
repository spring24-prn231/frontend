import { getAxiosInstance } from './axiosInstance';
import Plans from '../data/plan';

const getAllPlan = async (isMock = false) => {
    const url = '';
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Plans);
            }, 1000);
        });
    }
    else {
        const data = instance.get(url).then(res => res.data);
        return data;
    }
}

const getPlanById = async (id, isMock = false) => {
    const url = `partyplans?orderId=${id}`;
    const token = localStorage.getItem('AccessToken');
    const instance = await getAxiosInstance();
    if (isMock) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Plans.find(x => x.Id === id));
            }, 1000);
        });
    }
    else {
        const data = instance.get(url, {
            'headers': {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => res.data);
        return data;
    }
}


const savePlans = async (plans, orderId) => {
    const url = 'partyplans/list';
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const partyplans = plans.map(plan => {
        return {
            'id': plan.id.startsWith('newid') ? null : plan.id,
            'feedback': plan.feedback,
            'timeEnd': plan.timeEnd,
            'timeStart': plan.timeStart,
            'description': plan.description,
            'note': plan.note
        }
    });
    const request = {
        'orderId': orderId,
        'partyPlans': partyplans
    }
    const data = instance.put(url, request, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
}


const saveFeedback = async (plans, orderId) => {
    const url = 'partyplans/list';
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const partyplans = plans.map(plan => {
        return {
            'id': plan.id.startsWith('newid') ? null : plan.id,
            'feedback': plan.feedback,
        }
    });
    const request = {
        'orderId': orderId,
        'partyPlans': partyplans
    }
    const data = instance.put(url, request, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
}

const approvePlan = async (id) => {
    const url = 'partyplans/approvement';
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const request = {
        'orderId': id
    };
    const data = instance.post(url, request, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
}

const deletePlan = async (id, isMock = false) => {
    const url = '';
    const instance = await getAxiosInstance();
    if (isMock) {
        return true;
    }
    else {
        return true;
    }
}

const planAssign = async (planId, staffs) => {
    const url = 'partyplans/staff-assigment';
    const instance = await getAxiosInstance();
    const token = localStorage.getItem('AccessToken');
    const request = {
        'planId': planId,
        'staffIds': staffs
    };
    const data = instance.post(url, request, {
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data);
    return data;
}

export { getAllPlan, deletePlan, getPlanById, savePlans, approvePlan, planAssign, saveFeedback };