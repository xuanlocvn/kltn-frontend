import axiosClient from "./axiosClient"

export const getTuitionList = (studentAddress?: string) => {
  const url = studentAddress
    ? `api/tuition?studentAddress=${studentAddress}`
    : `api/tuition`
  return axiosClient.get(url)
}

export const getTuitionListByLecturer = (lecturerAddress: string) => {
  const url = `api/tuition/lecturer/${lecturerAddress}`
  return axiosClient.get(url)
}

export const getTuitionDetail = (
  tuitionAddress: string,
  studentAddress: string,
) => {
  const url = `api/tuition/${tuitionAddress}?studentAddress=${studentAddress}`
  return axiosClient.get(url)
}
