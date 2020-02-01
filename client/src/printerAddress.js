
import React from "react";

class PrinterAddress extends React.Component {
  state = { dataKey: null };
  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.PunkPrintRegistry;// let drizzle know we want to watch 'sum'
    var dataKey = contract.methods["printerAddress"].cacheCall();// save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }render() {
    // get the contract state from drizzleState
    const { PunkPrintRegistry } = this.props.drizzleState.contracts;

    // using the saved `dataKey`, get the variable we're interested in
    const pAddress = PunkPrintRegistry.printerAddress[this.state.dataKey];

    // if it exists, then we display its value
    return <p>pAddress: {pAddress && pAddress.value}</p>;
  }
}export default PrinterAddress;
