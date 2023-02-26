import instance from '../src/axios';

export const findOrCreateUser = async (patientInfo) => {
    const requestString = `/users`;
    console.log("HELLO")
    console.log(patientInfo)
    const res = await instance.post(requestString, patientInfo);
    return res.data;
};