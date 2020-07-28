import { Bytes32, Uint256, Address, Uintable } from 'pollenium-buttercup';
import { Uish, Uu } from 'pollenium-uvaursi';
import { ethers } from 'ethers';
export interface TransactionStruct {
    hash: Uish;
    blockNumber: Uintable;
    timestamp: Uintable | null;
    data: Uish;
    to: Uish | null;
    from: Uish;
    gasLimit: Uintable;
    gasPrice: Uintable;
    nonce: Uintable;
    value: Uintable;
}
export declare class Transaction {
    readonly hash: Bytes32;
    readonly blockNumber: Uint256;
    readonly timestamp: Uint256 | null;
    readonly data: Uu;
    readonly to: Address | null;
    readonly from: Address;
    readonly gasLimit: Uint256;
    readonly gasPrice: Uint256;
    readonly nonce: Uint256;
    readonly value: Uint256;
    constructor(struct: TransactionStruct);
    static fetch(struct: {
        hash: Uish;
        provider: ethers.providers.Provider;
    }): Promise<Transaction>;
}
