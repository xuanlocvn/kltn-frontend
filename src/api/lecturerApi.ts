import axiosClient from "./axiosClient"

export const getAllLecturers = () => {
  const url = "api/lecturer"
  return axiosClient.get(url)
}

export const getLecturerList = () => {
  const url = "api/lecturer"
  return axiosClient.get(url)
}
