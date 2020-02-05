

import React from "react";
//import Web3 from 'web3';
//const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

class PurchasePrint extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    stackId: null,
    isInternational: false,
    contactMethod:"",
    punkId:null,
    };
    //this.handlePunkIdChange = this.handlePunkIdChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    //this.setAllValues = this.setAllValues.bind(this);
    const { drizzleState } = this.props;
    //console.log(drizzleState);
  }



/*
  setAllValues () {
    this.setState({
      ['punkId']:this.textInput1,
      ['contactMethod']:this.textInput2,
    });

    //console.log(this.state);
    //console.log(e.target.value1, f.target.value2);
    //this.setValue(this.textInput1, this.textInput2);

  }
  */
/*
  handleKeyDown1 = e => {
    // if the enter key is pressed, set the value with the string
    //if (e.keyCode === 13) {

      this.setValue(e.target.value1);

    //}
  };
  handleKeyDown2 = f => {
    // if the enter key is pressed, set the value with the string
    //if (e.keyCode === 13) {

      this.setValue(f.target.value2);

    //}
  };
  */
  handlePunkIdChange(event){
      this.setState({punkId: event.target.value});

  }

  handleContactMethodChange(event){
    this.setState({contactMethod: event.target.value});

  }

handleButtonClick(){

  this.setValue();
}

  handleInputChange (event){
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    console.log(target,value,name);
    // if the enter key is pressed, set the value with the string
    //if (e.keyCode === 13) {

    this.setState({
     ['isInternational']: value
   });

    //}
  };

  setValue = () => {

    const { drizzle, drizzleState } = this.props;
    //console.log(drizzle);
    const contract = drizzle.contracts.PunkPrintRegistry;
    const amountToSend = drizzleState.contracts.PunkPrintRegistry.pricePerPrintInWei['0x0'];
    console.log(amountToSend.value);
    //const amountToSend = this.state.isInternational===false? 10000000000000 : 11000000000000;
    //const textInputInWei = web3.utils.toWei(textInput,'ether');
    //console.log(textInputInWei);
    // let drizzle know we want to call the `add` method with `value1 and value2`
    //console.log(this.state.punkId, this.state.contactMethod, amountToSend);
    const stackId = contract.methods["purchasePrint"].cacheSend(this.state.punkId,this.state.contactMethod, {
      from: drizzleState.accounts[0],
      value: amountToSend.value
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
      <br />
        <input type="number" name="punkIdInput"  onChange={this.handlePunkIdChange.bind(this)}/><span>PunkId</span>
        <br />
        <input type="text" name="contactMethodInput" onChange={this.handleContactMethodChange.bind(this)} /><span>Contact Method</span>
        <br />
        <input name = "isInternational" type="checkbox" checked = {this.state.isInternational} onChange={this.handleInputChange} /><span>Outside USA?</span>
        <br />
        <button onClick={this.handleButtonClick.bind(this)}>
        Purchase</button>


      </div>
    );
  }
/*
  render() {
    return (
      <div>
      <br />
        <input type="number" ref={(input1) => this.textInput1 = input1} /><span>PunkId</span>
        <br />
        <input type="text" ref={(input2) => this.textInput2 = input2} /><span>Contact Method</span>
        <br />
        <input name = "isInternational" type="checkbox" checked = {this.state.isInternational} onChange={this.handleInputChange} /><span>Outside USA?</span>
        <br />
        <button onClick={() => {
          const input1 = this.textInput1.value;
          const input2 = this.textInput2.value;
          alert (input1, input2);
        }}>
        Purchase</button>


      </div>
    );
  }
  */

}
export default PurchasePrint;
