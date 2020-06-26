import solc from 'solc'
import {
  ContractOutput,
  ContractDeployer,
  ContractDeployerChildStruct,
  ContractReader,
  ContractReaderChildStruct,
  ContractWriter,
  ContractWriterChildStruct,
  StateChange
} from '../../'
import { Uu } from 'pollenium-uvaursi'
import { Uintable, Uint256, Address } from 'pollenium-buttercup'
import Bignumber from 'bignumber.js'
import { ethers } from 'ethers'

const counterContractSol = `
pragma solidity >=0.4.22 <0.7.0;
// SPDX-License-Identifier: 0BSD

contract Counter {

  address public owner;
  uint256 public count;

  constructor(uint256 _count) public {
    owner = msg.sender;
    count = _count;
  }

  function incrementBy(uint256 increment) public {
    require(msg.sender == owner, 'Must be owner');
    count = count + increment;
  }
}
`

const solcInput = {
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
}

export const solcOutput = JSON.parse(solc.compile(JSON.stringify(solcInput)))

const counterContractOutput: ContractOutput = {
  abiJson: JSON.stringify(solcOutput.contracts['Counter.sol'].Counter.abi),
  bytecode: Uu.fromHexish(solcOutput.contracts['Counter.sol'].Counter.evm.bytecode.object)
}

interface CounterDeployStruct { initialCount: Uintable }

export class CounterDeployer extends ContractDeployer<CounterDeployStruct> {
  constructor(struct: ContractDeployerChildStruct<CounterDeployStruct>) {
    super({
      ...counterContractOutput,
      ...struct,
      deployTransformer: (struct: CounterDeployStruct) => {
        return [new Uint256(struct.initialCount).uu.toPhex()]
      }
    })
  }
}

export class CounterReader extends ContractReader {
  constructor(struct: ContractReaderChildStruct) {
    super({
      ...counterContractOutput,
      ...struct,
    })
  }
  async fetchOwner(): Promise<Address> {
    return new Address(Uu.fromHexish(
      await this.ethersContract.owner()
    ))
  }
  async fetchCount(): Promise<Uint256> {
    const countBignumber = await this.ethersContract.count()
    return new Uint256(Uu.fromHexish(
      await ethers.utils.hexlify(countBignumber)
    ))
  }
}

export class CounterWriter extends ContractWriter {
  constructor(struct: ContractWriterChildStruct) {
    super({
      ...counterContractOutput,
      ...struct,
    })
  }
  async incrementBy(increment: Uintable): Promise<StateChange> {
    return this.genStateChange(
      await this.ethersContract.incrementBy(new Uint256(increment).uu.toPhex())
    )
  }
}
