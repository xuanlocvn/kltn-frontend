export interface CustomWindow extends Window {
  ethereum: any;
  web3: any;
}

export interface StudentInfo {
  name: string;
  dateOfBirth: string;
  gender: string;
  placeOfBirth: string;
  nation: string;
  cmnd: string;
  issuanceDate: string;
  issuancePlace: string;
  address1: string;
  address2: string;
}

export interface IStudentCertificate {
  from: string;
  to: string;
  name: string;
}
