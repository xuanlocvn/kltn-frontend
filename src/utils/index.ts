export function makeShotAccount(account: string): string {
  if (account) {
    const s1 = account.slice(0, 5)
    const s2 = account.slice(-3)
    return s1 + "..." + s2
  }
  return null
}

export function makeShotTransactionHash(hash: string): string {
  if (hash) {
    const s1 = hash.slice(0, 7)
    const s2 = hash.slice(-7)
    return s1 + "..." + s2
  }
  return null
}

export function convertLocalTime(timestamp: number) {
  const date = new Date(timestamp * 1000)
  const dd = String(date.getDate()).padStart(2, "0")
  const mm = String(date.getMonth() + 1).padStart(2, "0") //January is 0!
  const yyyy = date.getFullYear()

  return yyyy + "-" + mm + "-" + dd
}

export function convertLocalTimeFullFormat(timestamp: number) {
  const date = new Date(timestamp * 1000)
  const min = String(date.getMinutes()).padStart(2, "0")
  const hh = String(date.getHours()).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")
  const mm = String(date.getMonth() + 1).padStart(2, "0") //January is 0!
  const yyyy = date.getFullYear()

  return `${dd}/${mm}/${yyyy} ${hh}:${min}`
}

export function convertDateToTimestamp(myDate: string) {
  const newDate = new Date(myDate)
  return newDate.getTime() / 1000
}
