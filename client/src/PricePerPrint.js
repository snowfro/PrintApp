
import React from "react";
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

class PricePerPrint extends React.Component {
  state = { dataKey: null };
  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.PunkPrintRegistry;
    // let drizzle know we want to watch 'sum'
    var dataKey = contract.methods["pricePerPrintInWei"].cacheCall();
    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }render() {
    // get the contract state from drizzleState
    const { PunkPrintRegistry } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const ppp = PunkPrintRegistry.pricePerPrintInWei[this.state.dataKey];
  //  console.log(ppp.value);

/*
    const pppStr = ppp.value.toString();
    console.log(pppStr);
    const pppInEth = web3.utils.fromWei(pppStr, 'ether')
  */

    //console.log(returnValue)

    //console.log(cName);

    // if it exists, then we display its value
    return <p>Print Price: {ppp && (web3.utils.fromWei((ppp.value).toString(), 'ether'))} Ξ</p>;
    //return <p>Print Price: {ppp && ppp.value}</p>;
  }
}export default PricePerPrint;
