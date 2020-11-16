"use strict";
exports.__esModule = true;
exports.User = void 0;
var pollenium_ilex_1 = require("pollenium-ilex");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var User = /** @class */ (function () {
    function User(privateKey) {
        this.privateKey = new pollenium_buttercup_1.Bytes32(privateKey);
        this.keypair = new pollenium_ilex_1.Keypair(this.privateKey);
        this.address = this.keypair.getAddress();
    }
    User.gen = function () {
        return new User(pollenium_uvaursi_1.Uu.genRandom(32));
    };
    User.prototype.getSigner = function () {
        if (!this.signer) {
            throw new Error('Signer not set');
        }
        return this.signer;
    };
    User.prototype.setSigner = function (gaillardia) {
        if (this.signer) {
            throw new Error('Signer already set');
        }
        this.signer = gaillardia.genWallet(this.privateKey);
    };
    return User;
}());
exports.User = User;
