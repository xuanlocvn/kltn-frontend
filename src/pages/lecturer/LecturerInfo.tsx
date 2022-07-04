import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { accessControlContractService } from "src/contracts/access-control.service"
import { ROLE } from "src/utils/enum"
import { getLecturerByAddress } from "src/api/lecturerApi"
import { ILecturerInfo } from "src/utils/window"
import "./LecturerInfo.scss"
import SpinnerApp from "../../components/shared/Spinner/Spinner"
import { ILecturerAmountObject } from "../../utils/window"
import { getLecturerAmountObject } from "../../api/lecturerApi"

function LecturerInfo() {
  const { address } = useParams()
  const navigate = useNavigate()
  const [lecturerInfo, setLecturerInfo] = useState<ILecturerInfo>(null)
  const [objectAmount, setObjectAmount] = useState<ILecturerAmountObject>({
    amountSubject: 0,
    amountMission: 0,
    amountScholarchip: 0,
    amountTuition: 0,
  })

  useEffect(() => {
    const fetchApi = async (walletAddress: string) => {
      let response: any = await getLecturerByAddress(walletAddress)
      let result = response.data.result
      setLecturerInfo(result)
      response = await getLecturerAmountObject(walletAddress)
      result = response.data.result
      setObjectAmount(result)
    }
    address && fetchApi(address)
  }, [address])

  useEffect(() => {
    const getRole = async () => {
      return await accessControlContractService.getRole(address)
    }
    address == "undefined" && navigate("/sign-in")
    getRole().then((role) => {
      role == ROLE.ADMIN && navigate(`/admin/${address}`)
      role == ROLE.STUDENT && navigate(`/student/${address}`)
    })
  }, [address])

  return (
    <div className="d-flex justify-content-evenly align-items-center lecturerInfo">
      {lecturerInfo == null ? (
        <SpinnerApp />
      ) : (
        <>
          <div>
            <img
              src={
                lecturerInfo.lecturerImg ||
                "https://img4.thuthuatphanmem.vn/uploads/2020/12/25/avt-chibi-doc_115941237.jpg"
              }
              alt=""
              width={500}
              style={{ borderRadius: "100%" }}
            />
          </div>
          <div>
            <div>
              <h2>Thông tin giảng viên</h2>
              <p>
                <b>Họ và tên: </b>
                {lecturerInfo.lecturerName}
              </p>
              <p>
                <b>Mã giảng viên: </b>
                {lecturerInfo.lecturerId}
              </p>
              <p>
                <b>Ngày sinh: </b> {lecturerInfo.dateOfBirth}
              </p>
              <p>
                <b>Địa chỉ ví: </b> {lecturerInfo.lecturerAddress}
              </p>
              <p>
                <b>Trực thuộc khoa: </b> {lecturerInfo.departmentName}
              </p>
            </div>
            <div
              className="d-flex flex-wrap"
              style={{
                border: "0.1px solid rgba(0,0,0,0.2)",
                padding: "7px",
                borderRadius: "20px",
              }}
            >
              <Link
                to={`/missions?lecturerAddress=${address}`}
                className="stats d-flex flex-column align-items-center p-3 bg-primary col col-6 text-light"
              >
                <h1>{objectAmount.amountMission}</h1>
                <p>Nhiệm vụ</p>
              </Link>
              <Link
                to={`/subjects?lecturerAddress=${address}`}
                className="stats d-flex flex-column align-items-center p-3 bg-secondary col col-6 text-light"
              >
                <h1>{objectAmount.amountSubject}</h1>
                <p>Môn học</p>
              </Link>
              <Link
                to={`/tuitions?lecturerAddress=${address}`}
                className="stats d-flex flex-column align-items-center p-3 bg-success col col-6 text-light"
              >
                <h1>{objectAmount.amountTuition}</h1>
                <p>Học phí</p>
              </Link>
              <Link
                to={`/scholarships?lecturerAddress=${address}`}
                className="stats d-flex flex-column align-items-center p-3 bg-warning col col-6 text-light"
              >
                <h1>{objectAmount.amountScholarchip}</h1>
                <p>Học bổng</p>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default LecturerInfo
