import React from 'react';
import { useEffect, useState } from 'react';
// import Web3 from 'web3';
import { CustomWindow } from 'src/utils/window';
import { makeShotAccount } from 'src/utils';
import './Header.scss';
declare let window: CustomWindow;
function Header() {
  // const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [metamask, setMetamask] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const loadAccountFromWallet = () => {
      const ethereum = window.ethereum;
      if (ethereum != undefined) {
        ethereum.on('accountsChanged', async (accounts) => {
          setAccount(makeShotAccount(accounts[0]));
          setCurrentUser(accounts[0]);
          window.localStorage.account = accounts[0];
          if (accounts[0] == 'undefined') setAccount(null);
        });
      } else {
        setAccount(null);
      }
    };

    const loadAccountFromLocal = () => {
      if (
        window.localStorage.account != 'undefined' &&
        typeof window.localStorage.account != 'undefined'
      ) {
        const account: string = window.localStorage.account;
        setCurrentUser(account);
        setAccount(makeShotAccount(account));
      }
    };

    loadAccountFromLocal();
    loadAccountFromWallet();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum != undefined) {
      // setWeb3(new Web3(window.ethereum));
      await window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          setAccount(makeShotAccount(result[0]));
          setCurrentUser(result[0]);
          console.log(result[0]);
          window.localStorage.account = result[0];
        });
      setMetamask(true);
    } else {
      setMetamask(false);
    }
  };
  return (
    <div className="header">
      <div className="container header__account">
        {account ? (
          <a onClick={loadWeb3}>{account}</a>
        ) : (
          <a href={'/user/' + currentUser} onClick={loadWeb3}>
            Connect Wallet
          </a>
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
