import React, { useEffect } from 'react';
import StudentCoverInfo from './components/StudentCoverInfo';
import { useNavigate, useParams } from 'react-router-dom';
import './StudentPage.scss';
import StudentBody from './components/StudentBody';

function StudentPage() {
  const { address } = useParams();
  console.log(address);
  const navigate = useNavigate();
  useEffect(() => {
    address == 'undefined' && navigate('/sign-in');
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
