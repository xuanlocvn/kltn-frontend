import React, { useState } from 'react';
import { managerPoolContractService } from 'src/contracts/manager-pool.service';
import useAvata from 'src/hooks/useAvata';
import { AddDataToIPFS } from 'src/ipfs/ipfsClient';
import { convertDateToTimestamp } from 'src/utils';
// import PropTypes from 'prop-types';

CreateNewClass.propTypes = {};

function CreateNewClass() {
  const [faculty, setFaculty] = useState('');
  const [subject, setSubject] = useState('');
  const { onChangeAvt, defaultAvt } = useAvata();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const classInfoForm = {
      img: defaultAvt,
      name: e.target.name.value,
      classId: e.target.classId.value,
      maxEntrant: e.target.maxEntrant.value,
      lecturerInCharge: e.target.lecturerInCharge.value,
      startTime: convertDateToTimestamp(e.target.startTime.value),
      endTime: convertDateToTimestamp(e.target.endTime.value),
      endTimeToRegister: convertDateToTimestamp(
        e.target.endTimeToRegister.value,
      ),
      endTimeToConfirm: convertDateToTimestamp(e.target.endTimeToConfirm.value),
      description: e.target.description.value,
    };
    console.log(classInfoForm);
    const hash = await AddDataToIPFS(classInfoForm);
    console.log(hash);
    await managerPoolContractService.createNewSubject(
      hash,
      classInfoForm.classId,
      classInfoForm.maxEntrant,
      classInfoForm.lecturerInCharge,
      classInfoForm.startTime,
      classInfoForm.endTimeToRegister,
      classInfoForm.endTime,
      classInfoForm.endTimeToConfirm,
    );
  };
  return (
    <div className="form_body container">
      <div>
        <h2>Tạo lớp học</h2>
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
                Tên môn học <span style={{ color: 'red' }}>*</span>
              </label>
              <select
                name="name"
                id="name"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              >
                <option value="NMLT">Nhập môn lập trình</option>
                <option value="NMLT">Nhập môn lập trình</option>
                <option value="NMLT">Nhập môn lập trình</option>
              </select>
            </div>
            <div className="d-flex flex-column mb-2">
              <label htmlFor="classId">
                Mã lớp <span style={{ color: 'red' }}>*</span>
              </label>
              <input type="text" placeholder="Mã lớp" name="classId" required />
            </div>
            <div className="d-flex flex-column mb-2">
              <label htmlFor="maxEntrant">
                Số lượng sinh viên tối đa{' '}
                <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="number"
                placeholder="Số lượng sinh viên tối đa"
                name="maxEntrant"
                required
              />
            </div>
            <div className="d-flex flex-column mb-2">
              <label htmlFor="lecturerInCharge">
                Giảng viên phụ trách <span style={{ color: 'red' }}>*</span>
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
                  Kêt thúc
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
            <div className="d-flex justify-content-between row mb-2">
              <div className="d-flex flex-column col col-6">
                <label htmlFor="endTimeToRegister">
                  Kết thúc đăng ký
                  <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="datetime-local"
                  placeholder="Thời gian kết thúc đăng ký"
                  name="endTimeToRegister"
                  required
                />
              </div>
              <div className="d-flex flex-column col col-6">
                <label htmlFor="endTimeToConfirm ">
                  Đánh giá
                  <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="datetime-local"
                  placeholder="Thời gian kết thúc đánh giá"
                  name="endTimeToConfirm"
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

export default CreateNewClass;
