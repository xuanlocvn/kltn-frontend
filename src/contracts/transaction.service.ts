import ContractBase from './contract-base';

export class TransactionService extends ContractBase {
  async estimateGas(
    from: string,
    to: string,
    data: string,
    value: string | number,
  ) {
    const gas = await this.web3.eth
      .estimateGas({
        from,
        to,
        value,
        data,
      })
      .catch((error) => {
        console.log(error);
        return 0;
      });
    if (gas > 0) {
      return gas;
    } else {
      throw new Error('Estimate gas fail. Transaction will be reverted.');
    }
  }

  async sendTransaction(
    contract: any,
    value: number | string,
    method: string,
    ...args: any[]
  ) {
    if (!this.web3) return null;
    const from = this.web3.eth.getAccounts()[0];
    const to = contract.options.address;
    const data = contract.methods[method](...args).encodeABI();
    try {
      await this.estimateGas(from, to, data, value);
    } catch (error) {
      console.error(error);
      return null;
    }

    const tx = await contract.methods[method](...args).send({
      from: this.web3.eth.getAccounts()[0],
    });
    return tx;
  }
}

export const transactionService = new TransactionService();
