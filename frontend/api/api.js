import instance from '../src/axios';

export const findOrCreateUser = async (patientInfo) => {
    const requestString = `/users`;
    const res = await instance.post(requestString, patientInfo);
    return res.data;
};