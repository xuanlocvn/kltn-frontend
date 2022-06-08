import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { convertDateToTimestamp } from "src/utils"
import useAvata from "src/hooks/useAvata"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { AddDataToIPFS } from "src/ipfs/ipfsClient"
import { managerPoolContractService } from "src/contracts/manager-pool.service"

StudentInfomation.propTypes = {
  studentInfo: PropTypes.shape({
    imgUrl: PropTypes.string,
    name: PropTypes.string,
    studentId: PropTypes.string,
    birthday: PropTypes.string,
    placeOfBirth: PropTypes.string,
    gender: PropTypes.string,
    nation: PropTypes.string,
    cmnd: PropTypes.string,
    issuancePlace: PropTypes.string,
    issuranceDate: PropTypes.string,
    address: PropTypes.string,
    faculty: PropTypes.string,
    major: PropTypes.string,
    schoolYear: PropTypes.string,
    class: PropTypes.string,
    walletAddress: PropTypes.string,
  }),
}

// StudentInfomation.defaultProps = {
//   studentInfo: {
//     name: 'Mai Nguyen Duc Tho',
//     gender: 'Nữ',
//     placeOfBirth: 'Long An',
//     nation: 'Kinh',
//     cmnd: '123456789',
//     issuanceDate: convertLocalTime(1450017483),
//     issuancePlace: 'Long An',
//     address: 'Long An',
//     imgUrl:
//       'https://img4.thuthuatphanmem.vn/uploads/2020/12/25/avt-chibi-doc_115941237.jpg',
//     studentId: '18520369',
//     birthday: convertLocalTime(1650438993),
//     faculty: 'KTTT',
//     major: 'CNNT',
//     schoolYear: '2018',
//     class: 'CNTT2018',
//     walletAddress: '0xa68a621367346bedb9a0325087856598903c9c70',
//   },
// };

function StudentInfomation(props) {
  const { studentInfo } = props
  const { onChangeAvt, defaultAvt, setDefaultAvt } = useAvata()
  const [gender, setGender] = useState("Nam")

  useEffect(() => {
    setGender(studentInfo.gender)
    setDefaultAvt(studentInfo.imgUrl)
  }, [studentInfo])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const studentInfoForm = {
      imgUrl: defaultAvt,
      name: e.target.name.value.trim(),
      studentId: studentInfo.studentId,
      birthday: convertDateToTimestamp(e.target.birthday.value),
      placeOfBirth: e.target.placeOfBirth.value.trim(),
      gender: e.target.gender.value.trim(),
      nation: e.target.nation.value.trim(),
      cmnd: e.target.cmnd.value.trim(),
      issuancePlace: e.target.issuancePlace.value.trim(),
      issuranceDate: convertDateToTimestamp(e.target.issuranceDate.value),
      address: e.target.address.value.trim(),
      faculty: studentInfo.faculty,
      major: studentInfo.major,
      schoolYear: studentInfo.schoolYear,
      class: studentInfo.class,
      walletAddress: studentInfo.walletAddress,
    }
    console.log(studentInfoForm)
    const hash = await AddDataToIPFS(studentInfoForm)
    console.log(hash)
    await managerPoolContractService.update(studentInfoForm.walletAddress, hash)
  }

  return (
    <div className="studentInformation">
      <div>
        <h2>Thông Tin Sinh Viên</h2>
      </div>
      <div className="body_form mt-3">
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          <div>
            <div className="col col-4 img-avt d-flex flex-column align-items-center">
              <label htmlFor="myImage">
                <img src={defaultAvt} alt="" />
                <p>
                  <FontAwesomeIcon icon={faPenToSquare} />
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
            <div className="d-flex flex-column mb-2 row">
              <div className="d-flex flex-column">
                <label htmlFor="name">
                  Họ và tên <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  name="name"
                  defaultValue={studentInfo.name}
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
                  defaultValue={studentInfo.birthday}
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
                  defaultValue={studentInfo.placeOfBirth}
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
                  defaultValue={studentInfo.nation}
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
                  defaultValue={studentInfo.cmnd}
                />
              </div>
              <div className="d-flex flex-column mb-2 col col-4">
                <label htmlFor="issuranceDate">
                  Ngày cấp <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  name="issuranceDate"
                  defaultValue={
                    studentInfo.issuranceDate != ""
                      ? studentInfo.issuranceDate
                      : "today"
                  }
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
                  defaultValue={studentInfo.issuancePlace}
                />
              </div>
            </div>
            <div className="d-flex flex-column mb-2 row">
              <div className="d-flex flex-column">
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  name="address"
                  defaultValue={studentInfo.address}
                />
              </div>
            </div>
          </div>
          <div className="d-flex flex-row-reverse">
            <button className="submitbtn" type="submit">
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StudentInfomation
