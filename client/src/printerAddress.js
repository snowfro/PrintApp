
import React from "react";

class PrinterAddress extends React.Component {
  state = { dataKey1: null, dataKey2: null };
  componentDidMount() {
    const { drizzle } = this.props;
    //console.log(drizzle);
    const contract = drizzle.contracts.PunkPrintRegistry;
    // let drizzle know we want to watch 'sum'
    var dataKey1 = contract.address;
    //console.log(`Address: ${dataKey1}`);
    var dataKey2 = contract.methods["printerAddress"].cacheCall();

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey1, dataKey2 });
  }render() {
    // get the contract state from drizzleState
    const { PunkPrintRegistry } = this.props.drizzleState.contracts;
    //console.log(`dataKey2: ${this.state.dataKey2}`)
    //console.log(PunkPrintRegistry.printerAddress["0x0"]);

    // using the saved `dataKey`, get the variable we're interested in
    //const pAddress = PunkPrintRegistry.methods['printerAddress'].cacheCall();
    const cAddress = this.state.dataKey1;
    //console.log(`cAddress = ${cAddress}.`)
    const pAddress = PunkPrintRegistry.printerAddress[this.state.dataKey2];
    //console.log(this.props);
    //console.log(pAddress);

    // if it exists, then we display its value
    return (

      <p>Contract Address: {cAddress} | Printer Address: {pAddress && pAddress.value}</p>

)
  }
}

export default PrinterAddress;
