import { ethers } from 'ethers'
import { Uish } from 'pollenium-uvaursi'
import { Bytes32 } from 'pollenium-buttercup'
import { Primrose } from 'pollenium-primrose'
import { Transaction } from './Transaction'
import delay from 'delay'

export interface StateChangeAwaitConfirmationsStruct {
  confirmations: number,
  timeoutSeconds: number
}

export interface StateChangeTimeoutErrorStruct extends StateChangeAwaitConfirmationsStruct {
  transactionHash: Bytes32
}

export class StateChangeTimeoutError extends Error {
  constructor(struct: StateChangeTimeoutErrorStruct) {
    super(`[${struct.transactionHash.uu.toHex()}] Failed to receive ${struct.confirmations} confirmations after ${struct.timeoutSeconds} seconds`)
    Object.setPrototypeOf(this, StateChangeTimeoutError.prototype)
  }
}

export interface StateChangeStruct {
  provider: ethers.providers.Provider,
  transactionHash: Uish
}

export class StateChange {

  readonly provider: ethers.providers.Provider
  readonly transactionHash: Bytes32

  constructor(struct: StateChangeStruct) {
    this.provider = struct.provider
    this.transactionHash = new Bytes32(struct.transactionHash)
  }
  async awaitConfirmations(struct: StateChangeAwaitConfirmationsStruct): Promise<void> {
    const { confirmations, timeoutSeconds } =  struct
    const donePrimrose = new Primrose<void>()

    const onBlock = async () => {
      const transaction = await this.provider.getTransaction(this.transactionHash.uu.toPhex())
      if (transaction && (transaction.confirmations >= confirmations)) {
        donePrimrose.resolve()
      }
    }

    this.provider.on('block', onBlock)

    donePrimrose.promise.finally(() => {
      this.provider.removeListener('block', onBlock)
    })

    delay(timeoutSeconds * 1000).then(() => {
      const stateChangeTimeoutError = new StateChangeTimeoutError({
        transactionHash: this.transactionHash,
        ...struct,
      })
      donePrimrose.reject(stateChangeTimeoutError)
    })


    return donePrimrose.promise
  }

  async fetchTransaction(): Promise<Transaction> {
    return Transaction.fetch({
      provider: this.provider,
      hash: this.transactionHash
    })
  }

}
