import axiosClient from './axiosClient';

export const getMissionList = (studentAddress: string) => {
  const url = `api/mission?studentAddress=${studentAddress}`;
  return axiosClient.get(url);
};
