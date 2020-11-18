import { ethers, EventFilter as EthersEventFilter, Event as EthersLog } from 'ethers';
import { Uu, Uish } from 'pollenium-uvaursi';
import { Address, Uint256, Bytes32, Uintable } from 'pollenium-buttercup';
export interface ContractReaderStruct {
    provider: ethers.providers.Provider;
    abiJson: string;
    address: Uish;
}
export interface ContractReaderChildStruct {
    provider: ethers.providers.Provider;
    abiJson?: string;
    address: Uish;
}
declare type EthersFilterBlockTag = 'latest' | 'pending';
declare type EthersFilterBlockFlag = EthersFilterBlockTag | number;
export declare type ContractReaderFilterBlockFlag = EthersFilterBlockFlag | Uintable;
export interface ContractReaderFilterBlockRange {
    from: ContractReaderFilterBlockFlag;
    to: ContractReaderFilterBlockFlag;
}
interface GenericEthersLog<EthersLogArgs> extends Omit<EthersLog, 'args'> {
    args: EthersLogArgs;
}
export interface ContractReaderLog<Values> {
    eventName?: string;
    eventSignature?: string;
    blockIndex: Uint256;
    blockHash: Bytes32;
    transactionIndex: number;
    address: Address;
    data: Uu;
    topics: Bytes32[];
    transactionHash: Bytes32;
    logIndex: number;
    values: Values;
}
export declare abstract class ContractReader {
    readonly struct: ContractReaderStruct;
    readonly ethersContract: any;
    constructor(struct: ContractReaderStruct);
    protected fetchEthersLogs<EthersLogArgs>(arg: {
        filter: EthersEventFilter;
        range: ContractReaderFilterBlockRange;
    }): Promise<GenericEthersLog<EthersLogArgs>[]>;
    protected fetchLogs<EthersLogArgs, ContractReaderLogValues>(arg: {
        filter: EthersEventFilter;
        range: ContractReaderFilterBlockRange;
        transformEthersLogArgsToLogValues: (args: EthersLogArgs) => ContractReaderLogValues;
    }): Promise<ContractReaderLog<ContractReaderLogValues>[]>;
}
export {};
