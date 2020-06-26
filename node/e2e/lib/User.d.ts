import { Keypair } from 'pollenium-ilex';
import { Address, Bytes32 } from 'pollenium-buttercup';
import { Uish } from 'pollenium-uvaursi';
import { Gaillardia } from 'pollenium-gaillardia';
import { ethers } from 'ethers';
export declare class User {
    readonly privateKey: Bytes32;
    readonly keypair: Keypair;
    readonly address: Address;
    private signer;
    constructor(privateKey: Uish);
    static gen(): User;
    getSigner(): ethers.Wallet;
    setSigner(gaillardia: Gaillardia): void;
}
