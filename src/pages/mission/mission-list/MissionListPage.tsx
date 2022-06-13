import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { CustomWindow } from "src/utils/window"
import Pagination from "src/components/shared/Pagination/Pagination"
import { missionContractService } from "src/contracts/mission-contract.service"
import useList from "src/hooks/useList"
import { getMissionList, getMissionListByLecturer } from "src/api/missionApi"
import "./MissionListPage.scss"
import { IMissionInstance } from "src/utils/window"
import img from "src/assets/images/Mission.png"
import { selectRole } from "../../../components/shared/Header/HeaderSlice"
import { useAppSelector } from "src/app/hooks"
import Countdown from "../../../components/countdown/CountDown"
import useNow from "../../../hooks/useNow"
import { managerPoolContractService } from "src/contracts/manager-pool.service"

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
  const role = useAppSelector(selectRole)
  const { now } = useNow()

  useEffect(() => {
    const fetchMissionList = async (walletAddress: string) => {
      let response
      switch (role.role) {
        case "LECTURER":
          response = await await getMissionListByLecturer(walletAddress)
          break
        case "STUDENT":
          response = await getMissionList(walletAddress)
          break
        default:
          response = await getMissionList()
      }
      const result: IMissionInstance[] = response.data.result
      setTotalList(result)
    }
    window.localStorage.account && fetchMissionList(window.localStorage.account)
  }, [role])

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

  const handleLock = async (address?: string) => {
    await managerPoolContractService.lockMission([address])
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
              style={{ height: "200px" }}
            >
              <Link to={"/missions/" + mission.missionAddress}>
                <div className="img">
                  <img src={img} alt="mission" />
                </div>
                <div
                  style={{ position: "relative", top: "-80px", height: "5px" }}
                >
                  {now <= mission.endTimeToResigter && (
                    <>
                      <Countdown
                        timestamp={mission.endTimeToResigter}
                        size={1}
                        title="Thời gian còn lại để đăng ký..."
                      />
                    </>
                  )}
                  {mission.endTimeToResigter < now && now <= mission.endTime && (
                    <>
                      <Countdown
                        timestamp={mission.endTime}
                        size={1}
                        title="Nhiệm vụ đang diễn ra..."
                      />
                    </>
                  )}
                  {mission.endTime < now && now <= mission.endTimeToComFirm && (
                    <>
                      <Countdown
                        timestamp={mission.endTimeToComFirm}
                        size={1}
                        title="Nhiệm vụ đã kết thúc và đang chờ xác nhận..."
                      />
                    </>
                  )}
                  {now > mission.endTimeToComFirm && (
                    <>
                      <Countdown
                        timestamp={mission.endTimeToComFirm}
                        size={1}
                        title="Kết thúc"
                      />
                    </>
                  )}
                </div>
                <div className="p-3">
                  <h5>
                    <strong>{mission.missionName}</strong>
                  </h5>
                  <p>
                    <b>Số lượng:</b> {mission.joinedStudentAmount}/
                    {mission.maxStudentAmount}
                  </p>
                  <p className="element_status">{mission.missionStatus}</p>
                </div>
              </Link>
              {mission.isJoined
                ? role.role == "STUDENT" && (
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
                  )
                : role.role == "STUDENT" && (
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

              {role.role == "ADMIN" && (
                <button
                  className={
                    mission.missionStatus != "Closed"
                      ? "join_btn join"
                      : "join_btn join btn-disabled"
                  }
                  onClick={() =>
                    mission.missionStatus != "Closed" &&
                    handleLock(mission.missionAddress)
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

export default MissionListPage
