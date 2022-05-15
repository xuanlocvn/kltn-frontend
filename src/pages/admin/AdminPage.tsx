import React, { useEffect } from 'react';
import AdminBody from './components/AdminBody';
import { useAppSelector } from 'src/app/hooks';
import { selectRole } from 'src/components/shared/Header/HeaderSlice';
import { ROLE } from 'src/utils/enum';
import { useNavigate, useParams } from 'react-router-dom';
import './AdminPage.scss';

AdminPage.propTypes = {};

function AdminPage() {
  const role = useAppSelector(selectRole);
  const { adminAddress } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    adminAddress == 'undefined' && navigate('/sign-in');
  }, [adminAddress]);

  return (
    <div className="student">
      {role.role == ROLE.ADMIN ? (
        <AdminBody walletAddress={adminAddress} />
      ) : (
        <h1>403</h1>
      )}
    </div>
  );
}

export default AdminPage;
