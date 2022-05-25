import React, { useState } from 'react';
import './ProductDetail.scss';
import Popup from 'src/components/shared/Popup/Popup';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PaypalComponent from 'src/components/paypal/PaypalComponent';

function ProductDetail() {
  const [isShowPopup, setIsShowPopup] = useState(true);
  // This values are the props in the UI
  const amount = '2';
  const currency = 'USD';
  return (
    <>
      {isShowPopup && (
        <Popup>
          <div style={{ width: '500px', height: 'max-content' }}>
            <PayPalScriptProvider
              options={{
                'client-id': 'test',
                components: 'buttons',
                currency: 'USD',
              }}
            >
              <button className="payment-btn">Metamask</button>
              <PaypalComponent
                currency={currency}
                showSpinner={false}
                amount={amount}
              />
            </PayPalScriptProvider>
          </div>
        </Popup>
      )}
      <div>
        <div className="product-detail__info mt-5">
          <div className="d-flex justify-content-around">
            <div className="">
              <img
                src="https://product.hstatic.net/1000026716/product/gearvn_logitech_g502hero.png"
                alt=""
                width="400"
              />
            </div>
            <div className="">
              <h2 className="mb-4">Mouse Logitech 3000</h2>
              <div className="mb-5">
                <p>
                  <b>Mã vật phẩm: </b>HI535
                </p>
                <p>
                  <b>Loại vật phẩm: </b>Vật dụng
                </p>
                <p>
                  <b>Số lượng: </b>3
                </p>
                <p>
                  <b>Giá một vật phẩm: </b>500 coin
                </p>
                <p>
                  <b>Trạng thái: </b>Đang đăng bán
                </p>
              </div>
              <div className="d-flex flex-row-reverse">
                <button
                  className="btn btn-buy"
                  onClick={() => setIsShowPopup(true)}
                >
                  Mua
                </button>
                <button className="btn btn-deactive">Hủy kích hoạt</button>
                <button className="btn btn-active">Kích hoạt</button>
                <button className="btn btn-sell">Bán</button>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around">
            Mô tả:NodeJS là một mã nguồn mở, được dùng để xây dựng các ứng dụng
            mạng, đặc biệt các ứng đòi hỏi real time (thời gian thực) & khối
            lượng request lớn. Chúng ta có thể lập trình NodeJS với ngôn ngữ
            JavaScript. NodeJS có thể được dùng để xây dựng hoàn chỉnh một trang
            web, ngoài ra, NodeJS còn có thể tích hợp để xây dựng các ứng dụng
            real time trên iOS, Android, Game online với Unity, Cocos2dx. Mô
            tả:NodeJS là một mã nguồn mở, được dùng để xây dựng các ứng dụng
            mạng, đặc biệt các ứng đòi hỏi real time (thời gian thực) & khối
            lượng request lớn. Chúng ta có thể lập trình NodeJS với ngôn ngữ
            JavaScript. NodeJS có thể được dùng để xây dựng hoàn chỉnh một trang
            web, ngoài ra, NodeJS còn có thể tích hợp để xây dựng các ứng dụng
            real time trên iOS, Android, Game online với Unity, Cocos2dx.
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
