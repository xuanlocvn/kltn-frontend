import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Pagination from "src/components/shared/Pagination/Pagination"
import { subjectContracService } from "src/contracts/subject-contract.service"
import useList from "src/hooks/useList"
import { getSubjectList } from "../../../api/subjectApi"
import { ISubjectInstance } from "../../../utils/window"
import "./SubjectListPage.scss"
import { CustomWindow } from "src/utils/window"

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

  useEffect(() => {
    const fetchSubjectList = async (walletAddress: string) => {
      const response = await getSubjectList(walletAddress)
      const result: ISubjectInstance[] = response.data.result
      setTotalList(result)
    }
    window.localStorage.account && fetchSubjectList(window.localStorage.account)
  }, [])

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
      <div style={{ height: "552px" }}>
        <div className="mission mt-4 d-flex flex-wrap">
          {renderList.map((subject, index) => (
            <div
              key={index}
              className="mission_element col-4"
              onClick={() => console.log("Hello")}
              style={{ height: "164px" }}
            >
              <Link to={"/subjects/" + subject.subjectAddress}>
                <h5>
                  <strong>{subject.subjectName}</strong>
                </h5>
                <p>
                  <b>Số lượng:</b> {subject.joinedStudentAmount}/
                  {subject.maxStudentAmount}
                </p>
                <p className="element_status">{subject.subjectStatus}</p>
              </Link>
              {subject.isJoined ? (
                <button
                  className={
                    subject.subjectStatus != "Closed"
                      ? "join_btn cancel"
                      : "join_btn cancel btn-disabled"
                  }
                  onClick={() =>
                    subject.subjectStatus != "Closed" &&
                    handleCancelRegister(subject.subjectAddress)
                  }
                  disabled
                >
                  Hủy
                </button>
              ) : (
                <button
                  className={
                    subject.subjectStatus != "Closed"
                      ? "join_btn join"
                      : "join_btn join btn-disabled"
                  }
                  onClick={() =>
                    subject.subjectStatus != "Closed" &&
                    handleRegister(subject.subjectAddress)
                  }
                >
                  Tham gia
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
