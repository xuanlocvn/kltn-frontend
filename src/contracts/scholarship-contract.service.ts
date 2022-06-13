import ContractBase from "./contract-base"
import ScholarshipContracABI from "./abi/ScholarshipContract.json"
import { transactionService } from "./transaction.service"

class ScholarshipContractService extends ContractBase {
  readonly contractABI: any = ScholarshipContracABI.abi

  async getParticipantList(_contractAddress: string) {
    const contract = await this.loadContract(_contractAddress)
    if (!contract) return
    const list = await contract.methods.getParticipantList().call()
    return list
  }

  async addStudentToScholarship(
    _contractAddress: string,
    studentsAddress: string[],
  ) {
    const contract = await this.loadContract(_contractAddress)
    if (!contract) return
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      "addStudentToScholarship",
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

export const scholarshipContractService = new ScholarshipContractService()
