import { Keypair } from 'pollenium-ilex'
import { Address, Bytes32 } from 'pollenium-buttercup'
import { Uu, Uish } from 'pollenium-uvaursi'
import { Gaillardia } from 'pollenium-gaillardia'
import { ethers } from 'ethers'

export class User {

  readonly privateKey: Bytes32
  readonly keypair: Keypair
  readonly address: Address

  private signer: ethers.Wallet

  constructor(privateKey: Uish) {
    this.privateKey = new Bytes32(privateKey)
    this.keypair = new Keypair(this.privateKey)
    this.address = this.keypair.getAddress()
  }

  static gen(): User {
    return new User(Uu.genRandom(32))
  }

  getSigner(): ethers.Wallet {
    if (!this.signer) {
      throw new Error('Signer not set')
    }
    return this.signer
  }

  setSigner(gaillardia: Gaillardia) {
    if (this.signer) {
      throw new Error('Signer already set')
    }
    this.signer = gaillardia.genWallet(this.privateKey)
  }
}
