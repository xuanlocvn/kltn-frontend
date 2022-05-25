import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from 'src/components/shared/Pagination/Pagination';
import './ProductListPage.scss';

const ProductList = [
  {
    subjectId: 1,
    name: 'Nhập môn lập trình - IT001',
    amount: 45,
    joinedAmount: 20,
    isList: true,
    isOwned: true,
    isRequested: true,
    isActivated: true,
    status: '',
  },
];

function ProductListPage() {
  const [totalPage, setTotalPage] = useState(null);
  const [page, setPage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [productList, setProductList] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [search, setSearch] = useState({
    searchName: '',
    productType: '',
    payment: '',
    from: null,
    to: null,
  });

  useEffect(() => {
    setProductList(ProductList);
  }, []);

  useEffect(() => {
    const filter = searchParams.get('filter')
      ? searchParams.get('filter')
      : 'all';
    const p = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
    const getListByFilter = (filter: string) => {
      if (filter == 'owned') {
        const ownedProductList = productList.filter(
          (subject) => subject.isOwned == true,
        );
        return ownedProductList;
      } else if (filter == 'requested') {
        const requestedProductList = productList.filter(
          (subject) => subject.isRequested == true,
        );
        return requestedProductList;
      } else if (filter == 'activated') {
        const activatedProductList = productList.filter(
          (subject) => subject.isRequested == true,
        );
        return activatedProductList;
      }
      return productList;
    };

    const getListByPage = (list: any[], page: number) => {
      const ttp = Math.ceil(list.length / 9);
      if (page > ttp) {
        page = ttp;
      }
      const indexFrom = (page - 1) * 9;
      const indexTo = page * 9 - 1;
      return list.filter(
        (element, index) => index >= indexFrom && index <= indexTo,
      );
    };

    const list = getListByFilter(filter);
    setTotalPage(Math.ceil(list.length / 9));
    const listByPage = getListByPage(list, p);
    setRenderList(listByPage);
    if (page > Math.ceil(list.length / 9)) {
      setSearchParams({ filter, page: Math.ceil(list.length / 9).toString() });
    } else {
      if (p <= 0) {
        setPage(1);
        setSearchParams({ filter, page: '1' });
      } else setPage(p);
    }
  }, [page, filter]);

  useEffect(() => {
    console.log('render: ', renderList);
  }, [renderList]);

  const onPaginate = (page: number) => {
    const filter = searchParams.get('filter')
      ? searchParams.get('filter')
      : 'all';
    if (page > totalPage) page = totalPage;
    const params = { filter, page: page.toString() };
    setSearchParams(params);
    setPage(page);
  };

  const onFilter = (filter: string) => {
    const page = searchParams.get('page') ? searchParams.get('page') : '1';
    setSearchParams({ filter, page });
    setFilter(filter);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      searchName: e.target.searchName.value,
      productType: e.target.productType.value,
      payment: e.target.payment.value,
      from: e.target.from.value,
      to: e.target.to.value,
    });
    setSearch({
      searchName: e.target.searchName.value,
      productType: e.target.productType.value,
      payment: e.target.payment.value,
      from: e.target.from.value,
      to: e.target.to.value,
    });
  };

  return (
    <>
      <div className="products d-flex mt-5">
        <div className="products-filter col col-3">
          <h4>Bộ lọc</h4>
          <form onSubmit={handleSubmit}>
            <div className="filter d-flex flex-column">
              <div className="filter-item">
                <h6>Tìm kiếm</h6>
                <input
                  className="search-input"
                  type="text"
                  name="searchName"
                  placeholder="Tìm kiếm ..."
                  defaultValue={search.searchName}
                />
              </div>
              <div className="filter-item">
                <h6>Loại</h6>
                <select
                  name="productType"
                  id="productType"
                  value={search.productType}
                  onChange={() => console.log('changed')}
                >
                  <option value="Khoá học">Khoá học</option>
                  <option value="Vật phẩm">Vật phẩm</option>
                </select>
              </div>
              <div className="filter-item">
                <h6>Giá</h6>
                <select
                  name="payment"
                  id="payment"
                  value={search.payment}
                  onChange={() => console.log('changed')}
                >
                  <option className="select-item" value="Token">
                    Token
                  </option>
                  <option className="select-item" value="USD">
                    USD
                  </option>
                </select>
                <div className="d-flex mt-2 justify-content-between">
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Từ"
                    name="from"
                    id="from"
                    defaultValue={search.from}
                  />
                  <div style={{ width: '10%' }}></div>
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Đến"
                    name="to"
                    id="to"
                    defaultValue={search.to}
                  />
                </div>
              </div>
              <button className="submitbtn" type="submit">
                Cập nhật
              </button>
            </div>
          </form>
        </div>
        <div className="products-list col col-9">
          <div className="list_filter">
            <button
              className={`filter_btn ${filter == 'all' ? 'active' : ''}`}
              onClick={() => onFilter('all')}
            >
              Tất cả
            </button>
            <button
              className={`filter_btn ${filter == 'owned' ? 'active' : ''}`}
              onClick={() => onFilter('owned')}
            >
              Sỡ hữu
            </button>
            <button
              className={`filter_btn ${filter == 'requested' ? 'active' : ''}`}
              onClick={() => onFilter('requested')}
            >
              Đã yêu cầu
            </button>
            <button
              className={`filter_btn ${filter == 'activated' ? 'active' : ''}`}
              onClick={() => onFilter('activated')}
            >
              Đã kích hoạt
            </button>
          </div>

          <div className="d-flex flex-wrap mt-4">
            <div className="product-item col col-3">
              <Link to={`/products/${1}`}>
                <img
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
                <div className="product-info">
                  <h5
                    style={{
                      width: 'fit-content',
                      margin: 'auto',
                      marginBottom: '20px',
                    }}
                  >
                    Mouse Logitech 3000
                  </h5>
                  <div className="mt-2">
                    <div className="d-flex justify-content-around">
                      <p>
                        <b>Loại: </b>Vật dụng
                      </p>
                      <p>
                        <b>Số lượng: </b>3
                      </p>
                    </div>
                    <p style={{ width: 'max-content', margin: 'auto' }}>
                      <span className="text-danger fs-3 fw-bold">3000</span>{' '}
                      coin
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <Pagination
            currentPage={page}
            totalPage={totalPage}
            onPaginate={onPaginate}
          />
        </div>
      </div>
    </>
  );
}

export default ProductListPage;
