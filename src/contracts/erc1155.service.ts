/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import IERC1155_ABI from "./abi/IERC1155.json"
import ContractBase from "./contract-base"
import { store } from "src/app/store"
import {
  PopupState,
  showPopup,
  updatePopup,
} from "src/components/shared/Popup/PopupSlice"
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons"

/* eslint-disable no-undef */
export class Erc1155ContractService extends ContractBase {
  contractABI: any = IERC1155_ABI.abi

  async isApprovedForAll(
    tokenAddress: string,
    spender: string,
  ): Promise<boolean> {
    const contract = await this.loadContract(tokenAddress)
    if (!contract) {
      return null
    }
    const owner = await this.web3.eth.getAccounts()
    const allowance = await contract.methods
      .isApprovedForAll(owner[0], spender)
      .call()
    return allowance
  }

  async setApprovalForAll(
    operator: string,
    approved: boolean,
    tokenAddress: string,
  ) {
    const contract = await this.loadContract(tokenAddress)
    if (!contract) {
      return null
    }
    const accounts = await this.web3.eth.getAccounts()
    const transaction = await contract.methods
      .setApprovalForAll(operator, approved)
      .send({ from: accounts[0] })
      .once("sending", function () {
        const newState: PopupState = {
          isShowed: true,
          message: `Vui lòng chờ phê duyệt sản phẩm`,
          style: "info",
          icon: null,
        }
        store.dispatch(showPopup(newState))
      })
      .once("transactionHash", function (hash) {
        console.log(hash)
        const newState: PopupState = {
          isShowed: true,
          message: `Vui lòng chờ phê duyệt sản phẩm`,
          style: "info",
          icon: null,
        }
        store.dispatch(showPopup(newState))
      })
      .on("confirmation", function (confirmationNumber, receipt) {
        const newState: PopupState = {
          isShowed: true,
          message: "Phê duyệt hoàn tất",
          style: "green",
          icon: faCircleCheck,
        }
        store.dispatch(updatePopup(newState))
      })
      .once("error", function (error: Error, receipt) {
        console.log(receipt)
        const newState: PopupState = {
          isShowed: true,
          message: `Đã có lỗi xảy ra trong khi phê duyệt sản phẩm`,
          style: "red",
          icon: faCircleExclamation,
        }
        store.dispatch(updatePopup(newState))
      })
    return transaction
  }

  async transfer(tokenAddress: string, to: string, amount: number | string) {
    const contract = await this.loadContract(tokenAddress)
    if (!contract) {
      return null
    }
    const accounts = await this.web3.eth.getAccounts()
    const transaction = await contract.methods
      .transfer(to, amount)
      .send({ from: accounts[0] })
    return transaction
  }
}

export const erc1155ContractService = new Erc1155ContractService()
