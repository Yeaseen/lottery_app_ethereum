const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 =require('web3');
const compiled_contract = require('./compile');

const interface_abi = compiled_contract.abi;
const bytecode = compiled_contract.evm.bytecode.object;

const provider = new HDWalletProvider(
	'act segment good entry heavy size pizza coil antique upper general dog',
	'https://rinkeby.infura.io/v3/9e784cb5cc144aafb52becefd7ea75f5'
);
const web3 = new Web3(provider);


const deploy = async () => {

	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account', accounts[0]);

	const result = await new web3.eth.Contract(interface_abi)
	  .deploy({
	  	data: '0x'+bytecode,
	  	arguments: ['Hi there!']
	  })
	  .send({
	  	gas: '1000000',
	  	from: accounts[0]
	  });

    console.log('Contract deployed to', result.options.address);

    provider.engine.stop();


};
deploy();