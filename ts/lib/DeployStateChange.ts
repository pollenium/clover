import { ethers } from 'ethers'
import { Uish } from 'pollenium-uvaursi'
import { Address } from 'pollenium-buttercup'
import { Primrose } from 'pollenium-primrose'
import { StateChange, StateChangeStruct } from './StateChange'

export interface DeployStateChangeStruct extends StateChangeStruct {
  address: Uish
}

export class DeployStateChange extends StateChange {

  readonly address: Address
  constructor(struct: DeployStateChangeStruct) {
    super({ ...struct })
    this.address = new Address(struct.address)
  }
}
