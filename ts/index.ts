import { Address, Bytes32, Uint256 } from 'pollenium-buttercup'
import { Uu, Uish } from 'pollenium-uvaursi'
import { ethers } from 'ethers'

export type Abi = Array<string | ethers.utils.FunctionFragment | ethers.utils.EventFragment | ethers.utils.ParamType> | string | ethers.utils.Interface

export interface ContractOutput {
  abi: Abi,
  bytecode: Uu
}

export interface ContractReaderStruct {
  provider: ethers.providers.Provider,
  abi: ethers.utils.Interface,
  address: Uish
}

export interface ContractWriterStruct {
  signer: ethers.Signer,
  abi: ethers.utils.Interface,
  address: Uish
}

export interface ContractDeployerStruct {
  signer: ethers.Signer,
  abi: ethers.utils.Interface,
  bytecode: Uish
}

export interface ContractDeployerChildStruct extends Omit<ContractDeployerStruct, 'bytecode'> {
  bytecode?: Uish
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
      struct.abi,
      struct.provider
    )
  }
}

export class ContractWriter {
  readonly ethersContract
  constructor(readonly struct: ContractWriterStruct) {
    this.ethersContract = new ethers.Contract(
      new Address(struct.address).uu.toPhex(),
      struct.abi,
      struct.signer
    )
  }
}

export abstract class ContractDeployer {
  readonly ethersContractFactory: ethers.ContractFactory
  abstract deploy(...args: any): Promise<DeployedStruct>;
  constructor(readonly struct: ContractDeployerStruct) {
    this.ethersContractFactory = new ethers.ContractFactory(
      struct.abi,
      Uu.wrap(struct.bytecode).u,
      struct.signer
    )
  }

}
