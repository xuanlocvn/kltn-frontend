import Web3 from "web3"
function _decodeTransfer(
  log: { data: string; topics: string[]; address: string },
  web3: Web3,
) {
  const { data, topics, address: token } = log
  const transferABI = [
    {
      type: "address",
      name: "from",
      indexed: true,
    },
    {
      type: "address",
      name: "to",
      indexed: true,
    },
    {
      type: "uint256",
      name: "amount",
    },
  ]
  const obj = web3.eth.abi.decodeLog(transferABI, data, topics.slice(1))
  const { from, to, amount } = obj
  return { token, from, to, amount }
}

function getTransaction(txHex: string, web3: Web3) {
  return web3.eth.getTransactionReceipt(txHex)
}

export async function decodeTransfers(txHex: string, web3: Web3) {
  const tx = await getTransaction(txHex, web3)
  const logs = tx.logs
  const transferTopic = web3.eth.abi.encodeEventSignature(
    "Transfer(address,address,uint256)",
  )
  const transferLogs = logs.filter((log) => log.topics[0] === transferTopic)
  const decoded = transferLogs.map((log) => _decodeTransfer(log, web3))
  return decoded
}
