import React from 'react';

class WelcomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {contactDone:false}
    this.handleClick = this.handleClick.bind(this);
    this.handleNextBackClick = this.handleNextBackClick.bind(this);
  }

  handleClick(){
  this.props.handleWelcomeChange();
  }

  handleNextBackClick(){
    this.setState({contactDone: !this.state.contactDone});

  }

  handleContactMethodChange(event){
    this.props.addContactMethod(event.target.value);
  }

render(){
  console.log(this.state.contactDone);
  return (
    <div>
    <h1>Punk Registry Store {this.props.contactMethod}</h1>
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
    <input type="text" id="contactMethodField" disabled={this.state.contactDone} onChange={this.handleContactMethodChange.bind(this)} />
    <br />
    <button onClick = {this.handleNextBackClick}>Next Step</button>
    <br />
    <br />
    <button onClick = {this.handleClick}>Go Back</button>
    </div>
)
  }
}


export default WelcomeScreen;
