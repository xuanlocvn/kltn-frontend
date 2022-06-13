import React, { useEffect, useState } from "react"
import "./ProductDetail.scss"
import { marketplaceContractService } from "src/contracts/maketplace.service"
import { erc1155ContractService } from "src/contracts/erc1155.service"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { makeShotAccount } from "src/utils/index"
import { selectRole } from "src/components/shared/Header/HeaderSlice"
import { useAppSelector } from "src/app/hooks"
import { erc20ContractService } from "src/contracts/erc20.service"
import { configService } from "src/configs/config.service"
import { CONFIG } from "src/configs/config.enum"
import { activeNFTService } from "src/contracts/(remove)active-nft.service"
import {
  getDetailProductsOffSale,
  getDetailProductsOnSale,
  // getDetailRequestedProducts,
  getListSellerProductsOnSale,
} from "src/api/productApi"
import {
  CustomWindow,
  IProductDetail,
  ISellerOnSaleInstance,
} from "src/utils/window"

declare let window: CustomWindow

function ProductDetail() {
  const [productDetail, setProductDetail] = useState<IProductDetail>(null)
  const [productDetailOnSale, setProductDetailOnSale] = useState(null)
  const [listSeller, setListSeller] = useState<ISellerOnSaleInstance[]>([])
  const [isOwner, setIsOwner] = useState(false)
  const { productId } = useParams()
  const role = useAppSelector(selectRole)
  const [selectedSeller, setSelectedSeller] =
    useState<ISellerOnSaleInstance>(null)
  const [amount, setAmount] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams({})
  const [filter, setFilter] = useState("all")
  const [style, setStyle] = useState({})
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const f = searchParams.get("filter") ? searchParams.get("filter") : "all"
    const fetchApi = async () => {
      switch (f) {
        case "all": {
          let response = await getDetailProductsOnSale(Number(productId))
          setProductDetail(response.data.result)
          response = await getListSellerProductsOnSale(Number(productId))
          setListSeller(response.data.result)
          break
        }
        case "owned": {
          const response1 = await getDetailProductsOffSale(
            Number(productId),
            window.localStorage.account,
          )
          const response2 = await getDetailProductsOnSale(
            Number(productId),
            window.localStorage.account,
          )
          if (
            response1.data.result &&
            response1.data.result.productNftId == Number(productId)
          ) {
            setIsOwner(true)
            setProductDetail(response1.data.result)
          } else {
            setIsOwner(true)
            setProductDetail(response2.data.result)
          }
          if (
            response2.data.result &&
            response2.data.result.productNftId == Number(productId)
          ) {
            setIsOwner(true)
            setProductDetailOnSale(response2.data.result)
          }

          break
        }
      }
    }
    fetchApi()
    setSearchParams({ filter: f })
    setFilter(f)
  }, [productId])

  const handleList = async (e) => {
    e.preventDefault()
    const isApproved = await erc1155ContractService.isApprovedForAll(
      configService.getConfig(CONFIG.UIT_NFT_TOKEN_ADDRESS),
      configService.getConfig(CONFIG.MARKETPLACE_ADDRESS),
    )
    if (!isApproved)
      await erc1155ContractService.setApprovalForAll(
        configService.getConfig(CONFIG.MARKETPLACE_ADDRESS),
        true,
        configService.getConfig(CONFIG.UIT_NFT_TOKEN_ADDRESS),
      )

    await marketplaceContractService.list(
      productDetail.productNftId,
      e.target.priceForSell.value,
      e.target.amountForSell.value,
    )
  }

  const handleDelist = async () => {
    await marketplaceContractService.deList(Number(productId))
  }

  // const handleUpdatePrice = async (
  //   _itemId: number | string,
  //   _oneItemPrice: number | string,
  // ) => {
  //   await marketplaceContractService.updatePrice(_itemId, _oneItemPrice)
  // }

  const handleBuy = async (e) => {
    e.preventDefault()
    console.log(role)
    const allowance = await erc20ContractService.getAllowance(
      configService.getConfig(CONFIG.UIT_TOKEN_ADDRESS),
      configService.getConfig(CONFIG.MARKETPLACE_ADDRESS),
    )
    if (Number(allowance) == 0)
      await erc20ContractService.approve(
        configService.getConfig(CONFIG.UIT_TOKEN_ADDRESS),
        configService.getConfig(CONFIG.MARKETPLACE_ADDRESS),
        1000000000000000,
      )
    selectedSeller &&
      amount > 0 &&
      amount <= Number(selectedSeller.amountOnSale) &&
      (await marketplaceContractService.buy(
        productDetail.productNftId,
        selectedSeller.ownerAddress,
        amount,
      ))
  }

  const handleRequestActivateNFT = async (e) => {
    e.preventDefault()
    const isApproved = await erc1155ContractService.isApprovedForAll(
      configService.getConfig(CONFIG.UIT_NFT_TOKEN_ADDRESS),
      configService.getConfig(CONFIG.ACTIVE_NFT_ADDRESS),
    )
    if (!isApproved)
      await erc1155ContractService.setApprovalForAll(
        configService.getConfig(CONFIG.ACTIVE_NFT_ADDRESS),
        true,
        configService.getConfig(CONFIG.UIT_NFT_TOKEN_ADDRESS),
      )
    await activeNFTService.requestActivateNFT(
      Number(productId),
      e.target.amountForActivate.value,
    )

    navigate(`/products?filter=requested&page=1`)
  }

  const onchangeRadio = (e) => {
    listSeller.forEach((seller) => {
      if (seller.ownerAddress == e.target.value) {
        setSelectedSeller(seller)
      }
    })
  }

  const handleImg = (e) => {
    // eslint-disable-next-line no-undef
    const rect = document.getElementById("product-img")
    const translateX = Math.floor(
      e.pageX - rect.offsetLeft - rect.getBoundingClientRect().width / 2,
    )
    const translateY = Math.floor(
      e.pageY - rect.offsetTop - rect.getBoundingClientRect().height / 2,
    )
    const style = {
      transform: `scale(2,2) translateZ(0px) translateX(${-translateX}px) translateY(${-translateY}px)`,
      transition: "transform 0.3s",
    }
    setStyle(style)
  }

  return (
    <>
      <div>
        {productDetail && (
          <div className="product-detail__info mt-5">
            <div className="d-flex justify-content-around">
              <div className="col col-6">
                <div
                  id="product-img"
                  className="product-img d-flex flex-column align-items-center justify-content-center"
                >
                  <img
                    src={productDetail.productImg}
                    alt=""
                    style={{ ...style }}
                    onMouseMove={(e) => {
                      handleImg(e)
                    }}
                    onMouseLeave={() => setStyle({})}
                  />
                </div>
                <div className="product-img-sub mt-4 d-flex justify-content-around">
                  <img src={productDetail.productImg} alt="" width="120" />
                  <img src={productDetail.productImg} alt="" width="120" />
                  <img src={productDetail.productImg} alt="" width="120" />
                  <img src={productDetail.productImg} alt="" width="120" />
                </div>
                <div className="mt-5">
                  {filter == "all" && (
                    <table>
                      <tbody onChange={onchangeRadio}>
                        <tr className="row">
                          <th className="col col-1 text-center"></th>
                          <th className="col col-4 text-center">Người bán</th>
                          <th className="col col-3 text-center">Số lượng</th>
                          <th className="col col-4 text-center">
                            Giá mỗi sản phẩm
                          </th>
                        </tr>
                        {listSeller &&
                          listSeller.map((seller, index) => (
                            <React.Fragment key={index}>
                              <tr className="row">
                                <td className="col col-1 text-center">
                                  <input
                                    type="radio"
                                    name="radio"
                                    id={index.toString()}
                                    value={seller.ownerAddress}
                                    width={100}
                                  />
                                </td>
                                <td className="col col-4 text-center">
                                  {makeShotAccount(seller.ownerAddress)}
                                </td>
                                <td className="col col-3 text-center">
                                  {seller.amountOnSale}
                                </td>
                                <td className="col col-4 text-center">
                                  {seller.priceOfOneItem}
                                </td>
                              </tr>
                              <tr className="d-flex align-items-center row">
                                <td
                                  className="d-flex align-items-center row"
                                  style={{
                                    width: "100%",
                                    margin: "auto",
                                    borderRadius: "15px",
                                  }}
                                >
                                  {selectedSeller &&
                                    selectedSeller.ownerAddress ==
                                      seller.ownerAddress && (
                                      <input
                                        className="mb-3"
                                        style={
                                          amount == 0 ||
                                          amount > seller.amountOnSale
                                            ? {
                                                width: "80%",
                                                margin: "auto",
                                                borderRadius: "15px",
                                                border: "2px solid red",
                                              }
                                            : {
                                                width: "80%",
                                                margin: "auto",
                                                borderRadius: "15px",
                                                border: "2px solid blue",
                                              }
                                        }
                                        type="number"
                                        placeholder="Nhập số lượng muốn mua"
                                        max={seller.amountOnSale}
                                        defaultValue={0}
                                        onChange={(e) => {
                                          setAmount(Number(e.target.value))
                                        }}
                                      />
                                    )}
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                      </tbody>
                    </table>
                  )}
                  <div className="d-flex flex-row-reverse mt-5">
                    {(productDetail.status == "OnSale" ||
                      (productDetailOnSale &&
                        productDetailOnSale.status == "OnSale")) &&
                      isOwner && (
                        <button className="btn btn-sell" onClick={handleDelist}>
                          Hủy đăng bán
                        </button>
                      )}
                    {productDetail.status == "OnSale" && !isOwner && (
                      <button className="btn btn-sell" onClick={handleBuy}>
                        Mua
                      </button>
                    )}
                    {productDetail.status == "OffSale" && (
                      <form onSubmit={handleRequestActivateNFT}>
                        <input
                          name="amountForActivate"
                          id="amountForActivate"
                          type="number"
                          placeholder="Số lượng muốn kích hoạt"
                          max={productDetail.amount}
                          min={0}
                          required
                        />
                        <button className="btn btn-active" type="submit">
                          Kích hoạt
                        </button>
                      </form>
                    )}

                    {productDetail.status == "OffSale" &&
                      productDetailOnSale == null && (
                        <div>
                          <form onSubmit={handleList}>
                            <input
                              name="amountForSell"
                              id="amountForSell"
                              type="number"
                              placeholder="Số lượng muốn bán"
                              max={productDetail.amount}
                              min={0}
                            />
                            <input
                              name="priceForSell"
                              id="priceForSell"
                              type="number"
                              placeholder="Giá bán cho một vật phẩm"
                              min={0}
                            />
                            <button className="btn btn-sell" type="submit">
                              Bán
                            </button>
                          </form>
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="col col-5">
                <h2 className="mb-4">{productDetail.productName}</h2>
                <div className="mb-5">
                  <p>
                    <b>Mã vật phẩm: </b>
                    {productDetail.productId}
                  </p>
                  <p>
                    <b>Loại vật phẩm: </b>
                    {productDetail.productTypeName}
                  </p>
                  <p>
                    <b>Tổng số lượng: </b>
                    {productDetailOnSale && productDetail != productDetailOnSale
                      ? productDetail.amount + productDetailOnSale.amount
                      : productDetail.amount}
                  </p>
                  <p>
                    <b>Giá một vật phẩm: </b>
                    {productDetail.priceOfOneItem} coin
                  </p>
                  <p>
                    <b>Trạng thái: </b>
                    {productDetailOnSale && productDetail != productDetailOnSale
                      ? `${productDetail.amount} ${productDetail.status},  ${productDetailOnSale.amount} ${productDetailOnSale.status}`
                      : `${productDetail.amount} ${productDetail.status}`}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="mt-5"
              onClick={() => setOpen(!open)}
              style={
                open == false
                  ? { height: "480px", overflow: "hidden" }
                  : { height: "auto" }
              }
            >
              <h2>Mô tả</h2>
              <div
                style={
                  open == false
                    ? { height: "400px", overflow: "hidden" }
                    : { height: "auto" }
                }
                dangerouslySetInnerHTML={{
                  __html: productDetail.productDescription,
                }}
              ></div>
              {!open && (
                <div
                  onClick={() => setOpen(!open)}
                  style={{
                    position: "relative",
                    top: "-200px",
                    height: "200px",
                    backgroundImage:
                      "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))",
                  }}
                >
                  <p
                    className="text-center"
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "45%",
                    }}
                  >
                    Nhấn để mở rộng
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProductDetail
