import React from "react"

function Forbidden() {
  return (
    <div
      className="d-flex flex-column"
      style={{
        width: "max-content",
        margin: "15% auto",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "200px", fontWeight: "bold" }}>403</h1>
      <h2>Forbidden</h2>
      <h5>Bạn không có quyền truy cập vào trang này</h5>
    </div>
  )
}

export default Forbidden
