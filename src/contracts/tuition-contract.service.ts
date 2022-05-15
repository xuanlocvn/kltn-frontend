import ContractBase from './contract-base';
import TuitionContracABI from './abi/TuitionContract.json';
import { transactionService } from './transaction.service';

class TuitionContracService extends ContractBase {
  readonly contractABI: any = TuitionContracABI.abi;

  async getParticipantList(_contractAddress: string) {
    const contract = await this.loadContract(_contractAddress);
    if (!contract) return;
    const list = await contract.methods.getParticipantList().call();
    return list;
  }

  async getParticipantListCompleted(_contractAddress: string) {
    const contract = await this.loadContract(_contractAddress);
    if (!contract) return;
    const list = await contract.methods.getParticipantListCompleted().call();
    return list;
  }

  async addStudentToTuition(
    _contractAddress: string,
    studentsAddress: string[],
  ) {
    const contract = await this.loadContract(_contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      contract,
      0,
      'addStudentToTuition',
      studentsAddress,
    );
    return tx;
  }

  async removeStudentFromTuition(
    _contractAddress: string,
    _studentAddress: string,
  ) {
    const contract = await this.loadContract(_contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      contract,
      0,
      'removeStudentFromTuition',
      _studentAddress,
    );
    return tx;
  }

  async paymentByToken(_contractAddress: string) {
    const contract = await this.loadContract(_contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      contract,
      0,
      'paymentByToken',
    );
    return tx;
  }

  async paymentByCurrency(_contractAddress: string) {
    const contract = await this.loadContract(_contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      contract,
      0,
      'paymentByCurrency',
    );
    return tx;
  }
}

export const tuitionContracService = new TuitionContracService();
