import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StudentInfo } from 'src/utils/window';
import { convertLocalTime } from 'src/utils';

StudentInfomation.propTypes = {
  onSubmit: PropTypes.func,
  studentInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    placeOfBirth: PropTypes.string.isRequired,
    nation: PropTypes.string.isRequired,
    cmnd: PropTypes.string.isRequired,
    issuanceDate: PropTypes.string.isRequired,
    issuancePlace: PropTypes.string.isRequired,
    address1: PropTypes.string,
    address2: PropTypes.string,
  }),
};

StudentInfomation.defaultProps = {
  onSubmit: null,
  studentInfo: {
    name: 'Mai Nguyen Duc Tho',
    dateOfBirth: convertLocalTime(1650438993),
    gender: 'Nữ',
    placeOfBirth: 'Long An',
    nation: 'Kinh',
    cmnd: '123456789',
    issuanceDate: convertLocalTime(1450017483),
    issuancePlace: 'Long An',
    address1: 'Long An',
    address2: 'Long An',
  },
};

function StudentInfomation(props) {
  const { onSubmit, studentInfo } = props;

  const [gender, setGender] = useState('Nam');

  useEffect(() => {
    setGender(studentInfo.gender);
  }, [studentInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    const studentInfoForm: StudentInfo = {
      name: e.target.name.value,
      dateOfBirth: e.target.dateOfBirth.value,
      gender: e.target.gender.value,
      placeOfBirth: e.target.placeOfBirth.value,
      nation: e.target.nation.value,
      cmnd: e.target.cmnd.value,
      issuanceDate: e.target.issuanceDate.value,
      issuancePlace: e.target.issuancePlace.value,
      address1: e.target.address1.value,
      address2: e.target.address2.value,
    };
    onSubmit(studentInfoForm);
  };

  return (
    <div className="studentInformation">
      <div>
        <h2>Thông Tin Sinh Viên</h2>
      </div>
      <div className="body_form mt-3">
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          <div>
            <div className="d-flex flex-column mb-2 row">
              <div className="d-flex flex-column">
                <label htmlFor="name">
                  Họ và tên <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  name="name"
                  defaultValue={studentInfo.name}
                />
              </div>
            </div>
            <div className="d-flex mb-2 row">
              <div className="d-flex flex-column col col-3">
                <label htmlFor="birthday">
                  Ngày sinh <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="date"
                  placeholder="Ngày sinh"
                  name="dateOfBirth"
                  defaultValue={studentInfo.dateOfBirth}
                />
              </div>
              <div className="d-flex flex-column col col-3">
                <label htmlFor="gender">
                  Giới tính <span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={(e) => {
                    console.log(e.target.value);
                    setGender(e.target.value);
                  }}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
              <div className="d-flex flex-column col col-3">
                <label htmlFor="placeOfBirth">
                  Nơi sinh <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nơi sinh"
                  name="placeOfBirth"
                  defaultValue={studentInfo.placeOfBirth}
                />
              </div>
              <div className="d-flex flex-column col col-3">
                <label htmlFor="nation">
                  Dân tộc <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Dân tộc"
                  name="nation"
                  defaultValue={studentInfo.nation}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between row">
              <div className="d-flex flex-column mb-2 col col-4">
                <label htmlFor="cmnd">
                  CMND/CCCD <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="CMND/CCCD"
                  name="cmnd"
                  defaultValue={studentInfo.cmnd}
                />
              </div>
              <div className="d-flex flex-column mb-2 col col-4">
                <label htmlFor="issuanceDate">
                  Ngày cấp <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="date"
                  name="issuanceDate"
                  defaultValue={
                    studentInfo.issuanceDate != ''
                      ? studentInfo.issuanceDate
                      : 'today'
                  }
                />
              </div>
              <div className="d-flex flex-column col col-4">
                <label htmlFor="issuancePlace">
                  Nơi cấp <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nơi cấp"
                  name="issuancePlace"
                  defaultValue={studentInfo.issuancePlace}
                />
              </div>
            </div>
            <div className="d-flex flex-column mb-2 row">
              <div className="d-flex flex-column">
                <label htmlFor="address1">Địa chỉ tạm trú</label>
                <input
                  type="text"
                  placeholder="Địa chỉ tập trú"
                  name="address1"
                  defaultValue={studentInfo.address1}
                />
              </div>
            </div>
            <div className="d-flex flex-column row">
              <div className="d-flex flex-column">
                <label htmlFor="address2">Địa chỉ thường trú</label>
                <input
                  type="text"
                  placeholder="Địa chỉ thường trú"
                  name="address2"
                  defaultValue={studentInfo.address2}
                />
              </div>
            </div>
          </div>
          <button className="submitbtn" type="submit">
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentInfomation;
