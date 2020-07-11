import React, { useEffect, useState } from 'react';
import './App.css';

import web3 from './web3'
import lottery from './lottery'

const SinglePageComponent = () =>{

  const [managerAddress, setManagerAddress] = useState("")

  const fetchManagerAddress = async ()=>{
    try {
      //const result = await web3.eth.getAccounts()
      //console.log(window.web3.currentProvider)

      const manager = await lottery.methods.manager().call();
      console.log(manager)
      
      setManagerAddress(manager)
    } catch (err) {
      console.error(err);
    }

  }

  useEffect(()=>{

    //web3.eth.getAccounts().then(console.log);
    fetchManagerAddress();

  }, [])

  return(
    <div>
      <h2>Hello From React App to {managerAddress}</h2>
    </div>
  )
}


function App() {


  return (
   <SinglePageComponent />
  );
}

export default App;