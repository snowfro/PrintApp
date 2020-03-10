import React from "react";
import PriceList from './priceList';


class Welcome extends React.Component {
  render(){

    return (
      <div className="container">
          <div className="jumbotron">
              <h1 className="display-4">Welcome to the Punk Print Registry</h1>
              <p className="lead mt-2">Welcome to the punk print registry store. Here you'll be able to purchase prints and/or authentication for your Larva Labs <a
                  href="https://www.larvalabs.com/cryptopunks" target="_blank" rel="noopener noreferrer">CryptoPunk</a> artwork.</p>
              <hr className="my-4"></hr>
              <p className="">There are two purchase options to choose from:</p>
              <div className="row">
                  <div className="col m-4 alert alert-info">
                      <h4>High Quality Print </h4>
                      A 12" x 12" (or smaller) high quality print of your artwork with authentication NFC. <br/>
                  </div>
                  <div className="col m-4 alert alert-info">
                      <h4>Authentication NFC </h4>
                      An authentication NFC sticker that you can attach to a print you already have.
                  </div>
              </div>
              <div className="alert">You will be transacting directly through the <a href="https://etherscan.io/address/0xcb62a94afcd4ff4498be912dfbf60ca1d4b3eddc" target="_blank" rel="noopener noreferrer">Art Blocks LLC Punk Print Registry</a>  Smart Contract.
                  In other words, the storefront itself is a smart contract. In order to purchase an artwork print or NFC, you must have ownership of that artwork in
                  your wallet <i>that you send the funds from</i>.
              </div>
              <div className="alert alert-danger">
              <p>The Print Registry Store will reject your transaction if you do not initiate the transaction from the address that owns the NFT. </p>
              </div>
              <div className="alert alert-warning">
              Since your transaction is being handled directly through a smart contract, a contact method will be included in the blockchain transaction
              so that we can reach you in case we require any clarification for your order.
              <br />
              <br />
              In order to maintain your privacy, your personal details <b>will not </b>be included in the smart contract transaction.
              </div>

              <PriceList
                  drizzle={this.props.drizzle}
                  drizzleState={this.props.drizzleState}
              />
          </div>
          </div>
    )
  }
  }

export default Welcome;
