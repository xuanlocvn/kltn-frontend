import React, { useState } from 'react';
import { managerPoolContractService } from 'src/contracts/manager-pool.service';
import useAvata from 'src/hooks/useAvata';
import { AddDataToIPFS } from 'src/ipfs/ipfsClient';
// import PropTypes from 'prop-types';

GrantRoleLecturer.propTypes = {};

function GrantRoleLecturer() {
  const [faculty, setFaculty] = useState('');
  const { onChangeAvt, defaultAvt } = useAvata();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const lecturerInfoForm = {
      name: e.target.name.value.trim(),
      dateOfBirth: e.target.dateOfBirth.value.trim(),
      lecturerId: e.target.lecturerId.value.trim(),
      faculty: e.target.faculty.value.trim(),
      walletAddress: e.target.walletAddress.value.trim(),
    };
    console.log(lecturerInfoForm);
    const hash = await AddDataToIPFS(lecturerInfoForm);
    console.log(hash);
    await managerPoolContractService.addLecturerInfo(
      lecturerInfoForm.walletAddress,
      hash,
    );
  };
  return (
    <div className="form_body container">
      <div>
        <h2>Phân Quyền Giảng Viên</h2>
      </div>
      <div className="body_form mt-3">
        <form className="d-flex" onSubmit={handleSubmit}>
          <div className="col col-4 img-avt d-flex flex-column align-items-center">
            <label htmlFor="myImage">
              <img src={defaultAvt} alt="" />
              <p>
                <i>Nhấn để chọn ảnh mới</i>
              </p>
            </label>
            <input
              type="file"
              id="myImage"
              name="myImage"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => onChangeAvt(e)}
            />
          </div>
          <div className="col col-8">
            <div className="d-flex flex-column mb-2">
              <label htmlFor="name">
                Họ và tên <span style={{ color: 'red' }}>*</span>
              </label>
              <input type="text" placeholder="Họ và tên" name="name" required />
            </div>
            <div className="d-flex flex-column  mb-2">
              <label htmlFor="dateOfBirth">
                Ngày sinh <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="date"
                placeholder="Ngày sinh"
                name="dateOfBirth"
                required
              />
            </div>
            <div className="d-flex flex-column  mb-2">
              <label htmlFor="lecturerId">
                Mã giảng viên <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Mã giảng viên"
                name="lecturerId"
                required
              />
            </div>
            <div className="d-flex flex-column  mb-2">
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
            <div className="d-flex flex-column  mb-2">
              <label htmlFor="walletAddress">
                Địa chỉ ví <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Địa chỉ ví"
                name="walletAddress"
                required
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

export default GrantRoleLecturer;
