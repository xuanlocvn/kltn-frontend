import React from "react"
import PropTypes from "prop-types"
import { IStudentCertificate } from "src/utils/window"
import { convertLocalTime } from "src/utils"
import { Link } from "react-router-dom"

StudentCertificate.propTypes = {
  subjectList: PropTypes.array,
  certificateList: PropTypes.array,
}

function StudentCertificate(props: {
  subjectList: IStudentCertificate[]
  certificateList: IStudentCertificate[]
}) {
  const { subjectList, certificateList } = props
  return (
    <div className="confirmedInfo">
      <div style={{ width: "100%", height: "500px" }}>
        <div>
          <h2>Môn Học Hoàn Thành</h2>
        </div>
        <div
          className="body_form mt-3"
          style={{ width: "100%", height: "100%" }}
        >
          <div>
            <table style={{ width: "95%", margin: "auto" }}>
              <tbody>
                {subjectList.length == 0 ? (
                  <div className="text-center align-center">
                    <i>Trống</i>
                  </div>
                ) : (
                  subjectList.map((subject, index) => (
                    <tr
                      className="element d-flex row align-items-center"
                      key={index}
                    >
                      <td className="col col-2 text-center">
                        <p>
                          <span className="fw-bolder fs-5 text-success">
                            &#10003;
                          </span>
                        </p>
                      </td>

                      <td className="col col-4 align-content-center text-center">
                        <p>
                          <b>Từ ngày:</b> {convertLocalTime(subject.startTime)}
                        </p>
                        <p>
                          <b>Đến ngày:</b> {convertLocalTime(subject.endTime)}
                        </p>
                      </td>
                      <Link to={`/${subject.type}/${subject.contractAddress}`}>
                        <td className="subject col col-6 text-center">
                          {subject.certificateName}
                        </td>
                      </Link>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", height: "500px", marginTop: "100px" }}>
        <div>
          <h2>Chứng Chỉ Hoàn Thành Nhiệm Vụ</h2>
        </div>
        <div
          className="body_form mt-3"
          style={{ width: "100%", height: "100%" }}
        >
          <div>
            <table style={{ width: "95%", margin: "auto" }}>
              <tbody>
                {certificateList.length == 0 ? (
                  <div className="text-center align-center">
                    <i>Trống</i>
                  </div>
                ) : (
                  certificateList.map((subject, index) => (
                    <tr
                      className="element d-flex row align-items-center"
                      key={index}
                    >
                      <td className="col col-2 text-center">
                        <p>
                          <span className="fw-bolder fs-5 text-success">
                            &#10003;
                          </span>
                        </p>
                      </td>

                      <td className="col col-4 align-content-center text-center">
                        <p>
                          <b>Từ ngày:</b> {convertLocalTime(subject.startTime)}
                        </p>
                        <p>
                          <b>Đến ngày:</b> {convertLocalTime(subject.endTime)}
                        </p>
                      </td>
                      <Link to={`/${subject.type}/${subject.contractAddress}`}>
                        <td className="subject col col-6 text-center">
                          {subject.certificateName}
                        </td>
                      </Link>
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

export default StudentCertificate
