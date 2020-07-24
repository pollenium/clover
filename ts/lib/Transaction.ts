import { Bytes32, Uint256, Address, Uintable } from 'pollenium-buttercup'
import { Uish, Uu } from 'pollenium-uvaursi'
import { ethers } from 'ethers'

export interface TransactionStruct {
  hash: Uish,
  blockNumber: Uintable,
  timestamp: Uintable,
  data: Uish,
  to: Uish,
  from: Uish,
  gasLimit: Uintable,
  gasPrice: Uintable,
  nonce: Uintable,
  value: Uintable
}

export class Transaction {

  readonly hash: Bytes32
  readonly blockNumber: Uint256
  readonly timestamp: Uint256
  readonly data: Uint256
  readonly to: Address
  readonly from: Address
  readonly gasLimit: Uint256
  readonly gasPrice: Uint256
  readonly nonce: Uint256
  readonly value: Uint256

  constructor(struct: TransactionStruct) {
    this.hash = new Bytes32(struct.hash)
    this.blockNumber = new Uint256(struct.blockNumber)
    this.timestamp = new Uint256(struct.timestamp)
    this.data = new Uint256(struct.data)
    this.to = new Address(struct.to)
    this.from = new Address(struct.from)
    this.gasLimit = new Uint256(struct.gasLimit)
    this.gasPrice = new Uint256(struct.gasPrice)
    this.nonce = new Uint256(struct.nonce)
    this.value = new Uint256(struct.value)
  }

  static async fetch(struct: {
    hash: Uish,
    provider: ethers.providers.Provider
  }): Promise<Transaction> {
    const hash = new Bytes32(struct.hash)
    const ethersTransaction = await struct.provider.getTransaction(
      hash.uu.toPhex()
    )

    const data = Uu.fromHexish(ethersTransaction.data)
    const to = new Address(Uu.fromHexish(
      ethersTransaction.to
    ))
    const from = new Address(Uu.fromHexish(
      ethersTransaction.from
    ))
    const gasLimit = new Uint256(Uu.fromHexish(
      ethers.utils.hexlify(ethersTransaction.gasLimit)
    ))
    const gasPrice = new Uint256(Uu.fromHexish(
      ethers.utils.hexlify(ethersTransaction.gasLimit)
    ))
    const value = new Uint256(Uu.fromHexish(
      ethers.utils.hexlify(ethersTransaction.value)
    ))

    return new Transaction ({
      blockNumber: ethersTransaction.blockNumber,
      timestamp: ethersTransaction.timestamp,
      hash,
      data,
      to,
      from,
      gasLimit,
      gasPrice,
      value,
      nonce: ethersTransaction.nonce
    })
  }
}
