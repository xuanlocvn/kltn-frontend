import ContractBase from "./contract-base"
import ActiveNFTABI from "./abi/ActivateNFT.json"
import { transactionService } from "./transaction.service"
import { configService } from "src/configs/config.service"
import { CONFIG } from "src/configs/config.enum"

class ActiveNFTService extends ContractBase {
  readonly contractABI: any = ActiveNFTABI.abi
  readonly contractAddress: string = configService.getConfig(
    CONFIG.ACTIVE_NFT_ADDRESS,
  )

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

  async cancelRequestActiveNFT(_activeId: (number | string)[]) {
    const contract = await this.loadContract(this.contractAddress)
    if (!contract) return
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      "cancelRequestActiveNFT",
      _activeId,
    )
    return tx
  }

  async activeNFT(_activeId: (number | string)[]) {
    const contract = await this.loadContract(this.contractAddress)
    if (!contract) return
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      "activeNFT",
      _activeId,
    )
    return tx
  }
}

export const activeNFTService = new ActiveNFTService()
