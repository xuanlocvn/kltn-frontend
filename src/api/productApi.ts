import axiosClient from "./axiosClient"

export const getProductType = () => {
  const url = "api/product/type"
  return axiosClient.get(url)
}

export const getAllProductsOnSale = (studentAddress?: string) => {
  const url = studentAddress
    ? `api/product/product-on-sale?walletAddress=${studentAddress}`
    : "api/product/product-on-sale"
  return axiosClient.get(url)
}

export const getProductsByOwner = (studentAddress: string) => {
  const url = `api/product/${studentAddress}`
  return axiosClient.get(url)
}

export const getRequestedProducts = (studentAddress?: string) => {
  const url = studentAddress
    ? `api/activaterequest/activate-requesting?studentAddress=${studentAddress}`
    : `api/activaterequest/activate-requesting`
  return axiosClient.get(url)
}

export const getActivatedProducts = (studentAddress?: string) => {
  const url = studentAddress
    ? `api/activaterequest/activate-requested?studentAddress=${studentAddress}`
    : `api/activaterequest/activate-requested`
  return axiosClient.get(url)
}

export const getDetailProductsOffSale = (
  productNftId: number,
  studentAddress: string,
) => {
  const url = `api/product/${studentAddress}/${productNftId}`
  return axiosClient.get(url)
}

export const getDetailProductsOnSale = (
  productNftId: number,
  walletAddress?: string,
) => {
  const url = walletAddress
    ? `api/product/product-on-sale/${productNftId}?walletAddress=${walletAddress}`
    : `api/product/product-on-sale/${productNftId}`
  return axiosClient.get(url)
}

export const getDetailRequestedProducts = (requestId: number) => {
  const url = `api/product/product-on-sale/${requestId}`
  return axiosClient.get(url)
}

export const getListSellerProductsOnSale = (productNftId: number) => {
  const url = `api/product/product-on-sale/buyer/${productNftId}`
  return axiosClient.get(url)
}
