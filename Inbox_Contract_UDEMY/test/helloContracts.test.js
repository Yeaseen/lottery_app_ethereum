
const assert = require('assert');  //assert run time js module or library

const ganache = require('ganache-cli');

const Web3 =require('web3'); // Web3 is a constructor to create instances of web3 libraries and web3 would a instace



//web3 is a tool that provies the communication between js and ethereum network
//Web3 versioning issue

//v0.x.x is for callbackss for async code
//v1.x.x is for promises + async/wait

//const web3 = new Web3(ganache.provider()); // we put what network we are dealing with like rinkeby
//update for broken package avobe line

const provider = ganache.provider();
const web3 = new Web3(provider);

const compiled_contract = require('../compile');

const interface_abi = compiled_contract.abi;
const bytecode = compiled_contract.evm.bytecode.object;

//ganache provides some account so that we dont bother with address, priv or pub key.
//every function taht we call at web3 is a asychronous in nature that means returns a promise

let accounts;
let hellocontracts;
const INITIAL_STRING = 'Hi there';

beforeEach(async () => {
	//Get a list of all accounts 

	accounts = await web3.eth.getAccounts();  // a promise

	// Use one of those accounts to deploy the contracty

	hellocontracts = await new web3.eth.Contract(interface_abi)
	.deploy({ 
		data: bytecode,
		arguments: [INITIAL_STRING] 
	})
	.send({ 
		from: accounts[0], 
		gas: '1000000' 
	});

	hellocontracts.setProvider(provider);

});


describe('helloContracts', () => {
	
    //The below block is used to explore the hellocontracts contract methods,adresses
	//it('deploys a contract', () =>{
	//	console.log(hellocontracts);
	//});

	it('checking adresses', () => {
		assert.ok(hellocontracts.options.address);
	});

	it('has a default message', async () => {
		const message = await hellocontracts.methods.name().call();
		assert.equal(message, INITIAL_STRING);

	});

	it('can change the message', async () => {
	   await hellocontracts.methods.setName('Bye there').send({ from: accounts[0] });

	   const message = await hellocontracts.methods.name().call();
	   assert.equal(message, 'Bye there');

	});

});



/*
//mocha testing fucntions usase: it, describe, beforeEach
class Car{

	park(){
		return 'stopped';
	}

	drive(){
		return 'vroom'
	}

}

let car;

beforeEach( () => {
	car = new Car();

});


describe('Car', () => {

	it('can park', () => {
		//car = new Car(); //it could be declare in beforeEach
		assert.equal(car.park(), 'stopped');
	});

	it('can drive', () => {
		//car = new Car(); // each time car will be new for once.
		assert.equal(car.drive(), 'vroom')
	});


});
*/