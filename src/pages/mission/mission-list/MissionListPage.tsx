import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { CustomWindow } from "src/utils/window"
import Pagination from "src/components/shared/Pagination/Pagination"
import { missionContractService } from "src/contracts/mission-contract.service"
import useList from "src/hooks/useList"
import { getMissionList } from "src/api/missionApi"
import "./MissionListPage.scss"
import { IMissionInstance } from "src/utils/window"

declare let window: CustomWindow

function MissionListPage() {
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
  } = useList<IMissionInstance>()

  useEffect(() => {
    const fetchMissionList = async (walletAddress: string) => {
      const response = await getMissionList(walletAddress)
      const result: IMissionInstance[] = response.data.result
      setTotalList(result)
    }
    window.localStorage.account && fetchMissionList(window.localStorage.account)
  }, [])

  const onPaginate = (page: number) => {
    const filter = searchParams.get("filter")
      ? searchParams.get("filter")
      : "all"
    if (page > totalPage) page = totalPage > 0 ? totalPage : 1
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
    await missionContractService.register(contractAddress)
  }

  const handleCancelRegister = async (contractAddress: string) => {
    await missionContractService.cancelRegister(contractAddress)
  }

  return (
    <div className="list mt-5">
      <div className="mb-3">
        <h2>Danh Sách Nhiệm Vụ</h2>
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
          {renderList.map((mission, index) => (
            <div
              key={index}
              className="mission_element col-4"
              onClick={() => console.log("Hello")}
              style={{ height: "164px" }}
            >
              <Link to={"/missions/" + mission.missionAddress}>
                <h5>
                  <strong>{mission.missionName}</strong>
                </h5>
                <p>
                  <b>Số lượng:</b> {mission.joinedStudentAmount}/
                  {mission.maxStudentAmount}
                </p>
                <p className="element_status">{mission.missionStatus}</p>
              </Link>
              {mission.isJoined ? (
                <button
                  className={
                    mission.missionStatus != "Closed"
                      ? "join_btn cancel"
                      : "join_btn cancel btn-disabled"
                  }
                  onClick={() =>
                    mission.missionStatus != "Closed" &&
                    handleCancelRegister(mission.missionAddress)
                  }
                >
                  Hủy
                </button>
              ) : (
                <button
                  className={
                    mission.missionStatus != "Closed"
                      ? "join_btn join"
                      : "join_btn join btn-disabled"
                  }
                  onClick={() => {
                    mission.missionStatus != "Closed" &&
                      handleRegister(mission.missionAddress)
                  }}
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

export default MissionListPage
