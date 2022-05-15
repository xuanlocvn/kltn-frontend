import ContractBase from './contract-base';
import ScholarshipContracABI from './abi/ScholarshipContract.json';
import { transactionService } from './transaction.service';

class ScholarshipContractService extends ContractBase {
  readonly contractABI: any = ScholarshipContracABI.abi;

  async getParticipantList(_contractAddress: string) {
    const contract = await this.loadContract(_contractAddress);
    if (!contract) return;
    const list = await contract.methods.getParticipantList().call();
    return list;
  }

  async addStudentToScholarship(
    _contractAddress: string,
    studentsAddress: string[],
  ) {
    const contract = await this.loadContract(_contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      contract,
      0,
      'addStudentToScholarship',
      studentsAddress,
    );
    return tx;
  }

  async removeStudentFromScholarship(
    _contractAddress: string,
    _studentAddress: string,
  ) {
    const contract = await this.loadContract(_contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      contract,
      0,
      'removeStudentFromScholarship',
      _studentAddress,
    );
    return tx;
  }
}

export const scholarshipContractService = new ScholarshipContractService();
