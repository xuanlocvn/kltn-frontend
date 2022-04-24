import React from 'react';
import PropTypes from 'prop-types';
import './MissonListPage.scss';

MissonListPage.propTypes = {};

function MissonListPage(props) {
  return (
    <div className="list">
      <div>
        <h2>Danh Sách Nhiệm Vụ</h2>
      </div>
      <div className="list_filter">
        <button className="filter_btn active">Tất cả</button>
        <button className="filter_btn">Đã tham gia</button>
        <button className="filter_btn">Chưa tham gia</button>
      </div>
      <div className="mission mt-4 d-flex flex-wrap">
        <div className="mission_element col-4">
          <h5>
            <strong>Thăm viếng nghĩa trang liệt sĩ - MS212356</strong>
          </h5>
          <p>
            <b>Số lượng:</b> 45
          </p>
          <p className="element_status">Đang mở</p>
          <button className="join_btn">Tham gia</button>
        </div>
        <div className="mission_element col col-4">
          <h5>
            <strong>Thăm viếng nghĩa trang liệt sĩ - MS212356</strong>
          </h5>
          <p>
            <b>Số lượng:</b> 45
          </p>
          <p className="element_status">Đang mở</p>
          <button className="join_btn cancel_btn">Huỷ</button>
        </div>
        <div className="mission_element col col-4">
          <h5>
            <strong>Thăm viếng nghĩa trang liệt sĩ - MS212356</strong>
          </h5>
          <p>
            <b>Số lượng:</b> 45
          </p>
          <p className="element_status">Đang mở</p>
          <button className="join_btn">Tham gia</button>
        </div>
        <div className="mission_element col col-4">
          <h5>
            <strong>Thăm viếng nghĩa trang liệt sĩ - MS212356</strong>
          </h5>
          <p>
            <b>Số lượng:</b> 45
          </p>
          <p className="element_status">Đang mở</p>
          <button className="join_btn">Tham gia</button>
        </div>
        <div className="mission_element col col-4">
          <h5>
            <strong>Thăm viếng nghĩa trang liệt sĩ - MS212356</strong>
          </h5>
          <p>
            <b>Số lượng:</b> 45
          </p>
          <p className="element_status">Đang mở</p>
          <button className="join_btn">Tham gia</button>
        </div>
        <div className="mission_element col col-4">
          <h5>
            <strong>Thăm viếng nghĩa trang liệt sĩ - MS212356</strong>
          </h5>
          <p>
            <b>Số lượng:</b> 45
          </p>
          <p className="element_status">Đang mở</p>
          <button className="join_btn">Tham gia</button>
        </div>
      </div>
      <div className="pagination">
        <div>Trang đầu</div>
        <div></div>
        <div className="active">1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div></div>
        <div>Trang cuối</div>
        <div>Su dung package</div>
      </div>
    </div>
  );
}

export default MissonListPage;
