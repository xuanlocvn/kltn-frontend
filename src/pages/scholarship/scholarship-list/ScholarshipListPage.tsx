import React, { useEffect } from "react"
import Pagination from "src/components/shared/Pagination/Pagination"
import { Link } from "react-router-dom"
import useList from "src/hooks/useList"
import "./ScholarshipListPage.scss"
import { IScholarshipInstance } from "../../../utils/window"
import { CustomWindow } from "src/utils/window"
import { getScholarshipList } from "../../../api/scholarshipApi"

declare let window: CustomWindow

function ScholarshipListPage() {
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
  } = useList<IScholarshipInstance>()

  useEffect(() => {
    const fetchScholarshiptList = async (walletAddress: string) => {
      const response = await getScholarshipList(walletAddress)
      const result: IScholarshipInstance[] = response.data.result
      setTotalList(result)
    }
    window.localStorage.account &&
      fetchScholarshiptList(window.localStorage.account)
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
          {renderList.map((scholarship, index) => (
            <div
              key={index}
              className="mission_element col-4"
              onClick={() => console.log("Hello")}
              style={{ height: "164px" }}
            >
              <Link to={"/scholarships/" + scholarship.scholarshipAddress}>
                <h5>
                  <strong>{scholarship.scholarshipName}</strong>
                </h5>
                <p>
                  <b>Số lượng:</b> {scholarship.joinedStudentAmount}
                </p>
                <p className="element_status">
                  {scholarship.scholarshipStatus}
                </p>
              </Link>
              {/*{scholarship.isJoined ? (
                <button className="join_btn cancel">Hủy</button>
              ) : (
                <button className="join_btn join">Đăng ký</button>
              )}*/}
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

export default ScholarshipListPage
