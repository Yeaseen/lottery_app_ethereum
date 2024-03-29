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
    //console.log(accounts[0])

    console.log(interface_abi)



    lottery = await new web3.eth.Contract(interface_abi)
        .deploy({
            data: bytecode
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        });

        //console.log(lottery)
})
describe('Lottery Contract', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address)
    })

    // it('allows one account to enter', async ()=>{
    //     await lottery.methods.enter().send({
    //         from: accounts[0],
    //         value: web3.utils.toWei('0.02', 'ether')
    //     })

    //     const players = await lottery.methods.getPlayers().call({
    //         from: accounts[0]
    //     })

    //     const manager = await lottery.methods.manager().call()
    //     //console.log(manager)

    //     assert.equal(accounts[0], players[0])
    //     assert.equal(1, players.length)
    //     assert.equal(accounts[0], manager)
    // })

    // it('allows multiple account to enter', async ()=>{
        
    //     await lottery.methods.enter().send({
    //         from: accounts[0],
    //         value: web3.utils.toWei('0.02', 'ether')
    //     })
    //     await lottery.methods.enter().send({
    //         from: accounts[1],
    //         value: web3.utils.toWei('0.02', 'ether')
    //     })

    //     await lottery.methods.enter().send({
    //         from: accounts[2],
    //         value: web3.utils.toWei('0.02', 'ether')
    //     })

    //     const players = await lottery.methods.getPlayers().call({
    //         from: accounts[0]
    //     })

    //     assert.equal(accounts[0], players[0])
    //     assert.equal(accounts[1], players[1])
    //     assert.equal(accounts[2], players[2])
    //     assert.equal(3, players.length)
    // })

    // it('requires a minimum amount of ether to enter', async ()=>{
    //     try{
    //         await lottery.methods.enter().send({
    //             from: accounts[0],
    //             value: web3.utils.toWei('0.0001', 'ether')
    //         })
    //         assert(false)
    //     }catch (err) {
    //         assert(err)
    //     }
    // })

    // it('only manager can call pickWinner', async ()=>{
    //     try{
    //         await lottery.methods.pickWinner().send({
    //             from: accounts[1]
    //         })
    //         assert(false)

    //     }catch (err){
    //         assert(err)
    //     }
    // })

    // it('sends money to the winner and resets the players array', async ()=>{

    //     await lottery.methods.enter().send({
    //         from: accounts[0],
    //         value: web3.utils.toWei('2', 'ether')
    //     })

    //     const initialBalance = await web3.eth.getBalance(accounts[0])

    //     await lottery.methods.pickWinner().send({
    //         from: accounts[0]
    //     })

    //     const finalBalance = await web3.eth.getBalance(accounts[0]);

    //     const difference = finalBalance - initialBalance

    //     console.log(finalBalance - initialBalance)

    //     assert(difference > web3.utils.toWei('1.8', 'ether'))

    //     const players = await lottery.methods.getPlayers().call({
    //         from: accounts[0]
    //     })
    //     assert.equal(0, players.length)
    // })
})


