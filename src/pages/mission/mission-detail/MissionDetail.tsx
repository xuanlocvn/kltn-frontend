import React, { useEffect, useState } from "react"
import { Collapse } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { useAppSelector } from "src/app/hooks"
import { selectRole } from "src/components/shared/Header/HeaderSlice"
import { missionContractService } from "src/contracts/mission-contract.service"
import { getMissionDetail } from "src/api/missionApi"
import "./MissionDetail.scss"
import { CustomWindow, IMissionDetail } from "src/utils/window"
import { convertLocalTime } from "src/utils"
import useCheckbox from "src/hooks/useCheckbox"
import { CSVLink } from "react-csv"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"

declare let window: CustomWindow

const headers = [
  { label: "Mã số sinh viên", key: "id" },
  { label: "Họ và tên", key: "name" },
  { label: "Địa chỉ ví", key: "walletAddress" },
  { label: "Trạng thái", key: "status" },
]

function MissionDetail() {
  const { missionId } = useParams()
  const [open, setOpen] = useState(false)
  const role = useAppSelector(selectRole)
  const [detail, setDetail] = useState<IMissionDetail>(null)
  const { selectList, handleChange } = useCheckbox()
  const [data, setData] = useState([{}])

  useEffect(() => {
    const getDetail = async (missionAddress: string) => {
      const response = await getMissionDetail(
        missionAddress,
        window.localStorage.account,
      )
      setDetail(response.data.result)
    }
    getDetail(missionId)
  }, [])

  useEffect(() => {
    const drawData = []
    detail &&
      detail.joinedStudentList.forEach((student) => {
        drawData.push({
          id: student.studentId,
          name: student.studentName,
          walletAddress: student.studentAddress,
          status: student.isCompleted ? "Đã hoàn thành" : "Chưa hoàn thành",
        })
      })
    drawData.length > 0 && setData(drawData)
  }, [detail])

  const handleRegister = async (contractAddress: string) => {
    await missionContractService.register(contractAddress)
  }

  const handleCancelRegister = async (contractAddress: string) => {
    await missionContractService.cancelRegister(contractAddress)
  }

  const handleConfirmCompletedAddress = async (e) => {
    e.preventDefault()
    console.log(selectList)
    await missionContractService.confirmCompletedAddress(missionId, selectList)
  }
  const handleUnconfirmCompletedAddress = async (e) => {
    e.preventDefault()
    console.log(selectList)
    await missionContractService.unConfirmCompletedAddress(
      missionId,
      selectList,
    )
  }

  return (
    <div className="mt-5">
      {detail != null && (
        <>
          <div className="detail-info">
            <div className="d-flex justify-content-between">
              <h2>{detail.missionName}</h2>
              <div>
                <p>
                  <span className="status status__open">
                    {detail.missionStatus}
                  </span>
                </p>
                <p>
                  <b>Mã nhiệm vụ: </b> {detail.missionId}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-around">
              <div>
                <p>
                  <b>Thời gian diễn ra: </b>
                </p>
                <p>Bắt đầu: {convertLocalTime(detail.startTime)}</p>
                <p>Kết thúc: {convertLocalTime(detail.endTime)}</p>
                <p>
                  <b>Kết thúc đăng ký: </b>{" "}
                  {convertLocalTime(detail.endTimeToResigter)}
                </p>
              </div>
              <div>
                <p>
                  <b>Số lượng tham gia: </b> {detail.joinedStudentAmount}/
                  {detail.maxStudentAmount}
                </p>
                <p>
                  <b>Đối tượng: </b> Sinh viên toàn trường
                </p>
                <p>
                  <b>Token nhận được: </b> {detail.tokenAmount} coin
                </p>
                <p>
                  <b>Đơn vị tổ chức: </b> {detail.departmentName}
                </p>
              </div>
            </div>
            <div className="d-flex flex-row-reverse">
              {detail.isJoined ? (
                <button
                  className={
                    detail.missionStatus != "Closed"
                      ? "join_btn cancel"
                      : "join_btn cancel btn-disabled"
                  }
                  onClick={() =>
                    detail.missionStatus != "Closed" &&
                    handleCancelRegister(missionId)
                  }
                >
                  Hủy
                </button>
              ) : (
                <button
                  className={
                    detail.missionStatus != "Closed"
                      ? "join_btn join"
                      : "join_btn join btn-disabled"
                  }
                  onClick={() =>
                    detail.missionStatus != "Closed" &&
                    handleRegister(missionId)
                  }
                >
                  Tham gia
                </button>
              )}
            </div>
          </div>
          <div
            className="detail-description mt-5"
            onClick={() => setOpen(!open)}
          >
            <h3>Mô tả</h3>
            <Collapse in={open}>
              <div id="example-collapse-text" style={{ fontSize: "20px" }}>
                {detail.missionDescription}
              </div>
            </Collapse>
          </div>

          {role.role && (
            <div className="historyTable mt-5">
              <div className="d-flex justify-content-between align-items-end">
                <h2>Bảng đánh giá sinh viên</h2>
                <CSVLink
                  data={data}
                  headers={headers}
                  filename={"Danh_sach_sinh_vien.csv"}
                >
                  Tải xuống danh sách <FontAwesomeIcon icon={faDownload} />
                </CSVLink>
              </div>
              <table className="mt-3">
                <tbody>
                  <tr className="row">
                    <th className="col col-2 text-center"></th>
                    <th className="col col-3 text-center">Mã số sinh viên</th>
                    <th className="col col-3 text-center">Tên</th>
                    <th className="col col-4 text-center">Trạng thái</th>
                  </tr>
                  {detail &&
                  detail.joinedStudentList &&
                  detail.joinedStudentList.length == 0 ? (
                    <i>Danh sách trống</i>
                  ) : (
                    detail.joinedStudentList.map((student, index) => (
                      <tr key={index} className="row">
                        <td className="col col-2 text-center">
                          {role.role == "LECTURER" ? (
                            <input
                              type="checkbox"
                              name="confirm"
                              id={student.studentAddress}
                              value={student.studentAddress}
                              onChange={handleChange}
                            />
                          ) : (
                            index + 1
                          )}
                        </td>
                        <td className="col col-3 text-center">
                          {student.studentId}
                        </td>
                        <td className="col col-3 text-center">
                          {student.studentName}
                        </td>
                        <td className="col col-4 text-center">
                          {student.isCompleted ? (
                            <span className="text-success fw-bold">
                              Đã hoàn thành
                            </span>
                          ) : (
                            <span className="text-danger fw-bold">
                              Chưa hoàn thành
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {role.role == "LECTURER" && (
                <div className="d-flex flex-row-reverse mt-5">
                  <button
                    className={
                      detail.endTimeToComFirm < Date.now() / 1000
                        ? "completed btn-disabled"
                        : "completed"
                    }
                    onClick={() =>
                      detail.endTimeToComFirm > Date.now() / 1000 &&
                      handleConfirmCompletedAddress
                    }
                  >
                    Hoàn thành
                  </button>
                  <button
                    className={
                      detail.endTimeToComFirm < Date.now() / 1000
                        ? "not-completed btn-disabled"
                        : "not-completed"
                    }
                    onClick={() =>
                      detail.endTimeToComFirm > Date.now() / 1000 &&
                      handleUnconfirmCompletedAddress
                    }
                  >
                    Chưa hoàn thành
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default MissionDetail
