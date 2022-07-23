/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "src/app/hooks"
import { selectRole } from "src/components/shared/Header/HeaderSlice"
import { tuitionContracService } from "src/contracts/tuition-contract.service"
import { getTuitionDetail } from "src/api/tuitionApi"
import "./TuitionDetail.scss"
import { CustomWindow, ITuitionDetail } from "src/utils/window"
import { CSVLink } from "react-csv"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload, faXmark } from "@fortawesome/free-solid-svg-icons"
import useNow from "src/hooks/useNow"
import TimeLine from "src/components/timeline/TimeLine"
import Countdown from "src/components/countdown/CountDown"
import useCheckbox from "src/hooks/useCheckbox"
import Paypal from "src/components/paypal/PaypalComponent"
import { managerPoolContractService } from "src/contracts/manager-pool.service"
import LoadCSV from "src/components/csv/LoadCSV"
import { erc20ContractService } from "src/contracts/erc20.service"
import { configService } from "src/configs/config.service"
import { CONFIG } from "src/configs/config.enum"
import useAvata from "src/hooks/useAvata"

declare let window: CustomWindow

const headers = [
  { label: "Mã số sinh viên", key: "id" },
  { label: "Họ và tên", key: "name" },
  { label: "Địa chỉ ví", key: "walletAddress" },
  { label: "Trạng thái", key: "status" },
]

