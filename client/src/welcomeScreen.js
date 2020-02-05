import React from "react";

import Welcome from "./welcome";
import SetConstants from "./setConstants";
import PriceList from "./priceList";

class WelcomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }



  handleClick(){

  this.props.changeWelcomeState();

  }

render(){

  return(
    <div>
    <SetConstants
    drizzle={this.props.drizzle}
    drizzleState={this.props.drizzleState}
    />
    <Welcome
    drizzle={this.props.drizzle}
    drizzleState={this.props.drizzleState}

    />
    <PriceList
    drizzle={this.props.drizzle}
    drizzleState={this.props.drizzleState}
    />
    <button onClick = {this.handleClick}>Click Here To Proceed</button>
    </div>
  )
}
}

export default WelcomeScreen;
