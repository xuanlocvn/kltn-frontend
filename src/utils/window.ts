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
  type: string;
  contractAddress: string;
  startTime: number;
  endTime: number;
  certificateName: string;
}

export interface IMissionInstance {
  missionId: string;
  missionName: string;
  maxStudentAmount: number;
  joinedStudentAmount: number;
  missionStatus: string;
  isJoined: boolean;
  missionAddress: string;
  missionShortenName: string;
  startTime: number | string;
}

export interface ISubjectInstance {
  subjectId: string;
  subjectName: string;
  maxStudentAmount: number;
  joinedStudentAmount: number;
  subjectStatus: string;
  isJoined: boolean;
  subjectAddress: string;
  subjectShortenName: string;
  startTime: number | string;
}

export interface IScholarshipInstance {
  scholarshipId: string;
  scholarshipName: string;
  joinedStudentAmount: number;
  scholarshipStatus: string;
  isJoined: boolean;
  scholarshipAddress: string;
  startTime: number | string;
}

export interface ITuitionInstance {
  tuitionId: string;
  tuitionName: string;
  joinedStudentAmount: number;
  tuitionStatus: string;
  isJoined: boolean;
  tuitionAddress: string;
  startTime: number | string;
  isCompleted: boolean;
}
