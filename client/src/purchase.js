import React from 'react';
import Canvas from './canvas';
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

class Purchase extends React.Component{
  constructor(props){
  super(props);
  this.state = {purchaseType:null, shipType:null}
  this.handleTypeRadio = this.handleTypeRadio.bind(this);
  this.handleShipRadio = this.handleShipRadio.bind(this);
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

  render(){
    const { PunkPrintRegistry } = this.props.drizzleState.contracts;
    console.log(PunkPrintRegistry);
    console.log(this.findPrice());

    const pricePerPrintInWei = PunkPrintRegistry.pricePerPrintInWei['0x0'];
    const pricePerPrintIntlShipInWei = PunkPrintRegistry.pricePerPrintIntlShipInWei['0x0'];
    const pricePerNFCInWei = PunkPrintRegistry.pricePerNFCInWei['0x0'];
    const pricePerNFCIntlShipInWei = PunkPrintRegistry.pricePerNFCIntlShipInWei['0x0'];
    const pricePerMiscInWei = PunkPrintRegistry.pricePerMiscInWei['0x0'];
    const pricePerMiscIntlShipInWei = PunkPrintRegistry.pricePerMiscIntlShipInWei['0x0'];

    let priceObject = {pricePerPrintInWei: pricePerPrintInWei, pricePerPrintIntlShipInWei:pricePerPrintIntlShipInWei,pricePerNFCInWei:pricePerNFCInWei,pricePerNFCIntlShipInWei:pricePerNFCIntlShipInWei,pricePerMiscInWei:pricePerMiscInWei, pricePerMiscIntlShipInWei:pricePerMiscIntlShipInWei};
    if (this.findPrice()){ console.log("priceObj"+ priceObject[this.findPrice()].value);}

    return (
      <div>
      <h1>Purchase Authenticity</h1>
      <br />
      <h4>Almost there! Now you will choose your purchase options and complete the transaction for punk #{this.props.punkId}.</h4>
    <Canvas
    punkId={this.props.punkId}
    />
    <p>There are ways to proceed. You may purchase a 12"x12" (30.5x30.5cm) high quality digital print with attached authentication NFC
    or if you already have a nice print you can simply buy the NFC sticker for authentications. Please select one:</p>
    <label><input type="radio" name="purchaseType" value="Print + NFC" onChange={this.handleTypeRadio} />Purchase Print+NFC</label><br />
    <label><input type="radio" name="purchaseType" value="NFC Only" onChange={this.handleTypeRadio} />Purchase NFC Only</label>

    {this.state.purchaseType &&
      <div>
      <h4>Purchase Type: {this.state.purchaseType}</h4>
      <br />
      <p>Now we need to know where this is going. Please select whether you are located in the USA or abroad. Item price will adjust accordingly.</p>
      <label><input type="radio" name="shipType" value="Domestic" onChange={this.handleShipRadio} />Domestic Shipping (within USA)</label><br />
      <label><input type="radio" name="shipType" value="International" onChange={this.handleShipRadio} />International Shipping</label>
      {this.state.shipType &&
      <div>
      <h4>Shiping Type: {this.state.shipType}</h4>
      <br />
      <h4>Total: {priceObject[this.findPrice()] && (web3.utils.fromWei(priceObject[this.findPrice()].value.toString(), 'ether'))}Ξ</h4>
      </div>
    }
      </div>
    }

    </div>
  )
  }

}

export default Purchase;
