"use strict";
exports.__esModule = true;
var counterContractSol = "\npragma solidity >=0.4.22 <0.7.0;\n\ncontract Counter {\n\n  public address owner;\n  public uint256 count;\n\n  constructor() {\n      owner = msg.sender;\n  }\n\n  increment() {\n      require(msg.sender === owner);\n      count = count + 1;\n  }\n}\n";
