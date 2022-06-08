import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { getBalanceHistoriesOfStudent } from "src/api/studentApi"
import { convertLocalTime } from "src/utils"
import { Link } from "react-router-dom"

StudentAccount.propTypes = {
  walletAddress: PropTypes.string,
  totalToken: PropTypes.number,
}

StudentAccount.defaultProps = {
  walletAddress: "",
  totalToken: 0,
}

function StudentAccount(props) {
  const { walletAddress, totalToken } = props
  const [historyList, setHistoryList] = useState<
    {
      type: string
      contractAddress: string
      historyName: string
      amount: number
      submitTime: number | string
    }[]
  >([])

  useEffect(() => {
    const getBalanceHistories = async (studentddress: string) => {
      const response = await getBalanceHistoriesOfStudent(studentddress)
      setHistoryList(response.data.result)
    }

    getBalanceHistories(walletAddress)
  })

  return (
    <div className="studentAccount">
      <div>
        <h2>Tài Khoản Sinh Viên</h2>
      </div>
      <div className="body_form mt-3">
        <form action="" method="post" className="d-flex flex-column">
          <div className="d-flex mb-2">
            <div className="d-flex flex-column flex-grow-1">
              <label htmlFor="walletAddress">
                Địa chỉ ví<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                placeholder="0x1a2C3..."
                name="walletAddress"
                disabled
                defaultValue={walletAddress != "" ? walletAddress : ""}
                style={{ cursor: "not-allowed" }}
              />
            </div>
            <button
              className="submitbtn"
              type="submit"
              disabled
              style={{ cursor: "not-allowed" }}
            >
              Cập nhật
            </button>
          </div>
        </form>
        <div>
          <div>
            <label className="d-block">Số dư token</label>
            <div className="d-flex justify-content-around">
              <div>
                <p className="amountToken d-inline-block">{totalToken}</p>
                <p className="d-inline-block" style={{ fontWeight: "bold" }}>
                  Token
                </p>
              </div>
            </div>
          </div>
          <div className="historyTable">
            <table>
              <tbody>
                <tr className="row">
                  <th className="col col-3 text-center">STT</th>
                  <th className="col col-3 text-center">Tên</th>
                  <th className="col col-3 text-center">Biến động số dư</th>
                  <th className="col col-3 text-center">Thời gian</th>
                </tr>
                {historyList.length == 0 ? (
                  <div className="m-5 text-center">
                    <i>...Trống...</i>
                  </div>
                ) : (
                  historyList.map((history, index) => (
                    <tr key={index} className="row">
                      <td className="col col-3 text-center">{index}</td>
                      <td className="col col-3 text-center">
                        {history.historyName}
                      </td>
                      <td className="col col-3 text-center">
                        <span className="text-success fw-bold">
                          {history.amount > 0 && "+"}
                          {history.amount}
                        </span>
                      </td>
                      <td className="col col-3 text-center">
                        <Link
                          to={`/${history.type}/${history.contractAddress}`}
                        >
                          {convertLocalTime(Number(history.submitTime))}
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentAccount
