import React from "react";

import Welcome from "./welcome";

import PriceList from "./priceList";

class WelcomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {stackId:null};
    this.handleClick = this.handleClick.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCreditSendClick = this.handleCreditSendClick.bind(this);
    this.handleCreditSendClick2 = this.handleCreditSendClick2.bind(this);
    this.handleCreditManagerAddressChange = this.handleCreditManagerAddressChange.bind(this);
    this.handleCreditManagerCreditsToGive = this.handleCreditManagerCreditsToGive.bind(this);

  }

  handleCreditSendClick(){
    const {drizzle, drizzleState} = this.props;
    const contract = drizzle.contracts.PunkPrintRegistryMinter;
    const stackId = contract.methods['giveCredit'].cacheSend(this.props.creditToAddress, {
      from: drizzleState.accounts[0],
      value: 0
    });
    this.setState({ stackId });
  }

  handleCreditSendClick2(){
    const {drizzle, drizzleState} = this.props;
    const contract = drizzle.contracts.PunkPrintRegistryMinter;
    const stackId = contract.methods['setManagerCredits'].cacheSend(this.props.creditManagerAddressToCredit, this.props.creditManagerCreditsToGive, {
      from: drizzleState.accounts[0],
      value: 0
    });
    this.setState({ stackId });
  }

  getStatus(){
    const { transactions, transactionStack } = this.props.drizzleState;
    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];
    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    if (transactions[txHash]){
    console.log(transactions[txHash].status);
    return transactions[txHash].status;
  }
  }

  handleClick(){

  this.props.handleWelcomeChange(1);

  }

  handleAddressChange(event){
    this.props.setCreditToAddress(event.target.value);
  }

  handleCreditManagerAddressChange(event){
    this.props.setCreditManagerAddressToCredit(event.target.value);
  }

  handleCreditManagerCreditsToGive(event){
    this.props.setCreditManagerCreditsToGive(event.target.value);
  }

render(){
  let isOwner;
  const creditsToUse = this.props.drizzleState.contracts.PunkPrintRegistryMinter.addressToCreditsToSpend[this.props.creditsToUseKey];
  const creditsToGive = this.props.drizzleState.contracts.PunkPrintRegistryMinter.managerAddressToCreditsToGive[this.props.creditsToGiveKey];
  const owner1 = this.props.drizzleState.contracts.PunkPrintRegistryMinter.owner1[this.props.owner1Key];
  const owner2 = this.props.drizzleState.contracts.PunkPrintRegistryMinter.owner2[this.props.owner2Key];
  if(creditsToUse && creditsToGive){
    console.log(creditsToUse.value, creditsToGive.value);
  }

  if(owner1 && owner2){
    isOwner = this.props.drizzleState.accounts[0]===owner1.value || this.props.drizzleState.accounts[0]===owner2.value;
  console.log('isOwner? '+isOwner);
  }

    let status = this.getStatus();

  console.log('to: '+this.props.creditToAddress);


  return(
    <div>
    <div >
    {isOwner &&
      <div style = {{background:"cyan"}}>

      <h1>Assign Credits to Manager</h1>
      <br />
      <input type="text" placeholder = "Manager Address" onChange={this.handleCreditManagerAddressChange} />
      <input type="number" placeholder = "Credits to give" style = {{width:50}} onChange={this.handleCreditManagerCreditsToGive} />
      <button className="bigButton2" onClick={this.handleCreditSendClick2} disabled = {status==="pending"?true:false}>{!status?'Send':status==="success"?'Success! Send another.':status}</button>
      <br />
      <br />
      </div>
    }
    {creditsToGive && creditsToGive.value>0 &&
    <div style = {{background:"cyan"}}>

    <h1>You have credits to give!</h1>
    <h4>Paste recipient address below and click "Send"</h4>

    <br />
    <input type="text" id="addressField" onChange={this.handleAddressChange} /><button className="bigButton2" onClick={this.handleCreditSendClick} disabled = {status==="pending"?true:false}>{!status?'Send':status==="success"?'Success! Send another.':status}</button>
    <br />
    <br />
    </div>
    }
    {creditsToUse && creditsToUse.value>0 &&
    <div style = {{background:"cyan"}}>

    <h1>You have a credit to use! </h1>
    <h4>When you get to the purchase page you'll be able to use this credit towards a free print or NFC.</h4>

    <br />
    <br />


    </div>
    }
    </div>
    <Welcome
    drizzle={this.props.drizzle}
    drizzleState={this.props.drizzleState}

    />
    <button onClick = {this.handleClick}>Click Here To Get Started</button>
    <PriceList
    drizzle={this.props.drizzle}
    drizzleState={this.props.drizzleState}
    />

    </div>
  )
}
}

export default WelcomeScreen;
