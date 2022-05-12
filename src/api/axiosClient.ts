import { AxiosInstance } from 'axios';
import axios from 'axios';
import queryString from 'query-string';

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.DOMAIN_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axios.interceptors.request.use(async (config) => {
  //handle token...
  return config;
});

axios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    //handle error
    throw error;
  },
);

export default axiosClient;
