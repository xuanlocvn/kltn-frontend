import React, { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import Pagination from "src/components/shared/Pagination/Pagination"
import {
  CustomWindow,
  IProductInstance,
  IActivateRequestInstance,
} from "src/utils/window"
import {
  getActivatedProducts,
  getAllProductsOnSale,
  getProductsByOwner,
  getRequestedProducts,
} from "src/api/productApi"
import "./ProductListPage.scss"
import { useAppSelector } from "src/app/hooks"
import { selectRole } from "src/components/shared/Header/HeaderSlice"
import { activeNFTService } from "src/contracts/(remove)active-nft.service"
import { makeShotAccount } from "src/utils"
import SpinnerApp from "../../../components/shared/Spinner/Spinner"
import NotFound from "../../../components/shared/NotFound/NotFound"
import coinImg from "src/assets/images/coin.png"

declare let window: CustomWindow

function ProductListPage() {
  const [totalPage, setTotalPage] = useState(null)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState(null)
  const role = useAppSelector(selectRole)
  const [renderList, setRenderList] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams({})
  const [search, setSearch] = useState({
    searchName: "",
    productType: "",
    from: 0,
    to: 0,
  })
  const [type, setType] = useState("Khóa học")
  const [selectList, setSelectList] = useState([])
  const [totalList, setTotalList] = useState([])

  useEffect(() => {
    const f = searchParams.get("filter") ? searchParams.get("filter") : "all"
    const p = searchParams.get("page") ? Number(searchParams.get("page")) : 1
    setFilter(f)
    setPage(p)
  }, [])

  useEffect(() => {
    const f = searchParams.get("filter") ? searchParams.get("filter") : "all"
    const p = searchParams.get("page") ? Number(searchParams.get("page")) : 1

    const getListByPage = (list: any[], page: number) => {
      const ttp = Math.ceil(list.length / 12)
      if (page > ttp) {
        page = ttp
      }
      const indexFrom = (page - 1) * 12
      const indexTo = page * 12 - 1
      return list.filter(
        (element, index) => index >= indexFrom && index <= indexTo,
      )
    }

    const fetchApi = async () => {
      let productList
      switch (f) {
        case "owned": {
          const response1 = await getProductsByOwner(
            window.localStorage.account,
          )
          const response2 = await getAllProductsOnSale(
            window.localStorage.account,
          )
          productList = (response1.data.result && [
            ...response2.data.result,
            ...response1.data.result,
          ]) || [...response2.data.result]

          const output: any[] = []

          productList.forEach(function (item) {
            const existing = output.filter(
              (v) => v.productNftId == item.productNftId,
            )
            // eslint-disable-next-line no-empty
            if (existing.length != 0) {
              const index = output.findIndex(
                (x) => x.productNftId == item.productNftId,
              )
              output[index].totalAmountOnSale += item.amount
            } else {
              output.push(item)
            }
          })
          productList = output
          break
        }
        case "requested": {
          const response =
            role.role == "ADMIN"
              ? await getRequestedProducts()
              : await getRequestedProducts(window.localStorage.account)
          productList = response.data.result || []
          break
        }
        case "activated": {
          const response =
            role.role == "ADMIN"
              ? await getActivatedProducts()
              : await getActivatedProducts(window.localStorage.account)
          productList = response.data.result || []
          break
        }
        case "all": {
          const response = await getAllProductsOnSale()
          productList = response.data.result || []
          break
        }
      }

      setTotalList(productList)
      const _totalPage = Math.ceil(productList.length / 12)

      setTotalPage(_totalPage)
      const listByPage = getListByPage(productList, p)
      setRenderList(listByPage)
      if (page > _totalPage) {
        setSearchParams({
          filter,
          page: _totalPage > 0 ? _totalPage.toString() : "1",
        })
      } else {
        if (p <= 0) {
          setPage(1)
          setSearchParams({ filter, page: "1" })
        } else setPage(p)
      }
    }

    fetchApi()
  }, [page, filter])

  useEffect(() => {
    const p = searchParams.get("page") ? Number(searchParams.get("page")) : 1

    const getListByPage = (list: any[], page: number) => {
      const ttp = Math.ceil(list.length / 12)
      if (page > ttp) {
        page = ttp
      }
      const indexFrom = (page - 1) * 12
      const indexTo = page * 12 - 1
      return list.filter(
        (element, index) => index >= indexFrom && index <= indexTo,
      )
    }
    let list = []
    if (totalList) {
      list =
        search.searchName != ""
          ? totalList.filter((x: IProductInstance) =>
              x.productName
                .toLocaleLowerCase()
                .includes(search.searchName.toLocaleLowerCase()),
            )
          : totalList
      console.log(list)
      list =
        search.productType != ""
          ? list.filter((x: IProductInstance) =>
              x.productTypeName
                .toLocaleLowerCase()
                .includes(search.productType.toLocaleLowerCase()),
            )
          : list
      console.log(list)
      list =
        search.to != 0
          ? list.filter(
              (x: IProductInstance) =>
                Number(x.minPrice) >= Number(search.from) &&
                Number(x.minPrice) <= Number(search.to),
            )
          : list
      console.log(list)
    }
    const _totalPage = Math.ceil(list.length / 12)

    setTotalPage(_totalPage)
    const listByPage = getListByPage(list, p)
    setRenderList(listByPage)
    if (page > _totalPage) {
      setSearchParams({
        filter,
        page: _totalPage > 0 ? _totalPage.toString() : "1",
      })
    } else {
      if (p <= 0) {
        setPage(1)
        setSearchParams({ filter, page: "1" })
      } else setPage(p)
    }
  }, [search, page, filter])

  const onPaginate = (page: number) => {
    const filter = searchParams.get("filter")
      ? searchParams.get("filter")
      : "all"
    if (page > totalPage) page = totalPage
    if (page <= 0) page = 1
    const params = { filter, page: page.toString() }
    setSearchParams(params)
    setPage(page)
  }

  const onFilter = (filter: string) => {
    const page = searchParams.get("page") ? searchParams.get("page") : "1"
    setSearchParams({ filter, page })
    setFilter(filter)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      searchName: e.target.searchName.value,
      productType: type,
      from: e.target.from.value,
      to: e.target.to.value,
    })
    setSearch({
      searchName: e.target.searchName.value,
      productType: type,
      from: e.target.from.value,
      to: e.target.to.value,
    })
  }

  const handleCancelRequestActivateNFT = async (_activeId) => {
    await activeNFTService.cancelRequestActiveNFT(_activeId)
  }

  const handleActivateNFTByAdmin = async (_activeId: (number | string)[]) => {
    await activeNFTService.activeNFT(_activeId)
  }

  const handleSubmitAccept = async (e) => {
    e.preventDefault()
    role.role == "ADMIN"
      ? await handleActivateNFTByAdmin(selectList)
      : await handleCancelRequestActivateNFT(selectList)
  }

  const handleChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setSelectList([...selectList, value])
    } else {
      setSelectList(selectList.filter((e) => e !== value))
    }
  }

  return (
    <>
      {role.role == "LECTURER" ? (
        <NotFound />
      ) : (
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
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="Khoá học">Khoá học</option>
                    <option value="Vật phẩm">Vật phẩm</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                <div className="filter-item">
                  <h6>Giá</h6>
                  <div className="d-flex mt-2 justify-content-between">
                    <input
                      className="search-input"
                      type="number"
                      step="0.01"
                      placeholder="Từ"
                      name="from"
                      id="from"
                      defaultValue={0}
                    />
                    <div style={{ width: "10%" }}></div>
                    <input
                      className="search-input"
                      type="number"
                      step="0.01"
                      placeholder="Đến"
                      name="to"
                      id="to"
                      defaultValue={1000}
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
            <div style={{ minHeight: "580px" }}>
              <div className="list_filter">
                <button
                  className={`filter_btn ${filter == "all" ? "active" : ""}`}
                  onClick={() => onFilter("all")}
                >
                  Tất cả
                </button>
                <button
                  className={`filter_btn ${filter == "owned" ? "active" : ""}`}
                  onClick={() => onFilter("owned")}
                >
                  {role.role == "ADMIN" ? "Đăng bán" : "Sở hữu"}
                </button>
                <button
                  className={`filter_btn ${
                    filter == "requested" ? "active" : ""
                  }`}
                  onClick={() => onFilter("requested")}
                >
                  {role.role == "ADMIN" ? "Các yêu cầu" : "Đã yêu cầu"}
                </button>
                <button
                  className={`filter_btn ${
                    filter == "activated" ? "active" : ""
                  }`}
                  onClick={() => onFilter("activated")}
                >
                  Đã kích hoạt
                </button>
              </div>

              <div className="d-flex flex-wrap mt-4">
                {renderList == null && <SpinnerApp />}
                {renderList &&
                  (renderList.length > 0 ? (
                    (filter == "all" || filter == "owned") &&
                    renderList.map((product: IProductInstance, index) => (
                      <div key={index} className="product-item col col-3">
                        <Link
                          to={`/products/${product.productNftId}?filter=${filter}`}
                        >
                          <div className="productlist-img">
                            <img
                              src={product.productImg}
                              alt={product.productName}
                            />
                          </div>
                          <div className="product-info">
                            <div className="mt-2 text-center">
                              <h6
                                className="col pt-2"
                                style={{ height: "40px" }}
                              >
                                {product.productName}
                              </h6>
                            </div>
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-column">
                                <p>{product.productTypeName}</p>
                                <p>
                                  <b>Số lượng: </b>
                                  {product.totalAmountOnSale || product.amount}
                                </p>
                              </div>

                              <div className="col col-5 d-flex justify-content-center align-items-center product-price">
                                {product.minPrice ? (
                                  <>
                                    <h6 className="text-center text-primary fw-bold">
                                      {product.minPrice}
                                    </h6>
                                    <span style={{ width: "3px" }}></span>
                                    <img src={coinImg} className="coin" />
                                  </>
                                ) : (
                                  <h6 className="text-center text-primary fw-bold">
                                    {"Chưa bán"}
                                  </h6>
                                )}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <h4
                      className="text-center"
                      style={{ width: "max-content", margin: "200px auto" }}
                    >
                      <i>Danh sách trống</i>
                    </h4>
                  ))}
                <form
                  className="accept-all"
                  onSubmit={handleSubmitAccept}
                  style={{ width: "100%" }}
                >
                  <div className="d-flex">
                    {renderList &&
                      filter == "requested" &&
                      renderList.map(
                        (product: IActivateRequestInstance, index) => (
                          <div
                            key={index}
                            className="product-item col col-3 requested"
                          >
                            <div className="checkout">
                              <input
                                type="checkbox"
                                name="selected"
                                id="selected"
                                value={product.requestId}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="productlist-img">
                              <img
                                src={product.productImg}
                                alt={product.productName}
                              />
                            </div>
                            <div className="product-info">
                              <div className="mt-2 text-center">
                                <h6
                                  className="col pt-2"
                                  style={{ height: "40px" }}
                                >
                                  {product.productName}
                                </h6>
                              </div>
                              <div className="mt-2">
                                {role.role == "ADMIN" && (
                                  <Link
                                    to={`/student/${product.studentAddress}`}
                                  >
                                    <p className="text-center mb-2">
                                      <b>Yêu cầu từ </b>
                                      {makeShotAccount(product.studentAddress)}
                                    </p>
                                  </Link>
                                )}
                                {/* <p
                                  style={{
                                    width: "max-content",
                                    margin: "auto",
                                    height: "40px",
                                  }}
                                >
                                  <button
                                    className="btn btn-sell"
                                    type="button"
                                    onClick={() =>
                                      role.role == "STUDENT"
                                        ? handleCancelRequestActivateNFT([
                                            product.requestId,
                                          ])
                                        : handleActivateNFTByAdmin([
                                            product.requestId,
                                          ])
                                    }
                                  >
                                    {role.role == "ADMIN"
                                      ? "Chấp nhận"
                                      : "Hủy kích hoạt"}
                                  </button>
                                </p> */}
                              </div>
                              <div className="d-flex justify-content-between">
                                <div className="d-flex flex-column">
                                  <p>{product.productTypeName}</p>
                                  <p>
                                    <b>Số lượng: </b>
                                    {product.amountToActivate}
                                  </p>
                                </div>

                                <div className="col col-5 d-flex justify-content-center align-items-center product-price">
                                  <h6 className="text-center text-primary fw-bold">
                                    #{product.requestId}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        ),
                      )}
                  </div>
                  {filter == "requested" &&
                    selectList &&
                    selectList.length > 0 && (
                      <button
                        type="submit"
                        className="btn btn-sell btn-all text-light"
                      >
                        {role.role == "ADMIN"
                          ? "Chấp nhận tất cả"
                          : "Hủy tất cả"}
                      </button>
                    )}
                </form>

                {renderList &&
                  filter == "activated" &&
                  renderList.map((product: IActivateRequestInstance, index) => (
                    <div
                      key={index}
                      className="product-item col col-3 item-disabled"
                    >
                      <div className="item-disable"></div>
                      <div className="productlist-img">
                        <img
                          src={product.productImg}
                          alt={product.productName}
                          width={190}
                          height={130}
                        />
                      </div>
                      <div className="product-info">
                        <div className="mt-2 text-center">
                          <h6 className="col pt-2" style={{ height: "40px" }}>
                            {product.productName}
                          </h6>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div className="d-flex flex-column">
                            <p>{product.productTypeName}</p>
                            <p>
                              <b>Số lượng: </b>
                              {product.amountToActivate}
                            </p>
                          </div>

                          <div className="col col-5 d-flex justify-content-center align-items-center product-price">
                            <h6 className="text-center text-primary fw-bold">
                              Đã kích hoạt
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <Pagination
              currentPage={page}
              totalPage={totalPage}
              onPaginate={onPaginate}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default ProductListPage
