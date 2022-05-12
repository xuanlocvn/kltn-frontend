import axiosClient from './axiosClient';

const studentApi = {
  get: (params) => {
    const url = 'student';
    return axiosClient.get(url, params);
  },
};

export default studentApi;
