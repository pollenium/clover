import { ethers } from 'ethers';
import { Uish } from 'pollenium-uvaursi';
import { Bytes32 } from 'pollenium-buttercup';
import { Transaction } from './Transaction';
export interface StateChangeAwaitConfirmationsStruct {
    confirmations: number;
    timeoutSeconds: number;
}
export interface StateChangeTimeoutErrorStruct extends StateChangeAwaitConfirmationsStruct {
    transactionHash: Bytes32;
}
export declare class StateChangeTimeoutError extends Error {
    constructor(struct: StateChangeTimeoutErrorStruct);
}
export interface StateChangeStruct {
    provider: ethers.providers.Provider;
    transactionHash: Uish;
}
export declare class StateChange {
    readonly provider: ethers.providers.Provider;
    readonly transactionHash: Bytes32;
    constructor(struct: StateChangeStruct);
    awaitConfirmations(struct: StateChangeAwaitConfirmationsStruct): Promise<void>;
    fetchTransaction(): Promise<Transaction>;
    logGasLimit(identifier: string): Promise<void>;
}
