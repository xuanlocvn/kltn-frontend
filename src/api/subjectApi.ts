import axiosClient from "./axiosClient"

export const getSubjectList = (studentAddress: string) => {
  const url = `api/subject?studentAddress=${studentAddress}`
  return axiosClient.get(url)
}
