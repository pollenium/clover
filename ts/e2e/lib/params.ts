import { Uint256 } from 'pollenium-buttercup'
import { User } from './User'
import { Gaillardia } from 'pollenium-gaillardia'

export const blockTimeSeconds = 3
export const startWei = new Uint256(10).opPow(8)

export const admin = User.gen()

export const deployer = User.gen()

export const alice = User.gen()
export const bob = User.gen()

export const allUsers: User[] = [
  admin,
  deployer,
  alice,
  bob
]

export const gaillardia = new Gaillardia({
  gasLimit: 0xffffffffffff,
  gasPrice: 1,
  accounts: allUsers.map((user) => {
    return {
      privateKey: user.privateKey,
      startBalance: startWei
    }
  }),
  blockTimeSeconds
})

allUsers.forEach((user) => {
  user.setSigner(gaillardia)
})
