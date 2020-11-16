"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var params_1 = require("./lib/params");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var CounterContract_1 = require("./lib/CounterContract");
var counterReader;
var counterWriter;
jest.setTimeout(60000);
describe('CounterContract', function () {
    test('deploy', function () { return __awaiter(void 0, void 0, void 0, function () {
        var deployStateChange;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new CounterContract_1.CounterDeployer({
                        signer: params_1.deployer.getSigner()
                    }).deploy({
                        initialCount: 1
                    })];
                case 1:
                    deployStateChange = _a.sent();
                    return [4 /*yield*/, deployStateChange.awaitConfirmations({ confirmations: 1, timeoutSeconds: 30 })];
                case 2:
                    _a.sent();
                    expect(deployStateChange.address).toBeInstanceOf(pollenium_buttercup_1.Address);
                    counterReader = new CounterContract_1.CounterReader({
                        address: deployStateChange.address,
                        provider: params_1.gaillardia.ethersWeb3Provider
                    });
                    counterWriter = new CounterContract_1.CounterWriter({
                        address: deployStateChange.address,
                        signer: params_1.deployer.getSigner()
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    test('owner should be deployer', function () { return __awaiter(void 0, void 0, void 0, function () {
        var owner;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, counterReader.fetchOwner()];
                case 1:
                    owner = _a.sent();
                    expect(owner.uu.toHex()).toStrictEqual(params_1.deployer.address.uu.toHex());
                    return [2 /*return*/];
            }
        });
    }); });
    test('count should be 1', function () { return __awaiter(void 0, void 0, void 0, function () {
        var count;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, counterReader.fetchCount()];
                case 1:
                    count = _a.sent();
                    expect(count.toNumber()).toBe(1);
                    return [2 /*return*/];
            }
        });
    }); });
    test('should increment by 2', function () { return __awaiter(void 0, void 0, void 0, function () {
        var confirmations, stateChange, broadcastAtMs, confirmedAtMs, confirmationTimeSeconds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    confirmations = 3;
                    return [4 /*yield*/, counterWriter.incrementBy(2)];
                case 1:
                    stateChange = _a.sent();
                    broadcastAtMs = new Date().getTime();
                    return [4 /*yield*/, stateChange.awaitConfirmations({ confirmations: confirmations, timeoutSeconds: 30 })];
                case 2:
                    _a.sent();
                    confirmedAtMs = new Date().getTime();
                    confirmationTimeSeconds = ((confirmedAtMs - broadcastAtMs) / 1000);
                    expect(confirmationTimeSeconds).toBeGreaterThan(params_1.blockTimeSeconds * (confirmations - 1));
                    return [2 /*return*/];
            }
        });
    }); });
});
