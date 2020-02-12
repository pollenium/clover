import { Address, Bytes32 } from 'pollenium-buttercup';
import { Uu, Uish } from 'pollenium-uvaursi';
import { ethers } from 'ethers';
export declare type Abi = Array<string | ethers.utils.FunctionFragment | ethers.utils.EventFragment | ethers.utils.ParamType> | string | ethers.utils.Interface;
export interface ContractOutput {
    abi: Abi;
    bytecode: Uu;
}
export interface ContractReaderStruct {
    provider: ethers.providers.Provider;
    abi: ethers.utils.Interface;
    address: Uish;
}
export interface ContractWriterStruct {
    signer: ethers.Signer;
    abi: ethers.utils.Interface;
    address: Uish;
}
export interface ContractDeployerStruct {
    signer: ethers.Signer;
    abi: ethers.utils.Interface;
    bytecode: Uish;
}
export interface ContractDeployerChildStruct extends Omit<ContractDeployerStruct, 'bytecode'> {
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
