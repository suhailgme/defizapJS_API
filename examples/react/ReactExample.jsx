import React, { Component } from 'react'
import './App.css'
import DefiZap from 'DefiZap'


class ReactExample extends Component {

  state = {valueToInvest = 0.01}

  componentDidMount(){
    window.ethereum.enable() //Ask for user permission to interact with Metamask
    const defiZap = new DefiZap(window.web3) // Create new instance of DefiZap
    const lender = defiZap.zap('Lender') // Instantiate new instance of Lender Zap
    const ethMax = defiZap.zap('EthMaximalist') // Instantiate new instance of Lender Zap
    this.setState({defiZap, lender, ethMax})
  }

  handleLenderClick = async() => {
    const defiZap = this.state.defiZap
    const lender = this.state.lender
    let tx = await lender.useLenderFallback(this.state.valueToInvest) // //Invest 0.0012 eth into the Lender contract (90% cDai, 10% dLETH2x)
    console.log(tx) // Log the Tx info of the transaction (from/to, gasLimit, gasPrice, hash, etc.)
  }

  handleEthMaxClick = async() => {
    const defiZap = this.state.defiZap
    const ethMax = this.state.ethMax
    let tx = await ethMax.useEthMaximalistFallback(this.state.valueToInvest) // Invest 0.002 eth into the Eth Maximalist contract (50% dLETH2x, 50% dsWBTC)
    console.log(tx) // Log the Tx info of the transaction (from/to, gasLimit, gasPrice, hash, etc.)
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div style={{padding: 15}}><button style={{padding:15}} onClick={this.handleLenderClick}>Lender Zap</button></div>
          <button style={{padding:15}} onClick={this.handleEthMaxClick}>Eth Maximalist Zap</button>

        </header>
      </div>
    ); 
  }
}


export default ReactExample;
