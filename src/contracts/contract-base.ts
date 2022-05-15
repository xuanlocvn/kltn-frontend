import Web3 from 'web3';
import { connect, selectWeb3 } from 'src/pages/sign-in/SignInSlice';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { CustomWindow } from 'src/utils/window';
import { ProviderConnectInfo } from 'src/interfaces';

declare let window: CustomWindow;

export default class ContractBase {
  web3: Web3 = useAppSelector(selectWeb3);
  dispatch = useAppDispatch();
  contractABI: any;

  protected loadWeb3 = async () => {
    const ethereum = window.ethereum;
    if (ethereum != undefined) {
      this.dispatch(connect(new Web3(ethereum)));
      ethereum.on('connect', (connectInfo: ProviderConnectInfo) => {
        console.log(connectInfo.chainId);
        this.dispatch(connect(new Web3(ethereum)));
      });
    }
  };

  protected async loadContract(contractAddress: string) {
    const accounts = await this.web3.eth.getAccounts();
    if (!accounts || accounts.length <= 0) {
      await this.loadWeb3();
    }
    if (!this.web3) {
      return null;
    }
    const contract = new this.web3.eth.Contract(
      this.contractABI,
      contractAddress,
    );
    return contract;
  }
}
