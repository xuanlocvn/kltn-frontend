import axiosClient from "./axiosClient"

export const getAllLecturers = () => {
  const url = "api/lecturer"
  return axiosClient.get(url)
}

export const getLecturerList = () => {
  const url = "api/lecturer"
  return axiosClient.get(url)
}

export const getLecturerByAddress = (lecturerAddress: string) => {
  const url = `api/lecturer/${lecturerAddress}`
  return axiosClient.get(url)
}

export const getLecturerAmountObject = (lecturerAddress: string) => {
  const url = `api/lecturer/event-amount/${lecturerAddress}`
  return axiosClient.get(url)
}
