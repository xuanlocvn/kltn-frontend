import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import "./Pagination.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons"

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPage: PropTypes.number,
  onPaginate: PropTypes.func,
}

Pagination.defaultProps = {
  currentPage: 1,
  totalPage: 1,
  onPaginate: null,
}

function Pagination(props) {
  let { currentPage } = props
  const { totalPage, onPaginate } = props
  const [pages, setPages] = useState([])
  const [isHiden, setIshiden] = useState(true)

  useEffect(() => {
    setPages([])
    if (totalPage <= 1) setIshiden(true)
    else {
      setIshiden(false)
      for (let i = 1; i <= totalPage; i++) {
        setPages((prev) => [...prev, i])
      }
    }
  }, [totalPage])

  useEffect(() => {
    if (currentPage > totalPage) currentPage = totalPage
  }, [currentPage])

  const onFirstPage = () => {
    onPaginate(1)
  }

  const onLastPage = () => {
    onPaginate(totalPage)
  }

  const onPrevPage = () => {
    onPaginate(--currentPage)
  }

  const onNextPage = () => {
    onPaginate(++currentPage)
  }

  return (
    <>
      {!isHiden && (
        <div className="pagination">
          {currentPage == 1 ? (
            <>
              <div className="firstpage disable">
                <p>Trang đầu</p>
              </div>
              <div className="firstpage disable">
                <p>
                  <FontAwesomeIcon icon={faAnglesLeft} />
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="firstpage" onClick={onFirstPage}>
                <p>Trang đầu</p>
              </div>
              <div className="firstpage" onClick={onPrevPage}>
                <p>
                  <FontAwesomeIcon icon={faAnglesLeft} />
                </p>
              </div>
            </>
          )}
          <div></div>
          {pages.map((p, index) => (
            <div
              key={index}
              onClick={() => {
                onPaginate(p)
              }}
            >
              <p className={currentPage == p ? "active" : ""}>{p}</p>
            </div>
          ))}
          <div></div>
          {currentPage == totalPage ? (
            <>
              <div className="lastpage disable">
                <p>
                  <FontAwesomeIcon icon={faAnglesRight} />
                </p>
              </div>
              <div className="lastpage disable">
                <p>Trang cuối</p>
              </div>
            </>
          ) : (
            <>
              <div className="lastpage" onClick={onNextPage}>
                <p>
                  <FontAwesomeIcon icon={faAnglesRight} />
                </p>
              </div>
              <div className="lastpage" onClick={onLastPage}>
                <p>Trang cuối</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export default Pagination
