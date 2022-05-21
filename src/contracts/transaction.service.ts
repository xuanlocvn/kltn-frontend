export class TransactionService {
  async estimateGas(
    web3: any,
    from: string,
    to: string,
    data: string,
    value: string | number,
  ) {
    const gas = await web3.eth
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
    web3: any,
    contract: any,
    value: number | string,
    method: string,
    ...args: any[]
  ) {
    if (!web3) return null;
    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];
    const to = contract.options.address;
    console.log(...args);
    const data = contract.methods[method](...args).encodeABI();
    try {
      await this.estimateGas(web3, from, to, data, value);
    } catch (error) {
      console.error(error);
      return null;
    }

    const tx = await contract.methods[method](...args).send({
      from: accounts[0],
    });
    return tx;
  }
}

export const transactionService = new TransactionService();
