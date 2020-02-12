import { Address, Bytes32, Uint256 } from 'pollenium-buttercup'
import { Uu, Uish } from 'pollenium-uvaursi'
import { ethers } from 'ethers'

export interface ContractOutput {
  abiJson: string,
  bytecode: Uu
}

export interface ContractReaderStruct {
  provider: ethers.providers.Provider,
  abiJson: string,
  address: Uish
}

export interface ContractWriterStruct {
  signer: ethers.Signer,
  abiJson: string,
  address: Uish
}

export interface ContractDeployerStruct {
  signer: ethers.Signer,
  abiJson: string,
  bytecode: Uish
}

export interface DeployedStruct {
  transactionHash: Bytes32,
  address: Address
}

export class ContractReader {
  readonly ethersContract
  constructor(readonly struct: ContractReaderStruct) {
    this.ethersContract = new ethers.Contract(
      new Address(struct.address).uu.toPhex(),
      struct.abiJson,
      struct.provider
    )
  }
}

export class ContractWriter {
  readonly ethersContract
  constructor(readonly struct: ContractWriterStruct) {
    this.ethersContract = new ethers.Contract(
      new Address(struct.address).uu.toPhex(),
      struct.abiJson,
      struct.signer
    )
  }
}

export abstract class ContractDeployer {
  readonly ethersContractFactory: ethers.ContractFactory
  abstract deploy(...args: any): Promise<DeployedStruct>;
  constructor(readonly struct: ContractDeployerStruct) {
    this.ethersContractFactory = new ethers.ContractFactory(
      struct.abiJson,
      Uu.wrap(struct.bytecode).u,
      struct.signer
    )
  }

}
