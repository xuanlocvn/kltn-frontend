import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MissionDetail.scss';

const detailInfo = {
  id: '123456',
  name: 'Mùa Hè Xanh 2018',
  status: 'Đang mở',
  startTime: '9am - 02.01.2021',
  endTime: '9am - 02.06.2021',
  endTimeToRegister: '9am - 31.01.2021',
  numberOfParticipate: '50',
  totalJoindParticipate: '200',
  object: 'Toàn thể sinh viên',
  totalToken: 100,
  unit: 'Đoàn trường',
  description: `Mùa hè xanh là một hoạt động thường niên, do Hội Sinh viên Việt
              Nam tổ chức, nhằm hướng sinh viên đến các hoạt động công ích xã
              hội, như: làm đường, làm cầu, xây nhà tình thương, tham gia xóa mù
              chữ và xóa mù tin học,... Hoạt động này được đông đảo sinh viên
              tham gia, và hầu hết các trường đại học, cao đẳng, trung học
              chuyên nghiệp ở Việt Nam đều tham gia.Mùa Hè Xanh là một chương
              trình tình nguyện diễn ra trong kỳ nghỉ hè, là một trong những
              hoạt động vô cùng ý nghĩa của các bạn học sinh, sinh viên. Nó
              không chỉ đơn thuần là một chuyến đi dài mà còn là một chuỗi các
              hoạt động xã hội mang ý nghĩa lớn lao và tính nhân văn sâu sắc.`,
};

function MissionDetail() {
  const { missionId } = useParams();
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    const getDetail = async (missionId: number | string) => {
      console.log(missionId);
      setDetail(detailInfo);
    };

    getDetail(missionId);
  }, []);

  return (
    <div className="mt-5">
      {detail != null && (
        <>
          <div className="detail-info">
            <div className="d-flex justify-content-between">
              <h2>Mùa Hè Xanh 2018</h2>
              <div>
                <p>
                  <span className="status status__open">{detail.status}</span>
                </p>
                <p>
                  <b>Mã nhiệm vụ: </b> {detail.id}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-around">
              <div>
                <p>
                  <b>Thời gian diễn ra: </b>
                </p>
                <p>Bắt đầu: {detail.startTime}</p>
                <p>Kết thúc: {detail.endTime}</p>
                <p>
                  <b>Kết thúc đăng ký: </b> {detail.endTimeToRegister}
                </p>
              </div>
              <div>
                <p>
                  <b>Số lượng tham gia: </b> {detail.numberOfParticipate}/{' '}
                  {detail.totalToken}
                </p>
                <p>
                  <b>Đối tượng: </b> {detail.object}
                </p>
                <p>
                  <b>Token nhận được: </b> {detail.totalToken} coin
                </p>
                <p>
                  <b>Đơn vị tổ chức: </b> {detail.unit}
                </p>
              </div>
            </div>
            <div className="d-flex flex-row-reverse">
              <button className="disable">Tham gia ngay</button>
            </div>
          </div>
          <div className="detail-description mt-5">
            <h3>Mô tả</h3>
            <p>{detail.description}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default MissionDetail;
