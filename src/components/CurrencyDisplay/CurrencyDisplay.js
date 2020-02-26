import React, { Component } from 'react';

// import token from '../../config.js';

class CurrencyDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // mapToState = data => {
  //   return data
  // }


  // async componentDidMount() {
  //   let response = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=${token.TOKEN}`)
  //   let json = await response.json()
  //   console.log(json.length)
  //   this.setState(this.mapToState(json[0]))
  // }

  render() {
    return (
      <div>

      </div>
    )
  }

}

export default CurrencyDisplay;
