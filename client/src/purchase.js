import React from 'react';
import Canvas from './canvas';
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

class Purchase extends React.Component{
  constructor(props){
  super(props);
  this.state = {purchaseType:null, shipType:null, stackId:null, creditSale:false, posted:false}
  this.handleTypeRadio = this.handleTypeRadio.bind(this);
  this.handleShipRadio = this.handleShipRadio.bind(this);
  this.handleGoBack = this.handleGoBack.bind(this);
  this.handlePurchase = this.handlePurchase.bind(this);
  this.handleStartOver = this.handleStartOver.bind(this);
}

handleGoBack(){
  this.props.handleWelcomeChange(-1);
}

handleStartOver(){
  this.props.handleWelcomeChange(-2);
}
  handleTypeRadio (event){
    this.setState({purchaseType:event.target.value});
  }

  handleShipRadio (event){
    this.setState({shipType:event.target.value});
  }

  findPrice(){
    if (this.state.purchaseType === "Print + NFC"){
      if (this.state.shipType === "Domestic") {
        return 'pricePerPrintInWei';
      } else {
        return 'pricePerPrintIntlShipInWei'
      }
    } else if (this.state.purchaseType === "NFC Only") {
      if (this.state.shipType === "Domestic") {
      return 'pricePerNFCInWei';
    } else {
      return 'pricePerNFCIntlShipInWei';
    }
  }
  }

  handlePurchase(purchaseType){
    let stackId;
    const { drizzle, drizzleState } = this.props;
    const contract1 = drizzle.contracts.PunkPrintRegistry;
    const contract2 = drizzle.contracts.PunkPrintRegistryMinter;
    let purchaseFunc='';

    if (purchaseType === 'pricePerPrintInWei' || purchaseType === 'pricePerPrintIntlShipInWei'){
      purchaseFunc = 'purchasePrint'
    } else if (purchaseType === 'pricePerNFCInWei' || purchaseType === 'pricePerNFCIntlShipInWei'){
      purchaseFunc = 'purchaseNFCOnly'
    } else {
      purchaseFunc = 'purchaseMisc'
    }

  console.log("type: "+purchaseType + " Func: "+ purchaseFunc);

    const determineAmount = drizzleState.contracts.PunkPrintRegistry[purchaseType];
    const amountToSend = determineAmount['0x0'].value;
    console.log("sending "+ amountToSend + "contact "+this.props.contactMethod + "Punk " + this.props.punkId+ "using: "+ purchaseFunc);

    const creditPurchaseConcat = purchaseFunc + " | " + this.props.contactMethod;
    const creditsToUse = this.props.drizzleState.contracts.PunkPrintRegistryMinter.addressToCreditsToSpend[this.props.creditsToUseKey];
    const artCreditsToUse = this.props.drizzleState.contracts.PunkPrintRegistryMinter.artIdToCreditsToSpend[this.props.artCreditsToUse];


    if ((creditsToUse && creditsToUse.value>0)||(artCreditsToUse && artCreditsToUse.value>0)){
      this.setState({creditSale:true})
      stackId = contract2.methods['mint'].cacheSend(this.props.punkId,creditPurchaseConcat, {
        from: drizzleState.accounts[0],
        value: 0
      });
    } else {
      stackId = contract1.methods[purchaseFunc].cacheSend(this.props.punkId,this.props.contactMethod, {
        from: drizzleState.accounts[0],
        value: amountToSend
      });
    }
    // save the `stackId` for later reference
    this.setState({ stackId });
  };


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

