import React, { useEffect, useState } from "react"
import { getAllDepartment } from "src/api/departmentAPI"
import { managerPoolContractService } from "src/contracts/manager-pool.service"
import useAvata from "src/hooks/useAvata"
import { AddDataToIPFS } from "src/ipfs/ipfsClient"
import { FACULTY } from "src/utils/enum"
// import PropTypes from 'prop-types';

GrantRoleLecturer.propTypes = {}

function GrantRoleLecturer() {
  const [faculty, setFaculty] = useState("")
  const { onChangeAvt, defaultAvt } = useAvata()
  const [gender, setGender] = useState("Nam")
  const [departmentList, setDepartmentList] = useState([])

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllDepartment()
      console.log(response.data.result)
      setDepartmentList(response.data.result)
    }

    fetchApi()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const lecturerInfoForm = {
      img: defaultAvt,
      name: e.target.name.value.trim(),
      dateOfBirth: e.target.dateOfBirth.value.trim(),
      lecturerId: e.target.lecturerId.value.trim(),
      faculty: FACULTY[e.target.faculty.value.trim()],
      walletAddress: e.target.walletAddress.value.trim(),
      gender: e.target.gender.value,
      facultyShortName: e.target.faculty.value.trim(),
    }
    console.log(lecturerInfoForm)
    const hash = await AddDataToIPFS(lecturerInfoForm)
    console.log(hash)
    await managerPoolContractService.addLecturerInfo(
      lecturerInfoForm.walletAddress,
      hash,
    )
  }
  return (
    <div className="form_body container">
      <div>
        <h2>Phân Quyền Giảng Viên</h2>
      </div>
      <div className="body_form mt-3">
        <form className="d-flex" onSubmit={handleSubmit}>
          <div className="col col-4 img-avt d-flex flex-column align-items-center">
            <label htmlFor="myImage">
              <img src={defaultAvt} alt="" />
              <p>
                <i>Nhấn để chọn ảnh mới</i>
              </p>
            </label>
            <input
              type="file"
              id="myImage"
              name="myImage"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => onChangeAvt(e)}
            />
          </div>
          <div className="col col-8">
            <div className="d-flex justify-content-between mb-2 row">
              <div className="d-flex flex-column col col-6">
                <label htmlFor="name">
                  Họ và tên <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  name="name"
                  required
                />
              </div>
              <div className="d-flex flex-column col col-6">
                <label htmlFor="lecturerId">
                  Mã giảng viên <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Mã giảng viên"
                  name="lecturerId"
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-between mb-2 row">
              <div className="d-flex flex-column col col-6">
                <label htmlFor="dateOfBirth">
                  Ngày sinh <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  placeholder="Ngày sinh"
                  name="dateOfBirth"
                  required
                />
              </div>
              <div className="d-flex flex-column col col-6">
                <label htmlFor="gender">
                  Giới tính <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value)
                  }}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
            </div>
            <div className="d-flex flex-column  mb-2">
              <label htmlFor="faculty">
                Khoa <span style={{ color: "red" }}>*</span>
              </label>
              <select
                name="faculty"
                id="faculty"
                value={faculty}
                onChange={(e) => {
                  setFaculty(e.target.value)
                }}
              >
                {departmentList.map((department, index) => (
                  <option key={index} value={department.departmentShortenName}>
                    {department.departmentName}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex flex-column  mb-2">
              <label htmlFor="walletAddress">
                Địa chỉ ví <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Địa chỉ ví"
                name="walletAddress"
                required
              />
            </div>
            <div className="d-flex flex-row-reverse">
              <button className="submitbtn" type="submit">
                Tạo
              </button>
              <button className="submitbtn cancel_btn">Hủy</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GrantRoleLecturer
