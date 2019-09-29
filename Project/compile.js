const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'helloContracts.sol');
const source = fs.readFileSync(contractPath,'UTF-8');


// take an input variable to compatible with specific version in sol file
var input = {
    language: 'Solidity',
    sources: {
        'hello.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
}; 

//we can see the bytecode as well as interfaces if we write 
//console.log(solc.compile(JSON.stringify(input)));
console.log(JSON.parse(solc.compile(JSON.stringify(input))));