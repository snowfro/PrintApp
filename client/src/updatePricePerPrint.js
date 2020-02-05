

import React from "react";
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

class UpdatePricePerPrint extends React.Component {
  state = { stackId: null};
  handleKeyDown1 = e => {
    // if the enter key is pressed, set the value with the string
    //if (e.keyCode === 13) {

      this.setValue(e.target.value1);

    //}
  };

  setValue = (value1) => {
    

    const { drizzle, drizzleState } = this.props;
    //console.log(drizzle);
    const contract = drizzle.contracts.PunkPrintRegistry;
    const textInput = this.textInput1.value;
    const textInputInWei = web3.utils.toWei(textInput,'ether');
    console.log(textInputInWei);
    // let drizzle know we want to call the `add` method with `value1 and value2`
    const stackId = contract.methods["updatePricePerPrintInWei"].cacheSend(textInputInWei, {
      from: drizzleState.accounts[0]
    });
    // save the `stackId` for later reference
    this.setState({ stackId });

  };
  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;
    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];
    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;
    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash].status}`;
  };

  render() {
    return (
      <div>
        <input type="number" ref={(input1) => this.textInput1 = input1} /><span>Ξ</span>
        <br />
        <button onClick = {this.handleKeyDown1}>Set Print Price</button>
      </div>
    );
  }
}
export default UpdatePricePerPrint;
