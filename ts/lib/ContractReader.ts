import { ethers } from 'ethers'
import { Uish } from 'pollenium-uvaursi'
import { Address } from 'pollenium-buttercup'

export interface ContractReaderStruct {
  provider: ethers.providers.Provider,
  abiJson: string,
  address: Uish
}

export interface ContractReaderChildStruct {
  provider: ethers.providers.Provider,
  abiJson?: string,
  address: Uish
}


export abstract class ContractReader {
  readonly ethersContract
  constructor(readonly struct: ContractReaderStruct) {
    this.ethersContract = new ethers.Contract(
      new Address(struct.address).uu.toPhex(),
      struct.abiJson,
      struct.provider
    )
  }
}
