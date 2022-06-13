import React, { useEffect, useState } from "react"
import { useAppSelector } from "src/app/hooks"
import { selectRole } from "src/components/shared/Header/HeaderSlice"
import { getAllStudents } from "src/api/studentApi"
import useCheckbox from "src/hooks/useCheckbox"
import { CSVLink } from "react-csv"
import { ISudentList } from "src/utils/window"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { managerPoolContractService } from "src/contracts/manager-pool.service"
import Pagination from "src/components/shared/Pagination/Pagination"

// declare let window: CustomWindow

const headers = [
  { label: "Mã số sinh viên", key: "id" },
  { label: "Họ và tên", key: "name" },
  { label: "Địa chỉ ví", key: "walletAddress" },
  { label: "Lớp", key: "class" },
  { label: "Khoa", key: "faculty" },
]

function StudentList() {
  const role = useAppSelector(selectRole)
  const { selectList, handleChange } = useCheckbox()
  const [list, setList] = useState<ISudentList[]>([])
  const [data, setData] = useState([{}])

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllStudents()
      setList(response.data.result)
    }
    role.role == "ADMIN" && fetchApi()
  }, [role])

  useEffect(() => {
    const drawData = []
    list &&
      list.forEach((student) => {
        drawData.push({
          id: student.studentId,
          name: student.studentName,
          walletAddress: student.studentAddress,
          class: student.classroomName,
          faculty: student.departmentName,
        })
      })
    drawData.length > 0 && setData(drawData)
  }, [list])

  const handleRevoke = async () => {
    await managerPoolContractService.revokeStudentRole(selectList)
  }

  return (
    <div className="">
      {role.role == "ADMIN" ? (
        <div className="historyTable mt-5">
          <div className="d-flex justify-content-between align-items-end">
            <h2>Danh sách sinh viên</h2>
            <CSVLink
              data={data}
              headers={headers}
              filename={"Danh_sach_sinh_vien.csv"}
            >
              Tải xuống danh sách <FontAwesomeIcon icon={faDownload} />
            </CSVLink>
          </div>
          <table className="mt-3">
            <tbody>
              <tr className="row">
                <th className="col col-1 text-center"></th>
                <th className="col col-2 text-center">Mã số sinh viên</th>
                <th className="col col-4 text-center">Tên</th>
                <th className="col col-2 text-center">Lớp</th>
                <th className="col col-3 text-center">Khoa</th>
              </tr>
              {list && list.length == 0 ? (
                <p className="text-center p-5">
                  <i>Danh sách trống</i>
                </p>
              ) : (
                list.map((student, index) => (
                  <tr key={index} className="row">
                    <td className="col col-1 text-center">
                      <input
                        type="checkbox"
                        name="confirm"
                        id={student.studentAddress}
                        value={student.studentAddress}
                        onChange={handleChange}
                      />
                    </td>
                    <td className="col col-2 text-center">
                      {student.studentId}
                    </td>
                    <td className="col col-4 text-center">
                      <Link to={`/student/${student.studentAddress}`}>
                        {student.studentName}
                      </Link>
                    </td>
                    <td className="col col-2 text-center">
                      {student.classroomName}
                    </td>
                    <td className="col col-3 text-center">
                      {student.departmentName}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {role.role == "ADMIN" && (
            <div className="d-flex flex-row-reverse align-items-center flex-column mt-5">
              <div>
                <button className="completed" onClick={handleRevoke}>
                  Xoá phân quyền
                </button>
              </div>
              <Pagination
                currentPage={1}
                totalPage={2}
                onPaginate={(a) => console.log(a)}
              />
            </div>
          )}
        </div>
      ) : (
        403
      )}
    </div>
  )
}

export default StudentList
