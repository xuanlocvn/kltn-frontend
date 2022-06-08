import React, { useEffect } from "react"
import Pagination from "src/components/shared/Pagination/Pagination"
import { Link } from "react-router-dom"
import useList from "src/hooks/useList"
import "./TuitionListPage.scss"
// import { tuitionContracService } from 'src/contracts/tuition-contract.service';
import { CustomWindow } from "src/utils/window"
import { ITuitionInstance } from "../../../utils/window"
import { getTuitiontList } from "../../../api/tuitionApi"

declare let window: CustomWindow

function TuitionListPage() {
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
  } = useList<ITuitionInstance>()

  useEffect(() => {
    const fetchTuitionList = async (walletAddress: string) => {
      const response = await getTuitiontList(walletAddress)
      const result: ITuitionInstance[] = response.data.result
      setTotalList(result)
    }
    window.localStorage.account && fetchTuitionList(window.localStorage.account)
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

  // const paymentByToken = async (contractAddress: string) => {
  //   await tuitionContracService.paymentByToken(contractAddress);
  // };

  // const paymen = async (contractAddress: string) => {
  //   await tuitionContracService.paymentByToken(contractAddress);
  // };

  return (
    <div className="list mt-5">
      <div className="mb-3">
        <h2>Danh Sách Học Bổng</h2>
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
          {renderList.map((tuition, index) => (
            <div
              key={index}
              className="mission_element col-4"
              onClick={() => console.log("Hello")}
              style={{ height: "164px" }}
            >
              <Link to={"/tuitions/" + tuition.tuitionAddress}>
                <h5>
                  <strong>{tuition.tuitionName}</strong>
                </h5>
                <p>
                  <b>Số lượng:</b> {tuition.joinedStudentAmount}
                </p>
                <p className="element_status">{tuition.tuitionStatus}</p>
              </Link>
              {tuition.isCompleted ? (
                <button className="join_btn cancel" onClick={() => ""}>
                  Đã đóng
                </button>
              ) : (
                <button className="join_btn join" onClick={() => ""}>
                  Đóng
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

export default TuitionListPage
