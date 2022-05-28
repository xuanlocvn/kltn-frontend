import React from 'react';
import PropTypes from 'prop-types';
import '../StudentPage.scss';

StudentCoverInfo.propTypes = {
  avataImage: PropTypes.string,
  coverImage: PropTypes.string,
  studentName: PropTypes.string,
  studentId: PropTypes.string,
  studentMajor: PropTypes.string,
  class: PropTypes.string,
  faculty: PropTypes.string,
  schoolYear: PropTypes.string,
};

StudentCoverInfo.defaultProps = {
  avataImage:
    'https://img4.thuthuatphanmem.vn/uploads/2020/12/25/avt-chibi-doc_115941237.jpg',
  coverImage:
    'https://khtc.uit.edu.vn/sites/all/themes/whitebull/images/slideshow/UIT.jpg',
  studentName: 'UNKNOW',
  studentId: 'Loading',
  studentMajor: 'Loading',
  class: 'Loading',
  faculty: 'Loading',
  schoolYear: 'Loading',
};

function StudentCoverInfo(props) {
  return (
    <div className="student_info">
      <div
        className="infor_cover"
        style={{
          backgroundImage: `url(${props.coverImage})`,
        }}
      ></div>
      <div className="info_avt d-flex align-items-center">
        <div className="col col-3">
          <img className="avt" src={props.avataImage} alt="This is image" />
        </div>
        <div className="info col col-9">
          <div className="mb-3">
            <h2>{props.studentName}</h2>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <p>
                <span>Mã số sinh viên: </span>
                {props.studentId}
              </p>
              <p>
                <span>Ngành học: </span>
                {props.studentMajor}
              </p>
            </div>
            <div>
              <p>
                <span>Lớp sinh hoạt: </span>
                {props.class}
              </p>
              <p>
                <span>Khóa: </span>
                {props.schoolYear}
              </p>
            </div>
            <div>
              <p>
                <span>Khoa: </span>
                {props.faculty}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCoverInfo;
