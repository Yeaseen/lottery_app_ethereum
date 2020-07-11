const assert = require('assert');

const granache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(granache.provider())

const compiled_contract = require('../compile');

const interface_abi = compiled_contract.abi;
const bytecode = compiled_contract.evm.bytecode.object;


let lottery;
let accounts;

beforeEach(async () => {

    accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);


    lottery = await new web3.eth.Contract(interface_abi)
        .deploy({
            data: bytecode
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        });
})
describe('Lottery Contract', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address)
    })

    
})


