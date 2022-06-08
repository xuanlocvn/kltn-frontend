export interface CustomWindow extends Window {
  ethereum: any
  web3: any
}

export interface StudentInfo {
  name: string
  dateOfBirth: string
  gender: string
  placeOfBirth: string
  nation: string
  cmnd: string
  issuanceDate: string
  issuancePlace: string
  address1: string
  address2: string
}

export interface IStudentCertificate {
  type: string
  contractAddress: string
  startTime: number
  endTime: number
  certificateName: string
}

export interface IMissionInstance {
  missionId: string
  missionName: string
  maxStudentAmount: number
  joinedStudentAmount: number
  missionStatus: string
  isJoined: boolean
  missionAddress: string
  missionShortenName: string
  startTime: number | string
}

export interface ISubjectInstance {
  subjectId: string
  subjectName: string
  maxStudentAmount: number
  joinedStudentAmount: number
  subjectStatus: string
  isJoined: boolean
  subjectAddress: string
  subjectShortenName: string
  startTime: number | string
}

export interface IScholarshipInstance {
  scholarshipId: string
  scholarshipName: string
  joinedStudentAmount: number
  scholarshipStatus: string
  isJoined: boolean
  scholarshipAddress: string
  startTime: number | string
}

export interface ITuitionInstance {
  tuitionId: string
  tuitionName: string
  joinedStudentAmount: number
  tuitionStatus: string
  isJoined: boolean
  tuitionAddress: string
  startTime: number | string
  isCompleted: boolean
}

export interface IStudentJoined {
  studentId: string
  studentAddress: string
  studentName: string
  isCompleted: boolean
}

export interface IMissionDetail {
  missionId
  missionAddress
  missionName: string
  missionShortenName: string
  missionDescription: string
  missionStatus: string
  departmentName: string
  startTime: number
  endTime: number
  endTimeToResigter: number
  endTimeToComFirm: number
  maxStudentAmount: number
  joinedStudentAmount: number
  lecturerName: string
  tokenAmount: number
  joinedStudentList: IStudentJoined[]
  isJoined: boolean
}

export interface IProductTypeInstance {
  productTypeName: string
  productTypeAlias: string
  isIdependentNFT: boolean
}

export interface IProductInstance {
  productName: string
  productImg: string
  productId: string
  productNftId: number
  productDescription: string
  productHahIPFS: string
  totalAmountOnSale: number
  amount: number
  productTypeName: string
  ownerAddress: string
  priceOfOneItem: string | number
  status: string
}

export interface IActivateRequestInstance {
  requestId: number
  productName: string
  requestedTime: number
  activatedTime: number
  studentAddress: string
  productNftId: number
  productId: string
  productHahIPFS: string
  amountToActivate: number
  productTypeName: string
  isActivated: boolean
  productImg: string
  productDescription: string
}

export interface IProductDetail {
  productName
  productImg
  productId
  productNftId
  productDescription
  productHahIPFS
  amount
  productTypeName
  priceOfOneItem
  ownerAddress
  status
}

export interface ISellerOnSaleInstance {
  amountOnSale
  priceOfOneItem
  ownerAddress
  status
}