function TuitionDetail() {
  const { tuitionId } = useParams()
  const [open, setOpen] = useState(false)
  const role = useAppSelector(selectRole)
  const [detail, setDetail] = useState<ITuitionDetail>(null)
  const { selectList, handleChange } = useCheckbox()
  const [data, setData] = useState([{}])
  const { now } = useNow()
  const [checkout, setCheckOut] = useState(false)
  const [studentList, SetStudentList] = useState([])
  const { defaultAvt } = useAvata()

  useEffect(() => {
    const getDetail = async (tuitionAddress: string) => {
      const response = await getTuitionDetail(
        tuitionAddress,
        window.localStorage.account,
      )
      setDetail(response.data.result)
    }
    getDetail(tuitionId)
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

  useEffect(() => {
    SetStudentList(selectList)
    console.log(selectList)
  }, [selectList])

  const onLoadCSV = (list: string[]) => {
    SetStudentList(list)
  }

  const paymentByToken = async (contractAddress: string) => {
    const allowance = await erc20ContractService.getAllowance(
      configService.getConfig(CONFIG.UIT_TOKEN_ADDRESS),
      contractAddress,
    )
    if (Number(allowance) == 0)
      await erc20ContractService.approve(
        configService.getConfig(CONFIG.UIT_TOKEN_ADDRESS),
        contractAddress,
        1000000000000000,
      )
    await tuitionContracService.paymentByToken(contractAddress)
  }

  const paymentByCurrency = async (contractAddress: string) => {
    await tuitionContracService.paymentByCurrency(
      contractAddress,
      window.localStorage.account,
    )
  }

  const handleConfirmCompletedAddress = async () => {
    console.log(selectList)
    await tuitionContracService.addStudentToTuition(tuitionId, studentList)
  }
  const handleUnconfirmCompletedAddress = async () => {
    console.log(selectList)
    await tuitionContracService.removeStudentFromTuition(tuitionId, studentList)
  }

  const handleLock = async (address?: string) => {
    await managerPoolContractService.lockTuition([address])
  }

  return (
    <div className="mt-5">
      {detail != null && (
        <>
          {checkout && (
            <div className="payment_container">
              <div className="payment">
                <div
                  className="payment__close"
                  onClick={() => setCheckOut(false)}
                >
                  <FontAwesomeIcon icon={faXmark} size={"2x"} />
                </div>
                <button
                  className="btn-payment"
                  onClick={() => paymentByToken(detail.tuitionAddress)}
                >
                  Thanh toán bằng token qua{" "}
                  <span>
                    <b>Metamask</b>
                  </span>
                </button>
                <Paypal
                  value={detail.currencyAmount.toString()}
                  message={`Sinh vien ${window.localStorage.account} ${detail.tuitionName}`}
                  callback={() => paymentByCurrency(detail.tuitionAddress)}
                />
              </div>
            </div>
          )}
          <div
            className="detail-info"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
          >
            <div
              className="banner-tuition"
              style={
                detail.imgURL != defaultAvt
                  ? {
                      backgroundImage: `url(${detail.imgURL})`,
                    }
                  : { display: "block" }
              }
            ></div>
            <div className="d-flex">
              <div className="col col-6">
                <TimeLine
                  startTime={detail.startTime}
                  endTimeToRegister={0}
                  endTime={detail.endTime}
                  endTimeToConfirm={0}
                />
                <div
                  style={{
                    position: "relative",
                    top: "-80px",
                    height: "5px",
                  }}
                >
                  {now <= detail.startTime && (
                    <>
                      <Countdown
                        timestamp={detail.startTime}
                        size={2}
                        title="Vui lòng chờ đến khi học phí sẵn sàng..."
                      />
                    </>
                  )}
                  {detail.startTime < now && now <= detail.endTime && (
                    <>
                      <Countdown
                        timestamp={detail.endTime}
                        size={2}
                        title="Vui lòng thanh toán học phí trong thời gian này"
                      />
                    </>
                  )}
                  {now > detail.endTime && (
                    <>
                      <Countdown
                        timestamp={detail.endTime}
                        size={2}
                        title="Đã kết thúc"
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="col col-6 object-info">
                <div>
                  <h2>
                    {detail.tuitionName} - {detail.tuitionId}
                  </h2>
                </div>
                <div className="">
                  <p>
                    <b>Giảng viên phụ trách: </b> {detail.lecturerName}
                  </p>
                  <p>
                    <b>Số lượng: </b> {detail.joinedStudentAmount}
                  </p>
                  <p>
                    <b>Đối tượng: </b> Sinh viên có trong danh sách
                  </p>
                  <p>
                    <b>Token phải đóng: </b> {detail.tokenAmount} coin
                  </p>
                  <p>
                    <b>Hoặc số tiền phải đóng: </b> {detail.currencyAmount} USD
                  </p>

                  {detail.isCompleted ? (
                    role.role == "STUDENT" && (
                      <button className="join_btn cancel btn-disabled">
                        Đã đóng
                      </button>
                    )
                  ) : role.role == "STUDENT" && now <= detail.endTime ? (
                    <>
                      <button
                        className="join_btn join"
                        onClick={() => setCheckOut(true)}
                      >
                        Đóng
                      </button>
                    </>
                  ) : (
                    <button className="join_btn cancel btn-disabled">
                      Đóng
                    </button>
                  )}

                  {role.role == "ADMIN" && (
                    <button
                      className={
                        detail.tuitionStatus != "Closed"
                          ? "join_btn join"
                          : "join_btn join btn-disabled"
                      }
                      onClick={() =>
                        detail.tuitionStatus != "Closed" &&
                        handleLock(detail.tuitionAddress)
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
              className="description"
              style={
                open == false
                  ? { height: "200px", overflow: "hidden" }
                  : { height: "auto" }
              }
              dangerouslySetInnerHTML={{
                __html: detail.tuitionDescription,
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
                <>
                  <div className="mt-5">
                    <LoadCSV onLoadCSV={onLoadCSV} />
                  </div>
                  <div className="d-flex flex-row-reverse mt-5">
                    <button
                      className={
                        detail.endTime < Date.now() / 1000
                          ? "completed btn-disabled"
                          : "completed"
                      }
                      onClick={() =>
                        detail.endTime > Date.now() / 1000 &&
                        handleConfirmCompletedAddress()
                      }
                    >
                      Thêm
                    </button>
                    <button
                      className={
                        detail.endTime < Date.now() / 1000
                          ? "not-completed btn-disabled"
                          : "not-completed"
                      }
                      onClick={() =>
                        detail.endTime > Date.now() / 1000 &&
                        handleUnconfirmCompletedAddress()
                      }
                    >
                      Xóa
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default TuitionDetail
