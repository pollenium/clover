import { Bytes32, Uint256, Address, Uintable } from 'pollenium-buttercup'
import { Uish, Uu } from 'pollenium-uvaursi'
import { ethers } from 'ethers'

export interface TransactionStruct {
  hash: Uish,
  blockNumber: Uintable,
  timestamp: Uintable | null,
  data: Uish,
  to: Uish | null,
  from: Uish,
  gasLimit: Uintable,
  gasPrice: Uintable,
  nonce: Uintable,
  value: Uintable
}

export class Transaction {

  readonly hash: Bytes32
  readonly blockNumber: Uint256
  readonly timestamp: Uint256 | null
  readonly data: Uu
  readonly to: Address | null
  readonly from: Address
  readonly gasLimit: Uint256
  readonly gasPrice: Uint256
  readonly nonce: Uint256
  readonly value: Uint256

  constructor(struct: TransactionStruct) {
    this.hash = new Bytes32(struct.hash)
    this.blockNumber = new Uint256(struct.blockNumber)
    this.timestamp = struct.timestamp ? new Uint256(struct.timestamp) : null
    this.data = Uu.wrap(struct.data)
    this.to = struct.to ? new Address(struct.to) : null
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
    const to = ethersTransaction.to ? new Address(Uu.fromHexish(
      ethersTransaction.to
    )) : null
    const from = new Address(Uu.fromHexish(
      ethersTransaction.from
    ))
    const gasLimit = Uint256.fromBignumberish(ethersTransaction.gasLimit)
    const gasPrice = Uint256.fromBignumberish(ethersTransaction.gasLimit)
    const value = Uint256.fromBignumberish(ethersTransaction.value)

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
