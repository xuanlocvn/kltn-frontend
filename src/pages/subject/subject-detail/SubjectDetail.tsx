import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSubjectDetail } from "src/api/subjectApi"
import { useAppSelector } from "src/app/hooks"
import { selectRole } from "src/components/shared/Header/HeaderSlice"
import { subjectContracService } from "src/contracts/subject-contract.service"
import useCheckbox from "src/hooks/useCheckbox"
import { CustomWindow, ISubjectDetail } from "src/utils/window"
import "./SubjectDetail.scss"
import { CSVLink } from "react-csv"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import useNow from "../../../hooks/useNow"
import Countdown from "../../../components/countdown/CountDown"
import TimeLine from "../../../components/timeline/TimeLine"
import { managerPoolContractService } from "src/contracts/manager-pool.service"

declare let window: CustomWindow

const headers = [
  { label: "Mã số sinh viên", key: "id" },
  { label: "Họ và tên", key: "name" },
  { label: "Địa chỉ ví", key: "walletAddress" },
  { label: "Trạng thái", key: "status" },
]

function SubjectDetail() {
  const { subjectId } = useParams()
  const [open, setOpen] = useState(false)
  const role = useAppSelector(selectRole)
  const [detail, setDetail] = useState<ISubjectDetail>(null)
  const { selectList, handleChange } = useCheckbox()
  const [data, setData] = useState([{}])
  const { now } = useNow()

  useEffect(() => {
    const getDetail = async (subjectId: string) => {
      const response = await getSubjectDetail(
        subjectId,
        window.localStorage.account,
      )
      setDetail(response.data.result)
    }
    getDetail(subjectId)
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
    await subjectContracService.register(contractAddress)
  }

  const handleCancelRegister = async (contractAddress: string) => {
    await subjectContracService.cancelRegister(contractAddress)
  }

  const handleConfirmCompletedAddress = async (e) => {
    e.preventDefault()
    console.log(selectList)
    await subjectContracService.confirmCompletedAddress(subjectId, selectList)
  }
  const handleUnconfirmCompletedAddress = async (e) => {
    e.preventDefault()
    console.log(selectList)
    await subjectContracService.unConfirmCompletedAddress(subjectId, selectList)
  }

  const handleLock = async (address?: string) => {
    await managerPoolContractService.lockSubject([address])
  }

  return (
    <div className="mt-5">
      {detail != null && (
        <>
          <div
            className="detail-info"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          >
            <div className="banner-subject"></div>
            <div className="d-flex">
              <div className="col col-6">
                <TimeLine
                  startTime={detail.startTime}
                  endTimeToRegister={detail.endTimeToResigter || 0}
                  endTime={detail.endTime}
                  endTimeToConfirm={detail.endTimeToComFirm || 0}
                />
                <div
                  style={{
                    position: "relative",
                    top: "-80px",
                    height: "5px",
                  }}
                >
                  {now <= detail.endTimeToResigter && (
                    <>
                      <Countdown
                        timestamp={detail.endTimeToResigter}
                        size={2}
                        title="Thời gian còn lại để đăng ký..."
                      />
                    </>
                  )}
                  {detail.endTimeToResigter < now && now <= detail.endTime && (
                    <>
                      <Countdown
                        timestamp={detail.endTime}
                        size={2}
                        title="Nhiệm vụ đang diễn ra..."
                      />
                    </>
                  )}
                  {detail.endTime < now && now <= detail.endTimeToComFirm && (
                    <>
                      <Countdown
                        timestamp={detail.endTimeToComFirm}
                        size={2}
                        title="Nhiệm vụ đã kết thúc và đang chờ xác nhận..."
                      />
                    </>
                  )}
                  {now > detail.endTimeToComFirm && (
                    <>
                      <Countdown
                        timestamp={detail.endTimeToComFirm}
                        size={2}
                        title="Kết thúc"
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="col col-6">
                <h2 className="mb-5">
                  {detail.subjectName} - {detail.subjectId}{" "}
                </h2>
                <div>
                  <p>
                    <b>Giảng viên: </b> {detail.lecturerName}
                  </p>
                  <p>
                    <b>Sỉ số: </b> {detail.joinedStudentAmount}/{" "}
                    {detail.maxStudentAmount}
                  </p>
                  <p>
                    <b>Khoa quản lý: </b> {detail.departmentName}
                  </p>
                  {detail.isJoined
                    ? role.role == "STUDENT" && (
                        <button
                          className={
                            detail.subjectStatus != "Closed"
                              ? "join_btn cancel"
                              : "join_btn cancel btn-disabled"
                          }
                          onClick={() =>
                            detail.subjectStatus != "Closed" &&
                            handleCancelRegister(detail.subjectAddress)
                          }
                        >
                          Hủy
                        </button>
                      )
                    : role.role == "STUDENT" && (
                        <button
                          className={
                            detail.subjectStatus != "Closed"
                              ? "join_btn join"
                              : "join_btn join btn-disabled"
                          }
                          onClick={() =>
                            detail.subjectStatus != "Closed" &&
                            handleRegister(detail.subjectAddress)
                          }
                        >
                          Tham gia
                        </button>
                      )}
                  {role.role == "ADMIN" && (
                    <button
                      className={
                        detail.subjectStatus != "Closed"
                          ? "join_btn join"
                          : "join_btn join btn-disabled"
                      }
                      onClick={() =>
                        detail.subjectStatus != "Closed" &&
                        handleLock(subjectId)
                      }
                    >
                      Khoá
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className="mt-5 detail-description pb-5"
            onClick={() => setOpen(!open)}
            style={
              open == false
                ? { height: "300px", overflow: "hidden", fontSize: "20px" }
                : { height: "auto", fontSize: "20px" }
            }
          >
            <h2>Mô tả</h2>
            <div
              style={
                open == false
                  ? { height: "200px", overflow: "hidden" }
                  : { height: "auto" }
              }
              dangerouslySetInnerHTML={{
                __html: detail.subjectDescription,
              }}
            ></div>
            {!open && (
              <div
                onClick={() => setOpen(!open)}
                style={{
                  position: "relative",
                  top: "-250px",
                  height: "250px",
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))",
                }}
              >
                <p
                  className="text-center"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: "45%",
                  }}
                >
                  Nhấn để mở rộng
                </p>
              </div>
            )}
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
                    <p className="text-center p-5">
                      <i>Danh sách trống</i>
                    </p>
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

export default SubjectDetail
