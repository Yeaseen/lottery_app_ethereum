pragma solidity >=0.4.22 <0.6.0;

contract helloContracts {
   string public name;
   constructor(string memory initalName) public{
       name = initalName;
   }
   function setName(string memory newName) public{
       name = newName;
   }
}