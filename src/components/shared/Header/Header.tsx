import React from 'react';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { connect, disconnect, selectWeb3 } from './HeaderSlice';
import { CustomWindow } from 'src/utils/window';
import { makeShotAccount } from 'src/utils';
import './Header.scss';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { Link } from 'react-router-dom';

declare let window: CustomWindow;

interface ProviderConnectInfo {
  readonly chainId: string;
}

function Header() {
  const web3 = useAppSelector(selectWeb3);
  const dispatch = useAppDispatch();
  const [account, setAccount] = useState(null);
  const [metamask, setMetamask] = useState(true);

  useEffect(() => {
    const loadAccountFromWallet = () => {
      const ethereum = window.ethereum;
      if (ethereum != undefined) {
        dispatch(connect(new Web3(ethereum)));
        ethereum.on('connect', (connectInfo: ProviderConnectInfo) => {
          console.log(connectInfo.chainId);
          dispatch(connect(new Web3(ethereum)));
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

    const loadAccountFromLocal = () => {
      if (
        window.localStorage.account != 'undefined' &&
        typeof window.localStorage.account != 'undefined'
      ) {
        const account: string = window.localStorage.account;
        setAccount(makeShotAccount(account));
      }
    };

    loadAccountFromLocal();
    loadAccountFromWallet();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum != undefined) {
      dispatch(connect(new Web3(window.ethereum)));
      await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          setAccount(makeShotAccount(result[0]));
          console.log(result[0]);
          window.localStorage.account = result[0];
        });
      setMetamask(true);
    } else {
      web3 != null && dispatch(disconnect());
      setMetamask(false);
    }
  };

  return (
    <div className="header">
      <div className="container header__account">
        <div>
          <Link to="/sign-in">{account}</Link>
        </div>
        {account ? (
          <Link to={'/student-info/' + window.localStorage.account}>
            {account}
          </Link>
        ) : (
          <a onClick={loadWeb3}>Connect Wallet</a>
        )}
        {metamask || (
          <div>
            <a
              href="https://metamask.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Please install MetaMask
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
