import React, { useEffect, useState } from "react"
import { useAppSelector } from "src/app/hooks"
import { selectRole } from "src/components/shared/Header/HeaderSlice"
import { getAllLecturers } from "src/api/lecturerApi"
import useCheckbox from "src/hooks/useCheckbox"
import { CSVLink } from "react-csv"
import { ILecturerList } from "src/utils/window"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { managerPoolContractService } from "src/contracts/manager-pool.service"
import { makeShotTransactionHash } from "src/utils"
import Pagination from "src/components/shared/Pagination/Pagination"
import SpinnerApp from "../../../components/shared/Spinner/Spinner"
import Forbidden from "../../../components/shared/403/Forbidden"

// declare let window: CustomWindow

const headers = [
  { label: "Mã số giảng viên", key: "id" },
  { label: "Họ và tên", key: "name" },
  { label: "Địa chỉ ví", key: "walletAddress" },
  { label: "Khoa", key: "faculty" },
]

function LecturerList() {
  const role = useAppSelector(selectRole)
  const { selectList, handleChange } = useCheckbox()
  const [list, setList] = useState<ILecturerList[]>([])
  const [data, setData] = useState([{}])

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllLecturers()
      setList(response.data.result)
    }
    role.role == "ADMIN" && fetchApi()
  }, [role])

  useEffect(() => {
    const drawData = []
    list &&
      list.forEach((student) => {
        drawData.push({
          id: student.lecturerId,
          name: student.lecturerName,
          walletAddress: student.lecturerAddress,
          faculty: student.departmentName,
        })
      })
    drawData.length > 0 && setData(drawData)
  }, [list])

  const handleRevoke = async () => {
    await managerPoolContractService.revokeLecturerRole(selectList)
  }

  return (
    <div className="">
      {role.role == null ? (
        <SpinnerApp />
      ) : role.role == "ADMIN" ? (
        <div className="historyTable mt-5">
          <div className="d-flex justify-content-between align-items-end">
            <h2>Danh sách giảng viên</h2>
            <CSVLink
              data={data}
              headers={headers}
              filename={"Danh_sach_sinh_vien.csv"}
            >
              Tải xuống danh sách <FontAwesomeIcon icon={faDownload} />
            </CSVLink>
          </div>
          <div style={{ minHeight: "59vh" }}>
            <table className="mt-3">
              <tbody>
                <tr className="">
                  <th className="col col-1 text-center"></th>
                  <th className="col col-2 text-center">Mã số giảng viên</th>
                  <th className="col col-3 text-center">Tên</th>
                  <th className="col col-3 text-center">Địa chỉ</th>
                  <th className="col col-3 text-center">Khoa</th>
                </tr>
                {list && list.length == 0 ? (
                  <p className="text-center p-5">
                    <i>Danh sách trống</i>
                  </p>
                ) : (
                  list.map((lecturer, index) => (
                    <tr key={index} className="">
                      <td className="col col-1 text-center">
                        <input
                          type="checkbox"
                          name="confirm"
                          id={lecturer.lecturerName}
                          value={lecturer.lecturerAddress}
                          onChange={handleChange}
                        />
                      </td>
                      <td className="col col-2 text-center">
                        {lecturer.lecturerId}
                      </td>
                      <td className="col col-3 text-center">
                        <Link to={`/lecturer/${lecturer.lecturerAddress}`}>
                          {lecturer.lecturerName}
                        </Link>
                      </td>
                      <td className="col col-3 text-center">
                        {makeShotTransactionHash(lecturer.lecturerAddress)}
                      </td>
                      <td className="col col-3 text-center">
                        {lecturer.departmentName}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {role.role == "ADMIN" && (
            <div className="d-flex flex-row-reverse align-items-center mt-5">
              <div>
                <button
                  className="completed"
                  onClick={selectList && selectList.length > 0 && handleRevoke}
                >
                  Xoá phân quyền
                </button>
              </div>
              <Pagination
                currentPage={1}
                totalPage={1}
                onPaginate={(a) => console.log(a)}
              />
            </div>
          )}
        </div>
      ) : (
        <Forbidden />
      )}
    </div>
  )
}

export default LecturerList
