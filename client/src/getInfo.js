import React from 'react';
import Canvas from './canvas';

class GetInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {stage:1}
    this.handleClick = this.handleClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  handlePunkIdChange(event){
      this.props.setPunkId(event.target.value);
  }

  handleClick(){
  this.props.handleWelcomeChange(-1);
  }

  handleBackClick(){
    //let stage = this.state.stage + direction;
    this.setState({stage: this.state.stage-1});

  }


  handleNextClick(){

    this.setState({stage: this.state.stage+1});
    if (this.state.stage>2){
      this.props.handleWelcomeChange(1);
    }

  }

  handleContactMethodChange(event){
    this.props.addContactMethod(event.target.value);
  }

render(){

  const {drizzleState} = this.props;
  
  console.log(drizzleState);

  return (
    <div>
    <h1>Punk Registry Store</h1>
    <br />
    <h4>Step 1: Provide Contact Method</h4>
    <br />
    <p>In order to know where to send your print or NFC we need your mailing address. Smart contract data is public and therefore you will not
    be submitting your personal details during the transaction. Instead we need you to please let us know the means from which you will be contacting us.</p>
    <br />
    <p>This can be an e-mail address, a full Discord handle (including ID number), Twitter or Instagram handle, etc. </p>
    <br />
    <p>You will need to reach out to us to supply your mailing address from whatever method you register in the contract. We will verify that the
    address is coming from the authentic source before we put anything in the mail. Then we will simply erase the contact method data stored on the contract.
    </p>
    <br />
    <p>Please input your contact method into the box below and click "next step" to continue.</p>
    <br />
    <input type="text" id="contactMethodField" disabled={this.state.stage>1} onChange={this.handleContactMethodChange.bind(this)} />
    <br />
    {this.state.stage>1 &&
      <div>
        <br />
        <h4>Step 2: Choose Your Punk</h4>
        <br />
        <p>Great! Now we need to choose a punk. Please type in your PunkId (between 0 and 9999) in the box below and click "next step".</p>
        <br />
        <input type="number" id="punkIdField" disabled={this.state.stage>2} onChange={this.handlePunkIdChange.bind(this)} />
      </div>}

        {this.state.stage>2 &&
          <div>
          <h4>Step 3: Verify Punk</h4>
          <br />
          <p>Is this your punk? If so click "CONFIRM" below to go to purchase options.</p>
        <Canvas
        punkId = {this.props.punkId}/>

        </div>
      }

    <br />
    <button onClick = {this.handleBackClick} disabled={this.state.stage>1?false:true} className={this.state.stage>1?null:"hidden"}>Previous Step</button><button onClick = {this.handleNextClick} disabled={!this.props.punkId&&this.state.stage>1?true:false} >{this.state.stage>2?"CONFIRM":"Next Step"}</button>
    <br />
    <br />
    <br />
    <button onClick = {this.handleClick}>Back To Start</button>
    </div>
)
  }
}


export default GetInfo;
