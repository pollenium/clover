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

export type DeployTransformer<DeployStruct> = (struct: DeployStruct) => Array<any>

export interface ContractDeployerStruct<DeployStruct> {
  signer: ethers.Signer,
  abiJson: string,
  bytecode: Uish,
  deployTransformer?: DeployTransformer<DeployStruct>
}

export interface ContractDeployerChildStruct<DeployStruct> {
  signer: ethers.Signer,
  abiJson?: string,
  bytecode?: Uish,
  deployTransformer?: DeployTransformer<DeployStruct>
}


export interface DeployReturnStruct {
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

export class ContractDeployer<DeployStruct> {
  readonly ethersContractFactory: ethers.ContractFactory

  async deploy(struct: DeployStruct): Promise<DeployReturnStruct> {
    const params = this.struct.deployTransformer ? this.struct.deployTransformer(struct) : []
    const ethersContract = await this.ethersContractFactory.deploy(...params)
    return {
      address: new Address(Uu.fromHexish(ethersContract.address)),
      transactionHash: new Bytes32(Uu.fromHexish(ethersContract.deployTransaction.hash))
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
