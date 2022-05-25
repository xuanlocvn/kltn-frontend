/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StudentTab from './StudentTab';
import StudentInfomation from './StudentInfomation';
import { StudentInfo } from 'src/utils/window';
import { convertLocalTime } from 'src/utils';
import StudentAccount from './StudentAccount';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from 'src/app/hooks';
import { selectWeb3 } from 'src/pages/sign-in/SignInSlice';
import StudentCertificate from './StudentCertificate';

StudentBody.propTypes = {
  walletAddress: PropTypes.string,
};

function StudentBody(props: { walletAddress: string }) {
  const { walletAddress } = props;
  const web3 = useAppSelector(selectWeb3);
  const [isOwnStdudent, setIsOwnStudent] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [tab, setTab] = useState(1);
  const [studentInfo, setStudentInfo] = useState({});

  const [totalToken, setTotaToken] = useState(0);

  const [certificateList, setCertificatList] = useState({
    subjectList: [],
    certificateList: [],
  });

  useEffect(() => {
    setTotaToken(5000);
  });

  useEffect(() => {
    const subjectList = [
      {
        from: convertLocalTime(1650438993),
        to: convertLocalTime(1650438993),
        name: 'Nhap Mon Lap Trinh',
      },
      {
        from: convertLocalTime(1650438993),
        to: convertLocalTime(1650438993),
        name: 'Nhap Mon Lap Trinh',
      },
      {
        from: convertLocalTime(1650438993),
        to: convertLocalTime(1650438993),
        name: 'Nhap Mon Lap Trinh',
      },
      {
        from: convertLocalTime(1650438993),
        to: convertLocalTime(1650438993),
        name: 'Nhap Mon Lap Trinh',
      },
      {
        from: convertLocalTime(1650438993),
        to: convertLocalTime(1650438993),
        name: 'Nhap Mon Lap Trinh',
      },
      {
        from: convertLocalTime(1650438993),
        to: convertLocalTime(1650438993),
        name: 'Nhap Mon Lap Trinh',
      },
      {
        from: convertLocalTime(1650438993),
        to: convertLocalTime(1650438993),
        name: 'Nhap Mon Lap Trinh',
      },
    ];

    const certificateList = [
      {
        from: convertLocalTime(1650438993),
        to: convertLocalTime(1650438993),
        name: 'Nhap Mon Lap Trinh',
      },
      {
        from: convertLocalTime(1650438993),
        to: convertLocalTime(1650438993),
        name: 'Nhap Mon Lap Trinh',
      },
      {
        from: convertLocalTime(1650438993),
        to: convertLocalTime(1650438993),
        name: 'Nhap Mon Lap Trinh',
      },
      {
        from: convertLocalTime(1650438993),
        to: convertLocalTime(1650438993),
        name: 'Nhap Mon Lap Trinh',
      },
      {
        from: convertLocalTime(1650438993),
        to: convertLocalTime(1650438993),
        name: 'Nhap Mon Lap Trinh',
      },
      {
        from: convertLocalTime(1650438993),
        to: convertLocalTime(1650438993),
        name: 'Nhap Mon Lap Trinh',
      },
      {
        from: convertLocalTime(1650438993),
        to: convertLocalTime(1650438993),
        name: 'Nhap Mon Lap Trinh',
      },
    ];

    setCertificatList({ subjectList, certificateList });
  }, [tab == 3]);

  useEffect(() => {
    const getStudentInfoByAddress = (walletAddress: string) => {
      return {
        name: 'Mai Nguyen Duc Tho',
        gender: 'Nữ',
        placeOfBirth: 'Long An',
        nation: 'Kinh',
        cmnd: '123456789',
        issuanceDate: convertLocalTime(1450017483),
        issuancePlace: 'Long An',
        address: 'Long An',
        imgUrl:
          'https://img4.thuthuatphanmem.vn/uploads/2020/12/25/avt-chibi-doc_115941237.jpg',
        studentId: '18520369',
        birthday: convertLocalTime(1650438993),
        faculty: 'KTTT',
        major: 'CNNT',
        schoolYear: '2018',
        class: 'CNTT2018',
        walletAddress: walletAddress,
      };
    };
    const getAccount = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        return accounts[0];
      }
      return null;
    };

    getAccount().then((account) => {
      if (account == null) return;
      if (account.toLowerCase() == walletAddress.toLocaleLowerCase()) {
        setIsOwnStudent(true);
        const t = Number(searchParams.get('t'));
        t != 0 && setTab(t);
        setStudentInfo(getStudentInfoByAddress(walletAddress));
      } else {
        setIsOwnStudent(false);
        setTab(3);
        setSearchParams({ t: '3' });
      }
    });
  }, [web3]);

  const onTab = (tabNumber: number) => {
    setTab(tabNumber);
  };

  return (
    <div className="student_form mt-5 d-flex">
      <StudentTab onTab={onTab} isOwnStdudent={isOwnStdudent} />
      <div className="form_body d-flex flex-column col col-9">
        {tab == 1 && isOwnStdudent && (
          <StudentInfomation studentInfo={studentInfo} />
        )}
        {tab == 2 && isOwnStdudent && (
          <StudentAccount
            walletAddress={walletAddress}
            totalToken={totalToken}
          />
        )}
        {tab == 3 && (
          <StudentCertificate
            subjectList={certificateList.subjectList}
            certificateList={certificateList.certificateList}
          />
        )}
      </div>
    </div>
  );
}

export default StudentBody;
