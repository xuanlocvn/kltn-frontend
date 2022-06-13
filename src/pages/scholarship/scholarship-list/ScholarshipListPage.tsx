import React, { useEffect } from "react"
import Pagination from "src/components/shared/Pagination/Pagination"
import { Link } from "react-router-dom"
import useList from "src/hooks/useList"
import "./ScholarshipListPage.scss"
import { IScholarshipInstance } from "../../../utils/window"
import { CustomWindow } from "src/utils/window"
import {
  getScholarshipList,
  getScholarshipListByLecturer,
} from "../../../api/scholarshipApi"
import img from "src/assets/images/Scholarship.png"
import { selectRole } from "../../../components/shared/Header/HeaderSlice"
import { useAppSelector } from "src/app/hooks"
import useNow from "../../../hooks/useNow"
import Countdown from "../../../components/countdown/CountDown"
import { scholarshipContractService } from "src/contracts/scholarship-contract.service"
import { managerPoolContractService } from "src/contracts/manager-pool.service"

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
  const role = useAppSelector(selectRole)
  const { now } = useNow()

  useEffect(() => {
    const fetchScholarshiptList = async (walletAddress: string) => {
      let response
      switch (role.role) {
        case "LECTURER":
          response = await await getScholarshipListByLecturer(walletAddress)
          break
        case "STUDENT":
          response = await getScholarshipList(walletAddress)
          break
        default:
          response = await getScholarshipList()
      }
      const result: IScholarshipInstance[] = response.data.result
      setTotalList(result)
    }
    window.localStorage.account &&
      fetchScholarshiptList(window.localStorage.account)
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
    await scholarshipContractService.register(contractAddress)
  }

  const handleCancelRegister = async (contractAddress: string) => {
    await scholarshipContractService.cancelRegister(contractAddress)
  }

  const handleLock = async (address?: string) => {
    await managerPoolContractService.lockScholarship([address])
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
          {renderList &&
            renderList.map((scholarship, index) => (
              <div
                key={index}
                className="mission_element col-4"
                style={{ height: "200px" }}
              >
                <Link to={"/scholarships/" + scholarship.scholarshipAddress}>
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
                    {now <= scholarship.endTimeToResigter && (
                      <>
                        <Countdown
                          timestamp={scholarship.endTimeToResigter}
                          size={1}
                          title="Thời gian còn lại để đăng ký..."
                        />
                      </>
                    )}
                    {scholarship.endTimeToResigter < now &&
                      now <= scholarship.endTime && (
                        <>
                          <Countdown
                            timestamp={scholarship.endTime}
                            size={1}
                            title="Nhiệm vụ đang diễn ra..."
                          />
                        </>
                      )}
                    {scholarship.endTime < now &&
                      now <= scholarship.endTimeToComFirm && (
                        <>
                          <Countdown
                            timestamp={scholarship.endTimeToComFirm}
                            size={1}
                            title="Nhiệm vụ đã kết thúc và đang chờ xác nhận..."
                          />
                        </>
                      )}
                    {now > scholarship.endTimeToComFirm && (
                      <>
                        <Countdown
                          timestamp={scholarship.endTimeToComFirm}
                          size={1}
                          title="Kết thúc"
                        />
                      </>
                    )}
                  </div>
                  <div className="p-3">
                    <h5>
                      <strong>{scholarship.scholarshipName}</strong>
                    </h5>
                    <p>
                      <b>Số lượng:</b> {scholarship.joinedStudentAmount}
                    </p>
                    <p className="element_status">
                      {scholarship.scholarshipStatus}
                    </p>
                  </div>
                </Link>
                {scholarship.isJoined
                  ? role.role == "STUDENT" && (
                      <button
                        className={
                          scholarship.scholarshipStatus != "Closed"
                            ? "join_btn cancel"
                            : "join_btn cancel btn-disabled"
                        }
                        onClick={() =>
                          scholarship.scholarshipStatus != "Closed" &&
                          handleCancelRegister(scholarship.scholarshipAddress)
                        }
                      >
                        Hủy
                      </button>
                    )
                  : role.role == "STUDENT" && (
                      <button
                        className={
                          scholarship.scholarshipStatus != "Closed"
                            ? "join_btn join"
                            : "join_btn join btn-disabled"
                        }
                        onClick={() => {
                          scholarship.scholarshipStatus != "Closed" &&
                            handleRegister(scholarship.scholarshipAddress)
                        }}
                      >
                        Tham gia
                      </button>
                    )}
                {role.role == "ADMIN" && (
                  <button
                    className={
                      scholarship.scholarshipStatus != "Closed"
                        ? "join_btn join"
                        : "join_btn join btn-disabled"
                    }
                    onClick={() =>
                      scholarship.scholarshipStatus != "Closed" &&
                      handleLock(scholarship.scholarshipAddress)
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

export default ScholarshipListPage
