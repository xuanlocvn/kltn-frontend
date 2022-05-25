import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { selectRole } from 'src/components/shared/Header/HeaderSlice';
import { missionContracService } from 'src/contracts/mission-contract.service';
import './MissionDetail.scss';

const detailInfo = {
  id: '123456',
  joined: false,
  contractAddress: '0x4B116B61DDFA9F0642B1EF430dE2CEB33A55915B',
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
  const [open, setOpen] = useState(false);
  const role = useAppSelector(selectRole);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const getDetail = async (missionId: number | string) => {
      console.log(missionId);
      setDetail(detailInfo);
    };

    getDetail(missionId);
  }, []);

  const handleRegister = async (contractAddress: string) => {
    await missionContracService.register(contractAddress);
  };

  const handleCancelRegister = async (contractAddress: string) => {
    await missionContracService.cancelRegister(contractAddress);
  };

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
              {detail.joined ? (
                <button
                  className="join_btn cancel"
                  onClick={() => handleCancelRegister(detail.contractAddress)}
                >
                  Hủy
                </button>
              ) : (
                <button
                  className="join_btn join"
                  onClick={() => handleRegister(detail.contractAddress)}
                >
                  Tham gia
                </button>
              )}
            </div>
          </div>
          <div
            className="detail-description mt-5"
            onClick={() => setOpen(!open)}
          >
            <h3>Mô tả</h3>
            <Collapse in={open}>
              <div id="example-collapse-text" style={{ fontSize: '20px' }}>
                {detail.description}
              </div>
            </Collapse>
          </div>
        </>
      )}

      {role.role == 'LECTURER' && (
        <div className="historyTable mt-5">
          <h2>Bảng đánh giá sinh viên</h2>
          <form>
            <table className="mt-3">
              <tbody>
                <tr className="row">
                  <th className="col col-2 text-center"></th>
                  <th className="col col-3 text-center">Mã số sinh viên</th>
                  <th className="col col-3 text-center">Tên</th>
                  <th className="col col-4 text-center">Trạng thái</th>
                </tr>
                <tr className="row">
                  <td className="col col-2 text-center">
                    <input type="checkbox" name="confirm" id="1" />
                  </td>
                  <td className="col col-3 text-center">18520369</td>
                  <td className="col col-3 text-center">Mai Nguyễn Đức Thọ</td>
                  <td className="col col-4 text-center">
                    <span className="text-success fw-bold">Đã hoàn thành</span>
                  </td>
                </tr>
                <tr className="row">
                  <td className="col col-2 text-center">
                    <input type="checkbox" name="confirm" id="1" />
                  </td>
                  <td className="col col-3 text-center">18520369</td>
                  <td className="col col-3 text-center">Mai Nguyễn Đức Thọ</td>
                  <td className="col col-4 text-center">
                    <span className="text-danger fw-bold">Chưa hoàn thành</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex flex-row-reverse mt-5">
              <button className="completed">Hoàn thành</button>
              <button className="not-completed">Chưa hoàn thành</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default MissionDetail;
