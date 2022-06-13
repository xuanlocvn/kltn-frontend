import axiosClient from "./axiosClient"

export const getMissionList = (studentAddress?: string) => {
  const url = studentAddress
    ? `api/mission?studentAddress=${studentAddress}`
    : `api/mission`
  return axiosClient.get(url)
}

export const getMissionListByLecturer = (lecturerAddress: string) => {
  const url = `api/mission/lecturer/${lecturerAddress}`
  return axiosClient.get(url)
}

export const getMissionDetail = (
  missionAddress: string,
  studentAddress: string,
) => {
  const url = `api/mission/${missionAddress}?studentAddress=${studentAddress}`
  return axiosClient.get(url)
}
