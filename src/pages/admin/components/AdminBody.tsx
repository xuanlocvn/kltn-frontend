import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useAppSelector } from "src/app/hooks"
import { selectWeb3 } from "src/pages/sign-in/SignInSlice"
import { useSearchParams } from "react-router-dom"
import AdminTab from "./AdminTab"
import GrantRoleStudent from "./GrantRoleStudent"
import GrantRoleLecturer from "./GrantRoleLecturer"
import CreateNewClass from "./CreateNewClass"
import CreateNewScholarShip from "./CreateNewCholarship"
import CreateNewMission from "./CreateNewMission"
import CreateNewTuition from "./CreateNewTuition"
import CreateNewProduct from "./CreateNewProduct"

AdminBody.propTypes = {
  walletAddress: PropTypes.string,
}

function AdminBody(props) {
  const { walletAddress } = props
  const web3 = useAppSelector(selectWeb3)
  const [isOwnAdmin, setIsOwnAdmin] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams({})
  const [tab, setTab] = useState(1)

  useEffect(() => {
    const getAccount = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts()
        return accounts[0]
      }
      return null
    }

    getAccount().then((account) => {
      if (account == null) return
      if (account.toLowerCase() == walletAddress.toLocaleLowerCase()) {
        setIsOwnAdmin(true)
        const t = Number(searchParams.get("t"))
        t != 0 && setTab(t)
      } else {
        setIsOwnAdmin(false)
        setTab(3)
        setSearchParams({ t: "3" })
      }
    })
  }, [web3])

  const onTab = (tabNumber: number) => {
    setTab(tabNumber)
  }

  return (
    <div className="student_form mt-5 d-flex">
      <AdminTab onTab={onTab} isOwnAdmin={isOwnAdmin} />
      <div className="col col-9">
        {tab == 1 && isOwnAdmin && <GrantRoleStudent />}
        {tab == 2 && isOwnAdmin && <GrantRoleLecturer />}
        {tab == 3 && isOwnAdmin && <CreateNewClass />}
        {tab == 4 && isOwnAdmin && <CreateNewScholarShip />}
        {tab == 5 && isOwnAdmin && <CreateNewMission />}
        {tab == 6 && isOwnAdmin && <CreateNewTuition />}
        {tab == 7 && isOwnAdmin && <CreateNewProduct />}
      </div>
    </div>
  )
}

export default AdminBody
