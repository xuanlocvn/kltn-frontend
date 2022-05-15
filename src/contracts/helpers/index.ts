import Web3 from 'web3';

export function parseBigDecimal(value: number | string) {
  return parseFloat(
    Number(Web3.utils.fromWei(`0x${Number(value).toString(16)}`)).toFixed(4),
  );
}

export function numberToHex(input: number | string) {
  return `0x${Number(input).toString(16)}`;
}

export function amountToValue(amount: number) {
  return Web3.utils.toWei(amount.toString());
}

export function valueToAmount(value: string) {
  return Web3.utils.fromWei(value);
}
