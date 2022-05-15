import ContractBase from './contract-base';
import AccessControllABI from './abi/AccessControl.json';
import { ROLE_BYTES32 } from './enum/role.enum';
import { transactionService } from './transaction.service';
import { ROLE } from 'src/utils/enum';
import { configService } from 'src/configs/config.service';
import { CONFIG } from 'src/configs/config.enum';

class AccessControlContractService extends ContractBase {
  readonly contractABI: any = AccessControllABI.abi;
  readonly contractAddress: string = configService.getConfig(
    CONFIG.ACCESS_CONTROLL_ADDRESS,
  );

  async getRole(account: string): Promise<string> {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;

    let isRole = await contract.methods
      .hasRole(ROLE_BYTES32.ADMIN, account)
      .call();
    if (isRole == false)
      isRole = await contract.methods
        .hasRole(ROLE_BYTES32.STUDENT, account)
        .call();
    else return ROLE.ADMIN;
    if (isRole == false)
      isRole = await contract.methods
        .hasRole(ROLE_BYTES32.LECTURER, account)
        .call();
    else return ROLE.STUDENT;
    if (isRole == true) return ROLE.LECTURER;
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
