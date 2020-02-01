import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PrinterAddress from "./printerAddress";
import PricePerPrint from "./PricePerPrint";

class App extends Component {
  state = { loading: true, drizzleState: null };
  componentDidMount() {
    const { drizzle } = this.props;
    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();
      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }compomentWillUnmount() {
    this.unsubscribe();
  }
  render() {
  if (this.state.loading) return "Loading Drizzle...";
  return (
    <div className="App">
      <PrinterAddress
        drizzle={this.props.drizzle}
        drizzleState={this.state.drizzleState}
      />
      <PricePerPrint
        drizzle={this.props.drizzle}
        drizzleState={this.state.drizzleState}
      />

    </div>
  );
}
}export default App;
