import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useSearchParams } from "react-router-dom"

AdminTab.propTypes = {
  onTab: PropTypes.func,
  isOwnAdmin: PropTypes.bool,
}

function AdminTab(props) {
  const [activeButton, setActiveButton] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()
  const { onTab, isOwnAdmin } = props

  useEffect(() => {
    const tab = searchParams.get("t")
    if (Number(tab) != 0) {
      setActiveButton(Number(tab))
      onTab(Number(tab))
    } else {
      setActiveButton(1)
      onTab(1)
    }
  }, [searchParams])

  const handleActive = (tabNumber: number) => {
    setActiveButton(tabNumber)
  }
  return (
    <div className="form_tab col col-3">
      {isOwnAdmin && (
        <>
          <p>
            <button
              className={activeButton == 1 ? "active" : ""}
              onClick={() => {
                onTab(1)
                handleActive(1)
                setSearchParams({ t: "1" })
              }}
            >
              Phân quyền sinh viên
            </button>
          </p>
          <p>
            <button
              className={activeButton == 2 ? "active" : ""}
              onClick={() => {
                onTab(2)
                handleActive(2)
                setSearchParams({ t: "2" })
              }}
            >
              Phân quyền giảng viên
            </button>
          </p>
          <p>
            <button
              className={activeButton == 3 ? "active" : ""}
              onClick={() => {
                onTab(3)
                handleActive(3)
                setSearchParams({ t: "3" })
              }}
            >
              Tạo lớp học
            </button>
          </p>
          <p>
            <button
              className={activeButton == 4 ? "active" : ""}
              onClick={() => {
                onTab(4)
                handleActive(4)
                setSearchParams({ t: "4" })
              }}
            >
              Tạo đợt nhận học bổng
            </button>
          </p>
          <p>
            <button
              className={activeButton == 5 ? "active" : ""}
              onClick={() => {
                onTab(5)
                handleActive(5)
                setSearchParams({ t: "5" })
              }}
            >
              Tạo nhiệm vụ
            </button>
          </p>
          <p>
            <button
              className={activeButton == 6 ? "active" : ""}
              onClick={() => {
                onTab(6)
                handleActive(6)
                setSearchParams({ t: "6" })
              }}
            >
              Tạo đợt đóng học phí
            </button>
          </p>
          <p>
            <button
              className={activeButton == 7 ? "active" : ""}
              onClick={() => {
                onTab(7)
                handleActive(7)
                setSearchParams({ t: "7" })
              }}
            >
              Tạo vật phẩm đăng bán
            </button>
          </p>
        </>
      )}
    </div>
  )
}

export default AdminTab
