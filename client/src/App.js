import React, { Component } from 'react';
import './App.css';

import SetConstants from "./setConstants";
import Welcome from "./welcome";
import PriceList from "./priceList";
import WelcomeScreen from "./welcomeScreen";

class App extends Component {
  state = { loading: true, drizzleState: null, welcomeState: true};
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
  }

  compomentWillUnmount() {
    this.unsubscribe();
    //
  }




render(){
  if (this.state.loading) return "Loading Drizzle...";

console.log(this.state.welcomeState);

  return(
    <div className="App">
      <WelcomeScreen
      drizzle={this.props.drizzle}
      drizzleState={this.state.drizzleState}
      
      />
      </div>
  )
  /*
  return(
    <div className="App">
      <SetConstants
      drizzle={this.props.drizzle}
      drizzleState={this.state.drizzleState}
      welcomeScreen={this.state.welcomeScreen}
      />
      </div>
  )
  */
}
}
export default App;
