
import React from "react";

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

    //console.log(cName);

    // if it exists, then we display its value
    return <p>Print Price: {ppp && ppp.value}</p>;
  }
}export default PricePerPrint;
