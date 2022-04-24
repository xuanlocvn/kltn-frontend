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

declare let window: CustomWindow;

function Header() {
  const web3 = useAppSelector(selectWeb3);
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
            window.localStorage.account = accounts[0];
          });
        ethereum.on('chainChanged', (chainId: string) => {
          console.log(`On Chain ID: ${chainId}`);
          dispatch(connect(new Web3(ethereum)));
        });
        ethereum.on('accountsChanged', async (accounts) => {
          console.log(`Account: ${accounts[0]}`);
          setAccount(makeShotAccount(accounts[0]));
          window.localStorage.account = accounts[0];
          if (accounts[0] == 'undefined') setAccount(null);
          dispatch(connect(new Web3(ethereum)));
        });
        ethereum.on('disconnect', (code, reason) => {
          console.log(`Ethereum Provider connection disconnect: ${reason}`);
        });
      } else {
        web3 != null && dispatch(disconnect());
        setAccount(null);
      }
    };

    web3 == null && loadAccountFromWallet();
  });

  return (
    <div className="header">
      <div className="container header__account d-flex">
        <h1>BLOCK CHAIN</h1>
        <div>
          {account && (
            <Link to={'/student-info/' + window.localStorage.account}>
              {account}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
