import { ContractDeployer, ContractDeployerChildStruct, ContractReader, ContractReaderLog, ContractReaderChildStruct, ContractReaderFilterBlockRange, ContractWriter, ContractWriterChildStruct, StateChange } from '../../';
import { Uintable, Uint256, Address } from 'pollenium-buttercup';
export declare const solcOutput: any;
interface CounterDeployStruct {
    initialCount: Uintable;
}
export declare class CounterDeployer extends ContractDeployer<CounterDeployStruct> {
    constructor(struct: ContractDeployerChildStruct<CounterDeployStruct>);
}
export declare class CounterReader extends ContractReader {
    constructor(struct: ContractReaderChildStruct);
    fetchOwner(): Promise<Address>;
    fetchCount(): Promise<Uint256>;
    fetchIncrementLogs(range: ContractReaderFilterBlockRange): Promise<ContractReaderLog<{
        countBefore: Uint256;
        increment: Uint256;
        countAfter: Uint256;
    }>[]>;
}
export declare class CounterWriter extends ContractWriter {
    constructor(struct: ContractWriterChildStruct);
    incrementBy(increment: Uintable): Promise<StateChange>;
}
export {};
