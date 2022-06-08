import React, { useEffect, useState } from "react"
import { Collapse } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { useAppSelector } from "src/app/hooks"
import { selectRole } from "src/components/shared/Header/HeaderSlice"
import { subjectContracService } from "src/contracts/subject-contract.service"
import "./SubjectDetail.scss"

const detailInfo = {
  id: "IE212.M11",
  joined: false,
  contractAddress: "0x4B116B61DDFA9F0642B1EF430dE2CEB33A55915B",
  name: "Công nghệ Dữ liệu lớn",
  status: "Đang mở",
  lecturerName: "Mai Nguyen Duc Tho",
  faculty: "KTTT",
  startTime: "9am - 02.01.2021",
  endTime: "9am - 02.06.2021",
  endTimeToRegister: "9am - 31.01.2021",
  numberOfParticipate: "50",
  totalJoindParticipate: "200",
  totalToken: 100,
  unit: "Đoàn trường",
  description: `Môn học giới thiệu tổng quan về khái niệm, đặc trưng cũng như những thách thức của Big data (Khả năng phân tích, dự đoán nhằm trích xuất một giá trị lớn hơn từ dữ liệu). Giới thiệu một số phương pháp và công cụ phổ biến để khai thác và quản lý Big data (Hadoop, MapReduce và Spark).`,
}

function SubjectDetail() {
  const { subjectId } = useParams()
  const [open, setOpen] = useState(false)
  const role = useAppSelector(selectRole)
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    const getDetail = async (subjectId: number | string) => {
      console.log(subjectId)
      setDetail(detailInfo)
    }

    getDetail(subjectId)
  }, [])

  const handleRegister = async (contractAddress: string) => {
    await subjectContracService.register(contractAddress)
  }

  const handleCancelRegister = async (contractAddress: string) => {
    await subjectContracService.cancelRegister(contractAddress)
  }

  return (
    <div className="mt-5">
      {detail != null && (
        <>
          <div className="detail-info">
            <div className="mb-5">
              <h2>
                {detail.name} - {detail.id}{" "}
                <span className="status status__open">{detail.status}</span>
              </h2>
            </div>
            <div className="d-flex justify-content-around">
              <div>
                <p>
                  <b>Giảng viên: </b> {detail.lecturerName}
                </p>
                <p>
                  <b>Sỉ số: </b> {detail.numberOfParticipate}/{" "}
                  {detail.totalToken}
                </p>
                <p>
                  <b>Khoa quản lý: </b> {detail.faculty}
                </p>
                <p>
                  <b>Token nhận được: </b> {detail.totalToken} coin
                </p>
              </div>
              <div>
                <p>
                  <b>Thời gian diễn ra: </b>
                </p>
                <p>Bắt đầu: {detail.startTime}</p>
                <p>Kết thúc: {detail.endTime}</p>
                <p>
                  <b>Kết thúc đăng ký: </b> {detail.endTimeToRegister}
                </p>
                <p>
                  <b>Kết thúc đánh giá: </b> {detail.endTimeToRegister}
                </p>
              </div>
            </div>
            <div className="d-flex flex-row-reverse">
              {detail.joined ? (
                <button
                  className="join_btn cancel"
                  onClick={() => handleCancelRegister(detail.contractAddress)}
                >
                  Hủy
                </button>
              ) : (
                <button
                  className="join_btn join"
                  onClick={() => handleRegister(detail.contractAddress)}
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
                {detail.description}
              </div>
            </Collapse>
          </div>
        </>
      )}

      {role.role == "LECTURER" && (
        <div className="historyTable mt-5">
          <h2>Bảng đánh giá sinh viên</h2>
          <form>
            <table className="mt-3">
              <tbody>
                <tr className="row">
                  <th className="col col-2 text-center"></th>
                  <th className="col col-3 text-center">Mã số sinh viên</th>
                  <th className="col col-3 text-center">Tên</th>
                  <th className="col col-4 text-center">Trạng thái</th>
                </tr>
                <tr className="row">
                  <td className="col col-2 text-center">
                    <input type="checkbox" name="confirm" id="1" />
                  </td>
                  <td className="col col-3 text-center">18520369</td>
                  <td className="col col-3 text-center">Mai Nguyễn Đức Thọ</td>
                  <td className="col col-4 text-center">
                    <span className="text-success fw-bold">Đã hoàn thành</span>
                  </td>
                </tr>
                <tr className="row">
                  <td className="col col-2 text-center">
                    <input type="checkbox" name="confirm" id="1" />
                  </td>
                  <td className="col col-3 text-center">18520369</td>
                  <td className="col col-3 text-center">Mai Nguyễn Đức Thọ</td>
                  <td className="col col-4 text-center">
                    <span className="text-danger fw-bold">Chưa hoàn thành</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex flex-row-reverse mt-5">
              <button className="completed">Hoàn thành</button>
              <button className="not-completed">Chưa hoàn thành</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default SubjectDetail
