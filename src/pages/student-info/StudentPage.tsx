import React, { useEffect, useState } from 'react';
import StudentCoverInfo from './components/StudentCoverInfo';
import { useNavigate, useParams } from 'react-router-dom';
import './StudentPage.scss';
import StudentBody from './components/StudentBody';
import { accessControlContractService } from 'src/contracts/access-control.service';
import { ROLE } from 'src/utils/enum';
import { getStudentByAddress } from 'src/api/studentApi';
import { convertLocalTime } from 'src/utils';
import { useAppSelector } from 'src/app/hooks';
import { selectWeb3 } from 'src/pages/sign-in/SignInSlice';

function StudentPage() {
  const { address } = useParams();
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState({});
  const [studentCover, setStudentCover] = useState({});
  const web3 = useAppSelector(selectWeb3);

  useEffect(() => {
    const getStudentInfoByAddress = async (walletAddress: string) => {
      const response = await getStudentByAddress(walletAddress);
      const result = response.data.result;
      setStudentInfo({
        name: result.studentName,
        gender: result.sex,
        placeOfBirth: result.birthPlace,
        nation: result.ethnic,
        cmnd: result.nationalId,
        issuranceDate: convertLocalTime(result.dateOfNationalId),
        issuancePlace: result.placeOfNationalId,
        address: result.permanentAddress,
        imgUrl:
          result.studentImg ||
          'https://img4.thuthuatphanmem.vn/uploads/2020/12/25/avt-chibi-doc_115941237.jpg',
        studentId: result.studentId,
        birthday: convertLocalTime(result.dateOfBirth),
        faculty: result.departmentName,
        major: result.majorName,
        schoolYear: result.schoolYear.toString(),
        class: result.classroomName,
        walletAddress: walletAddress,
      });

      setStudentCover({
        studentName: result.studentName,
        studentId: result.studentId,
        studentMajor: result.majorName,
        class: result.classroomName,
        faculty: result.departmentName,
        schoolYear: result.schoolYear.toString(),
      });
    };
    getStudentInfoByAddress(address);
  }, [web3, address]);

  useEffect(() => {
    const getRole = async () => {
      return await accessControlContractService.getRole(address);
    };
    address == 'undefined' && navigate('/sign-in');
    getRole().then((role) => {
      role == ROLE.ADMIN && navigate(`/admin/${address}`);
      role == ROLE.LECTURER && navigate(`/lecturer/${address}`);
    });
  }, [address]);

  return (
    <div className="student">
      <StudentCoverInfo {...studentCover} />
      <StudentBody walletAddress={address} studentInfo={studentInfo} />
    </div>
  );
}

export default StudentPage;
