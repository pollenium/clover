import { ethers, EventFilter as EthersEventFilter, Event as EthersLog } from 'ethers'
import { Uu, Uish } from 'pollenium-uvaursi'
import { Address, Uint256, Bytes32, Uintable } from 'pollenium-buttercup'

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

type EthersFilterBlockTag = 'latest' | 'pending'
type EthersFilterBlockFlag = EthersFilterBlockTag | number

export type ContractReaderFilterBlockFlag = EthersFilterBlockFlag | Uintable
export interface ContractReaderFilterBlockRange {
  from: ContractReaderFilterBlockFlag,
  to: ContractReaderFilterBlockFlag
}

interface GenericEthersLog<EthersLogArgs> extends Omit<EthersLog, 'args'> {
  args: EthersLogArgs
}

export interface ContractReaderLog<Values> {
  eventName?: string,
  eventSignature?: string,
  blockIndex: Uint256,
  blockHash: Bytes32,
  transactionIndex: number,
  address: Address,
  data: Uu,
  topics: Bytes32[],
  transactionHash: Bytes32,
  logIndex: number,
  values: Values
}

export abstract class ContractReader {
  readonly ethersContract
  constructor(readonly struct: ContractReaderStruct) {
    this.ethersContract = new ethers.Contract(
      new Address(struct.address).uu.toPhex(),
      struct.abiJson,
      struct.provider
    )
  }

  protected fetchEthersLogs<EthersLogArgs>(arg: {
    filter: EthersEventFilter,
    range: ContractReaderFilterBlockRange
  }): Promise<GenericEthersLog<EthersLogArgs>[]> {
    return this.ethersContract.queryFilter(
      arg.filter,
      convertContractReaderFilterBlockFlagToEthersFilterBlockFlag(arg.range.from),
      convertContractReaderFilterBlockFlagToEthersFilterBlockFlag(arg.range.to)
    )
  }

  protected async fetchLogs<EthersLogArgs, ContractReaderLogValues>(arg: {
    filter: EthersEventFilter,
    range: ContractReaderFilterBlockRange
    transformEthersLogArgsToLogValues: (args: EthersLogArgs) => ContractReaderLogValues
  }): Promise<ContractReaderLog<ContractReaderLogValues>[]> {
    const ethersLogs = await this.fetchEthersLogs<EthersLogArgs>({ ...arg })
    return ethersLogs.map((ethersLog) => {
      return {
        ...ethersLog,
        eventName: ethersLog.event,
        blockHash: new Bytes32(Uu.fromHexish(ethersLog.blockHash)),
        blockIndex: new Uint256(ethersLog.blockNumber),
        transactionHash: new Bytes32(Uu.fromHexish(ethersLog.transactionHash)),
        address: new Address(Uu.fromHexish(ethersLog.address)),
        data: Uu.fromHexish(ethersLog.address),
        topics: ethersLog.topics.map((topicHexish) => {
          return new Bytes32(Uu.fromHexish(topicHexish))
        }),
        values: arg.transformEthersLogArgsToLogValues(ethersLog.args)
      }
    })
  }

}

function convertContractReaderFilterBlockFlagToEthersFilterBlockFlag(
  arg: ContractReaderFilterBlockFlag
): EthersFilterBlockFlag {
  if (typeof arg === 'string') {
    return arg
  }
  return new Uint256(arg).toNumber()
}
