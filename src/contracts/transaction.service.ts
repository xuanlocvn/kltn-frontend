/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { store } from 'src/app/store';
import {
  PopupState,
  showPopup,
  updatePopup,
} from '../components/shared/Popup/PopupSlice';
import {
  faCircleCheck,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { makeShotTransactionHash } from 'src/utils';

/* eslint-disable no-undef */
export class TransactionService {
  async estimateGas(
    web3: any,
    from: string,
    to: string,
    data: string,
    value: string | number,
  ) {
    const newState: PopupState = {
      isShowed: true,
      message: 'Đang tính toán gas...',
      style: 'primary',
      icon: null,
    };
    store.dispatch(showPopup(newState));
    const gas = await web3.eth
      .estimateGas({
        from,
        to,
        value,
        data,
      })
      .catch((error) => {
        console.log('hello', error.message);
        const newState: PopupState = {
          isShowed: true,
          message: `Đã có lỗi xảy ra: ${error.message}`,
          style: 'red',
          icon: faCircleExclamation,
        };
        store.dispatch(updatePopup(newState));
        throw error;
      });
    if (gas > 0) {
      return gas;
    }
    // else {
    //   const newState: PopupState = {
    //     isShowed: true,
    //     message: `Đã có lỗi xảy ra: Estimate gas fail, Transaction will be reverted.`,
    //     style: 'red',
    //     icon: faCircleExclamation,
    //   };
    //   store.dispatch(updatePopup(newState));
    //   throw new Error('Estimate gas fail. Transaction will be reverted.');
    // }
  }

  async sendTransaction(
    web3: any,
    contract: any,
    value: number | string,
    method: string,
    ...args: any[]
  ) {
    if (!web3) return null;
    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];
    const to = contract.options.address;
    console.log(...args);
    const data = contract.methods[method](...args).encodeABI();
    try {
      await this.estimateGas(web3, from, to, data, value);
    } catch (error) {
      console.error(error);
      return null;
    }

    const tx = await contract.methods[method](...args)
      .send({
        from: accounts[0],
      })
      .on('sending', (payload) => {
        const newState: PopupState = {
          isShowed: true,
          message: 'Đang tạo giao dịch...',
          style: 'primary',
          icon: null,
        };
        store.dispatch(showPopup(newState));
      })
      .on('sent', (payload) => {
        const newState: PopupState = {
          isShowed: true,
          message: 'Giao dịch đã được gửi đi...',
          style: 'info',
          icon: null,
        };
        store.dispatch(updatePopup(newState));
      })
      .on('transactionHash', function (hash) {
        console.log(hash);
        const newState: PopupState = {
          isShowed: true,
          message: `Giao dịch đã được gửi đi với mã hash ${makeShotTransactionHash(
            hash,
          )}`,
          style: 'info',
          icon: null,
        };
        store.dispatch(updatePopup(newState));
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        console.log(receipt);
        const newState: PopupState = {
          isShowed: true,
          message: 'Giao dịch thành công',
          style: 'success',
          icon: null,
        };
        store.dispatch(updatePopup(newState));
      })
      .on('receipt', function (receipt) {
        console.log(receipt);
        const newState: PopupState = {
          isShowed: true,
          message: 'Hoàn tất',
          style: 'green',
          icon: faCircleCheck,
        };
        store.dispatch(updatePopup(newState));
        // const timerId = setTimeout(() => console.log(1), 5000);
        // clearTimeout(timerId);
        // window.location.reload();
      })
      .on('error', function (error: Error, receipt) {
        console.log(receipt);
        const newState: PopupState = {
          isShowed: true,
          message: `Đã có lỗi xảy ra: ${error.message}`,
          style: 'red',
          icon: faCircleExclamation,
        };
        store.dispatch(updatePopup(newState));
      });
    return tx;
  }
}

export const transactionService = new TransactionService();
