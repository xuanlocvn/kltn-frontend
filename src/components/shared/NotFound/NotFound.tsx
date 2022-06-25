import React from "react"

NotFound.propTypes = {}

function NotFound() {
  return (
    <div
      className="d-flex flex-column"
      style={{
        width: "max-content",
        margin: "15% auto",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "200px", fontWeight: "bold" }}>400</h1>
      <h2>Not Found</h2>
      <h5>Trang bạn truy cập không tồn tại</h5>
    </div>
  )
}

export default NotFound
