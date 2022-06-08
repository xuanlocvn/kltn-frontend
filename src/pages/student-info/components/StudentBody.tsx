/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import StudentTab from "./StudentTab"
import StudentInfomation from "./StudentInfomation"
import { convertLocalTime } from "src/utils"
import StudentAccount from "./StudentAccount"
import { useSearchParams } from "react-router-dom"
import { useAppSelector } from "src/app/hooks"
import { selectWeb3 } from "src/pages/sign-in/SignInSlice"
import StudentCertificate from "./StudentCertificate"
import { getMissionsOfStudent, getSubjectsOfStudent } from "src/api/studentApi"

StudentBody.propTypes = {
  walletAddress: PropTypes.string,
  studentInfo: PropTypes.object,
}

function StudentBody(props: { walletAddress: string; studentInfo: any }) {
  const { walletAddress, studentInfo } = props
  const web3 = useAppSelector(selectWeb3)
  const [isOwnStdudent, setIsOwnStudent] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams({})
  const [tab, setTab] = useState(1)
  const [totalToken, setTotaToken] = useState(0)
  const [certificateList, setCertificatList] = useState({
    subjectList: [],
    certificateList: [],
  })

  useEffect(() => {
    setTotaToken(5000)
  })

  useEffect(() => {
    const getCertificates = async (studentAddress: string) => {
      const subjectResponse = await getSubjectsOfStudent(studentAddress)
      const missionResponse = await getMissionsOfStudent(studentAddress)

      setCertificatList({
        subjectList: subjectResponse.data.result,
        certificateList: missionResponse.data.result,
      })
    }

    getCertificates(walletAddress)
  }, [tab == 3])

  useEffect(() => {
    const getAccount = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts()
        return accounts[0]
      }
      return null
    }

    getAccount().then((account) => {
      console.log("Helloooooooooooooooooooooo")
      if (account == null) return
      if (account.toLowerCase() == walletAddress.toLowerCase()) {
        setIsOwnStudent(true)
        const t = Number(searchParams.get("t"))
        t != 0 ? setTab(t) : setTab(1)
      } else {
        setIsOwnStudent(false)
        setTab(3)
        setSearchParams({ t: "3" })
      }
    })
  }, [studentInfo])

  const onTab = (tabNumber: number) => {
    setTab(tabNumber)
  }

  return (
    <div className="student_form mt-5 d-flex">
      <StudentTab onTab={onTab} isOwnStdudent={isOwnStdudent} />
      <div className="form_body d-flex flex-column col col-9">
        {tab == 1 && isOwnStdudent && (
          <StudentInfomation studentInfo={studentInfo} />
        )}
        {tab == 2 && isOwnStdudent && (
          <StudentAccount
            walletAddress={walletAddress}
            totalToken={totalToken}
          />
        )}
        {tab == 3 && (
          <StudentCertificate
            subjectList={certificateList.subjectList}
            certificateList={certificateList.certificateList}
          />
        )}
      </div>
    </div>
  )
}

export default StudentBody
