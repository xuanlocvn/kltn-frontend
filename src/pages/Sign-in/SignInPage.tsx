import React from "react"
import { useEffect, useState } from "react"
import Web3 from "web3"
import { connect, disconnect, selectWeb3 } from "./SignInSlice"
import { CustomWindow } from "src/utils/window"
import { useAppDispatch, useAppSelector } from "src/app/hooks"
import { useNavigate } from "react-router-dom"
import "./SignInPage.scss"
import { ProviderConnectInfo } from "src/interfaces"
import { selectRole } from "src/components/shared/Header/HeaderSlice"

declare let window: CustomWindow

function SignInPage() {
  const web3 = useAppSelector(selectWeb3)
  const role = useAppSelector(selectRole)
  const dispatch = useAppDispatch()
  const [account, setAccount] = useState(null)
  const [metamask, setMetamask] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const loadAccountFromWallet = async () => {
      const ethereum = window.ethereum
      if (ethereum != undefined) {
        dispatch(connect(new Web3(ethereum)))
        ethereum.on("connect", (connectInfo: ProviderConnectInfo) => {
          console.log(connectInfo.chainId)
          dispatch(connect(new Web3(ethereum)))
        })
        setMetamask(true)
        await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((result) => {
            setAccount(result[0])
          })
      } else {
        web3 != null && dispatch(disconnect())
        setMetamask(false)
      }
    }

    loadAccountFromWallet()
  }, [])

  useEffect(() => {
    web3 &&
      account &&
      role.role &&
      navigate(`/${role.role.toLocaleLowerCase()}/${account}`)
  })

  const loadWeb3 = async () => {
    if (window.ethereum != undefined) {
      dispatch(connect(new Web3(window.ethereum)))
      await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          setAccount(result[0])
        })
    } else {
      web3 != null && dispatch(disconnect())
    }
  }

  return (
    <div className="sign-in">
      <div className="container d-flex flex-column align-items-center justify-content-center">
        <img
          className="mb-3"
          src="https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
          alt="metamask"
          width={100}
        />
        {metamask ? (
          <div>
            <button onClick={loadWeb3}>Connect Wallet</button>
          </div>
        ) : (
          <div>
            <a
              href="https://metamask.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Please install MetaMask
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default SignInPage
