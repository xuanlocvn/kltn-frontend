export class Util {
  static dtoToTuple(dtos: any | any[], params: string[]) {
    const tuple = []
    if (Array.isArray(dtos)) {
      dtos.forEach((dto) => {
        const item = []
        params.forEach((param) => {
          item.push(dto[param])
        })
        tuple.push(item)
      })
    } else {
      const dto = dtos
      params.forEach((param) => {
        tuple.push(dto[param])
      })
    }
    return tuple
  }
  static isZeroAddress(address: string) {
    return address === "0x0000000000000000000000000000000000000000"
  }
}
