import React, { useState } from 'react';
import { managerPoolContractService } from 'src/contracts/manager-pool.service';
import useAvata from 'src/hooks/useAvata';
import { AddDataToIPFS } from 'src/ipfs/ipfsClient';
import { convertDateToTimestamp } from 'src/utils';
// import PropTypes from 'prop-types';

CreateNewTuition.propTypes = {};

function CreateNewTuition() {
  const [faculty, setFaculty] = useState('');
  const { onChangeAvt, defaultAvt } = useAvata();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tuitionInfoForm = {
      img: defaultAvt,
      name: e.target.name.value,
      tuitionId: e.target.tuitionId.value,
      lecturerInCharge: e.target.lecturerInCharge.value,
      lecturerName:
        e.target.lecturerInCharge.options[
          e.target.lecturerInCharge.selectedIndex
        ].text,
      amountToken: e.target.amountToken.value,
      amountCurency: e.target.amountCurency.value,
      startTime: convertDateToTimestamp(e.target.startTime.value),
      endTime: convertDateToTimestamp(e.target.endTime.value),
      description: e.target.description.value,
    };

    console.log(tuitionInfoForm);
    const hash = await AddDataToIPFS(tuitionInfoForm);
    console.log(hash);
    await managerPoolContractService.createNewTuition(
      hash,
      tuitionInfoForm.tuitionId,
      tuitionInfoForm.amountToken,
      tuitionInfoForm.startTime,
      tuitionInfoForm.endTime,
    );
  };
  return (
    <div className="form_body container">
      <div>
        <h2>Tạo đợt đóng học phí</h2>
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
                Tên đợt đóng học phí <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Tên môn học"
                name="name"
                required
                value={'Đóng học phí năm học'}
              />
            </div>
            <div className="d-flex flex-column mb-2">
              <label htmlFor="tuitionId">
                Mã đợt đóng học phí <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Mã lớp"
                name="tuitionId"
                required
              />
            </div>
            <div className="d-flex flex-column mb-2">
              <label htmlFor="lecturerInCharge">
                Người phụ trách chính<span style={{ color: 'red' }}>*</span>
              </label>
              <select
                name="lecturerInCharge"
                id="lecturerInCharge"
                value={faculty}
                onChange={(e) => {
                  setFaculty(e.target.value);
                }}
              >
                <option value="0xaFc15374b980F7aeb7f63123E94aee915d11F81D">
                  Mai Nguyễn Đức Thọ
                </option>
                <option value="0xaFc15374b980F7aeb7f63123E94aee915d11F81D">
                  Mai Nguyễn Đức Thọ
                </option>
                <option value="0xaFc15374b980F7aeb7f63123E94aee915d11F81D">
                  Mai Nguyễn Đức Thọ
                </option>
              </select>
            </div>
            <div className="d-flex justify-content-between row mb-2">
              <div className="d-flex flex-column col col-6">
                <label htmlFor="amountToken">
                  Số token phải thanh toán
                  <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="number"
                  placeholder="Số token phải thanh toán"
                  name="amountToken"
                  required
                />
              </div>
              <div className="d-flex flex-column col col-6">
                <label htmlFor="amountCurency ">
                  Hoặc số tiền cần thanh toán
                  <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="number"
                  placeholder="Hoặc số tiền cần thanh toán"
                  name="amountCurency"
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-between row  mb-2">
              <div className="d-flex flex-column col col-6">
                <label htmlFor="startTime">
                  Bắt đầu
                  <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="datetime-local"
                  placeholder="Thời gian bắt đầu"
                  name="startTime"
                  required
                />
              </div>
              <div className="d-flex flex-column col col-6">
                <label htmlFor="endTime">
                  Kết thúc
                  <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="datetime-local"
                  placeholder="Thời gian kết thúc"
                  name="endTime"
                  required
                />
              </div>
            </div>
            <div className="d-flex flex-column mb-2">
              <label htmlFor="description">
                Mô tả <span style={{ color: 'red' }}>*</span>
              </label>
              <textarea placeholder="Mô tả" name="description" rows={5} />
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

export default CreateNewTuition;
