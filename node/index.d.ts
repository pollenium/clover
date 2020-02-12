import { Address, Bytes32 } from 'pollenium-buttercup';
import { Uu, Uish } from 'pollenium-uvaursi';
import { ethers } from 'ethers';
export interface ContractOutput {
    abiJson: string;
    bytecode: Uu;
}
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
export interface ContractWriterStruct {
    signer: ethers.Signer;
    abiJson: string;
    address: Uish;
}
export interface ContractChildWriterStruct {
    signer: ethers.Signer;
    abiJson?: string;
    address: Uish;
}
export interface ContractDeployerStruct {
    signer: ethers.Signer;
    abiJson: string;
    bytecode: Uish;
}
export interface ContractDeployerChildStruct {
    signer: ethers.Signer;
    abiJson?: string;
    bytecode?: Uish;
}
export interface DeployedStruct {
    transactionHash: Bytes32;
    address: Address;
}
export declare class ContractReader {
    readonly struct: ContractReaderStruct;
    readonly ethersContract: any;
    constructor(struct: ContractReaderStruct);
}
export declare class ContractWriter {
    readonly struct: ContractWriterStruct;
    readonly ethersContract: any;
    constructor(struct: ContractWriterStruct);
}
export declare abstract class ContractDeployer {
    readonly struct: ContractDeployerStruct;
    readonly ethersContractFactory: ethers.ContractFactory;
    abstract deploy(...args: any): Promise<DeployedStruct>;
    constructor(struct: ContractDeployerStruct);
}
