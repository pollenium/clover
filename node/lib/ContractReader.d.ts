import { ethers } from 'ethers';
import { Uish } from 'pollenium-uvaursi';
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
export declare abstract class ContractReader {
    readonly struct: ContractReaderStruct;
    readonly ethersContract: any;
    constructor(struct: ContractReaderStruct);
}
