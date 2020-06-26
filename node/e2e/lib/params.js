"use strict";
exports.__esModule = true;
var pollenium_buttercup_1 = require("pollenium-buttercup");
var User_1 = require("./User");
var pollenium_gaillardia_1 = require("pollenium-gaillardia");
exports.blockTimeSeconds = 3;
exports.startWei = new pollenium_buttercup_1.Uint256(10).opPow(8);
exports.admin = User_1.User.gen();
exports.deployer = User_1.User.gen();
exports.alice = User_1.User.gen();
exports.bob = User_1.User.gen();
exports.allUsers = [
    exports.admin,
    exports.deployer,
    exports.alice,
    exports.bob
];
exports.gaillardia = new pollenium_gaillardia_1.Gaillardia({
    gasLimit: 0xffffffffffff,
    gasPrice: 1,
    accounts: exports.allUsers.map(function (user) {
        return {
            privateKey: user.privateKey,
            startBalance: exports.startWei
        };
    }),
    blockTimeSeconds: exports.blockTimeSeconds
});
exports.allUsers.forEach(function (user) {
    user.setSigner(exports.gaillardia);
});
