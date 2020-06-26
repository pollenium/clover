import { Uish } from 'pollenium-uvaursi';
import { Address } from 'pollenium-buttercup';
import { StateChange, StateChangeStruct } from './StateChange';
export interface DeployStateChangeStruct extends StateChangeStruct {
    address: Uish;
}
export declare class DeployStateChange extends StateChange {
    readonly address: Address;
    constructor(struct: DeployStateChangeStruct);
}
