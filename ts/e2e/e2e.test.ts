import { gaillardia, deployer, blockTimeSeconds } from './lib/params'
import { Address } from 'pollenium-buttercup'
import { Primrose } from 'pollenium-primrose'
import { CounterDeployer, CounterReader, CounterWriter } from './lib/CounterContract'

let counterReader: CounterReader
let counterWriter: CounterWriter

jest.setTimeout(60000)

describe('CounterContract', () => {
  test('deploy', async () => {
    const deployStateChange = await new CounterDeployer({
      signer: deployer.getSigner()
    }).deploy({
      initialCount: 1
    })
    await deployStateChange.awaitConfirmations({ confirmations: 1, timeoutSeconds: 30 })
    expect(deployStateChange.address).toBeInstanceOf(Address)
    counterReader = new CounterReader({
      address: deployStateChange.address,
      provider: gaillardia.ethersWeb3Provider
    })
    counterWriter = new CounterWriter({
      address: deployStateChange.address,
      signer: deployer.getSigner()
    })
  })
  test('owner should be deployer', async () => {
    const owner = await counterReader.fetchOwner()
    expect(owner.uu.toHex()).toStrictEqual(deployer.address.uu.toHex())
  })
  test('count should be 1', async () => {
    const count = await counterReader.fetchCount()
    expect(count.toNumber()).toBe(1)
  })
  test('should increment by 2', async () => {
    const confirmations = 3
    const stateChange = await counterWriter.incrementBy(2)
    const broadcastAtMs = new Date().getTime()
    await stateChange.awaitConfirmations({ confirmations, timeoutSeconds: 30 })
    const confirmedAtMs = new Date().getTime()
    const confirmationTimeSeconds = ((confirmedAtMs - broadcastAtMs) / 1000)
    expect(confirmationTimeSeconds).toBeGreaterThan(blockTimeSeconds * (confirmations - 1))
  })
})
