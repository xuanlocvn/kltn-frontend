/* eslint-disable no-unused-vars */
import React from "react"
import PropTypes from "prop-types"
import "./Popup.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { hidePopup, selectPopup } from "./PopupSlice"
import { useAppDispatch, useAppSelector } from "src/app/hooks"
import { Spinner } from "react-bootstrap"

Popup.propTypes = {
  children: PropTypes.node,
}

function Popup(props) {
  const popup = useAppSelector(selectPopup)
  const dispatch = useAppDispatch()

  return (
    <>
      {popup.isShowed && (
        <div className="container-fluid pop-up_container">
          <div className="pop-up">
            <div
              className="pop-up__close"
              onClick={() => dispatch(hidePopup())}
            >
              <FontAwesomeIcon icon={faXmark} size={"2x"} />
            </div>
            <div className="pop-up__child text-center">
              {popup.message != "" ? (
                popup.icon == null ? (
                  <Spinner animation="border" variant={popup.style} />
                ) : (
                  <FontAwesomeIcon
                    icon={popup.icon}
                    size={"2x"}
                    color={popup.style}
                  />
                )
              ) : (
                <div>{props.children}</div>
              )}

              <h4>{popup.message}</h4>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Popup
