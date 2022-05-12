import React from 'react';
import PropTypes from 'prop-types';

StudentAccount.propTypes = {
  walletAddress: PropTypes.string,
  totalToken: PropTypes.number,
};

StudentAccount.defaultProps = {
  walletAddress: '',
  totalToken: 0,
};

function StudentAccount(props) {
  const { walletAddress, totalToken } = props;

  return (
    <div className="studentAccount">
      <div>
        <h2>Tài Khoản Sinh Viên</h2>
      </div>
      <div className="body_form mt-3">
        <form action="" method="post" className="d-flex flex-column">
          <div className="d-flex mb-2">
            <div className="d-flex flex-column flex-grow-1">
              <label htmlFor="walletAddress">
                Địa chỉ ví<span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="0x1a2C3..."
                name="walletAddress"
                disabled
                defaultValue={walletAddress != '' ? walletAddress : ''}
                style={{ cursor: 'not-allowed' }}
              />
            </div>
            <button
              className="submitbtn"
              type="submit"
              disabled
              style={{ cursor: 'not-allowed' }}
            >
              Cập nhật
            </button>
          </div>
        </form>
        <div>
          <div>
            <label className="d-block">Số dư token</label>
            <div className="d-flex justify-content-around">
              <div>
                <p className="amountToken d-inline-block">{totalToken}</p>
                <p className="d-inline-block" style={{ fontWeight: 'bold' }}>
                  Token
                </p>
              </div>
            </div>
          </div>
          <div className="historyTable">
            <table>
              <tbody>
                <tr className="row">
                  <th className="col col-3 text-center">STT</th>
                  <th className="col col-3 text-center">Tên</th>
                  <th className="col col-3 text-center">Biến động số dư</th>
                  <th className="col col-3 text-center">Thời gian</th>
                </tr>
                <tr className="row">
                  <td className="col col-3 text-center">123</td>
                  <td className="col col-3 text-center">Mùa Hè Xanh</td>
                  <td className="col col-3 text-center">
                    <span className="text-success fw-bold">+50</span>
                  </td>
                  <td className="col col-3 text-center">13/12/2000</td>
                </tr>
                <tr className="row">
                  <td className="col col-3 text-center">123</td>
                  <td className="col col-3 text-center">Học phí học kỳ I</td>
                  <td className="col col-3 text-center">
                    <span className="text-danger fw-bold">-500</span>
                  </td>
                  <td className="col col-3 text-center">13/12/2000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentAccount;
