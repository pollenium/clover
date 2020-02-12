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
export interface ContractWriterChildStruct {
    signer: ethers.Signer;
    abiJson?: string;
    address: Uish;
}
export declare type DeployTransformer<DeployStruct> = (struct: DeployStruct) => Array<any>;
export interface ContractDeployerStruct<DeployStruct> {
    signer: ethers.Signer;
    abiJson: string;
    bytecode: Uish;
    deployTransformer?: DeployTransformer<DeployStruct>;
}
export interface ContractDeployerChildStruct<DeployStruct> {
    signer: ethers.Signer;
    abiJson?: string;
    bytecode?: Uish;
    deployTransformer?: DeployTransformer<DeployStruct>;
}
export interface DeployReturnStruct {
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
export declare abstract class ContractDeployer<DeployStruct> {
    readonly struct: ContractDeployerStruct<DeployStruct>;
    readonly ethersContractFactory: ethers.ContractFactory;
    deploy(struct: DeployStruct): Promise<DeployReturnStruct>;
    constructor(struct: ContractDeployerStruct<DeployStruct>);
}