  getTokenId(){
    const {transactions, transactionStack } = this.props.drizzleState;
    const txHash = transactionStack[this.state.stackId];
    if (!txHash) return null;
    if (transactions[txHash]){
      if (transactions[txHash].status==='success'){
        if (this.state.creditSale){
          const newTokenIdHex = transactions[txHash].receipt.events[0].raw.topics[3];
          const newTokenId = parseInt(newTokenIdHex,16);
          console.log('newTokenIdMint: ' + newTokenId);
          if (!this.state.posted){
          fetch('https://submit-form.com/-uaRdhfKwMjpOndrBC1Rn', {
           method: 'POST',
           headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept"
            },
           body: JSON.stringify({
             nft:"Punk",
             contactMethod:this.props.contactMethod,
             artId:this.props.punkId,
             purchaseType:this.state.purchaseType,
             shipType:this.state.shipType,
             creditSale:true,
             firstName:this.props.address.firstName,
             lastName:this.props.address.lastName,
             address1:this.props.address.address1,
             address2:this.props.address.address2,
             city:this.props.address.city,
             state:this.props.address.stateProv,
             country:this.props.address.country

           }),
         }).then(function(result){
           console.log('data sent');
           console.log(result);
         });
         this.setState({posted:true});
       }
          return newTokenId;
        } else {
      const newTokenId = transactions[txHash].receipt.events.Transfer.returnValues[2];
      console.log('newTokenIdPurchase: '+newTokenId)
      if (!this.state.posted){
          fetch('https://submit-form.com/-uaRdhfKwMjpOndrBC1Rn', {
           method: 'POST',
           headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept"
            },
           body: JSON.stringify({
             nft:"Punk",
             contactMethod:this.props.contactMethod,
             artId:this.props.punkId,
             purchaseType:this.state.purchaseType,
             shipType:this.state.shipType,
             creditSale:false,
             firstName:this.props.address.firstName,
             lastName:this.props.address.lastName,
             address1:this.props.address.address1,
             address2:this.props.address.address2,
             city:this.props.address.city,
             state:this.props.address.stateProv,
             country:this.props.address.country

           }),
         }).then(function(result){
           console.log('data sent');
           console.log(result);
         });
         this.setState({posted:true});
       }
      return newTokenId;
    }
    } else {
      return null;
    }
  }
  }



  render(){
    const {contracts} = this.props.drizzle;

    const { PunkPrintRegistry } = this.props.drizzleState.contracts;
    const purchaseType = this.findPrice();
    console.log(contracts);
    console.log(this.props.drizzleState);
    //console.log(PunkPrintRegistry);
    //console.log(this.findPrice());

    const pricePerPrintInWei = PunkPrintRegistry.pricePerPrintInWei['0x0'];
    const pricePerPrintIntlShipInWei = PunkPrintRegistry.pricePerPrintIntlShipInWei['0x0'];
    const pricePerNFCInWei = PunkPrintRegistry.pricePerNFCInWei['0x0'];
    const pricePerNFCIntlShipInWei = PunkPrintRegistry.pricePerNFCIntlShipInWei['0x0'];
    const pricePerMiscInWei = PunkPrintRegistry.pricePerMiscInWei['0x0'];
    const pricePerMiscIntlShipInWei = PunkPrintRegistry.pricePerMiscIntlShipInWei['0x0'];

    let priceObject = {pricePerPrintInWei: pricePerPrintInWei, pricePerPrintIntlShipInWei:pricePerPrintIntlShipInWei,pricePerNFCInWei:pricePerNFCInWei,pricePerNFCIntlShipInWei:pricePerNFCIntlShipInWei,pricePerMiscInWei:pricePerMiscInWei, pricePerMiscIntlShipInWei:pricePerMiscIntlShipInWei};
    //if (this.findPrice()){ console.log("being bought: "+ this.findPrice());}
    let status = this.getStatus();
    let tokenId = this.getTokenId();
    let url = "http://ppr.artblocks.io/details/";
    if (tokenId) {
      url = url+tokenId;
    }


    const creditsToUse = this.props.drizzleState.contracts.PunkPrintRegistryMinter.addressToCreditsToSpend[this.props.creditsToUseKey];
    const artCreditsToUse = this.props.drizzleState.contracts.PunkPrintRegistryMinter.artIdToCreditsToSpend[this.props.artCreditsToUse];

    if(creditsToUse){
      console.log('ctu: '+creditsToUse.value);
    }

    if(artCreditsToUse){
      console.log('art ctu: '+artCreditsToUse.value);
    }

    return (
      <div className="container mt-5">
      <div className="jumbotron">
      <div>
      <h1>Punk Print Registry Purchase Page</h1>
      <br />
      <h4><h4>Almost there!
      <br />
      Now you will choose your purchase options and complete the transaction for punk #{this.props.punkId}.</h4>
      <br />
      </h4>
    <Canvas
    punkId={this.props.punkId}
    />
    <br />
    <br />
    <p>There are two ways to proceed. You may purchase a 12"x12" (30.5x30.5cm) high quality digital print with attached authentication NFC
    or if you already have a nice print you can simply buy the NFC sticker for authentications. </p>
    <div className="alert alert-primary" role="alert">
    <p>Please select one:</p>
    <label><input type="radio" name="purchaseType" value="Print + NFC" onChange={this.handleTypeRadio} />Purchase Print+NFC</label><br />
    <label><input type="radio" name="purchaseType" value="NFC Only" onChange={this.handleTypeRadio} />Purchase NFC Only</label>
    </div>
    {this.state.purchaseType &&
      <div>
      <h4>Purchase Type: {this.state.purchaseType}</h4>
      <br />
      <div className="alert alert-primary" role="alert">
      <p>Now we need to know where this is going. Please select whether you are located in the USA or abroad. Item price will adjust accordingly.</p>
      <label><input type="radio" name="shipType" value="Domestic" onChange={this.handleShipRadio} />Domestic Shipping (within USA)</label><br />
      <label><input type="radio" name="shipType" value="International" onChange={this.handleShipRadio} />International Shipping</label>
      </div>
      {this.state.shipType &&
      <div>
      <h4>Shiping Type: {this.state.shipType}</h4>
      <br />
      <h4>Total: {((creditsToUse && creditsToUse.value>0)||(artCreditsToUse && artCreditsToUse.value>0)) ? 'FRE' : priceObject[this.findPrice()] && (web3.utils.fromWei(priceObject[this.findPrice()].value.toString(), 'ether'))}Ξ</h4>
      <br />
      <div className="alert alert-secondary" role="alert">
      <b>Contact Method: {this.props.contactMethod}</b>
      <br />
      <br />
      Shipping to:
      <br />
      {this.props.address.firstName} {this.props.address.lastName}
      <br />
      {this.props.address.address1}
      <br />
      {this.props.address.address2 &&
        <div>
        {this.props.address.address2}
        <br />
        </div>
      }

      {this.props.address.city}, {this.props.address.stateProv} {this.props.address.zip}
      <br />
      {this.props.address.country}
      </div>

      <br />
      <button className="btn btn-success" disabled = {status?true:false} onClick={() => {this.handlePurchase(purchaseType)}}>{status?status:'Purchase'}</button>
      {status === 'success' &&
    <div>
    <h1>Congrats!</h1>
    <h4>Your transaction is complete! Please reach out to info@artblocks.io or Snowfro#8886 on Discord using the recorded contact method
    so we can get your package to you ASAP.</h4>
    <br />
    <h4>Your Print Registry TokenId for this transaction is {tokenId}. You can visit your authentication
    page at <a href={url}>{url}</a>. Note that the NFC UID will be set manually at time of printing.</h4>
    <p> You will be provided with a tracking number once your package has shipped. Please allow 1-2 weeks for delivery.</p>

  </div>
}
      </div>
    }
      </div>
    }
    <br />
    <br />
    <button onClick = {status==='success'? this.handleStartOver : this.handleGoBack}>{status==='success'?'Start Over':'Go Back'}</button>
    </div>
    </div>
    </div>
  )
  }

}

export default Purchase;
