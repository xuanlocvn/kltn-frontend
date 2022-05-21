import Web3 from 'web3';
import { connect } from 'src/pages/sign-in/SignInSlice';
import { CustomWindow } from 'src/utils/window';
import { ProviderConnectInfo } from 'src/interfaces';
import { store } from 'src/app/store';

declare let window: CustomWindow;

export default class ContractBase {
  web3: Web3;
  contractABI: any;

  protected loadWeb3 = async () => {
    const state = store.getState();
    let web3 = state.web3.value;
    if (web3) return web3;
    const ethereum = window.ethereum;
    if (ethereum != undefined) {
      web3 = new Web3(ethereum);
      store.dispatch(connect(new Web3(ethereum)));
      ethereum.on('connect', (connectInfo: ProviderConnectInfo) => {
        console.log(connectInfo.chainId);
        store.dispatch(connect(new Web3(ethereum)));
      });
      return web3;
    }
  };

  protected async loadContract(contractAddress: string) {
    this.web3 = await this.loadWeb3();
    if (!this.web3) {
      return null;
    }
    const accounts = await this.web3.eth.getAccounts();
    console.log('from:', accounts[0]);
    const contract = new this.web3.eth.Contract(
      this.contractABI,
      contractAddress,
    );
    return contract;
  }
}
