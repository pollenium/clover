import { ethers } from 'ethers';
import { Uish } from 'pollenium-uvaursi';
import { StateChange } from './StateChange';
export interface ContractWriterStruct {
    signer: ethers.Signer;
    abiJson: string;
    address: Uish;
}
export interface ContractWriterChildStruct {
    signer: ethers.Signer;
    abiJson?: string;
    address: Uish;
}
export declare abstract class ContractWriter {
    readonly struct: ContractWriterStruct;
    readonly ethersContract: any;
    constructor(struct: ContractWriterStruct);
    protected genStateChange(ethersTransactionPromise: Promise<{
        hash: string;
    }>): Promise<StateChange>;
}
