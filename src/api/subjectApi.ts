import axiosClient from "./axiosClient"

export const getSubjectList = (studentAddress?: string) => {
  const url = studentAddress
    ? `api/subject?studentAddress=${studentAddress}`
    : `api/subject`
  return axiosClient.get(url)
}

export const getSubjectListByLecturer = (lecturerAddress: string) => {
  const url = `api/subject/lecturer/${lecturerAddress}`
  return axiosClient.get(url)
}

export const getSubjectDetail = (
  subjectAddress: string,
  studentAddress: string,
) => {
  const url = `api/subject/${subjectAddress}?studentAddress=${studentAddress}`
  return axiosClient.get(url)
}
