import React, { useEffect, useState } from "react"
import Pagination from "src/components/shared/Pagination/Pagination"
import { Link } from "react-router-dom"
import useList from "src/hooks/useList"
import "./TuitionListPage.scss"
import { tuitionContracService } from "src/contracts/tuition-contract.service"
import { CustomWindow, ITuitionInstance } from "src/utils/window"
import { getTuitionList, getTuitionListByLecturer } from "src/api/tuitionApi"
import img from "src/assets/images/Tuition.png"
import { useAppSelector } from "src/app/hooks"
import { selectRole } from "src/components/shared/Header/HeaderSlice"
import useNow from "../../../hooks/useNow"
import Countdown from "../../../components/countdown/CountDown"
import Paypal from "src/components/paypal/PaypalComponent"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { managerPoolContractService } from "src/contracts/manager-pool.service"
import { erc20ContractService } from "src/contracts/erc20.service"
import { CONFIG } from "src/configs/config.enum"
import { configService } from "src/configs/config.service"

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
  const role = useAppSelector(selectRole)
  const { now } = useNow()
  const [checkout, setCheckOut] = useState(false)

  useEffect(() => {
    const fetchTuitionList = async (walletAddress: string) => {
      let response
      switch (role.role) {
        case "LECTURER":
          response = await await getTuitionListByLecturer(walletAddress)
          break
        case "STUDENT":
          response = await getTuitionList(walletAddress)
          break
        default:
          response = await getTuitionList()
          break
      }
      const result: ITuitionInstance[] = response.data.result
      setTotalList(result)
    }
    window.localStorage.account && fetchTuitionList(window.localStorage.account)
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

  const handleLock = async (address?: string) => {
    await managerPoolContractService.lockTuition([address])
  }

  return (
    <div className="list mt-5">
      <div className="mb-3">
        <h2>Danh Sách Học Phí</h2>
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
            <div key={index} className="col col-4">
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
                      onClick={() => paymentByToken(tuition.tuitionAddress)}
                    >
                      Thanh toán bằng token qua{" "}
                      <span>
                        <b>Metamask</b>
                      </span>
                    </button>
                    <Paypal
                      value={tuition.currencyAmount.toString()}
                      message={`Sinh vien ${window.localStorage.account} ${tuition.tuitionName}`}
                      callback={() => paymentByCurrency(tuition.tuitionAddress)}
                    />
                  </div>
                </div>
              )}
              <div
                className="mission_element"
                style={{ height: "200px", width: "96%" }}
              >
                <Link to={"/tuitions/" + tuition.tuitionAddress}>
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
                    {now <= tuition.endTime && (
                      <>
                        <Countdown
                          timestamp={tuition.endTime}
                          size={1}
                          title="Thời gian còn lại để đóng học phí..."
                        />
                      </>
                    )}
                    {now > tuition.endTime && (
                      <>
                        <Countdown
                          timestamp={tuition.endTime}
                          size={1}
                          title="Kết thúc"
                        />
                      </>
                    )}
                  </div>
                  <div className="p-3">
                    <h5>
                      <strong>{tuition.tuitionName}</strong>
                    </h5>
                    <p>
                      <b>Số lượng:</b> {tuition.joinedStudentAmount}
                    </p>
                    <p className="element_status">{tuition.tuitionStatus}</p>
                  </div>
                </Link>
                {tuition.isCompleted ? (
                  role.role == "STUDENT" && (
                    <button className="join_btn cancel btn-disabled">
                      Đã đóng
                    </button>
                  )
                ) : role.role == "STUDENT" && now <= tuition.endTime ? (
                  <>
                    <button
                      className="join_btn join"
                      onClick={() => setCheckOut(true)}
                    >
                      Đóng
                    </button>
                  </>
                ) : (
                  <button className="join_btn cancel btn-disabled">Đóng</button>
                )}

                {role.role == "ADMIN" && (
                  <button
                    className={
                      tuition.tuitionStatus != "Closed"
                        ? "join_btn join"
                        : "join_btn join btn-disabled"
                    }
                    onClick={() =>
                      tuition.tuitionStatus != "Closed" &&
                      handleLock(tuition.tuitionAddress)
                    }
                  >
                    Khoá
                  </button>
                )}
              </div>
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
