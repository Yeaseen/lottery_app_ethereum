import React, { useEffect, useState } from 'react';
import './App.css';

import web3 from './web3'
import lottery from './lottery'
import { QRCode } from "react-qr-svg";

const SinglePageComponent = () => {

  const [managerAddress, setManagerAddress] = useState("")
  const [playerList, setPlayerList] = useState([])
  const [contractBalance, setContractBalance] = useState("")
  const [value, setValue] = useState("")


  const fetchManagerAddress = async () => {
    try {
      //const result = await web3.eth.getAccounts()
      //console.log(window.web3.currentProvider)

      const manager = await lottery.methods.manager().call();
      //console.log(manager)
      setManagerAddress(manager)
      const players = await lottery.methods.getPlayers().call();
      setPlayerList(players)
      const balance = await web3.eth.getBalance(lottery.options.address)
      setContractBalance(balance)

    } catch (err) {
      console.error(err);
    }

  }

  useEffect(() => {

    //web3.eth.getAccounts().then(console.log);
    fetchManagerAddress();

    // eslint-disable-next-line

  }, [])

  const callEnterF =  () => {
        alert("WHY SO SERIOUS?")
        setValue("")
  }

  return (

    <div>
      <h2>Lottery Contract</h2>
      <div className="democontainer">
        <QRCode
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="Q"
          style={{ width: 256 }}
          value={managerAddress}
        />
        <br style={{ clear: "both" }} />
      </div>
      <p style={{ textAlign: "center" }}>This contract is managed by {managerAddress}.
        <br></br>
      There are currently {playerList.length} people entered,
        <br></br>
      competing to win {web3.utils.fromWei(contractBalance, "ether")} ether.
      </p>


      <hr />

      <form onSubmit={(e) => {
        e.preventDefault()
        callEnterF()
      }}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter:</label>{" "}
          <input
            value={value}
            placeholder="e.g. 123"
            onChange={(e) => setValue(e.target.value)}
          />{" "}
        </div>
        <button>Enter</button>
        <hr />
      </form>


    </div>
  )
}


function App() {


  return (
    <SinglePageComponent />
  );
}

export default App;