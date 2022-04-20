import React from 'react';
import StudentCoverInfo from './components/StudentCoverInfo';
import { useParams } from 'react-router-dom';
import './StudentPage.scss';
import StudentBody from './components/StudentBody';

function StudentPage() {
  const { address } = useParams();
  console.log(address);
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
