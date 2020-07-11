
//path variable should be cross-platform variable that means it can run in windows or linux easily 
const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath,'UTF-8');


// take an input variable to compatible with specific version in sol file
var input = {
    language: 'Solidity',
    sources: {
        'Lottery.sol' : {
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
var final = output.contracts['Lottery.sol'].Lottery
//console.log(final.abi);
//console.log(final.evm.bytecode.object);
console.log("Hello Beautiful after compilation!!");
module.exports = final;
//console.log(final);

