import React, { useState } from 'react';
// import PropTypes from 'prop-types';

GrantRoleStudent.propTypes = {};

function GrantRoleStudent() {
  const [faculty, setFaculty] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    // const studentInfoForm: StudentInfo = {
    //   name: e.target.name.value,
    //   dateOfBirth: e.target.dateOfBirth.value,
    //   gender: e.target.gender.value,
    //   placeOfBirth: e.target.placeOfBirth.value,
    //   nation: e.target.nation.value,
    //   cmnd: e.target.cmnd.value,
    //   issuanceDate: e.target.issuanceDate.value,
    //   issuancePlace: e.target.issuancePlace.value,
    //   address1: e.target.address1.value,
    //   address2: e.target.address2.value,
    // };
  };
  return (
    <div className="form_body container">
      <div>
        <h2>Phân Quyền Sinh Viên</h2>
      </div>
      <div className="body_form mt-3">
        <form className="d-flex" onSubmit={handleSubmit}>
          <div className="col col-4 img-avt d-flex flex-column align-items-center">
            <label htmlFor="img-file">
              <img
                src="https://pic.onlinewebfonts.com/svg/img_212908.png"
                alt=""
                width="150"
              />
            </label>
            <input
              type="file"
              id="img-file"
              name="myImage"
              accept="image/png, image/gif, image/jpeg"
            />
          </div>
          <div className="col col-8">
            <div className="d-flex flex-column">
              <label htmlFor="name">
                Họ và tên <span style={{ color: 'red' }}>*</span>
              </label>
              <input type="text" placeholder="Họ và tên" name="name" />
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="dateOfBirth">
                Ngày sinh <span style={{ color: 'red' }}>*</span>
              </label>
              <input type="date" placeholder="Ngày sinh" name="dateOfBirth" />
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="studentId">
                Mã số sinh viên <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Mã số sinh viên"
                name="studentId"
              />
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="faculty">
                Khoa <span style={{ color: 'red' }}>*</span>
              </label>
              <select
                name="faculty"
                id="faculty"
                value={faculty}
                onChange={(e) => {
                  setFaculty(e.target.value);
                }}
              >
                <option value="KTTT">Khoa học và kỹ thuật thông tin</option>
                <option value="KTPM">Kỹ thuật phần mềm</option>
                <option value="KTMT">Kỹ thuật máy tính</option>
                <option value="KHMT">Khoa học máy tính</option>
                <option value="HTTT">Hệ thống thông tin</option>
              </select>
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="schoolYear">
                Khóa đào tạo <span style={{ color: 'red' }}>*</span>
              </label>
              <input type="text" placeholder="Khóa đào tạo" name="schoolYear" />
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="class">
                Lớp sinh hoạt <span style={{ color: 'red' }}>*</span>
              </label>
              <input type="text" placeholder="Lớp sinh hoạt" name="class" />
            </div>
            <div className="d-flex flex-column">
              <label htmlFor="walletAddress">
                Địa chỉ ví <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Địa chỉ ví"
                name="walletAddress"
              />
            </div>
            <div className="d-flex flex-row-reverse">
              <button className="submitbtn" type="submit">
                Tạo
              </button>
              <button className="submitbtn cancel_btn">Hủy</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GrantRoleStudent;
