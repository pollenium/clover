import { ethers } from 'ethers';
import { Uish } from 'pollenium-uvaursi';
import { DeployStateChange } from './DeployStateChange';
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
export declare abstract class ContractDeployer<DeployStruct> {
    readonly struct: ContractDeployerStruct<DeployStruct>;
    readonly ethersContractFactory: ethers.ContractFactory;
    constructor(struct: ContractDeployerStruct<DeployStruct>);
    deploy(struct: DeployStruct): Promise<DeployStateChange>;
}
