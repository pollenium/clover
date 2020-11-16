"use strict";
exports.__esModule = true;
exports.ContractReader = void 0;
var ethers_1 = require("ethers");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var ContractReader = /** @class */ (function () {
    function ContractReader(struct) {
        this.struct = struct;
        this.ethersContract = new ethers_1.ethers.Contract(new pollenium_buttercup_1.Address(struct.address).uu.toPhex(), struct.abiJson, struct.provider);
    }
    return ContractReader;
}());
exports.ContractReader = ContractReader;
