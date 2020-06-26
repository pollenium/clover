import { ethers } from 'ethers'
import { Uu, Uish } from 'pollenium-uvaursi'
import { Address } from 'pollenium-buttercup'
import { StateChange } from './StateChange'

export interface ContractWriterStruct {
  signer: ethers.Signer,
  abiJson: string,
  address: Uish
}

export interface ContractWriterChildStruct {
  signer: ethers.Signer,
  abiJson?: string,
  address: Uish
}

export abstract class ContractWriter {
  readonly ethersContract
  constructor(readonly struct: ContractWriterStruct) {
    this.ethersContract = new ethers.Contract(
      new Address(struct.address).uu.toPhex(),
      struct.abiJson,
      struct.signer
    )
  }
  protected async genStateChange(ethersTransactionPromise: Promise<{ hash: string }>): Promise<StateChange> {
    const transaction = await ethersTransactionPromise
    const transactionHash = Uu.fromHexish(transaction.hash)
    return new StateChange({ provider: this.struct.signer.provider, transactionHash })
  }
}
