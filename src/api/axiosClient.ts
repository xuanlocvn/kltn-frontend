import { AxiosInstance } from "axios"
import axios from "axios"
import queryString from "query-string"
import { configService } from "src/configs/config.service"
import { CONFIG } from "src/configs/config.enum"

const axiosClient: AxiosInstance = axios.create({
  baseURL: configService.getConfig(CONFIG.DOMAIN_URL),
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

axios.interceptors.request.use(async (config) => {
  //handle token...
  return config
})

axios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    console.log("aaaaaaaaaaaaaaaaa")
    return response
  },
  (error) => {
    throw error
  },
)

export default axiosClient
