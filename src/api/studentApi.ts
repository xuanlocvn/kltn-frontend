import axiosClient from './axiosClient';

export const getStudentByAddress = (studentAddress: string) => {
  const url = `api/student/${studentAddress}`;
  return axiosClient.get(url);
};
