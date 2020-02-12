"use strict";
exports.__esModule = true;
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var ethers_1 = require("ethers");
var ContractReader = /** @class */ (function () {
    function ContractReader(struct) {
        this.struct = struct;
        this.ethersContract = new ethers_1.ethers.Contract(new pollenium_buttercup_1.Address(struct.address).uu.toPhex(), struct.abiJson, struct.provider);
    }
    return ContractReader;
}());
exports.ContractReader = ContractReader;
var ContractWriter = /** @class */ (function () {
    function ContractWriter(struct) {
        this.struct = struct;
        this.ethersContract = new ethers_1.ethers.Contract(new pollenium_buttercup_1.Address(struct.address).uu.toPhex(), struct.abiJson, struct.signer);
    }
    return ContractWriter;
}());
exports.ContractWriter = ContractWriter;
var ContractDeployer = /** @class */ (function () {
    function ContractDeployer(struct) {
        this.struct = struct;
        this.ethersContractFactory = new ethers_1.ethers.ContractFactory(struct.abiJson, pollenium_uvaursi_1.Uu.wrap(struct.bytecode).u, struct.signer);
    }
    return ContractDeployer;
}());
exports.ContractDeployer = ContractDeployer;
