import React from 'react';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import {
  connect,
  disconnect,
  selectWeb3,
} from '../../../pages/Sign-in/SignInSlice';
import { CustomWindow } from 'src/utils/window';
import { makeShotAccount } from 'src/utils';
import './Header.scss';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { Link } from 'react-router-dom';
import { addRole, removeRole, selectRole } from './HeaderSlice';
import { ROLE } from 'src/utils/enum';

declare let window: CustomWindow;

function Header() {
  const web3 = useAppSelector(selectWeb3);
  const role = useAppSelector(selectRole);
  const dispatch = useAppDispatch();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const loadAccountFromWallet = async () => {
      const ethereum = window.ethereum;
      if (ethereum != undefined) {
        dispatch(connect(new Web3(ethereum)));
        await window.ethereum
          .request({ method: 'eth_requestAccounts' })
          .then((accounts) => {
            setAccount(makeShotAccount(accounts[0]));
            dispatch(addRole({ account: accounts[0], role: ROLE.STUDENT }));
            window.localStorage.account = accounts[0];
          });
        ethereum.on('chainChanged', (chainId: string) => {
          console.log(`On Chain ID: ${chainId}`);
          dispatch(connect(new Web3(ethereum)));
        });
        ethereum.on('accountsChanged', async (accounts) => {
          console.log(`Account: ${accounts[0]}`);
          setAccount(makeShotAccount(accounts[0]));
          dispatch(addRole({ account: accounts[0], role: ROLE.STUDENT }));
          window.localStorage.account = accounts[0];
          if (accounts[0] == 'undefined') setAccount(null);
          dispatch(connect(new Web3(ethereum)));
        });
        ethereum.on('disconnect', (code, reason) => {
          console.log(`Ethereum Provider connection disconnect: ${reason}`);
        });
      } else {
        dispatch(disconnect());
        dispatch(removeRole());
        setAccount(null);
      }
    };

    web3 == null && loadAccountFromWallet();
  });

  return (
    <div className="header container header__account d-flex justify-content-between align-items-center">
      <h1 className="col col-5">BLOCK CHAIN</h1>
      <div className="col col-7 d-flex align-items-center justify-content-between">
        <div className="col col-5 d-flex justify-content-between">
          {role.role == ROLE.STUDENT && (
            <>
              <Link to={'/mission'}>Nhiệm vụ</Link>
              <Link to={'/student-info'}>Môn học</Link>
              <Link to={'/student-info'}>Học bổng</Link>
              <Link to={'/student-info'}>Học phí</Link>
            </>
          )}
        </div>
        <div className="">
          {account && (
            <Link to={'/student-info/' + window.localStorage.account}>
              <div className="d-flex align-items-center">
                <span>{account}</span>
                <img
                  src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png"
                  alt=""
                  width={45}
                  height={45}
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
