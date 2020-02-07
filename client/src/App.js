import React, { Component } from 'react';
import './App.css';


import PriceList from "./priceList";
import WelcomeScreen from "./welcomeScreen";
import GetContact from "./getContact";

class App extends Component {
  constructor(props){
  super(props);
  this.state = { loading: true, drizzleState: null, welcomeState: true, contactMethod: ''};
  this.handleWelcomeChange = this.handleWelcomeChange.bind(this);
  this.addContactMethod = this.addContactMethod.bind(this);
}
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

handleWelcomeChange(){

  this.setState({welcomeState:!this.state.welcomeState});
}

addContactMethod(contactMethod){
  this.setState({contactMethod:contactMethod});
}



render(){
  if (this.state.loading) return "Loading Drizzle...";

console.log(this.state.welcomeState);

  if (this.state.welcomeState){
  return(
    <div className="App">
      <WelcomeScreen
      drizzle={this.props.drizzle}
      drizzleState={this.state.drizzleState}
      handleWelcomeChange={this.handleWelcomeChange}

      />
      </div>
  )
} else {
  return (
  <div>
  <GetContact
  drizzle={this.props.drizzle}
  drizzleState={this.state.drizzleState}
  handleWelcomeChange={this.handleWelcomeChange}
  addContactMethod = {this.addContactMethod}
  contactMethod = {this.state.contactMethod}
  />

  <PriceList
  drizzle={this.props.drizzle}
  drizzleState={this.state.drizzleState}
  />
  </div>
)
}

}
}
export default App;
