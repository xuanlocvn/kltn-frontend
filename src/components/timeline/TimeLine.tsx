import React from "react"
import "./TimeLine.scss"
import { convertLocalTimeFullFormat } from "src/utils"

function TimeLine(props) {
  // eslint-disable-next-line react/prop-types
  const { startTime, endTimeToRegister, endTime, endTimeToConfirm } = props

  return (
    <div className="container-fluid py-5">
      <div className="row">
        <div className="col-12">
          <div className="horizontal-timeline">
            <ul className="list-inline items d-flex justify-content-between">
              {startTime != 0 && (
                <li className="list-inline-item items-list">
                  <div className="px-4">
                    <div className="event-date badge bg-info">
                      {convertLocalTimeFullFormat(startTime)}
                    </div>
                    <h6 className="pt-2">Bắt đầu</h6>
                  </div>
                </li>
              )}
              {endTimeToRegister != 0 && (
                <li className="list-inline-item items-list">
                  <div className="px-4">
                    <div className="event-date badge bg-success">
                      {convertLocalTimeFullFormat(endTimeToRegister)}
                    </div>
                    <h6 className="pt-2">Kết thúc đăng ký</h6>
                  </div>
                </li>
              )}
              {endTime != 0 && (
                <li className="list-inline-item items-list">
                  <div className="px-4">
                    <div className="event-date badge bg-danger">
                      {convertLocalTimeFullFormat(endTime)}
                    </div>
                    <h6 className="pt-2">Kết thúc</h6>
                  </div>
                </li>
              )}
              {endTimeToConfirm != 0 && (
                <li className="list-inline-item items-list">
                  <div className="px-4">
                    <div className="event-date badge bg-warning">
                      {convertLocalTimeFullFormat(endTimeToConfirm)}
                    </div>
                    <h6 className="pt-2">Kết thúc đánh giá</h6>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLine
