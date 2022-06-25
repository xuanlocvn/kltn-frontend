import React from "react"
import { useEffect, useState } from "react"
import Web3 from "web3"
import {
  connect,
  disconnect,
  selectWeb3,
} from "../../../pages/sign-in/SignInSlice"
import { CustomWindow } from "src/utils/window"
import { makeShotAccount } from "src/utils"
import "./Header.scss"
import { useAppDispatch, useAppSelector } from "src/app/hooks"
import { Link } from "react-router-dom"
import { addRole, removeRole, selectRole } from "./HeaderSlice"
import { accessControlContractService } from "src/contracts/access-control.service"
import img from "src/assets/images/Logo.png"
import {
  faAward,
  faBook,
  faGraduationCap,
  faMoneyCheckDollar,
  faStore,
  faThumbTack,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

declare let window: CustomWindow

function Header() {
  const web3 = useAppSelector(selectWeb3)
  const role = useAppSelector(selectRole)
  const dispatch = useAppDispatch()
  const [account, setAccount] = useState(null)
  const [tab, setTab] = useState(0)

  useEffect(() => {
    window.localStorage.tab == undefined
      ? (window.localStorage.tab = 0)
      : setTab(window.localStorage.tab)
  }, [])

  const handleTab = (tab: number) => {
    window.localStorage.tab = tab
    setTab(tab)
  }

  useEffect(() => {
    const loadAccountFromWallet = async () => {
      const ethereum = window.ethereum
      if (ethereum != undefined) {
        dispatch(connect(new Web3(ethereum)))
        await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then(async (accounts) => {
            setAccount(makeShotAccount(accounts[0]))
            const role = await accessControlContractService.getRole(accounts[0])
            dispatch(addRole({ account: accounts[0], role: role }))
            window.localStorage.account = accounts[0]
          })
        ethereum.on("chainChanged", (chainId: string) => {
          console.log(`On Chain ID: ${chainId}`)
          dispatch(connect(new Web3(ethereum)))
          window.location.reload()
        })
        ethereum.on("accountsChanged", async (accounts) => {
          console.log(`Account: ${accounts[0]}`)
          setAccount(makeShotAccount(accounts[0]))
          const role = await accessControlContractService.getRole(accounts[0])
          dispatch(addRole({ account: accounts[0], role: role }))
          window.localStorage.account = accounts[0]
          if (accounts[0] == "undefined") setAccount(null)
          dispatch(connect(new Web3(ethereum)))
          window.location.reload()
        })
        ethereum.on("disconnect", (code, reason) => {
          console.log(`Ethereum Provider connection disconnect: ${reason}`)
        })
      } else {
        dispatch(disconnect())
        dispatch(removeRole())
        setAccount(null)
      }
    }

    web3 == null && loadAccountFromWallet()
  })

  return (
    <>
      <div className="header header__account d-flex justify-content-between align-items-center">
        <h1 className={role.role == "ADMIN" ? "col col-3" : "col col-5"}>
          <img src={img} alt="logo" width={160} />
        </h1>
        <div
          className={
            role.role == "ADMIN"
              ? "col col-9 d-flex align-items-center justify-content-between"
              : "col col-7 d-flex align-items-center justify-content-between"
          }
        >
          <div
            className={
              role.role == "ADMIN"
                ? "col col-9 d-flex justify-content-between"
                : "col col-7 d-flex justify-content-between"
            }
          >
            <>
              {role.role == "ADMIN" && (
                <>
                  <Link to={"/students"} onClick={() => handleTab(1)}>
                    {tab == 1 ? (
                      <span
                        style={{
                          fontWeight: "bolder",
                          color: "black",
                        }}
                      >
                        <FontAwesomeIcon icon={faGraduationCap} /> DS Sinh viên
                      </span>
                    ) : (
                      <span>
                        <FontAwesomeIcon icon={faGraduationCap} /> DS Sinh viên
                      </span>
                    )}
                  </Link>
                  <Link to={"/lecturers"} onClick={() => handleTab(2)}>
                    {tab == 2 ? (
                      <span
                        style={{
                          fontWeight: "bolder",
                          color: "black",
                        }}
                      >
                        <FontAwesomeIcon icon={faUserTie} /> DS Giảng viên
                      </span>
                    ) : (
                      <span>
                        <FontAwesomeIcon icon={faUserTie} /> DS Giảng viên
                      </span>
                    )}
                  </Link>
                </>
              )}
              <Link to={"/missions"} onClick={() => handleTab(3)}>
                {tab == 3 ? (
                  <span
                    style={{
                      fontWeight: "bolder",
                      color: "black",
                    }}
                  >
                    <FontAwesomeIcon icon={faThumbTack} /> Nhiệm vụ
                  </span>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faThumbTack} /> Nhiệm vụ
                  </span>
                )}
              </Link>
              <Link to={"/subjects"} onClick={() => handleTab(4)}>
                {tab == 4 ? (
                  <span
                    style={{
                      fontWeight: "bolder",
                      color: "black",
                    }}
                  >
                    <FontAwesomeIcon icon={faBook} /> Môn học
                  </span>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faBook} /> Môn học
                  </span>
                )}
              </Link>
              <Link to={"/scholarships"} onClick={() => handleTab(5)}>
                {tab == 5 ? (
                  <span
                    style={{
                      fontWeight: "bolder",
                      color: "black",
                    }}
                  >
                    <FontAwesomeIcon icon={faAward} /> Học bổng
                  </span>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faAward} /> Học bổng
                  </span>
                )}
              </Link>
              <Link to={"/tuitions"} onClick={() => handleTab(6)}>
                {tab == 6 ? (
                  <span
                    style={{
                      fontWeight: "bolder",
                      color: "black",
                    }}
                  >
                    <FontAwesomeIcon icon={faMoneyCheckDollar} /> Học phí
                  </span>
                ) : (
                  <span>
                    <FontAwesomeIcon icon={faMoneyCheckDollar} /> Học phí
                  </span>
                )}
              </Link>
              {role.role != "LECTURER" && (
                <>
                  <Link to={"/products"} onClick={() => handleTab(7)}>
                    {tab == 7 ? (
                      <span
                        style={{
                          fontWeight: "bolder",
                          color: "black",
                        }}
                      >
                        <FontAwesomeIcon icon={faStore} /> Vật phẩm
                      </span>
                    ) : (
                      <span>
                        <FontAwesomeIcon icon={faStore} /> Vật phẩm
                      </span>
                    )}
                  </Link>
                </>
              )}
            </>
          </div>
          <div className="">
            {account && role.role && (
              <Link
                to={`/${role.role.toLowerCase()}/${
                  window.localStorage.account
                }`}
                onClick={() => handleTab(0)}
              >
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-column">
                    {tab == 0 ? (
                      <>
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: "bolder",
                            color: "black",
                          }}
                        >
                          {role.role}
                        </span>
                        <span
                          style={{
                            fontWeight: "bolder",
                            color: "black",
                          }}
                        >
                          {account}
                        </span>
                      </>
                    ) : (
                      <>
                        <span style={{ fontSize: "10px" }}>{role.role}</span>
                        <span>{account}</span>
                      </>
                    )}
                  </div>
                  <img
                    src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png"
                    alt=""
                    width={45}
                    height={45}
                  />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
