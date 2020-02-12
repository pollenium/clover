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

export interface ContractReaderChildStruct {
  provider: ethers.providers.Provider,
  abiJson?: string,
  address: Uish
}

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

export type DeployFunction<DeployStruct> = (contractDeployer: ContractDeployer<DeployStruct>, struct: DeployStruct) => DeployPrivateReturnStruct

export interface ContractDeployerStruct<DeployStruct> {
  signer: ethers.Signer,
  abiJson: string,
  bytecode: Uish,
  deploy: DeployFunction<DeployStruct>
}

export interface ContractDeployerChildStruct<DeployStruct> {
  signer: ethers.Signer,
  abiJson?: string,
  bytecode?: Uish,
  deploy?: DeployFunction<DeployStruct>
}


export interface DeployPrivateReturnStruct {
  transactionHash: Uish,
  address: Uish
}

export interface DeployPublicReturnStruct {
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

export abstract class ContractDeployer<DeployStruct> {
  readonly ethersContractFactory: ethers.ContractFactory

  async deploy(struct: DeployStruct): Promise<DeployPublicReturnStruct> {
    const deployPrivateReturnStruct = await this.struct.deploy(this, struct)
    return {
      address: new Address(deployPrivateReturnStruct.address),
      transactionHash: new Bytes32(deployPrivateReturnStruct.transactionHash)
    }
  }

  constructor(readonly struct: ContractDeployerStruct<DeployStruct>) {
    this.ethersContractFactory = new ethers.ContractFactory(
      struct.abiJson,
      Uu.wrap(struct.bytecode).u,
      struct.signer
    )
  }

}
