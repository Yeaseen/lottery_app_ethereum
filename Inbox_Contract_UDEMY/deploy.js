const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 =require('web3');
const compiled_contract = require('./compile');

const interface_abi = compiled_contract.abi;
const bytecode = compiled_contract.evm.bytecode.object;


require("dotenv").config()


const provider = new HDWalletProvider(
	process.env.METAMASK_PNEOMONIC,
	process.env.INFURA_PROJECT_API
);




const web3 = new Web3(provider);


const deploy = async () => {

	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account', accounts[0]);

	const result = await new web3.eth.Contract(interface_abi)
	  .deploy({
	  	data: '0x'+bytecode,
	  	arguments: ['My name is khan']
	  })
	  .send({
	  	gas: '1000000',
	  	from: accounts[0]
	  });

    console.log('Contract deployed to', result.options.address);

    provider.engine.stop();


};
deploy();