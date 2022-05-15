import ContractBase from './contract-base';
import ActiveNFTABI from './abi/ActiveNFT.json';
import { transactionService } from './transaction.service';

class ActiveNFTService extends ContractBase {
  readonly contractABI: any = ActiveNFTABI;
  readonly contractAddress: string = process.env.ACTIVE_NFT_ADDRESS;

  async requestActiveNFT(_itemId: number | string, _amount: number | string) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      contract,
      0,
      'requestActiveNFT',
      _itemId,
      _amount,
    );
    return tx;
  }

  async cancelRequestActiveNFT(_activeId: number | string) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      contract,
      0,
      'cancelRequestActiveNFT',
      _activeId,
    );
    return tx;
  }

  async activeNFT(_activeId: number | string) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      contract,
      0,
      'activeNFT',
      _activeId,
    );
    return tx;
  }
}

export const activeNFTService = new ActiveNFTService();
