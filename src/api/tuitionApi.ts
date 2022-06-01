import axiosClient from './axiosClient';

export const getTuitiontList = (studentAddress: string) => {
  const url = `api/tuition?studentAddress=${studentAddress}`;
  return axiosClient.get(url);
};
