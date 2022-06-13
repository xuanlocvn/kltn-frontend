import axiosClient from "./axiosClient"

export const getScholarshipList = (studentAddress?: string) => {
  const url = studentAddress
    ? `api/scholarship?studentAddress=${studentAddress}`
    : `api/scholarship`
  return axiosClient.get(url)
}

export const getScholarshipListByLecturer = (lecturerAddress: string) => {
  const url = `api/scholarship/lecturer/${lecturerAddress}`
  return axiosClient.get(url)
}

export const getScholarshipDetail = (
  scholarshipAddress: string,
  studentAddress: string,
) => {
  const url = `api/scholarship/${scholarshipAddress}?studentAddress=${studentAddress}`
  return axiosClient.get(url)
}
