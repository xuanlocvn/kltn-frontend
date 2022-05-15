import ContractBase from './contract-base';
import MarketplaceABI from './abi/Marketplace.json';
import { transactionService } from './transaction.service';

class MarketplaceContractService extends ContractBase {
  readonly contractABI: any = MarketplaceABI;
  readonly contractAddress: string = process.env.MARKETPLACE_ADDRESS;

  async list(
    _itemId: number | string,
    _oneItemPrice: number | string,
    _amount: number | string,
  ) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      contract,
      0,
      'list',
      _itemId,
      _oneItemPrice,
      _amount,
    );
    return tx;
  }

  async deList(_itemId: number | string) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      contract,
      0,
      'deList',
      _itemId,
    );
    return tx;
  }

  async updatePrice(_itemId: number | string, _oneItemPrice: number | string) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      contract,
      0,
      'updatePrice',
      _itemId,
      _oneItemPrice,
    );
    return tx;
  }

  async buy(
    _itemId: number | string,
    _seller: string,
    _amount: number | string,
  ) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      contract,
      0,
      'buy',
      _itemId,
      _seller,
      _amount,
    );
    return tx;
  }

  async createAndListNFT(
    _nftInfo: [metadataInHash: string, isCourseNFT: boolean],
    _oneItemPrice: number | string,
    _amount: number | string,
  ) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      contract,
      0,
      'createAndListNFT',
      _nftInfo,
      _oneItemPrice,
      _amount,
    );
    return tx;
  }

  async updateAmountNFT(_itemId: number | string, _amount: number | string) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      contract,
      0,
      'updateAmountNFT',
      _itemId,
      _amount,
    );
    return tx;
  }

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

  async activeNFTByAdmin(_activeId: number | string) {
    const contract = await this.loadContract(this.contractAddress);
    if (!contract) return;
    const tx = await transactionService.sendTransaction(
      contract,
      0,
      'activeNFTByAdmin',
      _activeId,
    );
    return tx;
  }
}

export const marketplaceContractService = new MarketplaceContractService();
