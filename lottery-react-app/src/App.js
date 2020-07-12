import React, { useEffect, useState } from 'react';
import './App.css';

import web3 from './web3'
import lottery from './lottery'
import { QRCode } from "react-qr-svg";
import Swal from "sweetalert2";

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


    } catch (err) {
      console.error(err);
    }

  }

  const updatePlayersListAndBalance = async () => {
    const players = await lottery.methods.getPlayers().call();
    setPlayerList(players)
    const balance = await web3.eth.getBalance(lottery.options.address)
    setContractBalance(balance)
  };

  useEffect(() => {

    //web3.eth.getAccounts().then(console.log);
    fetchManagerAddress();
    updatePlayersListAndBalance()

    // eslint-disable-next-line

  }, [])

  const callEnterF = async () => {
    const accounts = await web3.eth.getAccounts();

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether")
    })

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Transaction successfully created',
      showConfirmButton: false,
      timer: 2500
    })
    updatePlayersListAndBalance()
    setValue("")
  }

  const pickWinner = async ()=>{

    const accounts = await web3.eth.getAccounts();

    await lottery.methods.pickWinner().send({
      from:accounts[0]
    })

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'WoW!!! A winner has been picked!',
      showConfirmButton: false,
      timer: 2500
    })
    updatePlayersListAndBalance()
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

      </form>

      <hr />

      <hr/>
        <h4>Ready to pick a winner?</h4>
        <button onClick={(e)=>{
          e.preventDefault()
          pickWinner()}}>Pick a winner!</button>
      <hr/>



    </div>
  )
}


function App() {


  return (
    <SinglePageComponent />
  );
}

export default App;