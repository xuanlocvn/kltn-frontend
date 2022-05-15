export class BetDto {
  constructor(contract: string, betIndexs: number[]) {
    this.contract = contract;
    this.betIndexs = betIndexs;
  }
  contract: string;
  betIndexs: number[];
}