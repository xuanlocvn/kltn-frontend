import ContractBase from "./contract-base"
import MarketplaceABI from "./abi/Marketplace.json"
import { transactionService } from "./transaction.service"
import { CONFIG } from "src/configs/config.enum"
import { configService } from "src/configs/config.service"
import { amountToValue } from "./helpers"

class MarketplaceContractService extends ContractBase {
  readonly contractABI: any = MarketplaceABI.abi
  readonly contractAddress: string = configService.getConfig(
    CONFIG.MARKETPLACE_ADDRESS,
  )

  async list(
    _itemId: number | string,
    _oneItemPrice: number | string,
    _amount: number | string,
  ) {
    const contract = await this.loadContract(this.contractAddress)
    if (!contract) return
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      "list",
      _itemId,
      amountToValue(Number(_oneItemPrice)),
      _amount,
    )
    return tx
  }

  async deList(_itemId: number | string) {
    const contract = await this.loadContract(this.contractAddress)
    if (!contract) return
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      "deList",
      _itemId,
    )
    return tx
  }

  async updatePrice(_itemId: number | string, _oneItemPrice: number | string) {
    const contract = await this.loadContract(this.contractAddress)
    if (!contract) return
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      "updatePrice",
      _itemId,
      amountToValue(Number(_oneItemPrice)),
    )
    return tx
  }

  async buy(
    _itemId: number | string,
    _seller: string,
    _amount: number | string,
  ) {
    const contract = await this.loadContract(this.contractAddress)
    if (!contract) return
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      "buy",
      _itemId,
      _seller,
      _amount,
    )
    return tx
  }

  async createAndListNFT(
    _nftInfo: [metadataInHash: string, isCourseNFT: boolean],
    _oneItemPrice: number | string,
    _amount: number | string,
  ) {
    const contract = await this.loadContract(this.contractAddress)
    if (!contract) return
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      "createAndListNFT",
      _nftInfo,
      amountToValue(Number(_oneItemPrice)),
      _amount,
    )
    return tx
  }

  async updateAmountNFT(_itemId: number | string, _amount: number | string) {
    const contract = await this.loadContract(this.contractAddress)
    if (!contract) return
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      "updateAmountNFT",
      _itemId,
      _amount,
    )
    return tx
  }

  async requestActivateNFT(_itemId: number | string, _amount: number | string) {
    const contract = await this.loadContract(this.contractAddress)
    if (!contract) return
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      "requestActivateNFT",
      _itemId,
      _amount,
    )
    return tx
  }

  async cancelRequestActivateNFT(_activeId: (number | string)[]) {
    const contract = await this.loadContract(this.contractAddress)
    if (!contract) return
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      "cancelRequestActivateNFT",
      _activeId,
    )
    return tx
  }

  async activateNFTByAdmin(_activeId: (number | string)[]) {
    const contract = await this.loadContract(this.contractAddress)
    if (!contract) return
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      "activateNFTByAdmin",
      _activeId,
    )
    return tx
  }
}

export const marketplaceContractService = new MarketplaceContractService()
