
const assert = require('assert');  //assert run time js module or library

const ganache = require('ganache-cli');

const Web3 =require('web3'); // Web3 is a constructor to create instances of web3 libraries and web3 would a instace


//web3 is a tool that provies the communication between js and ethereum network
//Web3 versioning issue

//v0.x.x is for callbackss for async code
//v1.x.x is for promises + async/wait

const web3 = new Web3(ganache.provider()); // we put what network we are dealing with like rinkeby


//ganache provides some account so that we dont bother with address, priv or pub key.
//every function taht we call at web3 is a asychronous in nature that means returns a promise

let accounts;
beforeEach(async () => {
	//Get a list of all accounts 

	accounts = await web3.eth.getAccounts();  // a promise 

	// Use one of those accounts to deploy the contracty

});


describe('helloContracts', () => {
	it('deploys a contract', () =>{
		console.log(accounts);
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