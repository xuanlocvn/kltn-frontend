import axiosClient from './axiosClient';

export const getLecturerList = () => {
  const url = 'api/lecturer';
  return axiosClient.get(url);
};
