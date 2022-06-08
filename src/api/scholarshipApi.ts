import axiosClient from "./axiosClient"

export const getScholarshipList = (studentAddress: string) => {
  const url = `api/scholarship?studentAddress=${studentAddress}`
  return axiosClient.get(url)
}
