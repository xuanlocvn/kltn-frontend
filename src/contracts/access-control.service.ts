import ContractBase from './contract-base';
import AccessControllABI from './abi/AccessControl.json';
import { ROLE_BYTES32 } from './enum/role.enum';
import { transactionService } from './transaction.service';

class AccessControlContractService extends ContractBase {
  readonly contractABI: any = AccessControllABI;
  readonly contractAddress: string = process.env.ACCESS_CONTROLL_ADDRESS;

  async hasRole(roleBytes32: ROLE_BYTES32, account: string): Promise<boolean> {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const isRole = await contract.methods.hasRole(roleBytes32, account).call();
    return isRole;
  }

  async grantRole(roleBytes32: ROLE_BYTES32, account: string) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const grantRoleTx = await transactionService.sendTransaction(
      contract,
      0,
      'grantRole',
      roleBytes32,
      account,
    );
    return grantRoleTx;
  }
}

export const accessControlContractService = new AccessControlContractService();
