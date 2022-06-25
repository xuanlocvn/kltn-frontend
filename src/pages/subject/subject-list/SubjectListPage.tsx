import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Pagination from "src/components/shared/Pagination/Pagination"
import { subjectContracService } from "src/contracts/subject-contract.service"
import useList from "src/hooks/useList"
import {
  getSubjectList,
  getSubjectListByLecturer,
} from "../../../api/subjectApi"
import { ISubjectInstance } from "../../../utils/window"
import "./SubjectListPage.scss"
import { CustomWindow } from "src/utils/window"
import img from "src/assets/images/Subject.png"
import { useAppSelector } from "src/app/hooks"
import { selectRole } from "src/components/shared/Header/HeaderSlice"
import useNow from "../../../hooks/useNow"
import Countdown from "../../../components/countdown/CountDown"
import { managerPoolContractService } from "src/contracts/manager-pool.service"

declare let window: CustomWindow

function SubjectListPage() {
  const {
    searchParams,
    setSearchParams,
    page,
    setPage,
    totalPage,
    filter,
    setFilter,
    renderList,
    setTotalList,
  } = useList<ISubjectInstance>()
  const role = useAppSelector(selectRole)
  const { now } = useNow()

  useEffect(() => {
    const fetchSubjectList = async (walletAddress: string) => {
      let response
      switch (role.role) {
        case "LECTURER":
          response = await await getSubjectListByLecturer(walletAddress)
          break
        case "STUDENT":
          response = await getSubjectList(walletAddress)
          break
        default:
          response = await getSubjectList()
      }
      const result: ISubjectInstance[] = response.data.result
      setTotalList(result)
    }
    window.localStorage.account && fetchSubjectList(window.localStorage.account)
  }, [role])

  const onPaginate = (page: number) => {
    const filter = searchParams.get("filter")
      ? searchParams.get("filter")
      : "all"
    if (page > totalPage) page = totalPage
    const params = { filter, page: page.toString() }
    setSearchParams(params)
    setPage(page)
  }

  const onFilter = (filter: string) => {
    const page = searchParams.get("page") ? searchParams.get("page") : "1"
    setSearchParams({ filter, page })
    setFilter(filter)
  }

  const handleRegister = async (contractAddress: string) => {
    await subjectContracService.register(contractAddress)
  }

  const handleCancelRegister = async (contractAddress: string) => {
    await subjectContracService.cancelRegister(contractAddress)
  }

  const handleLock = async (address?: string) => {
    await managerPoolContractService.lockSubject([address])
  }

  return (
    <div className="list mt-5">
      <div className="mb-3">
        <h2>Danh Sách Môn Học</h2>
      </div>
      <div className="list_filter">
        <button
          className={`filter_btn ${filter == "all" ? "active" : ""}`}
          onClick={() => onFilter("all")}
        >
          Tất cả
        </button>
        <button
          className={`filter_btn ${filter == "joined" ? "active" : ""}`}
          onClick={() => onFilter("joined")}
        >
          Đã tham gia
        </button>
        <button
          className={`filter_btn ${filter == "notjoin" ? "active" : ""}`}
          onClick={() => onFilter("notjoin")}
        >
          Chưa tham gia
        </button>
      </div>
      <div style={{ minHeight: "450px" }}>
        <div className="mission mt-4 d-flex flex-wrap">
          {renderList.map((subject, index) => (
            <div
              key={index}
              className="mission_element col-4"
              style={{ height: "200px", padding: "0px" }}
            >
              <Link to={"/subjects/" + subject.subjectAddress}>
                <div className="img">
                  <img src={img} alt="mission" />
                </div>
                <div
                  style={{
                    position: "relative",
                    top: "-80px",
                    height: "5px",
                  }}
                >
                  {now <= subject.endTimeToResigter && (
                    <>
                      <Countdown
                        timestamp={subject.endTimeToResigter}
                        size={1}
                        title="Thời gian còn lại để đăng ký..."
                      />
                    </>
                  )}
                  {subject.endTimeToResigter < now && now <= subject.endTime && (
                    <>
                      <Countdown
                        timestamp={subject.endTime}
                        size={1}
                        title="Nhiệm vụ đang diễn ra..."
                      />
                    </>
                  )}
                  {subject.endTime < now && now <= subject.endTimeToComFirm && (
                    <>
                      <Countdown
                        timestamp={subject.endTimeToComFirm}
                        size={1}
                        title="Nhiệm vụ đã kết thúc và đang chờ xác nhận..."
                      />
                    </>
                  )}
                  {now > subject.endTimeToComFirm && (
                    <>
                      <Countdown
                        timestamp={subject.endTimeToComFirm}
                        size={1}
                        title="Kết thúc"
                      />
                    </>
                  )}
                </div>
                <div className="p-3">
                  <h5>
                    <strong>{subject.subjectName}</strong>
                  </h5>
                  <p>
                    <b>Số lượng:</b> {subject.joinedStudentAmount}/
                    {subject.maxStudentAmount}
                  </p>
                  <p className="element_status">{subject.subjectStatus}</p>
                </div>
              </Link>
              {subject.isJoined
                ? role.role == "STUDENT" && (
                    <button
                      className={
                        subject.subjectStatus != "Closed" &&
                        now <= subject.endTimeToResigter
                          ? "join_btn cancel"
                          : "join_btn cancel btn-disabled"
                      }
                      onClick={() =>
                        subject.subjectStatus != "Closed" &&
                        now <= subject.endTimeToResigter &&
                        handleCancelRegister(subject.subjectAddress)
                      }
                    >
                      Hủy
                    </button>
                  )
                : role.role == "STUDENT" && (
                    <button
                      className={
                        subject.subjectStatus != "Closed" &&
                        now <= subject.endTimeToResigter
                          ? "join_btn join"
                          : "join_btn join btn-disabled"
                      }
                      onClick={() =>
                        subject.subjectStatus != "Closed" &&
                        now <= subject.endTimeToResigter &&
                        handleRegister(subject.subjectAddress)
                      }
                    >
                      Tham gia
                    </button>
                  )}

              {role.role == "ADMIN" && (
                <button
                  className={
                    subject.subjectStatus != "Closed"
                      ? "join_btn join"
                      : "join_btn join btn-disabled"
                  }
                  onClick={() =>
                    subject.subjectStatus != "Closed" &&
                    handleLock(subject.subjectAddress)
                  }
                >
                  Khoá
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Pagination
        currentPage={page}
        totalPage={totalPage}
        onPaginate={onPaginate}
      />
    </div>
  )
}

export default SubjectListPage
