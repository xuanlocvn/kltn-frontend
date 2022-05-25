import ContractBase from './contract-base';
import ManagerPoolABI from './abi/ManagerPool.json';
import { transactionService } from './transaction.service';
import { CONFIG } from 'src/configs/config.enum';
import { configService } from 'src/configs/config.service';
import { amountToValue } from './helpers';

class ManagerPoolContractService extends ContractBase {
  readonly contractABI: any = ManagerPoolABI.abi;
  readonly contractAddress: string = configService.getConfig(
    CONFIG.MANAGER_POOL_ADDRESS,
  );

  async studentInfo(studentAddress: string) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const studentInfoHash = await contract.methods
      .studentInfo(studentAddress)
      .call();
    return studentInfoHash;
  }

  async lecturerInfo(lectureAddress: string) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const studentInfoHash = await contract.methods
      .lecturerInfo(lectureAddress)
      .call();
    return studentInfoHash;
  }

  async addStudentInfo(studentAddr: string, hashInfo: string) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      'addStudentInfo',
      studentAddr,
      hashInfo,
    );
    return tx;
  }

  async update(studentAddr: string, hashInfo: string) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      'update',
      studentAddr,
      hashInfo,
    );
    return tx;
  }

  async addLecturerInfo(lecturerAddr: string, hashInfo: string) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      'addLecturerInfo',
      lecturerAddr,
      hashInfo,
    );
    return tx;
  }

  async createNewMission(
    _urlMetadata: string,
    _missionId: string,
    _award: number | string,
    _maxEntrant: number | string,
    _persionInCharge: string,
    _startTime: number | string,
    _endTimeToRegister: number | string,
    _endTime: number | string,
    _endTimeToConfirm: number | string,
  ) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      'createNewMission',
      _urlMetadata,
      _missionId,
      amountToValue(Number(_award)),
      _maxEntrant,
      _persionInCharge,
      _startTime,
      _endTimeToRegister,
      _endTime,
      _endTimeToConfirm,
    );
    return tx;
  }

  async createNewSubject(
    _urlMetadata: string,
    _subjectId: string,
    _maxEntrant: number | string,
    _persionInCharge: string,
    _startTime: number | string,
    _endTimeToRegister: number | string,
    _endTime: number | string,
    _endTimeToConfirm: number | string,
  ) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      'createNewSubject',
      _urlMetadata,
      _subjectId,
      _maxEntrant,
      _persionInCharge,
      _startTime,
      _endTimeToRegister,
      _endTime,
      _endTimeToConfirm,
    );
    return tx;
  }

  async createNewScholarship(
    _urlMetadata: string,
    _scholarshipId: string,
    _award: number | string,
    _startTime: number | string,
    _endTime: number | string,
  ) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      'createNewScholarship',
      _urlMetadata,
      _scholarshipId,
      amountToValue(Number(_award)),
      _startTime,
      _endTime,
    );
    return tx;
  }

  async createNewTuition(
    _urlMetadata: string,
    _tuitionId: string,
    _feeByToken: number | string,
    _startTime: number | string,
    _endTime: number | string,
  ) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      this.web3,
      contract,
      0,
      'createNewTuition',
      _urlMetadata,
      _tuitionId,
      amountToValue(Number(_feeByToken)),
      _startTime,
      _endTime,
    );
    return tx;
  }
}

export const managerPoolContractService = new ManagerPoolContractService();
