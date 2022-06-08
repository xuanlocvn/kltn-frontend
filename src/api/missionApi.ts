import axiosClient from "./axiosClient"

export const getMissionList = (studentAddress: string) => {
  const url = `api/mission?studentAddress=${studentAddress}`
  return axiosClient.get(url)
}

export const getMissionDetail = (
  missionAddress: string,
  studentAddress: string,
) => {
  const url = `api/mission/${missionAddress}?studentAddress=${studentAddress}`
  return axiosClient.get(url)
}
