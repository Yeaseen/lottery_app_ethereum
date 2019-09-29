
//path variable should be cross-platform variable that means it can run in windows or linux easily 
const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'helloContracts.sol');
const source = fs.readFileSync(contractPath,'UTF-8');


// take an input variable to compatible with specific version in sol file
var input = {
    language: 'Solidity',
    sources: {
        'helloContracts.sol' : {
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

//clean output
//console.log(JSON.parse(solc.compile(JSON.stringify(input))));


//compiled big objects capturing
//module.exports = solc.compile(JSON.stringify(input)).contracts["helloContracts"];


var output = JSON.parse(solc.compile(JSON.stringify(input)))
var final = output.contracts['helloContracts.sol']['helloContracts']
//console.log(final.evm.bytecode);
module.exports = final;
console.log("Hello Beautiful!!");
