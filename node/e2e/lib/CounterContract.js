"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.CounterWriter = exports.CounterReader = exports.CounterDeployer = exports.solcOutput = void 0;
var solc_1 = __importDefault(require("solc"));
var __1 = require("../../");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var ethers_1 = require("ethers");
var counterContractSol = "\npragma solidity >=0.4.22 <0.7.0;\n// SPDX-License-Identifier: 0BSD\n\ncontract Counter {\n\n  address public owner;\n  uint256 public count;\n\n  constructor(uint256 _count) public {\n    owner = msg.sender;\n    count = _count;\n  }\n\n  function incrementBy(uint256 increment) public {\n    require(msg.sender == owner, 'Must be owner');\n    count = count + increment;\n  }\n}\n";
var solcInput = {
    language: 'Solidity',
    sources: {
        'Counter.sol': {
            content: counterContractSol
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};
exports.solcOutput = JSON.parse(solc_1["default"].compile(JSON.stringify(solcInput)));
var counterContractOutput = {
    abiJson: JSON.stringify(exports.solcOutput.contracts['Counter.sol'].Counter.abi),
    bytecode: pollenium_uvaursi_1.Uu.fromHexish(exports.solcOutput.contracts['Counter.sol'].Counter.evm.bytecode.object)
};
var CounterDeployer = /** @class */ (function (_super) {
    __extends(CounterDeployer, _super);
    function CounterDeployer(struct) {
        return _super.call(this, __assign(__assign(__assign({}, counterContractOutput), struct), { deployTransformer: function (struct) {
                return [new pollenium_buttercup_1.Uint256(struct.initialCount).uu.toPhex()];
            } })) || this;
    }
    return CounterDeployer;
}(__1.ContractDeployer));
exports.CounterDeployer = CounterDeployer;
var CounterReader = /** @class */ (function (_super) {
    __extends(CounterReader, _super);
    function CounterReader(struct) {
        return _super.call(this, __assign(__assign({}, counterContractOutput), struct)) || this;
    }
    CounterReader.prototype.fetchOwner = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = pollenium_buttercup_1.Address.bind;
                        _c = (_b = pollenium_uvaursi_1.Uu).fromHexish;
                        return [4 /*yield*/, this.ethersContract.owner()];
                    case 1: return [2 /*return*/, new (_a.apply(pollenium_buttercup_1.Address, [void 0, _c.apply(_b, [_d.sent()])]))()];
                }
            });
        });
    };
    CounterReader.prototype.fetchCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var countBignumber, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.ethersContract.count()];
                    case 1:
                        countBignumber = _d.sent();
                        _a = pollenium_buttercup_1.Uint256.bind;
                        _c = (_b = pollenium_uvaursi_1.Uu).fromHexish;
                        return [4 /*yield*/, ethers_1.ethers.utils.hexlify(countBignumber)];
                    case 2: return [2 /*return*/, new (_a.apply(pollenium_buttercup_1.Uint256, [void 0, _c.apply(_b, [_d.sent()])]))()];
                }
            });
        });
    };
    return CounterReader;
}(__1.ContractReader));
exports.CounterReader = CounterReader;
var CounterWriter = /** @class */ (function (_super) {
    __extends(CounterWriter, _super);
    function CounterWriter(struct) {
        return _super.call(this, __assign(__assign({}, counterContractOutput), struct)) || this;
    }
    CounterWriter.prototype.incrementBy = function (increment) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.genStateChange;
                        return [4 /*yield*/, this.ethersContract.incrementBy(new pollenium_buttercup_1.Uint256(increment).uu.toPhex())];
                    case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                }
            });
        });
    };
    return CounterWriter;
}(__1.ContractWriter));
exports.CounterWriter = CounterWriter;
