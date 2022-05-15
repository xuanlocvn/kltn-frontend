import React, { useEffect } from 'react';
import StudentCoverInfo from './components/StudentCoverInfo';
import { useNavigate, useParams } from 'react-router-dom';
import './StudentPage.scss';
import StudentBody from './components/StudentBody';
import { accessControlContractService } from 'src/contracts/access-control.service';
import { ROLE } from 'src/utils/enum';

function StudentPage() {
  const { address } = useParams();
  const navigate = useNavigate();
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

  const studentInfo = {
    studentName: 'Mai Nguyen Duc Tho',
    studentId: '18520369',
    studentMajor: 'CNTT',
    class: 'CNTT2018',
    faculty: 'KTTT',
    system: 'Chinh Quy',
  };
  return (
    <div className="student">
      <StudentCoverInfo {...studentInfo} />
      <StudentBody walletAddress={address} />
    </div>
  );
}

export default StudentPage;
