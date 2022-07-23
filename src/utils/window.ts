export interface CustomWindow extends Window {
  reload()
  ethereum: any
  web3: any
  paypal: any
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
  chainNetworkId: number
  missionId: string
  missionImg: string
  missionAddress: string
  missionName: string
  lecturerAddress: string
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

export interface ISubjectInstance {
  chainNetworkId: number
  subjectId: string
  subjectAddress: string
  subjectName: string
  subjectShortenName: string
  subjectImg: string
  subjectDescription: string
  subjectStatus: string
  subjectHashIPFS: string
  departmentName: string
  startTime: number
  endTime: number
  endTimeToResigter: number
  endTimeToComFirm: number
  maxStudentAmount: number
  lecturerAddress: string
  lecturerName: string
  joinedStudentAmount: number
  joinedStudentList: IStudentJoined
  isJoined: boolean
}

export interface IScholarshipInstance {
  chainNetworkId: number
  scholarshipImg: string
  scholarshipId: string
  scholarshipAddress: string
  scholarshipName: string
  scholarshipStatus: string
  scholarshipHashIPFS: string
  scholarShipDescription: string
  startTime: number
  endTimeToResigter: number
  endTimeToComFirm: number
  endTime: number
  lecturerInCharge: string
  lecturerName: string
  tokenAmount: number
  joinedStudentAmount: number
  joinedStudentList: IStudentJoined[]
  isJoined: boolean
}

export interface ITuitionInstance {
  chainNetworkId: number
  imgURL: string
  tuitionId: string
  tuitionName: string
  tuitionAddress: string
  tuitionStatus: string
  tuitionDescription: string
  tuitionHashIPFS: string
  schoolYear: number
  startTime: number
  endTime: number
  tokenAmount: number
  currencyAmount: number
  lecturerInCharge: string
  lecturerName: string
  joinedStudentList: IStudentJoined[]
  joinedStudentAmount: number
  isJoined: boolean
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
  missionImg
}

export interface IScholarshipDetail {
  scholarshipImg
  scholarshipAddress
  scholarshipId
  scholarshipHashIPFS
  scholarShipDescription
  lecturerInCharge
  scholarshipName
  scholarshipStatus
  departmentName
  startTime
  endTime
  endTimeToResigter
  endTimeToComFirm
  joinedStudentAmount
  lecturerName
  tokenAmount
  joinedStudentList: IStudentJoined[]
  isJoined: boolean
}

export interface ISubjectDetail {
  chainNetworkId
  subjectId
  subjectAddress
  subjectName
  subjectShortenName
  subjectImg
  subjectDescription
  subjectStatus
  subjectHashIPFS
  departmentName
  startTime
  endTime
  endTimeToResigter
  endTimeToComFirm
  maxStudentAmount
  lecturerAddress
  lecturerName
  joinedStudentAmount
  joinedStudentList: IStudentJoined[]
  isJoined: boolean
}

export interface ITuitionDetail {
  chainNetworkId: number
  imgURL: string
  tuitionId: string
  tuitionName: string
  tuitionAddress: string
  tuitionStatus: string
  tuitionDescription: string
  tuitionHashIPFS: string
  schoolYear: number
  startTime: number
  endTime: number
  tokenAmount: number
  currencyAmount: number
  lecturerInCharge: string
  lecturerName: string
  joinedStudentAmount: number
  joinedStudentList: IStudentJoined[]
  isJoined: boolean
  isCompleted: boolean
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
  minPrice: string | number
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

export interface ISudentList {
  studentName
  studentId
  studentAddress
  classroomName
  departmentName
}

export interface ILecturerList {
  lecturerName
  lecturerId
  lecturerAddress
  departmentName
  departmentShortenName
}

export interface ILecturerInfo {
  lecturerImg
  lecturerName: string
  lecturerId: string
  lecturerAddress: string
  departmentName: string
  sex: string
  dateOfBirth: string
  lecturerHashIPFS: string
}

export interface ILecturerAmountObject {
  amountSubject
  amountMission
  amountScholarchip
  amountTuition
}
