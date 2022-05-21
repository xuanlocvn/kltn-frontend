import React, { useState } from 'react';
import { marketplaceContractService } from 'src/contracts/maketplace.service';
import useAvata from 'src/hooks/useAvata';
import { AddDataToIPFS } from 'src/ipfs/ipfsClient';

function CreateNewProduct() {
  const [faculty, setFaculty] = useState('');
  const { onChangeAvt, defaultAvt } = useAvata();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    const productInfoForm = {
      img: defaultAvt,
      name: e.target.name.value,
      productId: e.target.productId.value,
      productType: e.target.productType.value,
      amount: e.target.amount.value,
      price: e.target.price.value,
      description: e.target.description.value,
    };
    console.log(productInfoForm);
    const hash = await AddDataToIPFS(productInfoForm);
    console.log(hash);
    await marketplaceContractService.createAndListNFT(
      [hash, productInfoForm.productType === 'course'],
      productInfoForm.price,
      productInfoForm.amount,
    );
  };
  return (
    <div className="form_body container">
      <div>
        <h2>Tạo vật phẩm</h2>
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
                Tên vật phẩm <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Tên vật phẩm"
                name="name"
                required
              />
            </div>
            <div className="d-flex flex-column mb-2">
              <label htmlFor="productId">
                Mã vật phẩm <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Mã vật phẩm"
                name="productId"
                required
              />
            </div>
            <div className="d-flex flex-column mb-2">
              <label htmlFor="productType">
                Loại vật phẩm<span style={{ color: 'red' }}>*</span>
              </label>
              <select
                name="productType"
                id="productType"
                value={faculty}
                onChange={(e) => {
                  setFaculty(e.target.value);
                }}
              >
                <option value="course">Khóa học</option>
                <option value="items">Vật phẩm</option>
                <option value="Khác">Khác</option>
              </select>
            </div>
            <div className="d-flex justify-content-between row mb-2">
              <div className="d-flex flex-column col col-6">
                <label htmlFor="amount">
                  Số lượng vật phẩm
                  <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="number"
                  placeholder="Số lượng vật phẩm"
                  name="amount"
                  required
                />
              </div>
              <div className="d-flex flex-column col col-6">
                <label htmlFor="price">
                  Giá mỗi vật phẩm
                  <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="number"
                  placeholder="Giá mỗi vật phẩm"
                  name="price"
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

export default CreateNewProduct;
