import React, { useEffect, useState } from "react"
import { getAllDepartment } from "src/api/departmentAPI"
import { managerPoolContractService } from "src/contracts/manager-pool.service"
import useAvata from "src/hooks/useAvata"
import { AddDataToIPFS } from "src/ipfs/ipfsClient"
import { convertDateToTimestamp } from "src/utils"
import { FACULTY } from "src/utils/enum"

GrantRoleStudent.propTypes = {}

function GrantRoleStudent() {
  const [faculty, setFaculty] = useState("")
  const [major, setMajor] = useState("")
  const [gender, setGender] = useState("Nam")
  const { onChangeAvt, defaultAvt } = useAvata()
  const [departmentList, setDepartmentList] = useState([])
  const [schoolYear, setSchoolYear] = useState(2022)

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllDepartment()
      console.log(response.data.result)
      setDepartmentList(response.data.result)
    }

    const getYear = () => {
      const datetime = new Date(Date.now() / 1000)
      const year = datetime.getFullYear()
      setSchoolYear(year)
    }

    getYear()
    fetchApi()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const studentInfoForm = {
      imgUrl: defaultAvt,
      name: e.target.name.value.trim(),
      studentId: e.target.studentId.value.trim(),
      birthday: convertDateToTimestamp(e.target.birthday.value),
      placeOfBirth: e.target.placeOfBirth.value.trim(),
      gender: e.target.gender.value.trim(),
      nation: e.target.nation.value.trim(),
      cmnd: e.target.cmnd.value.trim(),
      issuancePlace: e.target.issuancePlace.value.trim(),
      issuranceDate: convertDateToTimestamp(e.target.issuranceDate.value),
      address: e.target.address.value.trim(),
      faculty: FACULTY[e.target.faculty.value.trim()],
      facultyShortName: e.target.faculty.value.trim(),
      major: e.target.major.value,
      schoolYear: e.target.schoolYear.value.trim(),
      class: e.target.class.value.trim(),
      walletAddress: e.target.walletAddress.value.trim(),
    }
    console.log(studentInfoForm)
    const hash = await AddDataToIPFS(studentInfoForm)
    console.log(hash)
    await managerPoolContractService.addStudentInfo(
      studentInfoForm.walletAddress,
      hash,
    )
  }

  return (
    <div className="form_body container">
      <div>
        <h2>Phân Quyền Sinh Viên</h2>
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
            <div className="d-flex mb-2 row">
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
                <label htmlFor="studentId">
                  Mã số sinh viên <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Mã số sinh viên"
                  name="studentId"
                  required
                />
              </div>
            </div>
            <div className="d-flex mb-2 row">
              <div className="d-flex flex-column col col-3">
                <label htmlFor="birthday">
                  Ngày sinh <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  placeholder="Ngày sinh"
                  name="birthday"
                  required
                />
              </div>
              <div className="d-flex flex-column col col-3">
                <label htmlFor="gender">
                  Giới tính <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={(e) => {
                    console.log(e.target.value)
                    setGender(e.target.value)
                  }}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
              <div className="d-flex flex-column col col-3">
                <label htmlFor="placeOfBirth">
                  Nơi sinh <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nơi sinh"
                  name="placeOfBirth"
                  required
                />
              </div>
              <div className="d-flex flex-column col col-3">
                <label htmlFor="nation">
                  Dân tộc <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Dân tộc"
                  name="nation"
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-between row">
              <div className="d-flex flex-column mb-2 col col-4">
                <label htmlFor="cmnd">
                  CMND/CCCD <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="CMND/CCCD"
                  name="cmnd"
                  required
                />
              </div>
              <div className="d-flex flex-column mb-2 col col-4">
                <label htmlFor="issuranceDate">
                  Ngày cấp <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  placeholder="Ngày sinh"
                  name="issuranceDate"
                  required
                />
              </div>
              <div className="d-flex flex-column col col-4">
                <label htmlFor="issuancePlace">
                  Nơi cấp <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nơi cấp"
                  name="issuancePlace"
                  required
                />
              </div>
            </div>
            <div className="d-flex flex-column mb-2 ">
              <label htmlFor="address">
                Địa chỉ thường trú <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Địa chỉ thường trú"
                name="address"
                required
              />
            </div>
            <div className="d-flex justify-content-between mb-2 row">
              <div className="d-flex flex-column col col-6">
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
                    <option
                      key={index}
                      value={department.departmentShortenName}
                    >
                      {department.departmentName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-flex flex-column col col-6">
                <label htmlFor="schoolYear">
                  Khóa đào tạo <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Khóa đào tạo"
                  defaultValue={schoolYear}
                  name="schoolYear"
                  required
                />
              </div>
              <div className="d-flex flex-column col col-6">
                <label htmlFor="major">
                  Ngành <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="major"
                  id="major"
                  value={major}
                  onChange={(e) => {
                    setMajor(e.target.value)
                  }}
                >
                  <option value="CNTT">Công nghệ thông tin</option>
                  <option value="KTPM">Kỹ thuật phần mềm</option>
                  <option value="KTMT">Kỹ thuật máy tính</option>
                  <option value="KHMT">Khoa học máy tính</option>
                  <option value="HTTT">Hệ thống thông tin</option>
                </select>
              </div>
              <div className="d-flex flex-column col col-6">
                <label htmlFor="class">
                  Lớp sinh hoạt <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Lớp sinh hoạt"
                  name="class"
                  required
                />
              </div>
            </div>
            <div className="d-flex flex-column">
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
              <button className="submitbtn cancel_btn" type="reset">
                Hủy
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default GrantRoleStudent
