import ContractBase from "./contract-base"
import MissionContractABI from "./abi/MissionContract.json"
import { transactionService } from "./transaction.service"

class MissionContractService extends ContractBase {
  readonly contractABI: any = MissionContractABI.abi

  async getParticipantList(_contractAddress: string) {
    const contract = await this.loadContract(_contractAddress)
    if (!contract) return
    const list = await contract.methods.getParticipantList().call()
    return list
  }

  async getParticipantListCompleted(_contractAddress: string) {
    const contract = await this.loadContract(_contractAddress)
    if (!contract) return
    const list = await contract.methods.getParticipantListCompleted().call()
    return list
  }

  async addStudentToMission(
    _contractAddress: string,
    studentsAddress: string[],
  ) {
    const contract = await this.loadContract(_contractAddress)
    if (!contract) return
    const tx = await transactionService.sendTransaction(
      contract,
      this.web3,
      0,
      "addStudentToMission",
      studentsAddress,
    )
    return tx
  }

  async register(_contractAddress: string) {
    console.log(_contractAddress)
    const contract = await this.loadContract(_contractAddress)
    if (!contract) return
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      "register",
    )
    return tx
  }

  async cancelRegister(_contractAddress: string) {
    const contract = await this.loadContract(_contractAddress)
    if (!contract) return
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      "cancelRegister",
    )
    return tx
  }

  async confirmCompletedAddress(
    _contractAddress: string,
    _studentsAddress: string[],
  ) {
    const contract = await this.loadContract(_contractAddress)
    if (!contract) return
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      "confirmCompletedAddress",
      _studentsAddress,
    )
    return tx
  }

  async unConfirmCompletedAddress(
    _contractAddress: string,
    _studentAddress: string[],
  ) {
    const contract = await this.loadContract(_contractAddress)
    if (!contract) return
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      "unConfirmCompletedAddress",
      _studentAddress,
    )
    return tx
  }
}

export const missionContractService = new MissionContractService()
