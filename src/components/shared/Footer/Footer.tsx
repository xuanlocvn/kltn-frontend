import React from "react"
import "./Footer.scss"
import img from "src/assets/images/Logo1.png"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <>
      <div className="d-flex header footer mt-5 justify-content-around align-items-center">
        <div className="col col-4" style={{ margin: "auto" }}>
          <img src={img} alt="" width={300} />
        </div>
        <div className="d-flex col col-8">
          <div className="col col-7">
            <h6>
              <b>Về chúng tôi</b>
            </h6>
            <div className="text-light">
              PHÒNG ĐÀO TẠO ĐẠI HỌC <br />
              Phòng A120, Trường Đại học Công nghệ Thông tin.
              <br />
              Khu phố 6, P.Linh Trung, Q.Thủ Đức, TP.Hồ Chí Minh. <br />
              Điện thoại: (028) 372 51993, Ext: 113(Hệ từ xa qua mạng), 112(Hệ
              chính quy).
              <br />
              Email: phongdaotaodh@uit.edu.vn
            </div>
          </div>
          <div className="col col-5">
            <h6>
              <b>Tìm hiểu thêm</b>
            </h6>
            <div className="text-light d-flex flex-wrap">
              <Link to={"/"}>
                <span className="m-1">Phân quyền, vai trò</span>|
              </Link>
              <Link to={"/"}>
                <span className="m-1">Chính sách bảo mật</span>|
              </Link>
              <Link to={"/"}>
                <span className="m-1">Quyền hạn, Chức năng, Nhiệm vụ</span>|
              </Link>
              <Link to={"/"}>
                <span className="m-1">Liên hệ</span>|
              </Link>
              <Link to={"/"}>
                <span className="m-1">Góp ý</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
