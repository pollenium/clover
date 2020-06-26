"use strict";
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
var delay_1 = __importDefault(require("delay"));
var Environment_1 = require("./lib/Environment");
var Table_1 = require("../lib/Table");
var Permit_1 = require("../lib/Worker/Permit");
var deploy_test_1 = require("./deploy.test");
var params_1 = require("./lib/params");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var Permit_2 = require("../lib/Record/Permit");
var pollenium_dianella_1 = require("pollenium-dianella");
var environment;
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var db;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                environment = new Environment_1.Environment();
                return [4 /*yield*/, environment.connect()];
            case 1:
                _a.sent();
                db = environment.db;
                return [4 /*yield*/, db.truncate(Table_1.Table.RUNS)];
            case 2:
                _a.sent();
                return [4 /*yield*/, db.truncate(Table_1.Table.PERMITS)];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var db;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = environment.db;
                return [4 /*yield*/, environment.disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('PermitWorker', function () {
    test('genAndUploadPermitRequest', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = environment.client).genAndUploadPermitRequest;
                    _c = {
                        holderPrivateKey: params_1.alice.privateKey
                    };
                    return [4 /*yield*/, deploy_test_1.enginePrimrose.promise];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_c.spender = _d.sent(),
                            _c.nonce = pollenium_uvaursi_1.Uu.genRandom(32),
                            _c)])];
                case 2:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('attemptRun', function () { return __awaiter(void 0, void 0, void 0, function () {
        var permitWorker, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, delay_1["default"](2000)];
                case 1:
                    _d.sent();
                    _a = Permit_1.PermitWorker.bind;
                    _b = [__assign({}, environment)];
                    _c = { runInterval: 1, runTimeout: 10 };
                    return [4 /*yield*/, deploy_test_1.daiPrimrose.promise];
                case 2:
                    _c.dai = _d.sent();
                    return [4 /*yield*/, deploy_test_1.enginePrimrose.promise];
                case 3:
                    permitWorker = new (_a.apply(Permit_1.PermitWorker, [void 0, __assign.apply(void 0, _b.concat([(_c.engine = _d.sent(), _c.provider = params_1.gaillardia.ethersWeb3Provider, _c.daiDepositMin = 1, _c.adminPrivateKey = params_1.admin.privateKey, _c)]))]))();
                    return [4 /*yield*/, permitWorker.attemptRun()];
                case 4:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('should have upated permitRecord', function () { return __awaiter(void 0, void 0, void 0, function () {
        var permitRecord;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Permit_2.PermitRecord.fromDb(environment.db, {})];
                case 1:
                    permitRecord = _a.sent();
                    expect(permitRecord.struct.status.toNumber()).toBe(Permit_2.PermitRecordStatus.DAI_BALANCE_TOO_LOW);
                    return [2 /*return*/];
            }
        });
    }); });
    test('should have added run', function () { return __awaiter(void 0, void 0, void 0, function () {
        var run;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, environment.db.fetchLast({
                        table: Table_1.Table.RUNS,
                        params: {}
                    })];
                case 1:
                    run = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('PermitWorker', function () {
    test('transfer dai to alice', function () { return __awaiter(void 0, void 0, void 0, function () {
        var dai, daishWriter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deploy_test_1.daiPrimrose.promise];
                case 1:
                    dai = _a.sent();
                    daishWriter = new pollenium_dianella_1.DaishWriter({
                        address: dai,
                        signer: params_1.deployer.getSigner()
                    });
                    return [4 /*yield*/, daishWriter.transfer({
                            to: params_1.alice.address,
                            amount: 1000
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('genAndUploadPermitRequest', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _b = (_a = environment.client).genAndUploadPermitRequest;
                    _c = {
                        holderPrivateKey: params_1.alice.privateKey
                    };
                    return [4 /*yield*/, deploy_test_1.enginePrimrose.promise];
                case 1: return [4 /*yield*/, _b.apply(_a, [(_c.spender = _d.sent(),
                            _c.nonce = pollenium_uvaursi_1.Uu.genRandom(32),
                            _c)])];
                case 2:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('attemptRun', function () { return __awaiter(void 0, void 0, void 0, function () {
        var permitWorker, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, delay_1["default"](2000)];
                case 1:
                    _d.sent();
                    _a = Permit_1.PermitWorker.bind;
                    _b = [__assign({}, environment)];
                    _c = { runInterval: 1, runTimeout: 10 };
                    return [4 /*yield*/, deploy_test_1.daiPrimrose.promise];
                case 2:
                    _c.dai = _d.sent();
                    return [4 /*yield*/, deploy_test_1.enginePrimrose.promise];
                case 3:
                    permitWorker = new (_a.apply(Permit_1.PermitWorker, [void 0, __assign.apply(void 0, _b.concat([(_c.engine = _d.sent(), _c.provider = params_1.gaillardia.ethersWeb3Provider, _c.daiDepositMin = 1, _c.adminPrivateKey = params_1.admin.privateKey, _c)]))]))();
                    return [4 /*yield*/, permitWorker.attemptRun()];
                case 4:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test('should have upated permitRecord', function () { return __awaiter(void 0, void 0, void 0, function () {
        var permitRecord;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Permit_2.PermitRecord.fromDb(environment.db, {})];
                case 1:
                    permitRecord = _a.sent();
                    expect(permitRecord.struct.status.toNumber()).toBe(Permit_2.PermitRecordStatus.PERMIT_INITIATED);
                    return [2 /*return*/];
            }
        });
    }); });
    test('should have added run', function () { return __awaiter(void 0, void 0, void 0, function () {
        var run;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, environment.db.fetchLast({
                        table: Table_1.Table.RUNS,
                        params: {}
                    })];
                case 1:
                    run = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
