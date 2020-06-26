import { ethers } from 'ethers'
import { Uu, Uish } from 'pollenium-uvaursi'
import { Address } from 'pollenium-buttercup'
import { DeployStateChange } from './DeployStateChange'

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


export abstract class ContractDeployer<DeployStruct> {
  readonly ethersContractFactory: ethers.ContractFactory

  constructor(readonly struct: ContractDeployerStruct<DeployStruct>) {
    this.ethersContractFactory = new ethers.ContractFactory(
      struct.abiJson,
      Uu.wrap(struct.bytecode).u,
      struct.signer
    )
  }

  async deploy(struct: DeployStruct): Promise<DeployStateChange> {
    const params = this.struct.deployTransformer ? this.struct.deployTransformer(struct) : []
    const ethersContract = await this.ethersContractFactory.deploy(...params)
    return new DeployStateChange({
      provider: this.struct.signer.provider,
      address: Uu.fromHexish(ethersContract.address),
      transactionHash: Uu.fromHexish(ethersContract.deployTransaction.hash)
    })
  }

}
