import axiosClient from "./axiosClient"

export const getStudentByAddress = (studentAddress: string) => {
  const url = `api/student/${studentAddress}`
  return axiosClient.get(url)
}

export const getBalanceHistoriesOfStudent = (studentAddress: string) => {
  const url = `api/student/histories/${studentAddress}`
  return axiosClient.get(url)
}

export const getSubjectsOfStudent = (studentAddress: string) => {
  const url = `api/student/subject/${studentAddress}`
  return axiosClient.get(url)
}

export const getMissionsOfStudent = (studentAddress: string) => {
  const url = `api/student/mission/${studentAddress}`
  return axiosClient.get(url)
}
