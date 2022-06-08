import ERC20_ABI from "./abi/erc20.json"
import ContractBase from "./contract-base"
import { amountToValue, valueToAmount } from "./helpers"

export class Erc20ContractService extends ContractBase {
  contractABI: any = ERC20_ABI

  async getInfo(tokenAddress: string) {
    const contract = await this.loadContract(tokenAddress)
    if (!contract) {
      return null
    }

    const accounts = await this.web3.eth.getAccounts()
    const [symbol, name, decimals, balance] = await Promise.all([
      contract.methods.symbol().call(),
      contract.methods.name().call(),
      contract.methods.decimals().call(),
      contract.methods.balanceOf().call({ from: accounts[0] }),
    ])

    return {
      symbol,
      name,
      decimals,
      balance,
    }
  }

  async getAllowance(tokenAddress: string, spender: string) {
    const contract = await this.loadContract(tokenAddress)
    if (!contract) {
      return null
    }
    const owner = await this.web3.eth.getAccounts()
    const allowance = await contract.methods.allowance(owner[0], spender).call()
    return valueToAmount(allowance)
  }

  async approve(
    tokenAddress: string,
    spender: string,
    amount: number | string,
  ) {
    const contract = await this.loadContract(tokenAddress)
    if (!contract) {
      return null
    }
    const accounts = await this.web3.eth.getAccounts()
    const transaction = await contract.methods
      .approve(spender, amountToValue(Number(amount)))
      .send({ from: accounts[0] })
    return transaction
  }

  async transfer(tokenAddress: string, to: string, amount: number | string) {
    const contract = await this.loadContract(tokenAddress)
    if (!contract) {
      return null
    }
    const accounts = await this.web3.eth.getAccounts()
    const transaction = await contract.methods
      .transfer(to, amount)
      .send({ from: accounts[0] })
    return transaction
  }

  async getDecimals(tokenAddress: string) {
    const contract = await this.loadContract(tokenAddress)
    if (!contract) {
      return null
    }
    const decimals = await contract.methods.decimals().call()
    return decimals
  }

  async getERC20Balance(tokenAddress: string, walletAddress: string) {
    const tokenInst = new this.web3.eth.Contract(this.contractABI, tokenAddress)

    const balance = await tokenInst.methods
      .balanceOf(walletAddress)
      .call()
      .then(function (balance) {
        return balance
      })

    return balance
  }
}

export const erc20ContractService = new Erc20ContractService()
