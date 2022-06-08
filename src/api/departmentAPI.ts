import axiosClient from "./axiosClient"

export const getAllDepartment = () => {
  const url = "api/department"
  return axiosClient.get(url)
}

export const getSubjectByDepartment = (departmentSHortName: string) => {
  const url = `api/department/${departmentSHortName}`
  return axiosClient.get(url)
}
