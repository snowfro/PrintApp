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

  getArtCreditsToUse(){
    const {drizzle} = this.props;
    const contract = drizzle.contracts.PunkPrintRegistryMinter;
    let artCreditsToUseDataKey = contract.methods['artIdToCreditsToSpend'].cacheCall(this.props.punkId);
    this.props.setArtCreditsToUse(artCreditsToUseDataKey);
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
    if (this.state.stage===2){
      console.log('tag');
      this.getArtCreditsToUse();
    }


    if (this.state.stage>2){
      this.props.handleWelcomeChange(1);
    }

  }

  handleContactMethodChange(event){
    this.props.addContactMethod(event.target.value);
  }

  handleFirstNameChange(event){
    this.props.handleAddressInput('firstName', event.target.value);
  }

  handleLastNameChange(event){
    this.props.handleAddressInput('lastName', event.target.value);
  }

  handleAddress1Change(event){
    this.props.handleAddressInput('address1', event.target.value);
  }

  handleAddress2Change(event){
    this.props.handleAddressInput('address2', event.target.value);
  }

  handleCityChange(event){
    this.props.handleAddressInput('city', event.target.value);
  }

  handleStateProvChange(event){
    this.props.handleAddressInput('stateProv', event.target.value);
  }

  handleZipChange(event){
    this.props.handleAddressInput('zip', event.target.value);
  }

  handleCountryChange(event){
    this.props.handleAddressInput('country', event.target.value);
  }

render(){

  const {drizzleState} = this.props;
  const minter = drizzleState.contracts.PunkPrintRegistryMinter;

  console.log(drizzleState);
  console.log('art credits to use key: '+ this.props.artCreditsToUse);

  if (minter.artIdToCreditsToSpend[this.props.artCreditsToUse]){
    console.log('art credits: '+ minter.artIdToCreditsToSpend[this.props.artCreditsToUse].value);
  }

  return (
    <div className="container mt-5">
    <div className="jumbotron">
    <div>
    <h1>Punk Registry Store</h1>
    <br />
    <h4>Step 1: Provide Contact and Shipping Info</h4>
    <br />
    <p>Please fill out your contact details below. Note that the <b><i>contact method</i></b> you provide will be included in your purchase transaction and recorded on the blockchain.
    This is our only guaranteed method to contact you in case we need clarification about your order.</p>
    <small id="contactMethodHelp" className="form-text text-muted">Possible contact methods include e-mail address, twitter handle, or <b>full</b> Discord handle (including numerical ID).</small>

    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text" id="contact-method">Contact Method:</span>
      </div>
      <input type="text" value={this.props.contactMethod} className="form-control" aria-label="Contact Method" aria-describedby="contact-method" disabled={this.state.stage>1} onChange={this.handleContactMethodChange.bind(this)} />
    </div>

    <div className="form-group row mb-3">
        <div className="input-group col-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="first-name">First Name:</span>
          </div>
          <input type="text" value={this.props.address.firstName} className="form-control" aria-label="First Name" aria-describedby="first-name" disabled={this.state.stage>1} onChange={this.handleFirstNameChange.bind(this)} />
        </div>
        <div className="input-group col-lg">
          <div className="input-group-prepend">
            <span className="input-group-text" id="last-name">Last Name:</span>
          </div>
          <input type="text" value={this.props.address.lastName} className="form-control" aria-label="Last Name" aria-describedby="last-name" disabled={this.state.stage>1} onChange={this.handleLastNameChange.bind(this)} />
        </div>
    </div>

    <div className="form-group row mb-3">
      <div className="input-group col-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="address1">Address 1:</span>
        </div>
        <input type="text" value={this.props.address.address1} className="form-control" aria-label="Address 1" aria-describedby="address2" disabled={this.state.stage>1} onChange={this.handleAddress1Change.bind(this)} />
      </div>
      <div className="input-group col-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="address2">Address 2:</span>
        </div>
        <input type="text" value={this.props.address.address2} className="form-control" aria-label="Address 2" aria-describedby="address2" disabled={this.state.stage>1} onChange={this.handleAddress2Change.bind(this)} />
        </div>
    </div>

    <div className="form-group row mb-3">
      <div className="input-group col-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="city">City:</span>
        </div>
        <input type="text" value={this.props.address.city} className="form-control" aria-label="City" aria-describedby="city" disabled={this.state.stage>1} onChange={this.handleCityChange.bind(this)} />
      </div>
      <div className="input-group col-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="state">State/Province/Region:</span>
        </div>
        <input type="text" value={this.props.address.stateProv} className="form-control" aria-label="State" aria-describedby="state" disabled={this.state.stage>1} onChange={this.handleStateProvChange.bind(this)} />
      </div>
      <div className="input-group col-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="zip">ZIP/Postal Code:</span>
        </div>
        <input type="text" value={this.props.address.zip} className="form-control" aria-label="ZIP" aria-describedby="zip" disabled={this.state.stage>1} onChange={this.handleZipChange.bind(this)} />
      </div>
    </div>

    <div className="form-group row mb-3">
      <div className="input-group col">
        <div className="input-group-prepend">
          <span className="input-group-text" id="country">Country:</span>
        </div>
        <input type="text" value={this.props.address.country} className="form-control" aria-label="Country" aria-describedby="country" disabled={this.state.stage>1} onChange={this.handleCountryChange.bind(this)} />
      </div>
    </div>

    <br />
    <div className="alert alert-info">
    <p>Please take an extra moment to verify your address and contact method before proceeding. </p>
    </div>
    <div className="alert alert-danger">
    <p><b>We will use the above information solely for shipping purposes and will not share the information under any circumstances.</b></p>
    </div>

    {this.state.stage>1 &&
      <div>
        <br />
        <h4>Step 2: Choose Your Punk</h4>
        <br />
        <p>Great! Now we need to choose a punk. Please type in your PunkId (between 0 and 9999) in the box below and click "next step".</p>
        <br />
        <input type="number" id="punkIdField" min="0" max="9999" disabled={this.state.stage>2} onChange={this.handlePunkIdChange.bind(this)} />
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

      {minter.artIdToCreditsToSpend[this.props.artCreditsToUse] && minter.artIdToCreditsToSpend[this.props.artCreditsToUse].value>0 &&
          <div className='alert alert-success'>
            <h4>This Punk has a free print credit!</h4>
          </div>

            }


    <button onClick = {this.handleBackClick} disabled={this.state.stage>1?false:true} className={this.state.stage>1?null:"hidden"}>Previous Step</button><button onClick = {this.handleNextClick} disabled={!this.props.punkId&&this.state.stage>1?true:false} >{this.state.stage>2?"CONFIRM":"Next Step"}</button>
    <br />
    <br />
    <br />
    <button onClick = {this.handleClick}>Back To Start</button>
    </div>

    </div>
    </div>
)
  }
}


export default GetInfo;
